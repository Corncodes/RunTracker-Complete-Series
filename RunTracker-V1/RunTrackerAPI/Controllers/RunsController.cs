using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using RunTrackerAPI;

namespace RunTrackerAPI.Controllers;

[ApiController]
[Route("api/[controller]")] // This makes the URL: localhost:5000/api/runs
public class RunsController : ControllerBase
{
    private readonly AppDbContext _context;

    public RunsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Run>>> GetRuns()
    {
        // This is the C# version of "SELECT * FROM Runs"
        return await _context.Runs.ToListAsync();
    }
}