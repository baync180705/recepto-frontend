import { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadsPage  from './features/leads/leads_page';
import AnalyticsPage from './features/analytics/analytics_page';
import './App.css';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
