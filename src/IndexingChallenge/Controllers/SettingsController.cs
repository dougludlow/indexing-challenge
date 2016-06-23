using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IndexingChallenge.Data;
using IndexingChallenge.Models;
using Microsoft.AspNetCore.Authorization;

namespace IndexingChallenge.Controllers
{
    [Authorize]
    public class SettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SettingsController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: settings
        public async Task<IActionResult> Index()
        {
            var setting = await _context.Settings.FirstOrDefaultAsync();
            if (setting == null)
            {
                return View();
            }
            return View(setting);
        }

        // GET: api/settings
        [AllowAnonymous]
        [Route("api/[controller]")]
        public async Task<IActionResult> Get()
        {
            var setting = await _context.Settings.FirstOrDefaultAsync();
            if (setting == null)
            {
                return Ok(new Setting());
            }
            return Ok(setting);
        }

        // POST: settings
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("Id,Goal,Unit,UnitPlural")] Setting setting)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (SettingExists(setting.Id))
                        _context.Update(setting);
                    else
                        _context.Add(setting);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SettingExists(setting.Id))
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
            return View(setting);
        }

        private bool SettingExists(int id)
        {
            return _context.Settings.Any(e => e.Id == id);
        }
    }
}
