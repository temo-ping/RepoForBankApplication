import React, { useState, useEffect } from 'react';
import { getAllBankAccountNumbers, getAllTransactions, sendMoneyToSomeone, registerBankAccount } from '../Api/BankApi';
import AccountList from './AccountList';
import TransferForm from './TransferForm';
import HistoryList from './HistoryList';
import RegisterForm from './RegisterForm';
import NotificationWindow from './NotificationWindow';

export default function App() {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    
    
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'success',
        message: ''
    });

    const refreshData = async () => {
        try {
            const accs = await getAllBankAccountNumbers();
            const trans = await getAllTransactions();
            setAccounts(Array.isArray(accs) ? accs : []);
            setTransactions(Array.isArray(trans) ? trans : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { refreshData(); }, []);

   
    const handleTransfer = async (senderId, receiverId, amount) => {
        
    
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    
    const isSenderGuid = guidRegex.test(senderId);
    const isReceiverGuid = guidRegex.test(receiverId);

    
    if (!isSenderGuid || !isReceiverGuid) {
        setModalConfig({
            isOpen: true,
            type: 'error',
            message: "ანგარიშის ნომრის ფორმატი არასწორია!" 
        });
        return; 
    }
            const result = await sendMoneyToSomeone(senderId, receiverId, amount);
            
           if (result.success) {
        setModalConfig({
            isOpen: true,
            type: 'success',
            message: result.message
        });
        await refreshData();
        } else {
        
        setModalConfig({
            isOpen: true,
            type: 'error',
            message: result.message 
        });
        }
    };

    
    const handleRegister = async (dto) => {
         
    const result = await registerBankAccount(dto);

    
    if (result.success) {
        setModalConfig({
            isOpen: true,
            type: 'success',
            message: result.message
        });
        await refreshData();
    } else {
        
        setModalConfig({
            isOpen: true,
            type: 'error',
            message: result.message 
        });
    }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Bank Dashboard</h1>
                <button onClick={refreshData} className="refresh-btn">განახლება 🔄</button>
            </div>
            
            <div className="grid-layout">
                <AccountList accounts={accounts} />
                <RegisterForm onRegisterSuccess={handleRegister} />
                <TransferForm onTransferSuccess={handleTransfer} />
                
                <div className="full-width-column">
                    <HistoryList transactions={transactions} />
                </div>
            </div>

            {}
            <NotificationWindow 
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                message={modalConfig.message}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            />
        </div>
    );
}