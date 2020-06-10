using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarStartup.Models;
using CarStartup.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarStartup.Controllers
{
    [Route("api/[controller]")]
    public class ShopController : Controller
    {
        private readonly Context context;
        private readonly UserService userService;

        public ShopController(Context c, UserService us)
        {
            context = c;
            userService = us;
        }

        private string Token()
        {
            return Request.Cookies["token"];
        }

        // GET: /<controller>/
        [HttpPut]
        public ApiResponse Create([FromBody] DenormalizedShop denormalizedShopReq)
        {
            if(!userService.IsAdmin(Token()))
            {
                return new ApiError("You are not authorized to do that");
            }

            var manager = userService.GetUserByEmail(denormalizedShopReq.managerEmail);
            if (manager == null)
            {
                return new ApiError("The specified manager does not have an account");
            }

            var existingShop = (
                from s in context.Shops.AsQueryable()
                where s.name.ToLower() == denormalizedShopReq.name.ToLower()
                select s
            ).SingleOrDefault();
            if (existingShop != null)
            {
                return new ApiError("A shop with that name already exists");
            }

            var shop = new Shop
            {
                name = denormalizedShopReq.name,
                email = denormalizedShopReq.email,
                phone = denormalizedShopReq.phone,
                address = denormalizedShopReq.address,
                managingUser = manager.Id,
            };
            context.Shops.Add(shop);
            context.SaveChanges();
            return new ShopCreateResponse
            {
                shopId = shop.Id
            };
        }

        [HttpGet("all")]
        public ApiResponse GetAll()
        {
            if (!userService.IsAdmin(Token()))
            {
                return new ApiError("You are not authorized to do that");
            }

            var allShops =
                from s in context.Shops.AsQueryable()
                join u in context.Users.AsQueryable() on s.managingUser equals u.Id
                select new DenormalizedShop
                {
                    shopId = s.Id,
                    name = s.name,
                    email = s.email,
                    phone = s.phone,
                    address = s.address,
                    managerEmail = u.email,
                };
            return new ShopListResponse
            {
                shops = allShops.ToList()
            };
        }

        [HttpGet]
        public ApiResponse GetShopsForUser()
        {
            var user = userService.GetUserByToken(Token());
            var userShops = (
                from s in context.Shops.AsQueryable()
                where s.managingUser == user.Id
                select new DenormalizedShop
                {
                    shopId = s.Id,
                    name = s.name,
                    email = s.email,
                    phone = s.phone,
                    address = s.address,
                    managerEmail = user.email,
                }
            );
            return new ShopListResponse
            {
                shops = userShops.ToList()
            };
        }
    }

    public class DenormalizedShop
    {
        public int shopId;
        public string name;
        public string email;
        public string phone;
        public string address;
        public string managerEmail;
    }

    public class ShopCreateResponse : ApiResponse
    {
        public int shopId;
    }

    public class ShopListResponse : ApiResponse
    {
        public List<DenormalizedShop> shops;
    }
}
