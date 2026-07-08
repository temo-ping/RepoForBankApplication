using Microsoft.EntityFrameworkCore;
using System;

namespace BankApi.Models
{
    public class BankDbContext : DbContext
    {

        public BankDbContext(DbContextOptions<BankDbContext> option) : base(option)
        {
            
        }



        public DbSet<BankAccountModel> BankAccountMod { get; set; }
        public DbSet<TransactionsHistoryModel> transactionHistory { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             
            //BankAccountModel
            modelBuilder.Entity<BankAccountModel>().HasIndex(o => o.bankAccountNumber);


           


        }


    }
}
