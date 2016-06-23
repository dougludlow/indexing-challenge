using System.ComponentModel.DataAnnotations;

namespace IndexingChallenge.Models
{
    public class Setting
    {
        public int Id { get; set; }
        public int Goal { get; set; }

        [Required]
        [StringLength(50)]
        public string Unit { get; set; }

        [Required]
        [StringLength(55)]
        public string UnitPlural { get; set; }
    }
}