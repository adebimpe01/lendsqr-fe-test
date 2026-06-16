import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FiHome, FiUsers, FiUserCheck, FiDollarSign, FiPieChart,
    FiSettings, FiSliders, FiChevronDown, FiLogOut, FiShield,
    FiStar, FiList, FiBarChart2, FiFileText, FiCreditCard,
    FiRepeat, FiTool, FiUser, FiActivity,
} from 'react-icons/fi';
import './Sidebar.scss';

interface SidebarProps {
    onOrgChange?: (org: string) => void;
    isOpen?: boolean;
    onClose?: () => void;
}

interface SidebarItem {
    label: string;
    icon: React.ReactNode;
    path: string;
}

interface SidebarGroup {
    title?: string;
    items: SidebarItem[];
}

interface SidebarProps {
    onOrgChange?: (org: string) => void;
}

const sidebarGroups: SidebarGroup[] = [
    {
        items: [
            { label: 'Dashboard', path: '/dashboard', icon: <FiHome size={16} /> },
        ],
    },
    {
        title: 'CUSTOMERS',
        items: [
            { label: 'Users', path: '/dashboard/users', icon: <FiUsers size={16} /> },
            { label: 'Guarantors', path: '/dashboard/guarantors', icon: <FiUserCheck size={16} /> },
            { label: 'Loans', path: '/dashboard/loans', icon: <FiDollarSign size={16} /> },
            { label: 'Decision Models', path: '/dashboard/decision-models', icon: <FiSliders size={16} /> },
            { label: 'Savings', path: '/dashboard/savings', icon: <FiPieChart size={16} /> },
            { label: 'Loan Requests', path: '/dashboard/loan-requests', icon: <FiFileText size={16} /> },
            { label: 'Whitelist', path: '/dashboard/whitelist', icon: <FiShield size={16} /> },
            { label: 'Karma', path: '/dashboard/karma', icon: <FiStar size={16} /> },
        ],
    },
    {
        title: 'BUSINESSES',
        items: [
            { label: 'Organization', path: '/dashboard/organization', icon: <FiHome size={16} /> },
            { label: 'Loan Products', path: '/dashboard/loan-products', icon: <FiList size={16} /> },
            { label: 'Savings Products', path: '/dashboard/savings-products', icon: <FiBarChart2 size={16} /> },
            { label: 'Fees and Charges', path: '/dashboard/fees', icon: <FiDollarSign size={16} /> },
            { label: 'Transactions', path: '/dashboard/transactions', icon: <FiRepeat size={16} /> },
            { label: 'Services', path: '/dashboard/services', icon: <FiTool size={16} /> },
            { label: 'Service Account', path: '/dashboard/service-account', icon: <FiUser size={16} /> },
            { label: 'Settlements', path: '/dashboard/settlements', icon: <FiCreditCard size={16} /> },
            { label: 'Reports', path: '/dashboard/reports', icon: <FiBarChart2 size={16} /> },
        ],
    },
    {
        title: 'SETTINGS',
        items: [
            { label: 'Preferences', path: '/dashboard/preferences', icon: <FiSettings size={16} /> },
            { label: 'Fees and Pricing', path: '/dashboard/fees-pricing', icon: <FiDollarSign size={16} /> },
            { label: 'Audit Logs', path: '/dashboard/audit-logs', icon: <FiActivity size={16} /> },
        ],
    },
];

const Sidebar: React.FC<SidebarProps> = ({ onOrgChange, isOpen, onClose }) => {
    const location = useLocation();
    const [showOrgMenu, setShowOrgMenu] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState('Switch Organization');
    const orgs = ['All', 'Lendsqr', 'Irorun', 'Lendstar', 'Ovaloans', 'Mpower'];

    return (
        <>
            {isOpen && (
                <div className="sidebar-overlay" onClick={onClose} />
            )}
            <aside className="sidebar">
                <div className="sidebar__org" onClick={() => setShowOrgMenu(!showOrgMenu)}>
                    <FiSliders size={16} />
                    <span>{selectedOrg}</span>
                    <FiChevronDown size={16} />

                    {showOrgMenu && (
                        <div className="sidebar__org-menu">
                            {orgs.map((org) => (
                                <button
                                    key={org}
                                    className="sidebar__org-menu-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedOrg(org === 'All' ? 'Switch Organization' : org);
                                        setShowOrgMenu(false);
                                        onOrgChange?.(org === 'All' ? '' : org);
                                    }}
                                >
                                    {org}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <nav className="sidebar__nav">
                    {sidebarGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="sidebar__group">
                            {group.title && (
                                <p className="sidebar__group-title">{group.title}</p>
                            )}
                            <ul>
                                {group.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <Link
                                            to={item.path}
                                            className={`sidebar__item ${location.pathname === item.path ? 'sidebar__item--active' : ''}`}
                                            onClick={onClose}
                                        >
                                            <span className="sidebar__icon">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="sidebar__logout">
                    <FiLogOut size={16} />
                    <span>Logout</span>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;