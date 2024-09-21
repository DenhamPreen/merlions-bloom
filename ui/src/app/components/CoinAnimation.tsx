import React, { useState } from 'react';

interface CoinFlipProps {
  result: 'heads' | 'tails'; // Specify heads or tails
  flip: false
}

const CoinFlip: React.FC<CoinFlipProps> = ({ result, flip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  React.useEffect(() => {
    setIsFlipped(true)
    setTimeout(() => setIsLanding(true), 1000); // Wait for 1 second to simulate the coin in air
  }, [flip])

  // Trigger the flip into the air
  const handleFlip = () => {
    console.log('Flipping the coin');
    setIsFlipped(true);
    setTimeout(() => setIsLanding(true), 1000); // Wait for 1 second to simulate the coin in air
  };

  // Reset the state after landing
  const resetFlip = () => {
    setIsFlipped(false);
    setIsLanding(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`coin-container relative w-32 h-32 ${
          isFlipped ? 'animate-flip' : ''
        } ${isLanding ? (result === 'heads' ? 'animate-heads' : 'animate-tails') : ''}`}
      >
        {/* Heads and Tails */}
        <div className="coin-heads absolute inset-0 flex items-center justify-center bg-yellow-400 rounded-full">
          <span className="text-3xl font-bold">🪙</span>
        </div>
        <div className="coin-tails absolute inset-0 flex items-center justify-center bg-gray-400 rounded-full">
          <span className="text-3xl font-bold">💰</span>
        </div>
      </div>

      {/* Button to Trigger Animation */}
      <div className="mt-8 space-x-4">
        {!isFlipped && (
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
            onClick={handleFlip}
          >
            Flip Coin
          </button>
        )}
        {isLanding && (
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 transition-all"
            onClick={resetFlip}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default CoinFlip;
