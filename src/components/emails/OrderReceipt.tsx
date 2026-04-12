import * as React from 'react';

interface OrderReceiptProps {
  customerName: string;
  orderId: string;
  amount: string;
  upiId: string;
}

export const OrderReceiptEmail: React.FC<OrderReceiptProps> = ({
  customerName,
  orderId,
  amount,
  upiId,
}) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#1d1d1f',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
  }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
      Order Reserved: Kubo Bot Batch 01
    </h1>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
      Hi {customerName},
    </p>
    
    <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '20px' }}>
      Your Kubo Bot pre-order has been registered! We've reserved your unit in **Batch 01**.
    </p>

    <div style={{
      backgroundColor: '#f5f5f7',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '32px',
    }}>
      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Order Summary
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontWeight: '500' }}>Product:</span>
        <span>Kubo Bot (Limited Edition)</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontWeight: '500' }}>Amount:</span>
        <span>₹{amount}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #d2d2d7', paddingTop: '12px', marginTop: '12px' }}>
        <span style={{ fontWeight: 'bold' }}>Order ID:</span>
        <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>{orderId}</span>
      </div>
    </div>

    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Next Step: Payment Verification</h3>
    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#1d1d1f', marginBottom: '8px' }}>
      To confirm your reservation, please transfer **₹{amount}** via UPI:
    </p>
    <div style={{
      backgroundColor: '#fffbeb',
      border: '1px solid #fde68a',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px'
    }}>
      {upiId}
    </div>
    
    <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#86868b' }}>
      Once paid, please upload your payment screenshot on the website or reply to this email with the attachment. We will verify your payment and update your status within 24 hours.
    </p>

    <hr style={{ border: 'none', borderTop: '1px solid #d2d2d7', margin: '40px 0' }} />
    
    <p style={{ fontSize: '12px', color: '#86868b', textAlign: 'center' }}>
      © {new Date().getFullYear()} Kubo Bot Infotech. All rights reserved.<br />
      This is an automated pre-order confirmation.
    </p>
  </div>
);
