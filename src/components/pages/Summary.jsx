import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Card from '../common/Card';
import Button from '../common/Button';

function Summary() {
  const navigate = useNavigate();
  const [textBlocksByReason, setTextBlocksByReason] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reasonOrder, setReasonOrder] = useState([]);
  // Track which reasons are expanded/collapsed
  const [expandedReasons, setExpandedReasons] = useState({});

  useEffect(() => {
    // Retrieve selected text blocks and reasons from localStorage
    try {
      console.log('Loading data from localStorage');
      
      // Get selected reasons
      const storedReasons = localStorage.getItem('selectedReasons');
      console.log('Stored reasons:', storedReasons);
      
      // Get selected text blocks
      const storedTextBlocks = localStorage.getItem('selectedTextBlocks');
      console.log('Stored text blocks:', storedTextBlocks);
      
      if (storedReasons) {
        const reasons = JSON.parse(storedReasons);
        setReasonOrder(reasons);
        
        // Initialize all reasons as expanded
        const initialExpandedState = {};
        reasons.forEach(reason => {
          initialExpandedState[reason] = true;
        });
        setExpandedReasons(initialExpandedState);
        
        // Organize text blocks by reason
        let blocksByReason = {};
        
        if (storedTextBlocks) {
          const textBlocks = JSON.parse(storedTextBlocks);
          console.log('Parsed text blocks:', textBlocks);
          
          // Check the structure of textBlocks to determine how to organize them
          if (Array.isArray(textBlocks)) {
            // If textBlocks is an array, organize by reason
            reasons.forEach(reason => {
              // Filter blocks for this reason
              const blocksForReason = textBlocks.filter(block => 
                block.reason === reason || 
                block.reasonId === reason ||
                block.ablehnungsgrund === reason
              );
              
              if (blocksForReason.length > 0) {
                blocksByReason[reason] = blocksForReason;
              } else {
                // If no blocks found for this reason, create a placeholder
                blocksByReason[reason] = [{ 
                  text: "Keine Textbausteine für diesen Ablehnungsgrund ausgewählt.",
                  isPlaceholder: true
                }];
              }
            });
          } else if (typeof textBlocks === 'object') {
            // If textBlocks is already organized by reason
            blocksByReason = textBlocks;
          }
        } else {
          // If no text blocks found, create placeholders for each reason
          reasons.forEach(reason => {
            blocksByReason[reason] = [{ 
              text: "Keine Textbausteine für diesen Ablehnungsgrund ausgewählt.",
              isPlaceholder: true
            }];
          });
        }
        
        console.log('Organized blocks by reason:', blocksByReason);
        setTextBlocksByReason(blocksByReason);
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBack = () => {
    navigate('/text-blocks');
  };

  const handleContinue = () => {
    // Save the reordered text blocks
    const allBlocks = [];
    reasonOrder.forEach(reasonId => {
      if (textBlocksByReason[reasonId]) {
        // Filter out placeholder blocks
        const realBlocks = textBlocksByReason[reasonId].filter(block => !block.isPlaceholder);
        allBlocks.push(...realBlocks);
      }
    });
    localStorage.setItem('finalTextBlocks', JSON.stringify(allBlocks));
    
    navigate('/download'); 
  };

  // Function to toggle the expanded/collapsed state of a reason
  const toggleReason = (reasonId) => {
    setExpandedReasons(prev => ({
      ...prev,
      [reasonId]: !prev[reasonId]
    }));
  };

  // Function to move a text block up within its reason group
  const moveBlockUp = (reasonId, blockIndex) => {
    if (blockIndex === 0) return; // Already at the top
    
    const updatedBlocks = {...textBlocksByReason};
    const reasonBlocks = [...updatedBlocks[reasonId]];
    
    // Swap the block with the one above it
    [reasonBlocks[blockIndex], reasonBlocks[blockIndex - 1]] = 
    [reasonBlocks[blockIndex - 1], reasonBlocks[blockIndex]];
    
    updatedBlocks[reasonId] = reasonBlocks;
    setTextBlocksByReason(updatedBlocks);
  };

  // Function to move a text block down within its reason group
  const moveBlockDown = (reasonId, blockIndex) => {
    const reasonBlocks = textBlocksByReason[reasonId];
    if (blockIndex === reasonBlocks.length - 1) return; // Already at the bottom
    
    const updatedBlocks = {...textBlocksByReason};
    const blocks = [...updatedBlocks[reasonId]];
    
    // Swap the block with the one below it
    [blocks[blockIndex], blocks[blockIndex + 1]] = 
    [blocks[blockIndex + 1], blocks[blockIndex]];
    
    updatedBlocks[reasonId] = blocks;
    setTextBlocksByReason(updatedBlocks);
  };

  // Function to move a reason group up in the order
  const moveReasonUp = (reasonIndex) => {
    if (reasonIndex === 0) return; // Already at the top
    
    const updatedOrder = [...reasonOrder];
    
    // Swap the reason with the one above it
    [updatedOrder[reasonIndex], updatedOrder[reasonIndex - 1]] = 
    [updatedOrder[reasonIndex - 1], updatedOrder[reasonIndex]];
    
    setReasonOrder(updatedOrder);
  };

  // Function to move a reason group down in the order
  const moveReasonDown = (reasonIndex) => {
    if (reasonIndex === reasonOrder.length - 1) return; // Already at the bottom
    
    const updatedOrder = [...reasonOrder];
    
    // Swap the reason with the one below it
    [updatedOrder[reasonIndex], updatedOrder[reasonIndex + 1]] = 
    [updatedOrder[reasonIndex + 1], updatedOrder[reasonIndex]];
    
    setReasonOrder(updatedOrder);
  };

  // Helper function to get a user-friendly name for a reason ID
  const getReasonName = (reasonId) => {
    // Map of reason IDs to user-friendly names
    const reasonNames = {
      'darlegungslast': 'Darlegungslast',
      // Add more mappings as needed
    };
    
    return reasonNames[reasonId] || reasonId;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center">
        <p className="text-xl">Lade Zusammenfassung...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow p-4">
        <Card className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Zusammenfassung</h1>
          
          {reasonOrder.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-gray-600">Keine Ablehnungsgründe ausgewählt.</p>
              <Button 
                onClick={handleBack} 
                variant="secondary"
                className="mt-4"
              >
                Zurück zur Auswahl
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Textbausteine nach Ablehnungsgrund</h2>
                <p className="text-gray-600 text-sm">
                  Klicken Sie auf einen Ablehnungsgrund, um die Textbausteine anzuzeigen oder zu verbergen.
                  Sie können die Reihenfolge mit den Pfeilen ändern.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                {reasonOrder.map((reasonId, reasonIndex) => (
                  <div key={reasonId} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
                    {/* Reason Header - Clickable to expand/collapse */}
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleReason(reasonId)}
                    >
                      <div className="flex items-center">
                        {/* Expand/Collapse Icon */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 mr-2 transition-transform ${expandedReasons[reasonId] ? 'transform rotate-90' : ''}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        
                        <h3 className="text-lg font-semibold text-purple-800">
                          {getReasonName(reasonId)}
                        </h3>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent's onClick
                            moveReasonUp(reasonIndex);
                          }}
                          disabled={reasonIndex === 0}
                          className={`p-1 rounded ${reasonIndex === 0 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                          aria-label="Nach oben verschieben"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent's onClick
                            moveReasonDown(reasonIndex);
                          }}
                          disabled={reasonIndex === reasonOrder.length - 1}
                          className={`p-1 rounded ${reasonIndex === reasonOrder.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                          aria-label="Nach unten verschieben"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Collapsible Content - Text Blocks */}
                    {expandedReasons[reasonId] && (
                    <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                        <div className="space-y-4">
                        {textBlocksByReason[reasonId] ? (
                            textBlocksByReason[reasonId].map((block, blockIndex) => (
                            <div 
                                key={blockIndex} 
                                className={`p-3 border border-gray-200 rounded-md relative ${block.isPlaceholder ? 'bg-gray-100 italic' : 'bg-white'}`}
                            >
                                {!block.isPlaceholder && (
                                <div className="absolute right-2 top-2 flex flex-col space-y-1">
                                    <button 
                                    onClick={() => moveBlockUp(reasonId, blockIndex)}
                                    disabled={blockIndex === 0}
                                    className={`p-1 rounded ${blockIndex === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                                    aria-label="Nach oben verschieben"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    </button>
                                    <button 
                                    onClick={() => moveBlockDown(reasonId, blockIndex)}
                                    disabled={blockIndex === textBlocksByReason[reasonId].length - 1}
                                    className={`p-1 rounded ${blockIndex === textBlocksByReason[reasonId].length - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                                    aria-label="Nach unten verschieben"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    </button>
                                </div>
                                )}
                                
                                <div className={!block.isPlaceholder ? "pr-8" : ""}> {/* Add padding to make room for the buttons */}
                                <p className="text-gray-700 whitespace-pre-line">{block.text}</p>
                                </div>
                            </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Keine Textbausteine gefunden.</p>
                        )}
                        </div>
                    </div>
                    )}

                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button 
                  onClick={handleBack} 
                  variant="secondary"
                >
                  Zurück
                </Button>
                <Button 
                  onClick={handleContinue}
                  variant="primary"
                >
                  Weiter
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
      
      <div className="fixed bottom-0 right-0 p-4 writing-mode-vertical-rl transform rotate-180">
        <p>Mit ❤ für die Informationsfreiheit.</p>
      </div>
    </div>
  );
}

export default Summary;
