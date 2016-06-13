using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IndexingChallenge.Models;
using Microsoft.AspNetCore.Mvc;

namespace IndexingChallenge.Controllers
{
    [Route("api/[controller]")]
    public class EntriesController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var entries = new List<Entry>
            {
                new Entry
                {
                    Date = DateTime.Now,
                    Count = 20,
                    Username = "dludlow",
                    GroupId = 1
                },
                new Entry
                {
                    Date = DateTime.Now.AddDays(-1),
                    Count = 35,
                    Username = "dludlow",
                    GroupId = 1
                },
                new Entry
                {
                    Date = DateTime.Now.AddDays(-3),
                    Count = 25,
                    Username = "dludlow",
                    GroupId = 2
                }
            };

            return Ok(entries);
        }
    }
}
