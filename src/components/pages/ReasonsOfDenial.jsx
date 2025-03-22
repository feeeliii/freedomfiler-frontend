import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import Navbar from '../common/Navbar';
import Card from '../common/Card';
import Button from '../common/Button';

function ReasonsOfDenial() {
  const navigate = useNavigate();
  const [selectedReasons, setSelectedReasons] = useState([]);
  
  // Mock data for rejection reasons
  const reasons = [
    { id: 'darlegungslast', label: 'Darlegungslast' },
    // ... other reasons
  ];
  
  const toggleReason = (id) => {
    if (selectedReasons.includes(id)) {
      setSelectedReasons(selectedReasons.filter(reasonId => reasonId !== id));
    } else {
      setSelectedReasons([...selectedReasons, id]);
    }
  };
  
  const handleContinue = () => {
    console.log('Button clicked, selected reasons:', selectedReasons);
    
    try {
      // Store the selected reasons
      localStorage.setItem('selectedReasons', JSON.stringify(selectedReasons));
      console.log('Stored in localStorage:', localStorage.getItem('selectedReasons'));
      
      // Log before navigation
      console.log('About to navigate to /text-blocks');
      
      // Navigate using React Router
      navigate('/text-blocks');
      
      // This might not execute if navigation is successful
      console.log('Navigation called');
    } catch (error) {
      console.error('Error during navigation:', error);
    }
  };
  
  // Direct navigation function for testing
  const testDirectNavigation = () => {
    alert('Direct navigation test');
    window.location.href = '/text-blocks';
  };
  
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow p-4">
        <Card className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Ablehnungsgründe</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {reasons.map(reason => (
              <button
                key={reason.id}
                onClick={() => toggleReason(reason.id)}
                className={`
                  py-2 px-4 rounded-full border transition-colors
                  ${selectedReasons.includes(reason.id) 
                    ? 'border-purple-500 bg-white text-purple-800' 
                    : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'}
                `}
              >
                {reason.label}
              </button>
            ))}
          </div>
          
          <div className="relative mb-8">
            <div className="absolute right-0 -top-12 transform rotate-12">
              <p className="italic">Was behauptet die Behörde? Wähle aus!</p>
              <svg className="w-16 h-16 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <Button
              onClick={() => {
                console.log('Button onClick prop called');
                handleContinue();
              }}
              disabled={selectedReasons.length === 0}
              variant="primary"
              type="button" // Explicitly set the type
            >
              weiter
            </Button>
            
            {/* Keep the test button for comparison */}
            <button 
              onClick={() => console.log('Plain HTML button clicked')}
              className="mt-2 bg-green-500 text-white p-2 rounded"
            >
              Test Plain Button
            </button>
          </div>



        </Card>
      </div>
      
      <div className="fixed bottom-0 right-0 p-4 writing-mode-vertical-rl transform rotate-180">
        <p>Mit ❤ für die Informationsfreiheit.</p>
      </div>
    </div>
  );
}

export default ReasonsOfDenial;
