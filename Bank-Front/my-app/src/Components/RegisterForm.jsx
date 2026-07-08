import React, { useState } from 'react';

export default function RegisterForm({ onRegisterSuccess }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [balance, setBalance] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       
        try {
            await onRegisterSuccess({ firstName, lastName, balance: parseFloat(balance) });
            setFirstName(''); setLastName(''); setBalance('');
        } catch (error) {
            alert(error.message);
        } finally { setLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} className="bank-card">
            <h3 className="card-title">ახალი კლიენტის რეგისტრაცია</h3>
            <div className="form-group">
                <label className="form-label">სახელი</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
                <label className="form-label">გვარი</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-input" required />
            </div>
            <div className="form-group">
                <label className="form-label">საწყისი ბალანსი (GEL)</label>
                <input type="number" step="0.01" value={balance} onChange={(e) => setBalance(e.target.value)} className="form-input" required />
            </div>
            <button type="submit" disabled={loading} className="submit-btn btn-secondary">
                {loading ? 'მუშავდება...' : 'ანგარიშის გახსნა +'}
            </button>
        </form>
    );
}