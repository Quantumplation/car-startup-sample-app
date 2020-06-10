using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarStartup.Models
{
    [Table("Sessions")]
    public class Session
    {
        public int Id { get; set; }
        public int user { get; set; }
        public string token { get; set; }
        public DateTime expiration { get; set; }
    }
}
