import React from 'react';

export default function NotificationWindow({ isOpen, onClose, type, message }) {
    if (!isOpen) return null;

    const isSuccess = type === 'success';

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="bank-card" style={{
                width: '100%', maxWidth: '400px', textAlign: 'center', 
                animation: 'slideUp 0.3s ease', padding: '30px'
            }}>
                {}
                <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: isSuccess ? '#e6f4ea' : '#fce8e6',
                    color: isSuccess ? '#10b981' : '#ef4444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '30px', margin: '0 auto 20px auto'
                }}>
                    {isSuccess ? '✓' : '✕'}
                </div>

                <h3 className="card-title" style={{ marginBottom: '10px' }}>
                    {isSuccess ? 'ოპერაცია წარმატებულია' : 'შეცდომა'}
                </h3>
                
                <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px', lineHeight: '1.5' }}>
                    {message}
                </p>

                <button 
                    onClick={onClose} 
                    className="submit-btn" 
                    style={{ backgroundColor: isSuccess ? '#10b981' : '#ef4444' }}
                >
                    დახურვა
                </button>
            </div>
        </div>
    );
}