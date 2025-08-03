import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AdminSession {
  id: string;
  username: string;
  role: string;
  loginTime: string;
}

const AdminDashboard = () => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) {
      navigate('/');
      return;
    }
    
    try {
      const parsedSession = JSON.parse(session) as AdminSession;
      setAdminSession(parsedSession);
    } catch {
      localStorage.removeItem('admin_session');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/');
  };

  if (!adminSession) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Username: {adminSession.username}</p>
              <p className="text-muted-foreground">Role: {adminSession.role}</p>
              <p className="text-muted-foreground">
                Logged in: {new Date(adminSession.loginTime).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage user registrations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage categories</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;