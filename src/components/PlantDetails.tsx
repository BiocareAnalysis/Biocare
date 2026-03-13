import React from 'react';
import { PlantData } from '../types';
import { Droplets, Thermometer, Droplet as DropletHalf, FlaskRound as Flask } from 'lucide-react';
import SmartPotModel from './SmartPotModel';

interface PlantDetailsProps {
  plant: PlantData;
}

const PlantDetails: React.FC<PlantDetailsProps> = ({ plant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40 md:h-56 bg-gray-200">
        <img 
          src={plant.imageUrl} 
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h2 className="text-xl font-bold text-white">{plant.name}</h2>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 mb-4">{plant.description}</p>
        
        <h3 className="text-md font-medium text-gray-800 mb-2">Smart Pot View</h3>
        <SmartPotModel />
        
        <h3 className="text-md font-medium text-gray-800 mb-2 mt-4">Ideal Growing Conditions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <Flask className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <div className="text-sm font-medium">pH Level</div>
              <div className="text-gray-600 text-xs">
                {plant.idealConditions.ph.min} - {plant.idealConditions.ph.max}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Thermometer className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <div className="text-sm font-medium">Temperature</div>
              <div className="text-gray-600 text-xs">
                {plant.idealConditions.temperature.min}°C - {plant.idealConditions.temperature.max}°C
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Droplets className="w-5 h-5 text-blue-400 mr-2" />
            <div>
              <div className="text-sm font-medium">Humidity</div>
              <div className="text-gray-600 text-xs">
                {plant.idealConditions.humidity.min}% - {plant.idealConditions.humidity.max}%
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <DropletHalf className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <div className="text-sm font-medium">Soil Moisture</div>
              <div className="text-gray-600 text-xs">
                {plant.idealConditions.moisture.min}% - {plant.idealConditions.moisture.max}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;