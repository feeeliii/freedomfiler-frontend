import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Card from '../common/Card';
import Button from '../common/Button';
import KlageListItem from '../common/KlageListItem';
import { mockKlagen } from "../../data/mockData.js";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [klagen, setKlagen] = useState(mockKlagen);
  
    const handleNeueKlage = () => {
        console.log('Neue Klage button clicked');
        navigate('/neue-klage'); 
    };
  
  const handleKlageClick = (klageId) => {
    console.log('Klage clicked:', klageId);
    alert(`This will one day open Klage with ID: ${klageId}`);
  };
  
  const handleShowAll = () => {
    console.log('Show all clicked');
    alert('This will some day show all Klagen');
  };
  
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      <Navbar />
      
      <div className="flex-grow p-4">
        <Card className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
          
          <div className="flex justify-center mb-8">
            <Button onClick={handleNeueKlage}>+ Neue Klage</Button>
          </div>
          
          <div className="space-y-2 mb-4">
            {klagen.map(klage => (
              <KlageListItem 
                key={klage.id}
                name={klage.name}
                onClick={() => handleKlageClick(klage.id)}
              />
            ))}
          </div>
          
          <div className="text-right">
            <button 
              onClick={handleShowAll}
              className="text-blue-600 hover:underline"
            >
              Alle anzeigen
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

export default Dashboard;
