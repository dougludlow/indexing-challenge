using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using IndexingChallenge.Data;
using IndexingChallenge.Models;
using Microsoft.AspNetCore.Authorization;

namespace IndexingChallenge.Controllers
{
    [Authorize]
    public class EntriesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EntriesController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: entries
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.Entries.Include(e => e.Group);
            return View(await applicationDbContext.ToListAsync());
        }

        // GET: api/entries
        [AllowAnonymous]
        [Route("api/[controller]")]
        public async Task<IActionResult> Get() 
        {
            return Ok(await _context.Entries.ToListAsync());
        }

        // GET: entries/create
        public IActionResult Create()
        {
            ViewData["GroupId"] = new SelectList(_context.Groups, "Id", "Name");
            return View();
        }

        // POST: entries/create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Count,GroupId")] Entry entry)
        {
            entry.Date = DateTime.UtcNow;
            entry.Username = User.Identity.Name;
            
            ModelState.Clear();
            TryValidateModel(entry);

            if (ModelState.IsValid)
            {
                _context.Add(entry);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewData["GroupId"] = new SelectList(_context.Groups, "Id", "Name", entry.GroupId);
            return View(entry);
        }

        // GET: entries/edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var entry = await _context.Entries.SingleOrDefaultAsync(m => m.Id == id);
            if (entry == null)
            {
                return NotFound();
            }
            ViewData["GroupId"] = new SelectList(_context.Groups, "Id", "Name", entry.GroupId);
            return View(entry);
        }

        // POST: entries/edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Count,GroupId")] Entry entry)
        {
            if (id != entry.Id)
            {
                return NotFound();
            }

            entry.Date = DateTime.UtcNow;
            entry.Username = User.Identity.Name;

            ModelState.Clear();
            TryValidateModel(entry);

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(entry);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EntryExists(entry.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            ViewData["GroupId"] = new SelectList(_context.Groups, "Id", "Name", entry.GroupId);
            return View(entry);
        }

        // GET: entries/delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var entry = await _context.Entries.SingleOrDefaultAsync(m => m.Id == id);
            if (entry == null)
            {
                return NotFound();
            }

            return View(entry);
        }

        // POST: entries/delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var entry = await _context.Entries.SingleOrDefaultAsync(m => m.Id == id);
            _context.Entries.Remove(entry);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool EntryExists(int id)
        {
            return _context.Entries.Any(e => e.Id == id);
        }
    }
}
