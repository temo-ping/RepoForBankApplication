using System.Runtime.ExceptionServices;

namespace BankApi.Dtos
{
    public class UserBankAccountNumbersDto
    {
        public string firstName { get; set; }
        public string lastName { get; set; }

        public decimal balance { get; set; }
        public Guid bankAccountNumber { get; set; }
    }
}
