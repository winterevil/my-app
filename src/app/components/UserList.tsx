'use client';

import { useEffect, useState } from 'react';

interface User {
  client_number: string;
  client_name: string;
  city: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/postgres');
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        setError('Error fetching users' + error);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.client_number}>
          {user.client_name} - {user.city}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
