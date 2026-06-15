import React from 'react';
import './StatsCard.scss';

interface StatsCardProps {
  label: string;
  value: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, color, bg, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-card__icon" style={{ background: bg }}>
        {icon}
      </div>
      <p className="stats-card__label">{label}</p>
      <h3 className="stats-card__value">{value}</h3>
    </div>
  );
};

export default StatsCard;