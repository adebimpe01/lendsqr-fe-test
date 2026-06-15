import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import './Users.scss';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/StatsCard/StatsCard';
import FilterModal from '../../components/FilterModal/FilterModal';
import ActionMenu from '../../components/ActionMenu/ActionMenu';
import { FiFilter } from 'react-icons/fi';

interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    dateJoined: string;
    status: 'active' | 'inactive' | 'pending' | 'blacklisted';
    orgName: string;
}

const ITEMS_PER_PAGE = 10;

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeAction, setActiveAction] = useState<string | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selectedOrg, setSelectedOrg] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        withLoans: 0,
        withSavings: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const API_URL = process.env.REACT_APP_API_URL;

                if (!API_URL) {
                    throw new Error("REACT_APP_API_URL is not defined in production");
                }

                const response = await fetch(`${API_URL}/users`);
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
                setStats({
                    total: data.length,
                    active: data.filter((u: User) => u.status === 'active').length,
                    withLoans: Math.floor(data.length * 0.6),
                    withSavings: Math.floor(data.length * 0.8),
                });
            } catch (err) {
                setError('Failed to load users. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const displayUsers = users.filter((user) => {
        const orgMatch = !selectedOrg || user.orgName === selectedOrg;
        const filterMatch = !isFiltered || filteredUsers.includes(user);
        return orgMatch && filterMatch;
    });

    const totalPages = Math.ceil(displayUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentUsers = displayUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleFilter = (filters: any) => {
        const filtered = users.filter((user) => {
            return (
                (!filters.orgName || user.orgName.toLowerCase().includes(filters.orgName.toLowerCase())) &&
                (!filters.username || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
                (!filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
                (!filters.phone || user.phone.includes(filters.phone)) &&
                (!filters.status || user.status === filters.status)
            );
        });
        setFilteredUsers(filtered);
        setIsFiltered(true);
        setActiveFilter(null);
        setCurrentPage(1);
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'active': return 'status--active';
            case 'inactive': return 'status--inactive';
            case 'pending': return 'status--pending';
            case 'blacklisted': return 'status--blacklisted';
            default: return '';
        }
    };

    const statsData = [
        {
            label: 'Users',
            value: stats.total.toLocaleString(),
            color: '#DF18FF',
            bg: '#DF18FF1A',
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#DF18FF" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="#DF18FF" strokeWidth="2" />
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#5718FF" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="#5718FF" strokeWidth="2" />
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#F55F44" strokeWidth="2" />
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
                    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#FF3670" strokeWidth="2" />
                </svg>
            ),
        },
    ];

    if (loading) {
        return (
            <Layout>
                <div className="users__loading">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="users__error">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout onOrgChange={(org) => {
            setSelectedOrg(org);
            setCurrentPage(1);
        }}>
            <div className="users">
                <h1 className="users__title">Users</h1>

                <div className="users__stats">
                    {statsData.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <div className="users__table-wrapper">
                    <table className="users__table">
                        <thead>
                            <tr>
                                {['Organization', 'Username', 'Email', 'Phone Number', 'Date Joined', 'Status'].map((header) => (
                                    <th key={header}>
                                        <div className="th-content">
                                            <span>{header}</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveFilter(activeFilter === header ? null : header);
                                                }}
                                            >
                                                <FiFilter size={12} />
                                            </button>
                                            {activeFilter === header && (
                                                <FilterModal
                                                    onFilter={handleFilter}
                                                    onClose={() => setActiveFilter(null)}
                                                />
                                            )}
                                        </div>
                                    </th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="users__empty">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => navigate(`/dashboard/users/${user.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{user.orgName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{new Date(user.dateJoined).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</td>
                                        <td>
                                            <span className={`status ${getStatusClass(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td style={{ position: 'relative' }}>
                                            <button
                                                className="users__action"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveAction(activeAction === user.id ? null : user.id);
                                                }}
                                            >
                                                ⋮
                                            </button>
                                            {activeAction === user.id && (
                                                <ActionMenu
                                                    userId={user.id}
                                                    onClose={() => setActiveAction(null)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="users__pagination">
                    <div className="users__pagination-info">
                        Showing
                        <select
                            value={ITEMS_PER_PAGE}
                            onChange={() => { }}
                            className="users__page-size"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        out of {displayUsers.length}
                    </div>

                    <div className="users__pagination-controls">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="users__page-btn"
                        >
                            ‹
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`users__page-btn ${currentPage === page ? 'users__page-btn--active' : ''}`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        {totalPages > 5 && <span>...</span>}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="users__page-btn"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;