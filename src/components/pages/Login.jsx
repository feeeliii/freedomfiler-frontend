import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
      username: '',
      password: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', credentials);
    // Simulate successful login and navigate to dashboard
    navigate('/dashboard'); 
  }; 
  
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-pink-100 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-pink-200 opacity-70"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>
      
      {/* Logo */}
      <div className="p-6 relative z-10">
        <h1 className="text-2xl font-bold">FreedomFiler</h1>
      </div>
      
      {/* Login Card */}
      <div className="flex-grow flex items-center justify-center px-4 relative z-10">
        <Card className="w-full max-w-md mx-auto py-12" padding="large">
          <div className="space-y-10">
            {/* Updated heading with Ranchers font */}
            <h2 className="text-5xl text-center mb-4"
            style={{ fontFamily: "'Ranchers', cursive" }}
            >
              Moini! <span className="text-black">♥</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Name"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                icon="user"
                required
                className="bg-gray-100 rounded-md py-3"
              />
              
              <Input
                type="password"
                placeholder="Passwort"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                icon="lock"
                required
                className="bg-gray-100 rounded-md py-3"
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  fullWidth
                  className="py-3 rounded-md"
                >
                  Log in
                </Button>
              </div>
            </form>
            
            <p className="text-center text-sm text-gray-600 mt-6">
              Mit <span className="text-blue-600">♥</span> für die Informationsfreiheit.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
