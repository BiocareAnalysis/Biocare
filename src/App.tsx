import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PlantSelector from './components/PlantSelector';
import SmartPotDevice from './components/SmartPotDevice';
import HydroponicsSystem from './components/HydroponicsSystem';
import Analytics from './components/Analytics';
import Alerts from './components/Alerts';
import AIInsights from './components/AIInsights';
import PlantLibrary from './components/PlantLibrary';
import { plantsDatabase } from './data/plants';
import { PlantData, CustomPlantInput, NavigationTab } from './types';

function App() {
  // Load plants from localStorage or use default database
  const [plants, setPlants] = useState<PlantData[]>(() => {
    const savedPlants = localStorage.getItem('plants');
    return savedPlants ? JSON.parse(savedPlants) : plantsDatabase;
  });

  // Load selected plant from localStorage or use first plant
  const [selectedPlantId, setSelectedPlantId] = useState<string>(() => {
    const savedPlantId = localStorage.getItem('selectedPlantId');
    return savedPlantId || plants[0].id;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isDeviceConnected, setIsDeviceConnected] = useState(true);

  // Save plants to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  // Save selected plant ID to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedPlantId', selectedPlantId);
  }, [selectedPlantId]);

  // Get the selected plant
  const selectedPlant = plants.find(p => p.id === selectedPlantId) || plants[0];

  const handleAddCustomPlant = (plantInput: CustomPlantInput) => {
    const newPlant: PlantData = {
      id: `custom-${Date.now()}`,
      name: plantInput.name,
      category: plantInput.category,
      difficulty: plantInput.difficulty,
      isHydroponicFriendly: plantInput.isHydroponicFriendly,
      isIndoor: plantInput.isIndoor,
      sunlightPreference: plantInput.sunlightPreference,
      idealConditions: {
        ph: plantInput.ph,
        temperature: plantInput.temperature,
        humidity: plantInput.humidity,
        moisture: plantInput.moisture
      },
      imageUrl: 'https://images.pexels.com/photos/3094207/pexels-photo-3094207.jpeg',
      description: plantInput.description,
      careInstructions: plantInput.careInstructions,
      commonIssues: ['Monitor regularly for optimal growth'],
      propagationMethod: 'Varies by plant type',
      isCustom: true
    };

    setPlants(prevPlants => [...prevPlants, newPlant]);
    setSelectedPlantId(newPlant.id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard selectedPlant={selectedPlant} />;
      case 'plants':
        return (
          <PlantSelector 
            plants={plants}
            selectedPlantId={selectedPlantId}
            onSelectPlant={setSelectedPlantId}
            onAddCustomPlant={handleAddCustomPlant}
          />
        );
      case 'device':
        return <SmartPotDevice />;
      case 'hydroponics':
        return <HydroponicsSystem />;
      case 'analytics':
        return <Analytics />;
      case 'alerts':
        return <Alerts />;
      case 'recommendations':
        return <AIInsights />;
      case 'library':
        return <PlantLibrary />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Application settings coming soon...</p>
          </div>
        );
      default:
        return <Dashboard selectedPlant={selectedPlant} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isDeviceConnected={isDeviceConnected}
      />
      
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;