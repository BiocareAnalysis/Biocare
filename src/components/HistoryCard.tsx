import React from 'react';
import { SensorHistory } from '../types';

interface HistoryCardProps {
  history: SensorHistory;
  selectedMetric: keyof SensorHistory;
  onSelectMetric: (metric: keyof SensorHistory) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ 
  history, 
  selectedMetric,
  onSelectMetric
}) => {
  if (!history || !history[selectedMetric] || history[selectedMetric].length === 0) {
    return <div>No historical data available</div>;
  }

  const metricData = history[selectedMetric];
  const latestData = [...metricData].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 12); // Show last 12 readings
  
  // Reverse for chronological display
  const chartData = [...latestData].reverse();
  
  // Find min and max for scaling
  const values = chartData.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const padding = range * 0.1; // Add 10% padding
  
  // For fixed ranges instead of dynamic
  const metricRanges = {
    ph: { min: 5, max: 8 },
    temperature: { min: 15, max: 30 },
    humidity: { min: 20, max: 90 },
    moisture: { min: 10, max: 80 }
  };

  // Labels for metrics
  const metricLabels = {
    ph: "pH Level",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    moisture: "Soil Moisture (%)"
  };
  
  // Colors for metrics
  const metricColors = {
    ph: "bg-blue-500",
    temperature: "bg-red-500",
    humidity: "bg-blue-400",
    moisture: "bg-blue-600"
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Historical Data</h2>
        
        <div className="flex space-x-2">
          {(Object.keys(history) as Array<keyof SensorHistory>).map(metric => (
            <button
              key={metric}
              onClick={() => onSelectMetric(metric)}
              className={`
                px-3 py-1 text-sm rounded-full transition-all
                ${selectedMetric === metric 
                  ? `bg-${metricColors[metric].split('-')[1]}-100 text-${metricColors[metric].split('-')[1]}-800 font-medium` 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {metricLabels[metric]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
          <div>{metricRanges[selectedMetric].max}</div>
          <div>{(metricRanges[selectedMetric].min + metricRanges[selectedMetric].max) / 2}</div>
          <div>{metricRanges[selectedMetric].min}</div>
        </div>
        
        {/* Chart */}
        <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end">
          {chartData.map((item, index) => {
            // Scale value to fit in chart height
            const fullRange = metricRanges[selectedMetric].max - metricRanges[selectedMetric].min;
            const scaledValue = ((item.value - metricRanges[selectedMetric].min) / fullRange) * 100;
            
            // Format time for display
            const time = new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center flex-1"
              >
                <div 
                  className={`w-4/5 ${metricColors[selectedMetric]} rounded-t`}
                  style={{ 
                    height: `${Math.max(1, scaledValue)}%`,
                    transition: 'height 0.3s ease-out'
                  }}
                ></div>
                <div className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-top-left">
                  {time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;