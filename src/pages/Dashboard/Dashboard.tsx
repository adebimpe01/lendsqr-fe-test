import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import StatsCard from '../../components/StatsCard/StatsCard';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        withLoans: 0,
        withSavings: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:3001/users');
                const users = await response.json();
                setStats({
                    total: users.length,
                    active: users.filter((u: any) => u.status === 'active').length,
                    withLoans: Math.floor(users.length * 0.6),
                    withSavings: Math.floor(users.length * 0.8),
                });
            } catch (err) {
                console.error('Failed to fetch stats');
            }
        };
        fetchStats();
    }, []);

    const statsData = [
        {
            label: 'Users',
            value: stats.total.toLocaleString(),
            color: '#DF18FF',
            bg: '#DF18FF1A',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#DF18FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" stroke="#DF18FF" strokeWidth="2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#DF18FF" strokeWidth="2" strokeLinecap="round" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#DF18FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: 'Active Users',
            value: stats.active.toLocaleString(),
            color: '#5718FF',
            bg: '#5718FF1A',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#5718FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" stroke="#5718FF" strokeWidth="2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#5718FF" strokeWidth="2" strokeLinecap="round" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#5718FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: 'Users with Loans',
            value: stats.withLoans.toLocaleString(),
            color: '#F55F44',
            bg: '#F55F441A',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#F55F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="14 2 14 8 20 8" stroke="#F55F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="18" x2="12" y2="12" stroke="#F55F44" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="15" x2="15" y2="15" stroke="#F55F44" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: 'Users with Savings',
            value: stats.withSavings.toLocaleString(),
            color: '#FF3670',
            bg: '#FF36701A',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#FF3670" strokeWidth="2" />
                    <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" stroke="#FF3670" strokeWidth="2" />
                    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#FF3670" strokeWidth="2" />
                </svg>
            ),
        },
    ];

    return (
        <Layout onOrgChange={(org) => console.log('Org changed:', org)}>
            <div className="dashboard">
                <h1 className="dashboard__title">Users</h1>
                <div className="dashboard__stats">
                    {statsData.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;