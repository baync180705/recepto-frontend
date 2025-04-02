import { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login_page';
import LeadsPage  from './pages/leads_page';
import { AnalyticsPage } from './pages/analytics_page';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
