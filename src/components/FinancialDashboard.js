// src/components/FinancialDashboard.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const FinancialDashboard = () => {
  const sampleData = [
    { month: 'Jan', spending: 2400, savings: 800 },
    { month: 'Feb', spending: 2200, savings: 1000 },
    { month: 'Mar', spending: 2600, savings: 600 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Financial Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        <div style={{ padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
          <h3>💰 Total Savings</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$12,450</p>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h3>📈 Monthly Budget</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$3,500</p>
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
          <h3>🎯 Goals Progress</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>75%</p>
        </div>
        
      </div>
      
      <div style={{ height: '300px', backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
        <h3>Monthly Spending vs Savings</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="spending" fill="#ff6b6b" name="Spending" />
            <Bar dataKey="savings" fill="#4ecdc4" name="Savings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialDashboard;
