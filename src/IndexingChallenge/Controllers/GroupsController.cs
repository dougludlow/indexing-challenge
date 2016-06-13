using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IndexingChallenge.Models;
using Microsoft.AspNetCore.Mvc;

namespace IndexingChallenge.Controllers
{
    [Route("api/[controller]")]
    public class GroupsController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var groups = new List<Group>
            {
                new Group
                {
                    Id = 1,
                    Name = "YM"
                },
                new Group
                {
                    Id = 2,
                    Name = "YW"
                },
            };

            return Ok(groups);
        }
    }
}
