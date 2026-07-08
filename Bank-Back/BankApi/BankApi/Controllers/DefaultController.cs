using BankApi.Dtos;
using BankApi.Models;
using BankApi.Request;
using BankApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefaultController : ControllerBase
    {

        private TransactionService service;
        public DefaultController(TransactionService service)
        {
            this.service = service;
        }


        [HttpPost("SendMoney")]
        public async Task<IActionResult> SendMoneyToSomeOne(Guid senderAccountId, Guid receiverAccountId, decimal amount) 
        {
            int ResultCode = await service.sendMoney(senderAccountId, receiverAccountId, amount);

            

            switch (ResultCode) 
            {
                
                case 1: return Ok("გადარიცხვა შესრულებულია");
                case 2: return BadRequest("თქვენ არ გაქვთ საკმარისი ბალანსი ანგარიშზე ან ანგარიშის ნომერი არასწორია");
                case 3: return StatusCode(500, new { message = "დაფიქსირდა სისტემური შეცდომა ბაზაში." });
                case 4: return BadRequest("გთხოვთ შეიყვანოთ რიცხვი სწორად: დადებითი რიცხვი ან 0 -ზე მეტი");
               
                default: return BadRequest("უცნობი შეცდომა");
            }

        }

        [HttpGet("get-all-transactions")]
        public async Task<IEnumerable<UserTransactionInformationDto>> getAllTransactions()
        {
            return await service.getTransactionAllInformation();
        }


        [HttpGet("get-all-Bankaccountnumber")]
        public async Task<IEnumerable<UserBankAccountNumbersDto>> getAllBankAccountNumbers()
        {
            return await service.getAllUserBankAccountNumbers();
        }

        [HttpPost("register-bankaccount")]
        public async Task<IActionResult> registerBankAccount(BankAccountRegistratoinDto dto)
        {

            if (dto.balance < 0 || dto.balance == 0)
            {

                return BadRequest("მიუთითეთ დადებითი რიცხვი ან ნულზე მეტი");

            }


            try
            { 
                // თუ გამოგზავნილი მონაცემები ცარიელია
                if (dto == null) return BadRequest(new { message = "მონაცემები ცარიელია" });

                await service.RegisterBankAccount(dto);

                
                return Ok("ანგარიში შეიქმნა წარმატებით");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "რეგისტრაციისას დაფიქსირდა შეცდომა: "});
            }
        }


    }
}
