import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../layout/CardWithHeader";

function ReasonsOfDenial() {
  const { klageId } = useParams(); // Annahme: Die Klage-ID kommt aus der URL??
  const [selectedLaw, setSelectedLaw] = useState("IFG");
  const [reasons, setReasons] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lade Ablehnungsgründe basierend auf ausgewähltem Gesetz
  useEffect(() => {
    const fetchReasons = async () => {
      try {
        setLoading(true);
        
        // API-Aufruf zum Laden der Ablehnungsgründe
        const response = await fetch(`http://localhost:5000/api/denial-reasons?law=${selectedLaw}`);
        
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Ablehnungsgründe');
        }
        
        const data = await response.json();
        setReasons(data);
        
        // Lade bereits gespeicherte Auswahl, falls vorhanden
        if (klageId) {
          const savedResponse = await fetch(`http://localhost:5000/api/klagen/${klageId}/selected-reasons`);
          
          if (savedResponse.ok) {
            const savedData = await savedResponse.json();
            if (savedData.law === selectedLaw) {
              setSelectedReasons(savedData.selectedReasons);
            }
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Fehler beim Laden der Ablehnungsgründe:", err);
        setError("Die Ablehnungsgründe konnten nicht geladen werden.");
        
        // Fallback auf Mock-Daten bei Fehlern (nur für Entwicklung)
        let mockData = [];
        if (selectedLaw === "IFG") {
          mockData = [
            { id: "ifg_1", title: "§ 3 IFG" },
            { id: "ifg_2", title: "§ 4 IFG" },
            { id: "ifg_3", title: "§ 5 IFG" },
            { id: "ifg_4", title: "§ 6 IFG" },
            { id: "ifg_5", title: "§ 7 Abs. 2 IFG" },
            { id: "ifg_6", title: "§ 9 Abs. 3 IFG" },
          ];
        } else if (selectedLaw === "UIG") {
          mockData = [
            { id: "uig_1", title: "§ 8 Abs. 1 UIG" },
            { id: "uig_2", title: "§ 8 Abs. 2 UIG" },
            { id: "uig_3", title: "§ 9 Abs. 1 UIG" },
            { id: "uig_4", title: "§ 9 Abs. 2 UIG" },
            { id: "uig_5", title: "§ 10 UIG" },
          ];
        }
        setReasons(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchReasons();
  }, [selectedLaw, klageId]);

  // Toggle Auswahl eines Ablehnungsgrunds
  const toggleReason = async (reasonId) => {
    try {
      // Aktualisiere die ausgewählten Gründe
      const newSelectedReasons = selectedReasons.includes(reasonId)
        ? selectedReasons.filter(id => id !== reasonId)
        : [...selectedReasons, reasonId];
      
      setSelectedReasons(newSelectedReasons);
      
      // Speichere die Auswahl im localStorage als Fallback
      localStorage.setItem('selectedReasons', JSON.stringify(newSelectedReasons));
      localStorage.setItem('selectedLaw', selectedLaw);
      
      // Speichere die Auswahl in der Datenbank, wenn eine klageId vorhanden ist
      if (klageId) {
        const response = await fetch(`http://localhost:5000/api/klagen/${klageId}/save-reasons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            law: selectedLaw,
            selectedReasons: newSelectedReasons
          })
        });
        
        if (!response.ok) {
          console.error('Fehler beim Speichern der Ablehnungsgründe');
        }
      }
      
      console.log("Ausgewähltes Gesetz:", selectedLaw);
      console.log("Ausgewählte Ablehnungsgründe:", newSelectedReasons);
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    }
  };

  return (
    <div>
      <PageLayout title="Ablehnungsgründe">
        <div className="flex flex-col items-center p-6">
          {/* Überschrift */}
          <h2 className="text-2xl font-bold text-gray-800 text-center font-[Ranchers] mb-8 mt-8">
            Was behauptet die Behörde?
          </h2>
          
          {/* Gesetzauswahl */}
          <div className="flex justify-center space-x-4 mb-8 w-full max-w-md">
            <button
              onClick={() => setSelectedLaw("IFG")}
              className={`flex-1 py-3 text-sm rounded-md font-bold transition-colors ${
                selectedLaw === "IFG"
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              IFG
            </button>
            <button
              onClick={() => setSelectedLaw("UIG")}
              className={`flex-1 py-3 text-sm font-bold rounded-md transition-colors ${
                selectedLaw === "UIG"
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              UIG
            </button>
          </div>
          
          {/* Ablehnungsgründe */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p>Ablehnungsgründe werden geladen...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-2 w-full max-w-2xl">
              {reasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => toggleReason(reason.id)}
                  className={`py-2 px-4 border rounded-md transition-colors text-center ${
                    selectedReasons.includes(reason.id)
                      ? 'bg-red-100 border-red-300 text-red-700'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {reason.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </PageLayout>
    </div>
  );
}

export default ReasonsOfDenial;
