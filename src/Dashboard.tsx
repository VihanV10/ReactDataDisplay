import React, { useState, useEffect } from 'react';
import { auth, logout } from '../src/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import './Dashboard.css';
import { FaHistory, FaBell, FaCloudUploadAlt, FaHome, FaCog,FaEllipsisH,FaBolt,FaSearch,FaPlus } from 'react-icons/fa'; // Importing additional icons
import { CiMenuBurger } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import KpiCard from './components/KpiCard';
import { BsStars } from "react-icons/bs";
import ChartContainer from './components/Chart';  
import { LuShare } from "react-icons/lu";
import { FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { IoIosArrowDropdown } from "react-icons/io";
import './Variable.css';


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchQuery, setSearchQuery] = useState("");

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

  // Whether the "Edit Variables" popup is shown
  const [showEditMenu, setShowEditMenu] = useState(false);

  // Which lines are visible in the chart
  const [variablesVisible, setVariablesVisible] = useState({
    uv: true,
    pv: true,
    amt: true,
  });

  // Track the hovered variable to display its information
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);

  // Track whether the graph is displayed
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/'); // Redirect to home if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Toggle dark/light theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Toggle visibility of chart lines
  const handleVariableToggle = (variable: string) => {
    setVariablesVisible((prevState) => ({
      ...prevState,
      [variable]: !prevState[variable as keyof typeof prevState],
    }));
  };

  // Sample explanations for each variable
  const variableExplanations: { [key: string]: string } = {
    uv: 'UV (Unique Value) represents the total count of unique charging events per zone over time.',
    pv: 'PV (Price Value) shows the total cost incurred by the system based on demand and usage.',
    amt: 'AMT (Amount) refers to the total revenue generated from charging sessions across zones.',
  };

  return (
    <div className={`dashboard-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      {/* Navbar on the left side */}
      <div className="sidebar">
      <div className="sidebar-item">
          <CiMenuBurger className="sidebar-icon" />
        </div>
        <div className="sidebar-item">
          <FaHome className="sidebar-icon" />
        </div>
        <div className="sidebar-item">
          <FaBell className="sidebar-icon" />
        </div>
        <div className="sidebar-item">
          <FaCog className="sidebar-icon" />
        </div>
        <div className="sidebar-item">
          <FaCloudUploadAlt className="sidebar-icon" />
        </div>
        {/* Logout at the bottom */}
        <div className="sidebar-item" onClick={logout}>
          <CgProfile className="sidebar-icon" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <nav className="top-nav">
        <div className="nav-items">
            <div className="nav-item active">Charging Stations</div>
            <div className="nav-item">Fleet Sizing</div>
            <div className="nav-item">Parking</div>
        </div>
        <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search..." className="search-input" />

        </div>
        </nav>

        {/* Main Header */}
        <div className="main-header">
        
          <h1><FaBolt size={30}/>Charging Station</h1>

          <div className="user-info">
            {user && (
            <>
                <div className="parent-container">
                <div className="history-container">
                    <FaHistory className="history-icon" />
                </div>
                <div className="edit-container">
                    <button className="edit-variables-btn" onClick={() => { setShowEditMenu(true); setIsGraphVisible(true); }}>
                    Edit Variables
                    </button>
                </div>
                <div className="history-container">
                    <LuShare className="history-icon" />
                </div>
                </div>
            </>
            )}
        </div>
        </div>

        {/* Best Scenario Results */}
        <div className="scenario-section">
            <h2><BsStars />Best Scenario Results</h2>
            <div className="scenario-text-container">
                <p className="scenario-text">
                The best found configuration based on profit is characterized by 11 zones (max) with charging stations
                and 48 total number of poles.
                </p>
                <FaEllipsisH className="ellipsis-icon" />
            </div>
            <p></p>
            <div className="scenario-text-container">
                <p className="scenario-text">
                The best found configuration based on satisfied demand is characterized by 17 zones (max)
                with charging units and 84 total number of poles.
                </p>
                <FaEllipsisH className="ellipsis-icon" />
            </div>
        </div>

        {/* Main content area: Chart + KPIs */}
        <h3>
        <span>Graphs</span>
        </h3>
        <div className="content-section">
        
        <ChartContainer variablesVisible={variablesVisible} />
        <div className="kpi-section">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        Key Performance Indicators
        <button className="edit-variables-btn" style={{ padding: '0.5rem 1rem', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            Variables <FaPlus style={{ marginLeft: '5' }}/>
        </button>
        </h3>

            <div className="kpi-cards-container">
            <KpiCard title="Infrastructure Units" value="€421.07" />
            <KpiCard title="Charging Growth" value="33.07" />
            <KpiCard title="Localization Change" value="21.9%" />
            <KpiCard title="Fleet Growth" value="7.30%" />
            </div>
        </div>
        </div>


        {/* Footer Actions */}
        {/* Optional Toggle Theme not fully implemented
            <div className="footer-actions">
            <button className="action-btn" onClick={toggleTheme}>Toggle Theme</button>
            <button className="action-btn" onClick={() => { setShowEditMenu(true); setIsGraphVisible(true); }}>Edit Variables</button>
            </div>
        */}
        {/* Edit Variables Popup */}
        {showEditMenu && (
  <div className="edit-menu">
    <div className="edit-menu-content">
      {isGraphVisible && (
        <button className="close-btn" onClick={() => setShowEditMenu(false)}>X</button>
      )}
      <h3>Edit Variables</h3>
      {/* Minimal navbar with only the search bar */}
      <div
        className="edit-menu-navbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem',
          borderBottom: '1px solid #ccc',
          marginBottom: '1rem',
        }}
      >
        <div
          className="search-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <FaSearch style={{ fontSize: '1.2rem', color: '#fff', marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.3rem',
              borderRadius: '4px',
              border: 'none',
            }}
          />
        </div>
      </div>
      <div className="variables-navbar">
        <span>Variables <IoIosArrowDropdown  className="history-icon" style={{marginLeft:'14rem',color:'green'}} /></span>
      </div>
      <div className="button-list">
        {(() => {
          const variableList = [
            { key: 'uv', label: 'UV' },
            { key: 'pv', label: 'PV' },
            { key: 'amt', label: 'AMT' },
          ];
          const sortedVariables = [...variableList].sort((a, b) => {
            const aMatch = a.label.toLowerCase().includes(searchQuery.toLowerCase());
            const bMatch = b.label.toLowerCase().includes(searchQuery.toLowerCase());
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
            return 0;
          });
          return sortedVariables.map((variable) => (
            <button
              key={variable.key}
              className={`variable-btn ${variablesVisible[variable.key as keyof typeof variablesVisible] ? 'active' : ''}`}
              onClick={() => handleVariableToggle(variable.key)}
              onMouseEnter={() => setHoveredVariable(variable.key)}
              onMouseLeave={() => setHoveredVariable(null)}
            >
              {variable.label} {variablesVisible[variable.key as keyof typeof variablesVisible] && <FaTimes className="cross-icon" />}
            </button>
          ));
        })()}
      </div>
      {hoveredVariable && (
        <div className="variable-info">
          <p>{variableExplanations[hoveredVariable]}</p>
        </div>
      )}
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default Dashboard;

