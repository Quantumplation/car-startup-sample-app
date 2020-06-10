using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarStartup.Models;

namespace CarStartup.Services
{
    public class UserService
    {
        private Context context;

        public UserService(Context c)
        {
            context = c;
        }

        public bool IsAdmin(string token)
        {
            try
            {
                var user = GetUserByToken(token);
                return user?.isAdmin ?? false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public User GetUserByToken(string token)
        {
            var session = context.Sessions.SingleOrDefault(s => s.token == token);
            if (session == null)
            {
                throw new InvalidOperationException("Invalid Token");
            }

            if (session.expiration < DateTime.Now)
            {
                throw new InvalidOperationException("Session has expired");
            }

            var user = context.Users.SingleOrDefault(u => u.Id == session.user);
            if (user == null)
            {
                throw new InvalidOperationException("Session recognized, but user doesn't exist!");
            }

            return user;
        }

        public User GetUserByEmail(string email)
        {
            return (
                from u in context.Users.AsQueryable()
                where u.email == email.ToLowerInvariant()
                select u
            ).SingleOrDefault();
        }
    }
}
