import '../Dashboard.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleVariable } from '../chartSlice';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css';

const ChartContainer: React.FC = () => {
  // Get Redux state
  const variablesVisible = useSelector((state: RootState) => state.chart.variablesVisible);
  const dispatch = useDispatch();

  // Sample chart data
  const [data] = useState<any[]>([
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ]);

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
      <select
          className="dropdown-select"
          onChange={(e) => dispatch(toggleVariable(e.target.value as keyof typeof variablesVisible))}
        >
          <option value="">Toggle Variables</option>
          <option value="uv">UV</option>
          <option value="pv">PV</option>
          <option value="amt">AMT</option>
        </select>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: '#2e2e2e', color: '#fff' }} />
            <Legend />
            {variablesVisible.uv && <Line type="monotone" dataKey="uv" stroke="#00b300" />}
            {variablesVisible.pv && <Line type="monotone" dataKey="pv" stroke="#82ca9d" />}
            {variablesVisible.amt && <Line type="monotone" dataKey="amt" stroke="#ffc658" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;
