namespace BankApi.Request
{
    public class UserTransactionInformationDto
    {

        public Guid senderId { get; set; }
        public Guid receiverId { get; set; }
        
        public decimal amount { get; set; }

        public DateTime TransactionDate { get; set; }

    }
}
