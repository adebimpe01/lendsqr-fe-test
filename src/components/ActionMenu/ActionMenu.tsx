import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiUserX, FiUserCheck } from 'react-icons/fi';
import './ActionMenu.scss';

interface ActionMenuProps {
  userId: string;
  onClose: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ userId, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="action-menu">
      <button
        className="action-menu__item"
        onClick={() => {
          navigate(`/dashboard/users/${userId}`);
          onClose();
        }}
      >
        <FiEye size={14} />
        <span>View Details</span>
      </button>
      <button className="action-menu__item">
        <FiUserX size={14} />
        <span>Blacklist User</span>
      </button>
      <button className="action-menu__item">
        <FiUserCheck size={14} />
        <span>Activate User</span>
      </button>
    </div>
  );
};

export default ActionMenu;