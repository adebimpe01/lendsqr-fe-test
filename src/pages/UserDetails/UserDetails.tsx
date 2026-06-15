import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { User } from '../../types';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);

                // Check localStorage first
                const cached = localStorage.getItem(`user_${id}`);
                if (cached) {
                    setUser(JSON.parse(cached));
                    setLoading(false);
                    return;
                }

                // Fetch from API
                const API_URL = process.env.REACT_APP_API_URL;

                if (!API_URL) {
                    throw new Error("API_URL is missing in environment variables");
                }
                const response = await fetch(`${API_URL}/users/${id}`);
                if (!response.ok) throw new Error('User not found');
                const data = await response.json();
                setUser(data);

                // Save to localStorage
                localStorage.setItem(`user_${id}`, JSON.stringify(data));
                setUser(data);
            } catch (err) {
                setError('Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="user-details__loading">
                    <div className="spinner"></div>
                    <p>Loading user details...</p>
                </div>
            </Layout>
        );
    }

    if (error || !user) {
        return (
            <Layout>
                <div className="user-details__error">
                    <p>{error || 'User not found'}</p>
                    <button onClick={() => navigate('/dashboard/users')}>
                        Back to Users
                    </button>
                </div>
            </Layout>
        );
    }

    const tabs = [
        'General Details',
        'Documents',
        'Bank Details',
        'Loans',
        'Savings',
        'App and System',
    ];

    return (
        <Layout>
            <div className="user-details">
                {/* Back button */}
                <button
                    className="user-details__back"
                    onClick={() => navigate('/dashboard/users')}
                >
                    ← Back to Users
                </button>

                <div className="user-details__header">
                    <h1>User Details</h1>
                    <div className="user-details__actions">
                        <button className="btn btn--danger">Blacklist User</button>
                        <button className="btn btn--outline">Activate User</button>
                    </div>
                </div>

                {/* User Profile Card */}
                <div className="user-details__profile-card">
                    <div className="user-details__profile-info">
                        <div className="user-details__avatar">
                            <img
                                src={user.avatar || `https://i.pravatar.cc/150?img=${user.id}`}
                                alt={user.username}
                            />
                        </div>
                        <div>
                            <h2>{user.username}</h2>
                            <p>{user.accountNumber}</p>
                        </div>
                    </div>

                    <div className="user-details__divider" />

                    <div className="user-details__tier">
                        <p>User's Tier</p>
                        <div className="user-details__stars">
                            {[1, 2, 3].map((star) => (
                                <span
                                    key={star}
                                    className={star <= user.tier ? 'star star--filled' : 'star'}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="user-details__divider" />

                    <div className="user-details__balance">
                        <h3>₦{Number(user.balance).toLocaleString()}</h3>
                        <p>{user.accountNumber}/{user.bank}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="user-details__tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`user-details__tab ${activeTab === tab.toLowerCase().replace(' ', '-') ? 'user-details__tab--active' : ''}`}
                            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="user-details__content">
                    {/* General Details */}
                    <div className="user-details__section">
                        <h3>Personal Information</h3>
                        <div className="user-details__grid">
                            <div className="user-details__field">
                                <p className="label">Full Name</p>
                                <p className="value">{user.username}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Phone Number</p>
                                <p className="value">{user.phone}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Email Address</p>
                                <p className="value">{user.email}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">BVN</p>
                                <p className="value">{user.bvn}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Gender</p>
                                <p className="value">Male</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Marital Status</p>
                                <p className="value">Single</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Children</p>
                                <p className="value">None</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Type of Residence</p>
                                <p className="value">Parent's Apartment</p>
                            </div>
                        </div>
                    </div>

                    <div className="user-details__divider user-details__divider--full" />

                    <div className="user-details__section">
                        <h3>Education and Employment</h3>
                        <div className="user-details__grid">
                            <div className="user-details__field">
                                <p className="label">Level of Education</p>
                                <p className="value">B.Sc</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Employment Status</p>
                                <p className="value">Employed</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Sector of Employment</p>
                                <p className="value">FinTech</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Duration of Employment</p>
                                <p className="value">2 years</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Office Email</p>
                                <p className="value">{user.email}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Monthly Income</p>
                                <p className="value">₦{Number(user.balance).toLocaleString()}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Loan Repayment</p>
                                <p className="value">40,000</p>
                            </div>
                        </div>
                    </div>

                    <div className="user-details__divider user-details__divider--full" />

                    <div className="user-details__section">
                        <h3>Socials</h3>
                        <div className="user-details__grid">
                            <div className="user-details__field">
                                <p className="label">Twitter</p>
                                <p className="value">@{user.username.replace(' ', '_').toLowerCase()}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Facebook</p>
                                <p className="value">{user.username}</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Instagram</p>
                                <p className="value">@{user.username.replace(' ', '_').toLowerCase()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="user-details__divider user-details__divider--full" />

                    <div className="user-details__section">
                        <h3>Guarantor</h3>
                        <div className="user-details__grid">
                            <div className="user-details__field">
                                <p className="label">Full Name</p>
                                <p className="value">Debby Morgan</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Phone Number</p>
                                <p className="value">07060780922</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Email Address</p>
                                <p className="value">debby@gmail.com</p>
                            </div>
                            <div className="user-details__field">
                                <p className="label">Relationship</p>
                                <p className="value">Sister</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDetails;