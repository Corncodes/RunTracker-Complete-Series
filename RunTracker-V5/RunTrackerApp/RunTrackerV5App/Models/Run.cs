namespace RunTrackerV5App.Models
{
    public class Run
    {
        public int Id { get; set; } // .NET automatically makes this the Primary Key
        
        public decimal DistanceMiles { get; set; } // No "NaN" or "undefined" allowed!
        
        public string Pace { get; set; } = string.Empty;
        
        public DateTime RunDate { get; set; } = DateTime.Now;
    }
}