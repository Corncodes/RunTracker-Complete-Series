using System;
namespace RunTrackerAPI;

public class Run 
{
    public int Id { get; set; }
    public decimal DistanceMiles { get; set; }
    public string Pace { get; set; } = string.Empty;
    public DateTime RunDate { get; set; }
}