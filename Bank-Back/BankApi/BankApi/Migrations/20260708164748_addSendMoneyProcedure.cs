using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankApi.Migrations
{
    /// <inheritdoc />
    public partial class addSendMoneyProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"create procedure SenMoneyToSomeone
@SenderId uniqueidentifier,
@ReceiverId uniqueidentifier,
@Amount DECIMAL(18, 2),
@ResultCode INT OUTPUT -- აქედან დავაბრუნებთ სტატუსს
AS
BEGIN
    SET NOCOUNT ON; --arvici
    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. შემოწმება: არსებობს თუ არა ორივე ანგარიში და აქვს თუ არა გამგზავნს საკმარისი თანხა
        DECLARE @SenderBalance DECIMAL(18, 2);
        SELECT @SenderBalance = Balance FROM BankAccountMod WHERE bankAccountNumber = @SenderId;

        IF @SenderBalance IS NULL OR @SenderBalance < @Amount
        BEGIN
            SET @ResultCode = 2; -- არასაკმარისი ბალანსი ან ანგარიში არ არსებობს
            ROLLBACK TRANSACTION;
            RETURN;
        END

		Else IF @Amount < 0 or @Amount = 0
        BEGIN
            SET @ResultCode = 4; -- არასაკმარისი ბალანსი ან ანგარიში არ არსებობს
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- 2. გამგზავნს დააკლდეს
        UPDATE BankAccountMod 
        SET Balance = Balance - @Amount 
        WHERE bankAccountNumber = @SenderId;

        -- 3. მიმღებს დაემატოს
        UPDATE BankAccountMod 
        SET Balance = Balance + @Amount 
        WHERE bankAccountNumber = @ReceiverId;

        -- 4. ჩაიწეროს ტრანზაქციების ისტორიაში
        INSERT INTO transactionHistory (Id,senderId, receiverId, amount, transactionDate)
        VALUES (NEWID(),@SenderId, @ReceiverId, @Amount, GETDATE());

        SET @ResultCode = 1; -- წარმატება!
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SET @ResultCode = 3; -- სისტემური შეცდომა
    END CATCH
END
    ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
