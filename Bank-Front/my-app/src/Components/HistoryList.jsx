import React from 'react';

export default function HistoryList({ transactions }) {
    return (
        <div className="bank-card">
            <h3 className="card-title">ბოლო ტრანზაქციები</h3>
            <div className="table-responsive">
                <table className="bank-table">
                    <thead>
                        <tr>
                            <th>ტიპი</th>
                            <th>გამგზავნი</th>
                            <th>მიმღები</th>
                            <th style={{textAlign: 'right'}}>თანხა</th>
                            <th>თარიღი</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, index) => (
                            <tr key={index}>
                                <td>
                                    <span className="status-badge">
                                        <span className="status-dot"></span>გადარიცხვა
                                    </span>
                                </td>
                                <td className="guid-text">{t.senderId}</td>
                                <td className="guid-text">{t.receiverId}</td>
                                <td style={{textAlign: 'right'}} className="amount-text">-{t.amount.toFixed(2)} GEL</td>
                                <td style={{color: '#6b7280'}}>{new Date(t.transactionDate).toLocaleString('ka-GE')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}