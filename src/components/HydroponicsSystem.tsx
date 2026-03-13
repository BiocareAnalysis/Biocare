import React, { useState } from 'react';
import { 
  Droplets, 
  Zap, 
  Thermometer, 
  Activity, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  FlaskRound,
  Gauge
} from 'lucide-react';

const HydroponicsSystem: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [systemType, setSystemType] = useState<'NFT' | 'DWC' | 'Drip' | 'Ebb and Flow'>('NFT');
  const [pumpRunning, setPumpRunning] = useState(false);

  const systemData = {
    waterTankLevel: 75,
    nutrientMixStatus: 'optimal' as const,
    pumpStatus: pumpRunning ? 'running' as const : 'stopped' as const,
    oxygenationStatus: 'active' as const,
    waterTemperature: 22.5,
    flowRate: 2.3,
    ph: 6.2,
    ec: 1.4,
    lastReservoirClean: '3 days ago',
    nextNutrientRefill: 'in 2 days'
  };

  const systemTypes = [
    { id: 'NFT', name: 'Nutrient Film Technique', description: 'Continuous flow of nutrient solution' },
    { id: 'DWC', name: 'Deep Water Culture', description: 'Roots suspended in oxygenated nutrient solution' },
    { id: 'Drip', name: 'Drip System', description: 'Controlled drip feeding to growing medium' },
    { id: 'Ebb and Flow', name: 'Ebb and Flow', description: 'Periodic flooding and draining cycles' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hydroponics System</h1>
          <p className="text-gray-600 mt-1">Advanced soilless growing system management</p>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Enable Hydroponics</span>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isEnabled ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {!isEnabled ? (
        /* Disabled State */
        <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Hydroponics System Disabled</h2>
          <p className="text-gray-600 mb-6">Enable hydroponics mode to access advanced soilless growing features</p>
          <button
            onClick={() => setIsEnabled(true)}
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            Enable Hydroponics
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* System Type Selection */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSystemType(type.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    systemType === type.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className={`font-semibold mb-1 ${
                    systemType === type.id ? 'text-emerald-900' : 'text-gray-900'
                  }`}>
                    {type.name}
                  </h3>
                  <p className={`text-sm ${
                    systemType === type.id ? 'text-emerald-700' : 'text-gray-600'
                  }`}>
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* System Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Water Tank Level */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Water Tank</h3>
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-2xl font-bold text-gray-900">{systemData.waterTankLevel}%</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    systemData.waterTankLevel > 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {systemData.waterTankLevel > 50 ? 'Good' : 'Low'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${systemData.waterTankLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Pump Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Pump Status</h3>
                <div className="flex items-center space-x-2">
                  {pumpRunning ? (
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  ) : (
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`font-medium ${pumpRunning ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {pumpRunning ? 'Running' : 'Stopped'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Flow Rate</span>
                  <span className="font-medium">{systemData.flowRate} L/min</span>
                </div>
                <button
                  onClick={() => setPumpRunning(!pumpRunning)}
                  className={`w-full py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    pumpRunning 
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' 
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {pumpRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{pumpRunning ? 'Stop' : 'Start'}</span>
                </button>
              </div>
            </div>

            {/* Water Temperature */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Water Temp</h3>
                <Thermometer className="w-6 h-6 text-red-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{systemData.waterTemperature}</span>
                  <span className="text-lg text-gray-500">°C</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                  systemData.waterTemperature >= 18 && systemData.waterTemperature <= 24 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {systemData.waterTemperature >= 18 && systemData.waterTemperature <= 24 ? 'Optimal' : 'Warning'}
                </div>
              </div>
            </div>

            {/* EC Level */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">EC Level</h3>
                <Gauge className="w-6 h-6 text-purple-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{systemData.ec}</span>
                  <span className="text-lg text-gray-500">mS/cm</span>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium inline-block bg-emerald-100 text-emerald-700">
                  Optimal
                </div>
              </div>
            </div>
          </div>

          {/* System Flow Visualization */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Flow Diagram</h2>
            <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 min-h-[300px]">
              {/* Reservoir */}
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <div className="bg-blue-500 rounded-lg p-4 text-white text-center">
                  <Droplets className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm font-medium">Reservoir</div>
                  <div className="text-xs opacity-90">{systemData.waterTankLevel}%</div>
                </div>
              </div>

              {/* Pump */}
              <div className="absolute left-1/4 top-1/4">
                <div className={`rounded-lg p-3 text-white text-center ${pumpRunning ? 'bg-emerald-500' : 'bg-gray-400'}`}>
                  <Activity className={`w-6 h-6 mx-auto mb-1 ${pumpRunning ? 'animate-pulse' : ''}`} />
                  <div className="text-xs font-medium">Pump</div>
                </div>
              </div>

              {/* Growing Area */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                <div className="bg-green-500 rounded-lg p-4 text-white text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-green-600 rounded-full flex items-center justify-center">
                    🌱
                  </div>
                  <div className="text-sm font-medium">Growing Area</div>
                  <div className="text-xs opacity-90">{systemType}</div>
                </div>
              </div>

              {/* Return Flow */}
              <div className="absolute left-1/4 bottom-1/4">
                <div className="bg-cyan-500 rounded-lg p-3 text-white text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-xs font-medium">Return</div>
                </div>
              </div>

              {/* Flow Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Pump to Growing Area */}
                <path
                  d="M 25% 25% Q 50% 15% 75% 50%"
                  stroke={pumpRunning ? "#10b981" : "#9ca3af"}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={pumpRunning ? "5,5" : "none"}
                  className={pumpRunning ? "animate-pulse" : ""}
                />
                {/* Growing Area to Return */}
                <path
                  d="M 75% 50% Q 50% 85% 25% 75%"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
                {/* Return to Reservoir */}
                <path
                  d="M 25% 75% L 25% 50%"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Maintenance & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Maintenance Schedule */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Maintenance Schedule</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-medium text-amber-900">Nutrient Refill Due</p>
                      <p className="text-sm text-amber-700">in 2 days</p>
                    </div>
                  </div>
                  <button className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-amber-200">
                    Schedule
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">Reservoir Cleaned</p>
                      <p className="text-sm text-emerald-700">3 days ago</p>
                    </div>
                  </div>
                  <span className="text-emerald-600 text-sm font-medium">Complete</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">System Calibration</p>
                      <p className="text-sm text-blue-700">Next week</p>
                    </div>
                  </div>
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200">
                    Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Controls</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-50 text-blue-700 py-3 px-4 rounded-xl font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                  <FlaskRound className="w-5 h-5" />
                  <span>Add Nutrients</span>
                </button>
                <button className="bg-purple-50 text-purple-700 py-3 px-4 rounded-xl font-medium hover:bg-purple-100 transition-colors flex items-center justify-center space-x-2">
                  <Gauge className="w-5 h-5" />
                  <span>Calibrate pH</span>
                </button>
                <button className="bg-cyan-50 text-cyan-700 py-3 px-4 rounded-xl font-medium hover:bg-cyan-100 transition-colors flex items-center justify-center space-x-2">
                  <Droplets className="w-5 h-5" />
                  <span>Drain System</span>
                </button>
                <button className="bg-green-50 text-green-700 py-3 px-4 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-2">
                  <RotateCcw className="w-5 h-5" />
                  <span>Clean Reservoir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HydroponicsSystem;