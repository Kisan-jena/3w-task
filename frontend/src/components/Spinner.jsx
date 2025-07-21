import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Spinner = ({ users, onClaim, isSpinning, setIsSpinning }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [finalNumber, setFinalNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const spinnerRef = useRef(null);
  
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Initialize GSAP
  useEffect(() => {
    if (spinnerRef.current) {
      gsap.set(spinnerRef.current, { rotation: 0 });
    }
  }, []);
  
  // Vibrant colors for each segment
  const segmentColors = [
    '#FF6B6B', // Red for 1
    '#4ECDC4', // Teal for 2
    '#45B7D1', // Blue for 3
    '#96CEB4', // Green for 4
    '#FFEAA7', // Yellow for 5
    '#DDA0DD', // Plum for 6
    '#98D8C8', // Mint for 7
    '#FD79A8', // Pink for 8
    '#FDCB6E', // Orange for 9
    '#6C5CE7'  // Purple for 10
  ];

  const handleSpin = async () => {
    if (!selectedUser) {
      alert('Please select a user first!');
      return;
    }

    setIsSpinning(true);
    setShowResult(false);
    
    // Generate random rotation (multiple full spins + random final position)
    const minSpins = 5;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomFinalAngle = Math.random() * 360;
    const totalRotation = (spins * 360) + randomFinalAngle;
    
    // Simple, clean animation with natural slowdown
    gsap.to(spinnerRef.current, {
      rotation: totalRotation,
      duration: 5,
      ease: "sine.out", // Smoother, more natural deceleration
      onComplete: async () => {
        // Get the actual final rotation from GSAP
        const currentRotation = gsap.getProperty(spinnerRef.current, "rotation");
        
        // Calculate which number the arrow is pointing to
        // The arrow points down from the top of the wheel (fixed position)
        // Segments start at -90 degrees (top) and go clockwise: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        // When wheel rotates clockwise, the numbers move past the arrow in reverse order
        
        // Normalize the rotation to 0-360 range
        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        
        // Each segment is 36 degrees (360/10)
        // Since the wheel rotates and arrow is fixed, we need to invert the calculation
        // When wheel rotates 36 degrees clockwise, number 2 moves to where number 1 was
        const segmentIndex = Math.floor((360 - normalizedRotation) / 36) % 10;
        const winningNumber = numbers[segmentIndex];
        
        console.log('Debug info:', {
          currentRotation,
          normalizedRotation,
          segmentIndex,
          winningNumber
        });
        
        setFinalNumber(winningNumber);
        setShowResult(true);
        setIsSpinning(false);
        
        // Simple fade-in for results
        gsap.from(".result-display", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out"
        });
        
        // Call the claim API
        try {
          await onClaim(selectedUser, winningNumber);
        } catch (error) {
          console.error('Error claiming points:', error);
          alert('Error claiming points. Please try again.');
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
           Spin & Win Game
        </h2>
        
        {/* User Selection */}
        <div className="mb-8 max-w-md mx-auto">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Select a User:
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg bg-white"
            disabled={isSpinning}
          >
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} (Current Points: {user.totalPoints || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Spinner Wheel */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* SVG Spinner Wheel */}
            <div
              ref={spinnerRef}
              style={{ 
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            >
              <svg width="320" height="320" viewBox="0 0 320 320" className="rounded-full">
                {/* Create segments */}
                {numbers.map((number, index) => {
                  const angle = 360 / numbers.length; // 36 degrees
                  const startAngle = angle * index - 90; // Start from top
                  const endAngle = startAngle + angle;
                  
                  // Convert to radians
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  
                  // Calculate path points
                  const centerX = 160;
                  const centerY = 160;
                  const radius = 150;
                  
                  const x1 = centerX + radius * Math.cos(startRad);
                  const y1 = centerY + radius * Math.sin(startRad);
                  const x2 = centerX + radius * Math.cos(endRad);
                  const y2 = centerY + radius * Math.sin(endRad);
                  
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');
                  
                  // Position for number
                  const numberAngle = startAngle + angle / 2;
                  const numberRad = (numberAngle * Math.PI) / 180;
                  const numberRadius = 110;
                  const numberX = centerX + numberRadius * Math.cos(numberRad);
                  const numberY = centerY + numberRadius * Math.sin(numberRad);
                  
                  return (
                    <g key={number}>
                      {/* Segment */}
                      <path
                        d={pathData}
                        fill={segmentColors[index]}
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      {/* Number */}
                      <text
                        x={numberX}
                        y={numberY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-white font-bold text-2xl"
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                          fill: '#fff'
                        }}
                      >
                        {number}
                      </text>
                    </g>
                  );
                })}
                
                {/* Center circle */}
                <circle
                  cx="160"
                  cy="160"
                  r="25"
                  fill="#fff"
                  stroke="#333"
                  strokeWidth="3"
                />
                <text
                  x="160"
                  y="160"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ fontSize: '20px' }}
                >
                  {isSpinning ? '🎰' : '🎯'}
                </text>
              </svg>
            </div>
            
            {/* Pointer - pointing down into the wheel */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div 
                className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-red-600"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}
              ></div>
            </div>
          </div>
          
          {/* Spinner Status */}
          <div className="text-center mt-4">
            <p className="text-lg font-semibold text-gray-700">
              {isSpinning ? (
                <span className="text-purple-600 animate-pulse">
                  � Spinning... Watch the magic happen! ✨
                </span>
              ) : showResult ? (
                <span className="text-green-600 font-bold">
                  🎉 Landed on {finalNumber}! 🎯
                </span>
              ) : (
                <span className="text-gray-500">
                  Ready to spin! Select a user and let the fortune decide! 🍀
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Spin Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleSpin}
            disabled={isSpinning || !selectedUser}
            className={`px-8 py-4 text-xl font-bold rounded-lg transition-all duration-200 ${
              isSpinning || !selectedUser
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
            } text-white shadow-lg`}
          >
            {isSpinning ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Spinning...
              </span>
            ) : (
              'Spin to Win!'
            )}
          </button>
        </div>

        {/* Result Display */}
        {showResult && (
          <div className="result-display text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-300 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-xl text-gray-700">
              <span className="font-semibold">
                {users.find(u => u._id === selectedUser)?.name}
              </span>{' '}
              won <span className="font-bold text-green-600">{finalNumber} points!</span>
            </p>
            <p className="text-lg text-gray-600 mt-2">
              The spinner landed on number <span className="font-bold text-purple-600">{finalNumber}</span>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spinner;