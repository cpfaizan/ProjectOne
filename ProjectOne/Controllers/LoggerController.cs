using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ProjectOne.Models;

namespace ProjectOne.Controllers
{
    public class LoggerController : Controller
    {
        private readonly CRContext _context;

        public LoggerController(CRContext context)
        {
            _context = context;
        }

        // GET: UserDetail/Login
        
        public async Task<IActionResult> Login(string Mail, string Pass)
        {

            var one = (from a in _context.Loggers
                       where a.Mail == Mail && a.Pass == Pass
                       select a).ToList();

            if (one.Count() == 1)
            {
                /*return RedirectToAction();*/

                return RedirectToAction("Index", "Home");
            }
            else
            {
                return RedirectToAction("Error");
            }

        }
        // GET: Logger/Error
        public IActionResult Error()
        {
            return View();
        }


        // GET: Logger
        public async Task<IActionResult> Index()
        {
              return _context.Loggers != null ? 
                          View(await _context.Loggers.ToListAsync()) :
                          Problem("Entity set 'CRContext.Loggers'  is null.");
        }

        // GET: Logger/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Loggers == null)
            {
                return NotFound();
            }

            var logger = await _context.Loggers
                .FirstOrDefaultAsync(m => m.Id == id);
            if (logger == null)
            {
                return NotFound();
            }

            return View(logger);
        }

        // GET: Logger/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Logger/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Mail,Pass")] Logger logger)
        {
            if (ModelState.IsValid)
            {
                _context.Add(logger);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(logger);
        }

        // GET: Logger/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Loggers == null)
            {
                return NotFound();
            }

            var logger = await _context.Loggers.FindAsync(id);
            if (logger == null)
            {
                return NotFound();
            }
            return View(logger);
        }

        // POST: Logger/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Mail,Pass")] Logger logger)
        {
            if (id != logger.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(logger);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LoggerExists(logger.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(logger);
        }

        // GET: Logger/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Loggers == null)
            {
                return NotFound();
            }

            var logger = await _context.Loggers
                .FirstOrDefaultAsync(m => m.Id == id);
            if (logger == null)
            {
                return NotFound();
            }

            return View(logger);
        }

        // POST: Logger/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Loggers == null)
            {
                return Problem("Entity set 'CRContext.Loggers'  is null.");
            }
            var logger = await _context.Loggers.FindAsync(id);
            if (logger != null)
            {
                _context.Loggers.Remove(logger);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LoggerExists(int id)
        {
          return (_context.Loggers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
