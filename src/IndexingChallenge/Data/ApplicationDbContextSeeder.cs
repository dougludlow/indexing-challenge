
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IndexingChallenge.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace IndexingChallenge.Data
{
    public class ApplicationDbContextSeeder
    {
        private ApplicationDbContext _context;

        public ApplicationDbContextSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            if (!_context.Settings.Any())
            {
                _context.Settings.Add(new Setting
                {
                    Goal = 3000,
                    Unit = "Batch",
                    UnitPlural = "Batches"
                });
            }

            var groups = new List<Group>
            {
                new Group
                {
                    Name = "Young Women",
                    Color = ""
                },
                new Group
                {
                    Name = "Young Men",
                    Color = ""
                },
            };

            foreach (var @group in groups)
            {
                if (!_context.Groups.Any(g => g.Name == @group.Name))
                {
                    _context.Groups.Add(@group);
                }
            }

            var roles = new string[] { "Administrator" };
            var roleStore = new RoleStore<IdentityRole>(_context);

            foreach (string role in roles)
            {
                if (!_context.Roles.Any(r => r.Name == role))
                {
                    await roleStore.CreateAsync(new IdentityRole(role));
                }
            }

            var user = new ApplicationUser
            {
                Email = "doug.ludlow@gmail.com",
                NormalizedEmail = "DOUG.LUDLOW@GMAIL.COM",
                UserName = "doug.ludlow@gmail.com",
                NormalizedUserName = "DOUG.LUDLOW@GMAIL.COM",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            if (!_context.Users.Any(u => u.UserName == user.UserName))
            {
                var password = new PasswordHasher<ApplicationUser>();
                var hashed = password.HashPassword(user, "pa$$w0rd");
                user.PasswordHash = hashed;

                var userStore = new UserStore<ApplicationUser>(_context);
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, roles[0]);
            }

            await _context.SaveChangesAsync();
        }
    }
}