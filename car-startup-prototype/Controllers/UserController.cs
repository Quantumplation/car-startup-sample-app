using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using CarStartup.Models;
using CarStartup.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStartup.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly Context context;
        private readonly UserService userService;

        public UserController(Context c, UserService us)
        {
            context = c;
            userService = us;
        }

        private string Token()
        {
            return Request.Cookies["token"];
        }

        [HttpGet("current")]
        public ApiResponse CurrentUser()
        {
            var user = userService.GetUserByToken(Token());
            return new CurrentUserResponse
            {
                user = new CurrentUser { email = user.email, isAdmin = user.isAdmin },
            };
        }

        [HttpGet("all")]
        public ApiResponse AllUsers()
        {
            if (!userService.IsAdmin(Token()))
            {
                return new ApiError("You are not authorized to do that");
            }

            var allEmails = context.Users.Select(u => u.email).ToList();
            return new AllUserResponse
            {
                userEmails = allEmails,
            };
        }

        // PUT api/request/signup
        [HttpPut("signup")]
        public ApiResponse Signup([FromBody]SignupRequest request)
        {
            var existingUser = userService.GetUserByEmail(request.email);
            if (existingUser != null)
            {
                return new ApiError("A request with that email already exists");
            }
            RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();
            var salt = new byte[8];
            provider.GetBytes(salt);

            var hashedPassword = saltAndHash(request.password, salt);

            var dbUser = new User
            {
                email = request.email.ToLowerInvariant(),
                isAdmin = false,
                passwordHash = hashedPassword,
                passwordSalt = salt
            };

            var trackingEntity = context.Users.Add(dbUser);
            context.SaveChanges();

            return new SignupResponse
            {
                userId = trackingEntity.Entity.Id
            };
        }

        [HttpPost("login")]
        public ApiResponse Login([FromBody] LoginRequest request)
        {
            var user = userService.GetUserByEmail(request.email);
            var failedLoginError = new ApiError("Incorrect email or password");
            if (user == null)
            {
                // We salt and hash here to avoid timing attacks
                saltAndHash("DIE, TIMING ATTACKS", new byte[] { 0,0,0,0,0,0,0,0 });
                return failedLoginError;
            }

            var hashedPassword = saltAndHash(request.password, user.passwordSalt);
            if (!AreEqual(hashedPassword, user.passwordHash))
            {
                return failedLoginError;
            }
            // We've successfully logged in
            // Delete any existing tokens
            context.Sessions.RemoveRange(context.Sessions.Where(s => s.user == user.Id));
            // Generate a new token from 16 bytes of entropy hashed by SHA256
            RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();
            var tokenEntropy = new byte[16];
            provider.GetBytes(tokenEntropy);
            SHA256Managed hashingFunction = new SHA256Managed();
            var tokenRaw = hashingFunction.ComputeHash(tokenEntropy);
            var token = new StringBuilder();
            foreach(byte b in tokenRaw)
            {
                token.Append(b.ToString("x2"));
            }
            var expiration = DateTime.Now.AddDays(5);
            context.Sessions.Add(new Session
            {
                user = user.Id,
                token = token.ToString(),
                expiration = expiration,
            });
            context.SaveChanges();

            return new LoginResponse
            {
                token = token.ToString(),
                expiration = expiration,
            };
        }

        [HttpGet("logout")]
        public ApiResponse Logout()
        {
            context.Sessions.RemoveRange(context.Sessions.Where(s => s.token == Token()));
            context.SaveChanges();
            return new ApiResponse {result = ApiResult.Ok};
        }


        private byte[] saltAndHash(string password, byte[] salt)
        {
            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var saltedPassword = new byte[salt.Length + passwordBytes.Length];
            Buffer.BlockCopy(salt, 0, saltedPassword, 0, salt.Length);
            Buffer.BlockCopy(passwordBytes, 0, saltedPassword, salt.Length, passwordBytes.Length);
            SHA256Managed hashingFunction = new SHA256Managed();
            return hashingFunction.ComputeHash(saltedPassword);
        }

        // Guard against timing attacks by enumerating the entire array
        [MethodImpl(MethodImplOptions.NoOptimization)]
        static bool AreEqual(byte[] a1, byte[] a2)
        {
            bool result = true;
            for (int i = 0; i < a1.Length; ++i)
            {
                if (a1[i] != a2[i])
                    result = false;
            }
            return result;
        }
    }

    
    public class SignupRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
    public class SignupResponse : ApiResponse
    {
        public int userId;
    }
    public class LoginRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
    public class LoginResponse : ApiResponse
    {
        public string token;
        public DateTime expiration;
    }

    public class CurrentUser
    {
        public string email;
        public bool isAdmin;
    }
    public class CurrentUserResponse : ApiResponse
    {
        public CurrentUser user;
    }
    public class AllUserResponse : ApiResponse
    {
        public List<string> userEmails;
    }
}
