import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateToLeads = () => {
        navigate('/leads');
    };

    return (
        <div>
            <h1>LOGIN</h1>
            <button onClick={handleNavigateToLeads}>Go to Leads Page</button>
        </div>
    );
};

export default LoginPage;