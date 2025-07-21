import React, { useState } from 'react';
import Button from './Buttons';

const Spinner = ({ onSpin }) => {
  const [number, setNumber] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    // Disable rapid clicking while "spinning"
    if (spinning) return;
    
    setSpinning(true);
    
    // Small delay to simulate spinning effect
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 10) + 1; // 1-10
      setNumber(randomNum);
      if (onSpin) onSpin(randomNum); // callback to parent
      setSpinning(false);
    }, 500);
  };

  return (
    <div className="text-center bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🎯 Spin to Claim Points</h2>
      <div className="text-6xl font-bold text-blue-600 mb-4">
        {spinning ? '...' : (number !== null ? number : '-')}
      </div>
      <Button 
        text={spinning ? "Spinning..." : "Spin"} 
        onClick={spin} 
        variant="success" 
        disabled={spinning}
      />
    </div>
  );
};

export default Spinner;
