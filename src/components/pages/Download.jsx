import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Card from '../common/Card';
import Button from '../common/Button';

function Download() {
  const navigate = useNavigate();
  const [finalTextBlocks, setFinalTextBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [klaeger, setKlaeger] = useState('');
  const [beklagte, setBeklagte] = useState('');
  const [bearbeiter, setBearbeiter] = useState('');
  const [isTest, setIsTest] = useState(false);
  
  // Bearbeiter options
  const bearbeiterOptions = [
    'Hannah', 'Vivi', 'Ida', 'Refa', 'WissMit', 
    'Sebastian', 'Philipp', 'FDS-Team', 'Andere'
  ];

  useEffect(() => {
    // Load final text blocks from localStorage
    try {
      const storedTextBlocks = localStorage.getItem('finalTextBlocks');
      if (storedTextBlocks) {
        setFinalTextBlocks(JSON.parse(storedTextBlocks));
      }
    } catch (error) {
      console.error('Error loading final text blocks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBack = () => {
    navigate('/summary');
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download the document
    // For now, we'll just show an alert
    alert('Dokument wird heruntergeladen...');
    
    // You could add actual document generation and download logic here
    // For example:
    // 1. Create a document using a library like jsPDF or docx
    // 2. Add the text blocks to the document
    // 3. Add the metadata (klaeger, beklagte, bearbeiter)
    // 4. Trigger a download
    
    // Example of how you might structure the document data
    const documentData = {
      klaeger,
      beklagte,
      bearbeiter,
      textBlocks: finalTextBlocks,
      isTest,
      generatedAt: new Date().toISOString()
    };
    
    console.log('Document data:', documentData);
    
    // In a real implementation, you would send this data to a backend
    // or process it directly in the browser to generate a document
  };

  // Check if form is valid
  const isFormValid = isTest || (klaeger.trim() !== '' && beklagte.trim() !== '' && bearbeiter !== '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center">
        <p className="text-xl">Lade Daten...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow p-4">
        <Card className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Dokument herunterladen</h1>
          
          <div className="space-y-6 mb-8">
            {/* Test mode checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="test-mode"
                checked={isTest}
                onChange={(e) => setIsTest(e.target.checked)}
                className="h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor="test-mode" className="ml-2 block text-gray-700">
                Das ist nur zum Test (Felder müssen nicht ausgefüllt werden)
              </label>
            </div>
            
            {/* Form fields */}
            <div className={`space-y-4 ${isTest ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Kläger*in field */}
              <div className="space-y-2">
                <label htmlFor="klaeger" className="block text-lg font-medium text-gray-700">
                  Kläger*in
                </label>
                <input
                  id="klaeger"
                  type="text"
                  value={klaeger}
                  onChange={(e) => setKlaeger(e.target.value)}
                  disabled={isTest}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Name des Klägers / der Klägerin"
                />
              </div>
              
              {/* Beklagte field */}
              <div className="space-y-2">
                <label htmlFor="beklagte" className="block text-lg font-medium text-gray-700">
                  Beklagte
                </label>
                <input
                  id="beklagte"
                  type="text"
                  value={beklagte}
                  onChange={(e) => setBeklagte(e.target.value)}
                  disabled={isTest}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Name der beklagten Behörde"
                />
              </div>
              
              {/* Bearbeiter dropdown */}
              <div className="space-y-2">
                <label htmlFor="bearbeiter" className="block text-lg font-medium text-gray-700">
                  Bearbeiter*in
                </label>
                <select
                  id="bearbeiter"
                  value={bearbeiter}
                  onChange={(e) => setBearbeiter(e.target.value)}
                  disabled={isTest}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Bitte auswählen</option>
                  {bearbeiterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Document preview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-purple-800">Vorschau</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md max-h-64 overflow-y-auto">
              {finalTextBlocks.length > 0 ? (
                <div className="space-y-4">
                  {finalTextBlocks.map((block, index) => (
                    <div key={index} className="text-gray-700">
                      <p>{block.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Keine Textbausteine ausgewählt.</p>
              )}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button 
              onClick={handleBack} 
              variant="secondary"
            >
              Zurück
            </Button>
            <Button 
              onClick={handleDownload}
              variant="primary"
              disabled={!isFormValid}
            >
              Dokument herunterladen
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

export default Download;
