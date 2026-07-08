import React, { useState } from 'react';

export default function TransferForm({ onTransferSuccess }) {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onTransferSuccess(sender, receiver, amount);
            setSender(''); setReceiver(''); setAmount('');
        } catch (error) {
            alert(error.message);
        } finally { setLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} className="bank-card">
            <h3 className="card-title">სწრაფი გადარიცხვა</h3>
            <div className="form-group">
                <label className="form-label">გამგზავნის ანგარიში (GUID)</label>
                <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} className="form-input font-mono" required />
            </div>
            <div className="form-group">
                <label className="form-label">მიმღების ანგარიში (GUID)</label>
                <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} className="form-input font-mono" required />
            </div>
            <div className="form-group">
                <label className="form-label">თანხა (GEL)</label>
                <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-input" required />
            </div>
            <button type="submit" disabled={loading} className="submit-btn btn-primary">
                {loading ? 'იგზავნება...' : 'თანხის გაგზავნა ➡️'}
            </button>
        </form>
    );
}