import { mockKlagen } from "../../data/mockData.js";
import { useNavigate } from 'react-router-dom';
import PageLayout from '../layout/CardWithHeader.jsx';
import Button from '../common/Button2.jsx';

function Dashboard() {
  const navigate = useNavigate();
  
  const recentKlagen = [...mockKlagen]
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .slice(0, 5);
  
  const handleKlageClick = (klageId) => {
    navigate(`/klage/${klageId}`);
  };
  
  return (
    <div>
      <PageLayout title="Dashboard">
        <div className='flex flex-col items-center justify-center mt-10'>
          <Button variant='newKlage' className='mb-4'></Button>
          <div className="max-w-[600px] mt-8 w-full">
            {/* Hier wird das Grid-Template definiert: 40% für erste Spalte, 40% für zweite, 20% für dritte */}
            <div className="grid grid-cols-[40%_40%_20%] bg-gray-100 rounded font-bold">
                <div className="py-3 px-4">Kläger*in</div>
                <div className="py-3 px-4">Beklagte</div>
                <div className="py-3 px-4">Zuletzt bearbeitet</div>
            </div>
            <div className="bg-white rounded-b-lg overflow-hidden">
              {recentKlagen.map((klage, index) => (
                <div 
                  key={klage.id}
                  className={`
                    grid grid-cols-[40%_40%_20%] hover:bg-pink-50 cursor-pointer
                    ${index !== recentKlagen.length - 1 ? 'border-b border-red-300' : ''}
                  `}
                  onClick={() => handleKlageClick(klage.id)}
                >
                  <div className="py-3 px-4 truncate">{klage.klaeger}</div>
                  <div className="py-3 px-4 truncate">{klage.beklagte}</div>
                  <div className="py-3 px-4 text-sm">{klage.lastModified}</div>
                </div>
              ))}
              
              {recentKlagen.length === 0 && (
                <div className="py-4 px-4 text-center text-gray-500">
                  Noch keine Dokumente vorhanden
                </div>
              )}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export default Dashboard;
