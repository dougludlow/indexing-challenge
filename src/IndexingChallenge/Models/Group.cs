using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IndexingChallenge.Models
{
    public class Group
    {
        public Group() 
        {
            Entries = new HashSet<Entry>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(24)]
        public string Color { get; set; }

        public virtual ICollection<Entry> Entries { get; set; }
    }
}