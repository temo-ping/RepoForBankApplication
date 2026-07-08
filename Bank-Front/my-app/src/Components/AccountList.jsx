import React from 'react';

export default function AccountList({ accounts }) {
    return (
        <div className="bank-card">
            <h3 className="card-title">აქტიური ანგარიშები</h3>
            <div className="account-list">
                {accounts.map((acc) => (
                    <div key={acc.bankAccountNumber} className="account-item">
                        <div>
                            <p className="account-name">{acc.firstName} {acc.lastName}</p>
                            <span className="account-guid">{acc.bankAccountNumber}</span>
                        </div>
                        <div className="account-balance-box">
                            <span className="account-balance">{acc.balance.toFixed(2)}</span>
                            <div className="currency">GEL</div>
                        </div>
                    </div>
                ))}
                {accounts.length === 0 && <p style={{color: 'gray', textAlign: 'center'}}>ანგარიშები არ არის.</p>}
            </div>
        </div>
    );
}