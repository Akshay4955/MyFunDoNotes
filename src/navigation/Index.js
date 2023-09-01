import React from 'react';
import Routes from './Routes';
import AuthenticationProvider from './AuthenticationProvider';

const Index = () => {
  return (
    <AuthenticationProvider>
      <Routes />
    </AuthenticationProvider>
  );
};

export default Index;
