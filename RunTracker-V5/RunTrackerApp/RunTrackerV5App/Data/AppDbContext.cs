using Microsoft.EntityFrameworkCore;
using RunTrackerV5App.Models;

namespace RunTrackerV5App.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Run> Runs => Set<Run>();
    }
}