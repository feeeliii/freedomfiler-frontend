/* const API_BASE_URL = 'http://localhost:5000/api'; // Backend-Adresse an

export const fetchRecentKlagen = async (limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/klagen/recent?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Fehler: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Klagen:', error);
    throw error;
  }
};
 */
// mehr api funktionen hier
