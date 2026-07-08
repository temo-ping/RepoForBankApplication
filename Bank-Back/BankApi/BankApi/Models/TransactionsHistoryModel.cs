using Microsoft.AspNetCore.Identity.UI.Services;
using System.ComponentModel.DataAnnotations;

namespace BankApi.Models
{
    public class TransactionsHistoryModel
    {

        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid senderId { get; set; }
        public Guid receiverId { get; set; }
        public decimal amount { get; set; }
        public DateTime transactionDate { get; set; } = DateTime.UtcNow;


    }
}
