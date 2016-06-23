using System;
using System.ComponentModel.DataAnnotations;

namespace IndexingChallenge.Models
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }
        
        public int Count { get; set; }

        [Required]
        public string Username { get; set; }

        [Display(Name = "Group")]
        public int GroupId { get; set; }

        public virtual Group Group { get; set; }
    }
}
