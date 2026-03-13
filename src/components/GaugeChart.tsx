import React from 'react';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  status: 'optimal' | 'warning' | 'danger';
}

const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  min, 
  max, 
  label, 
  unit,
  status
}) => {
  // Calculate percentage for gauge (clamped between 0-100)
  const range = max - min;
  const adjustedValue = Math.max(min, Math.min(max, value));
  const percentage = ((adjustedValue - min) / range) * 100;
  
  // Determine color based on status
  const statusColors = {
    optimal: 'text-emerald-500',
    warning: 'text-amber-500',
    danger: 'text-rose-500'
  };
  
  const statusBgColors = {
    optimal: 'bg-emerald-100',
    warning: 'bg-amber-100',
    danger: 'bg-rose-100'
  };
  
  const gaugeColor = statusColors[status];
  const gaugeBgColor = statusBgColors[status];
  
  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-gray-100 border border-gray-200"></div>
        
        {/* Progress arc - we're using a semi-circle (180 degrees) */}
        <div 
          className={`absolute bottom-0 left-0 right-0 rounded-t-full ${gaugeBgColor} border border-gray-200`}
          style={{ 
            height: `${Math.min(100, percentage)}%`,
            transition: 'height 1s ease-out'
          }}
        ></div>
        
        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className={`text-2xl font-bold ${gaugeColor}`}>
            {value.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">{unit}</div>
        </div>
      </div>
      
      {/* Range indicators */}
      <div className="w-full flex justify-between text-xs text-gray-500 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {/* Status indicator */}
      <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${gaugeColor} ${gaugeBgColor}`}>
        {status === 'optimal' ? 'Optimal' : status === 'warning' ? 'Warning' : 'Critical'}
      </div>
    </div>
  );
};

export default GaugeChart;