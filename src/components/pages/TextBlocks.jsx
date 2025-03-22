// src/components/pages/TextBlocks.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Card from '../common/Card';
import Button from '../common/Button';
import { mockTextBlocks } from '../../data/mockTextBlocks';

function TextBlocks() {
  const navigate = useNavigate();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [relevantTextBlocks, setRelevantTextBlocks] = useState([]);
  const [selectedTextBlocks, setSelectedTextBlocks] = useState([]);
  
  // Load selected reasons from localStorage
  useEffect(() => {
    const storedReasons = localStorage.getItem('selectedReasons');
    if (storedReasons) {
      const reasons = JSON.parse(storedReasons);
      setSelectedReasons(reasons);
      
      // Filter text blocks based on selected reasons
      const filteredBlocks = mockTextBlocks.filter(block => 
        reasons.includes(block.reasonId)
      );
      setRelevantTextBlocks(filteredBlocks);
    } else {
      // If no reasons found, redirect back to reasons selection
      navigate('/neue-klage');
    }
  }, [navigate]);
  
  const toggleTextBlock = (blockId) => {
    if (selectedTextBlocks.includes(blockId)) {
      setSelectedTextBlocks(selectedTextBlocks.filter(id => id !== blockId));
    } else {
      setSelectedTextBlocks([...selectedTextBlocks, blockId]);
    }
  };
  
  const handleContinue = () => {
    // Save selected text blocks to localStorage
    localStorage.setItem('selectedTextBlocks', JSON.stringify(selectedTextBlocks));
    
    // Navigate to summary page
    navigate('/summary');
  };
  
  
  // Group text blocks by reason
  const groupedTextBlocks = relevantTextBlocks.reduce((groups, block) => {
    if (!groups[block.reasonId]) {
      groups[block.reasonId] = [];
    }
    groups[block.reasonId].push(block);
    return groups;
  }, {});
  
  // Find reason labels
  const getReasonLabel = (reasonId) => {
    const reasonLabels = {
      'darlegungslast': 'Darlegungslast',
      '1-abs-1': '§ 1 Abs. 1',
      '1-abs-2': '§ 1 Abs. 2',
      '2-abs-1': '§ 2 Abs. 1',
      '2-abs-2': '§ 2 Abs. 2',
      '3-abs-1-s-1': '§ 3 Abs. 1 S. 1',
      '3-abs-1-s-2': '§ 3 Abs. 1 S. 2',
      '4-abs-2': '§ 4 Abs. 2',
      '5-abs-1': '§ 5 Abs. 1',
      '5-abs-2': '§ 5 Abs. 2',
      '6-abs-1': '§ 6 Abs. 1',
    };
    return reasonLabels[reasonId] || reasonId;
  };
  
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow p-4">
        <Card className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Textbausteine</h1>
          
          {Object.entries(groupedTextBlocks).map(([reasonId, blocks]) => (
            <div key={reasonId} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                {getReasonLabel(reasonId)}
              </h2>
              
              <div className="space-y-4">
                {blocks.map(block => (
                  <div 
                    key={block.id}
                    onClick={() => toggleTextBlock(block.id)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-colors
                      ${selectedTextBlocks.includes(block.id) 
                        ? 'bg-blue-50 border-2 border-blue-500' 
                        : 'bg-white border border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    <h3 className="font-medium mb-2">{block.title}</h3>
                    <p className="text-gray-700 text-sm">{block.content.substring(0, 150)}...</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Add this section for the continue button */}
          <div className="text-right mt-8">
            <Button 
              onClick={handleContinue} 
              disabled={selectedTextBlocks.length === 0}
            >
              weiter
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="fixed bottom-0 right-0 p-4 writing-mode-vertical-rl transform rotate-180">
        <p>Mit ❤ für die Informationsfreiheit.</p>
      </div>
    </div>
  );
}

export default TextBlocks;
