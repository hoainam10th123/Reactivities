using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactivitiesApi.Application.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactivitiesApi.Controllers
{

    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        //[HttpPut]
        //public async Task<IActionResult> Edit(Edit.Command command)
        //{
        //    return HandleResult(await Mediator.Send(command));
        //}

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query{ Username = username, Predicate = predicate }));
        }
    }
}
