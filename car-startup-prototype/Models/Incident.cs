using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarStartup.Models
{
    public enum IncidentStatus
    {
        Unknown = 0,
        Created,
        Canceled,
        Accepted,
        Finished
    }

    [Table("Incidents")]
    public class Incident
    {
        public int Id { get; set; }
        public int reportingUser { get; set; }
        public string carModel { get; set; }
        public string description { get; set; }
        public IncidentStatus status { get; set; }
        public int? claimingShop { get; set; }
        public DateTime? reportedDate { get; set; }
    }
}
