export interface PlantData {
  id: string;
  name: string;
  category: 'herbs' | 'flowers' | 'succulents' | 'vegetables' | 'houseplants' | 'tropical' | 'cacti';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isHydroponicFriendly: boolean;
  isIndoor: boolean;
  sunlightPreference: 'low' | 'medium' | 'high';
  idealConditions: {
    ph: { min: number; max: number };
    temperature: { min: number; max: number };
    humidity: { min: number; max: number };
    moisture: { min: number; max: number };
    lightIntensity?: { min: number; max: number };
    nutrientLevel?: { min: number; max: number };
  };
  imageUrl: string;
  description: string;
  careInstructions: {
    watering: string;
    fertilizing: string;
    pruning: string;
    repotting: string;
  };
  commonIssues: string[];
  propagationMethod: string;
  isCustom?: boolean;
}

export interface SensorReading {
  ph: number;
  temperature: number;
  humidity: number;
  moisture: number;
  lightIntensity: number;
  nutrientLevel: number;
  waterLevel: number;
  ec: number; // Electrical Conductivity for hydroponics
  timestamp: string;
}

export interface SensorHistory {
  ph: Array<{ value: number; timestamp: string }>;
  temperature: Array<{ value: number; timestamp: string }>;
  humidity: Array<{ value: number; timestamp: string }>;
  moisture: Array<{ value: number; timestamp: string }>;
  lightIntensity: Array<{ value: number; timestamp: string }>;
  nutrientLevel: Array<{ value: number; timestamp: string }>;
  waterLevel: Array<{ value: number; timestamp: string }>;
  ec: Array<{ value: number; timestamp: string }>;
}

export interface CustomPlantInput {
  name: string;
  category: PlantData['category'];
  difficulty: PlantData['difficulty'];
  isHydroponicFriendly: boolean;
  isIndoor: boolean;
  sunlightPreference: PlantData['sunlightPreference'];
  ph: { min: number; max: number };
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
  moisture: { min: number; max: number };
  description: string;
  careInstructions: PlantData['careInstructions'];
}

export interface SmartPotDevice {
  id: string;
  name: string;
  isConnected: boolean;
  batteryLevel: number;
  firmwareVersion: string;
  lastSynced: string;
  sensorHealth: {
    ph: 'good' | 'warning' | 'error';
    temperature: 'good' | 'warning' | 'error';
    humidity: 'good' | 'warning' | 'error';
    moisture: 'good' | 'warning' | 'error';
  };
}

export interface HydroponicSystem {
  isEnabled: boolean;
  systemType: 'NFT' | 'DWC' | 'Drip' | 'Ebb and Flow';
  waterTankLevel: number;
  nutrientMixStatus: 'optimal' | 'low' | 'empty';
  pumpStatus: 'running' | 'stopped' | 'error';
  oxygenationStatus: 'active' | 'inactive';
  waterTemperature: number;
  flowRate: number; // L/min
  lastReservoirClean: string;
  nextNutrientRefill: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isResolved: boolean;
  category: 'sensor' | 'device' | 'plant' | 'hydroponic';
  actionRequired?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  category: 'watering' | 'lighting' | 'nutrients' | 'environment' | 'maintenance';
  expectedBenefit: string;
  actionSteps: string[];
  estimatedTime: string;
}

export interface PlantHealthScore {
  overall: number;
  factors: {
    moisture: number;
    ph: number;
    temperature: number;
    humidity: number;
    light: number;
    nutrients: number;
  };
  trend: 'improving' | 'stable' | 'declining';
}

export type NavigationTab = 'dashboard' | 'plants' | 'device' | 'hydroponics' | 'analytics' | 'alerts' | 'recommendations' | 'library' | 'settings';