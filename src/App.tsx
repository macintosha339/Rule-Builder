import React from 'react';
import { RuleBuilder } from './components/RuleBuilder';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <RuleBuilder />
    </div>
  );
};

export default App;