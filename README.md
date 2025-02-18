# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Packages installed:
Recharts, Firebase, Redux and Icons.
# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux

# Install Firebase
npm install firebase

# Install Recharts
npm install recharts

# Install Icons (assuming you mean React Icons)
npm install react-icons



# Features Implemented

Graph Visualization: Used Recharts to create a dynamic and interactive graph.

Icons & Navigation: Integrated icons for enhanced UI and utilized React Router DOM for seamless navigation between pages.

Authentication: Implemented Firebase Authentication for secure user login and authentication.

State Management: Leveraged React-Redux to manage state efficiently and allow dynamic updates of key variables.

Reusable Components: Designed repeatable KPI cards to ensure consistency and reusability across the dashboard.

# Technical Decisions & Trade-offs
Styling Approach: Considered using Tailwind CSS but opted for CSS due to the specific styling requirements of the frontend. This choice allowed for greater customization but required more manual styling effort.
Component Structure: While structuring the dashboard, I initially underestimated the complexity of styling. As a result, some components could have been better modularized to improve maintainability and readability.

# Known Limitations
The component splitting in the dashboard could have been more refined. Anticipating fewer style variations led to suboptimal structuring, which might affect scalability in future iterations.

# Time Spent
The entire implementation, including development and documentation, took approximately 2 hours and 30 minutes.
