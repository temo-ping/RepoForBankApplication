using System.ComponentModel.DataAnnotations;
using System.Runtime.ExceptionServices;

namespace BankApi.Models
{
    public class BankAccountModel
    {
        [Key]
        public Guid UserId { get; set; } = Guid.NewGuid();
        public string firstname {  get; set; }
        public string lastname { get; set; }
        public decimal Balance { get; set; }
        public Guid bankAccountNumber { get; set; }


    }
}
