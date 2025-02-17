// KpiCard.js
import React from 'react';
import '../Dashboard.css';
// KpiCard.tsx
import { FaQuestionCircle } from 'react-icons/fa';
import './KpiCard.css';

// Define the types for the props
interface KpiCardProps {
  title: string;
  value: string | number;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value }) => {
  return (
    <div className="kpi-card">
      <h4>{title} <FaQuestionCircle className="question-icon" /></h4>
      <p>{value}</p>
    </div>
  );
};

export default KpiCard;

