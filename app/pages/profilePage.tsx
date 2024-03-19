import React, { useEffect, useState } from 'react';
import { fetchUserData, initSupabaseClient } from 'lib/supabaseClient'

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authHeader = localStorage.getItem('authToken') || '';
        const supabaseClient = initSupabaseClient(authHeader);
        const userData = await fetchUserData(supabaseClient);
        setUser(userData);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;


