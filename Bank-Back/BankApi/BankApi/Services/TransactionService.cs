using BankApi.Dtos;
using BankApi.Models;
using BankApi.Request;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BankApi.Services
{
    public class TransactionService
    {

        private BankDbContext context;
        private readonly IConfiguration configuration;
        public TransactionService(BankDbContext context)
        {
            this.context = context;
        }


        public async Task<int> sendMoney(Guid senderAccountId,Guid receiverAccountId,decimal amount) 
        {

            var dbConnection = context.Database.GetDbConnection();
            string query = @"
            DECLARE @OutResult INT;
            EXEC SenMoneyToSomeone @SenderId, @ReceiverId, @Amount, @ResultCode = @OutResult OUTPUT;
            SELECT @OutResult;";
            int resultCode = await dbConnection.QueryFirstOrDefaultAsync<int>(query, new
            {
                SenderId = senderAccountId,
                ReceiverId = receiverAccountId,
                Amount = amount
            });

            return resultCode;

        }


        public async Task<IEnumerable<UserTransactionInformationDto>> getTransactionAllInformation() 
        {

            
            var allTransactoins = await context.transactionHistory.ToListAsync();
            var result = allTransactoins.Select(t => new UserTransactionInformationDto
            {
                senderId = t.senderId,
                receiverId = t.receiverId,
                amount = t.amount,
                TransactionDate = t.transactionDate
            });

            return result;
        }


        public async Task<IEnumerable<UserBankAccountNumbersDto>> getAllUserBankAccountNumbers() 
        {

            var allBankAccounts = await context.BankAccountMod.ToListAsync();
            var response = allBankAccounts.Select(t => new UserBankAccountNumbersDto
            {
                firstName = t.firstname,
                lastName = t.lastname,
                balance = t.Balance,
                bankAccountNumber = t.bankAccountNumber

            });

            return response;
        }


        public async Task RegisterBankAccount(BankAccountRegistratoinDto bankAccountRegistrationDto)
        {
 
         BankAccountModel ba = new BankAccountModel();
            ba.UserId = Guid.NewGuid();
            ba.firstname = bankAccountRegistrationDto.firstname;
            ba.lastname = bankAccountRegistrationDto.lastname;
            ba.Balance = bankAccountRegistrationDto.balance;
            ba.bankAccountNumber = Guid.NewGuid();
            await context.AddAsync(ba);
            await context.SaveChangesAsync();
           
        }



    }
}
