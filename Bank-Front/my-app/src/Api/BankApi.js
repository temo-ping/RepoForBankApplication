const BASE_URL = 'http://localhost:5000'; 


export async function getAllBankAccountNumbers() {
    const response = await fetch(`${BASE_URL}/Default/get-all-BankAccountNumber`);
    if (!response.ok) throw new Error('ანგariaშების წამოღება ვერ მოხერხდა');
    return await response.json();
}


export async function getAllTransactions() {
    const response = await fetch(`${BASE_URL}/Default/get-all-transactions`);
    if (!response.ok) throw new Error('ტრანზაქციების წამოღება ვერ მოხერხდა');
    return await response.json();
}


export async function sendMoneyToSomeone(senderId, receiverId, amount) {
  try{
    const url = `${BASE_URL}/Default/SendMoney?senderAccountId=${senderId}&receiverAccountId=${receiverId}&amount=${amount}`;
    
    const response = await fetch(url, { method: 'POST' });
    
  
         if (response.ok) {
        return { success: true, message: await response.text() };
         }

         return { success: false, message: await response.text() };
  }catch (error) {
        
        return { success: false, message: "სერვერთან კავშირი ვერ დამყარდა" };
    }
}


export async function registerBankAccount(accountData) {
      try {
        const response = await fetch(`${BASE_URL}/Default/register-bankaccount`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        });
         
        
        if (response.ok) {
            return { success: true , message: await response.text()};
        }

       
        return { success: false, message: await response.text()};

    } catch (error) {
        
        return { success: false, message: "სერვერთან კავშირი ვერ დამყარდა" };
    }
}