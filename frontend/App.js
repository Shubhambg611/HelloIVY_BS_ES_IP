import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'login'

  const showLoginPage = () => {
    setCurrentPage('login');
  };

  const showLandingPage = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onLoginClick={showLoginPage} />
      ) : (
        <LoginPage onBackToHome={showLandingPage} />
      )}
    </div>
  );
}

export default App;