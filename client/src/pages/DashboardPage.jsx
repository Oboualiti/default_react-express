import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { setAuthToken } from '../services/api';
import { getDashboardData } from '../services/dashboardService';

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setAuthToken(token);

    getDashboardData()
      .then(setData)
      .catch(() => {
        setError('Session expired. Please login again.');
      });
  }, [token]);

  function handleLogout() {
    logout();
    setAuthToken(null);
    navigate('/login', { replace: true });
  }

  return (
    <div className='page'>
      <div className='card'>
        <h1>Dashboard</h1>
        <p>Logged in as {user?.email}</p>
        {error && <p className='error'>{error}</p>}
        {data && (
          <div className='stats'>
            <p>Users Online: {data.stats.usersOnline}</p>
            <p>Active Projects: {data.stats.activeProjects}</p>
            <p>Monthly Revenue: ${data.stats.monthlyRevenue}</p>
          </div>
        )}
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
