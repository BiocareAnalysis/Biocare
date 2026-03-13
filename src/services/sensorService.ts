import { SensorReading, SensorHistory, PlantData, PlantHealthScore } from '../types';

// Simulate fetching current sensor data from a smart pot
export function getCurrentReadings(): SensorReading {
  return {
    ph: Number((Math.random() * 3 + 5).toFixed(1)),
    temperature: Number((Math.random() * 15 + 15).toFixed(1)),
    humidity: Number((Math.random() * 50 + 30).toFixed(1)),
    moisture: Number((Math.random() * 60 + 20).toFixed(1)),
    lightIntensity: Number((Math.random() * 2000 + 1000).toFixed(0)),
    nutrientLevel: Number((Math.random() * 400 + 800).toFixed(0)),
    waterLevel: Number((Math.random() * 40 + 60).toFixed(1)),
    ec: Number((Math.random() * 0.5 + 1.0).toFixed(2)),
    timestamp: new Date().toISOString()
  };
}

// Calculate plant health score based on current readings and ideal conditions
export function getPlantHealthScore(readings: SensorReading, plant: PlantData): PlantHealthScore {
  const calculateFactorScore = (value: number, ideal: { min: number; max: number }): number => {
    if (value >= ideal.min && value <= ideal.max) return 100;
    
    const range = ideal.max - ideal.min;
    const tolerance = range * 0.2; // 20% tolerance
    
    if (value < ideal.min) {
      const deviation = ideal.min - value;
      return Math.max(0, 100 - (deviation / tolerance) * 50);
    } else {
      const deviation = value - ideal.max;
      return Math.max(0, 100 - (deviation / tolerance) * 50);
    }
  };

  const factors = {
    moisture: calculateFactorScore(readings.moisture, plant.idealConditions.moisture),
    ph: calculateFactorScore(readings.ph, plant.idealConditions.ph),
    temperature: calculateFactorScore(readings.temperature, plant.idealConditions.temperature),
    humidity: calculateFactorScore(readings.humidity, plant.idealConditions.humidity),
    light: calculateFactorScore(readings.lightIntensity, plant.idealConditions.lightIntensity || { min: 1000, max: 3000 }),
    nutrients: calculateFactorScore(readings.nutrientLevel, plant.idealConditions.nutrientLevel || { min: 800, max: 1200 })
  };

  const overall = Math.round(
    (factors.moisture * 0.25 + 
     factors.ph * 0.2 + 
     factors.temperature * 0.15 + 
     factors.humidity * 0.15 + 
     factors.light * 0.15 + 
     factors.nutrients * 0.1)
  );

  // Determine trend (simplified - in real app would compare with historical data)
  const trend = overall >= 80 ? 'improving' : overall >= 60 ? 'stable' : 'declining';

  return {
    overall,
    factors,
    trend
  };
}

// Simulate fetching historical sensor data
export function getHistoricalData(hours: number = 24): SensorHistory {
  const history: SensorHistory = {
    ph: [],
    temperature: [],
    humidity: [],
    moisture: [],
    lightIntensity: [],
    nutrientLevel: [],
    waterLevel: [],
    ec: []
  };

  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();
    
    history.ph.push({
      value: Number((Math.random() * 2 + 5.5).toFixed(1)),
      timestamp
    });
    
    history.temperature.push({
      value: Number((Math.random() * 10 + 18).toFixed(1)),
      timestamp
    });
    
    history.humidity.push({
      value: Number((Math.random() * 40 + 35).toFixed(1)),
      timestamp
    });
    
    history.moisture.push({
      value: Number((Math.random() * 40 + 30).toFixed(1)),
      timestamp
    });

    history.lightIntensity.push({
      value: Number((Math.random() * 2000 + 1000).toFixed(0)),
      timestamp
    });

    history.nutrientLevel.push({
      value: Number((Math.random() * 400 + 800).toFixed(0)),
      timestamp
    });

    history.waterLevel.push({
      value: Number((Math.random() * 40 + 60).toFixed(1)),
      timestamp
    });

    history.ec.push({
      value: Number((Math.random() * 0.5 + 1.0).toFixed(2)),
      timestamp
    });
  }
  
  return history;
}

// Check if sensor readings are within ideal range
export function checkReadingStatus(
  value: number, 
  min: number, 
  max: number
): 'optimal' | 'warning' | 'danger' {
  if (value >= min && value <= max) {
    return 'optimal';
  } else if (value < min && value >= min - (min * 0.2) || value > max && value <= max + (max * 0.2)) {
    return 'warning';
  } else {
    return 'danger';
  }
}