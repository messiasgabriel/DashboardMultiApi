// src/App.tsx
import { useState } from 'react';
import { Box } from '@radix-ui/themes';
import { Sidebar } from './components/layout/Sidebar';
import { PokemonPage } from './features/pokemon/pages/PokemonPage';
import { API_TABS } from './config/apiTabs';

// Mapeamento de componentes
const COMPONENT_MAP: Record<string, React.ReactNode> = {
  pokemon: <PokemonPage />,
  movies: null,
  weather: null
};

function App() {
  const [activeTab, setActiveTab] = useState(API_TABS[0].id);

  const activeComponent = COMPONENT_MAP[activeTab];
  const activeTabInfo = API_TABS.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-1 flex">
      {/* Sidebar fixa */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Área de conteúdo */}
      <Box className="flex-1 ml-64 p-6">
        {activeComponent || (
          <Box className="flex justify-center items-center min-h-[400px]">
            <Box className="text-center">
              <p className="text-gray-11 text-lg">
                Página <strong>{activeTabInfo?.label}</strong> em desenvolvimento...
              </p>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;