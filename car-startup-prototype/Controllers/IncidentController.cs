using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarStartup.Models;
using CarStartup.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarStartup.Controllers
{
    [Route("api/[controller]")]
    public class IncidentController : Controller
    {
        private readonly Context context;
        private readonly UserService userService;

        public IncidentController(Context c, UserService us)
        {
            context = c;
            userService = us;
        }

        private string Token()
        {
            return Request.Cookies["token"];
        }

        [HttpPut]
        public ApiResponse Create([FromBody] IncidentCreateRequest request)
        {
            var creator = userService.GetUserByToken(Token());
            var incident = new Incident
            {
                reportingUser = creator.Id,
                carModel = request.carModel,
                description = request.description,
                status = IncidentStatus.Created,
                reportedDate = DateTime.Now,
            };
            context.Incidents.Add(incident);
            context.SaveChanges();

            return new ApiResponse();
        }

        [HttpGet("all")]
        public ApiResponse ViewAllIncidents()
        {
            var user = userService.GetUserByToken(Token());
            if (!user.isAdmin)
            {
                return new ApiError("You are not authorized to do that");
            }
            var incidents =
                from i in context.Incidents.AsQueryable()
                join s in context.Shops.AsQueryable() on i.claimingShop equals s.Id into shops
                from s in shops.DefaultIfEmpty()
                select new DenormalizedIncident
                {
                    incidentId = i.Id,
                    carModel = i.carModel,
                    description = i.description,
                    status = i.status,
                    reportedDate = i.reportedDate,
                    shop = s != null ? new ShopInfo(s) : null,
                };
            return new IncidentListResponse
            {
                incidents = incidents.ToList()
            };
        }

        [HttpGet]
        public ApiResponse ViewIncidentsForUser()
        {
            var requester = userService.GetUserByToken(Token());
            var incidents =
                from i in context.Incidents.AsQueryable()
                join s in context.Shops.AsQueryable() on i.claimingShop equals s.Id into shops
                from s in shops.DefaultIfEmpty()
                where i.reportingUser == requester.Id
                select new DenormalizedIncident
                {
                    incidentId = i.Id,
                    carModel = i.carModel,
                    description = i.description,
                    status = i.status,
                    reportedDate = i.reportedDate,
                    shop = s != null ? new ShopInfo(s) : null,
                };
            return new IncidentListResponse
            {
                incidents = incidents.ToList()
            };
        }

        [HttpGet("shop/{shopId}")]
        public ApiResponse ViewIncidentsForShop(int shopId)
        {
            var user = userService.GetUserByToken(Token());
            var shop = (
                from s in context.Shops.AsQueryable()
                where s.Id == shopId && s.managingUser == user.Id
                select s
            ).SingleOrDefault();
            if (shop == null)
            {
                return new ApiError("A shop with that ID could not be found, or is managed by a different user");
            }
            var incidents = (
                from i in context.Incidents.AsQueryable()
                where i.claimingShop == shop.Id || i.status == IncidentStatus.Created
                select new DenormalizedIncident
                {
                    incidentId = i.Id,
                    carModel = i.carModel,
                    description = i.description,
                    status = i.status,
                    reportedDate = i.reportedDate,
                    shop = i.claimingShop != null
                        ? new ShopInfo(shop)
                        : null,
                }
            );
            return new IncidentListResponse { incidents = incidents.ToList() };
        }

        [HttpDelete("{incidentId}")]
        public ApiResponse CancelIncident(int incidentId)
        {
            var user = userService.GetUserByToken(Token());
            var incident = (
                from i in context.Incidents.AsQueryable()
                where i.Id == incidentId && i.reportingUser == user.Id
                select i
            ).SingleOrDefault();
            if(incident == null)
            {
                return new ApiError("An incident with that ID could not be found or belongs to another user");
            }
            if(incident.status == IncidentStatus.Finished)
            {
                return new ApiError("Cannot cancel a finished incident.");
            }
            incident.status = IncidentStatus.Canceled;
            context.SaveChanges();
            return new ApiResponse();
        }
        [HttpPost("{incidentId}/claim")]
        public ApiResponse ClaimIncident(int incidentId, [FromQuery] int shopId)
        {
            var user = userService.GetUserByToken(Token());
            var shop = (
                from s in context.Shops.AsQueryable()
                where s.Id == shopId && s.managingUser == user.Id
                select s
            ).SingleOrDefault();
            if(shop == null)
            {
                return new ApiError("A shop with that ID could not be found, or is managed by a different user");
            }
            var incident = (
                from i in context.Incidents.AsQueryable()
                where i.Id == incidentId && i.status == IncidentStatus.Created
                select i
            ).SingleOrDefault();
            if(incident == null)
            {
                return new ApiError("An incident with that ID could not be found, or has already been claimed");
            }
            incident.claimingShop = shop.Id;
            incident.status = IncidentStatus.Accepted;
            context.SaveChanges();
            return new ApiResponse();
        }
    }

    public class IncidentCreateRequest
    {
        public string carModel;
        public string description;
    }

    public class ShopInfo
    {
        public ShopInfo(Shop s)
        {
            name = s.name;
            email = s.email;
            phone = s.phone;
            address = s.address;
        }
        public string name;
        public string email;
        public string phone;
        public string address;
    }

    public class DenormalizedIncident
    {
        public int incidentId;
        public string carModel;
        public string description;
        public IncidentStatus status;
        public ShopInfo shop;
        public DateTime? reportedDate;
    }
    public class IncidentListResponse : ApiResponse
    {
        public IncidentListResponse() : base(ApiResult.Ok) { }
        public List<DenormalizedIncident> incidents;
    }
}
