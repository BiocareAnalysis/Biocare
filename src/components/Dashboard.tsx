import React, { useState, useEffect } from 'react';
import { SensorReading, PlantData, PlantHealthScore } from '../types';
import { getCurrentReadings, getPlantHealthScore } from '../services/sensorService';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  FlaskRound,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  Battery,
  RefreshCw,
  Play,
  Pause,
  Settings,
  Bell
} from 'lucide-react';

interface DashboardProps {
  selectedPlant: PlantData;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedPlant }) => {
  const [readings, setReadings] = useState<SensorReading | null>(null);
  const [healthScore, setHealthScore] = useState<PlantHealthScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const data = getCurrentReadings();
      const health = getPlantHealthScore(data, selectedPlant);
      setReadings(data);
      setHealthScore(health);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [selectedPlant]);

  if (loading || !readings || !healthScore) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 animate-pulse border border-gray-100">
              <div className="h-6 bg-gray-200 rounded-lg w-1/2 mb-6"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse border border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sensorCards = [
    {
      title: 'Soil Moisture',
      value: readings.moisture,
      unit: '%',
      icon: Droplets,
      color: 'blue',
      bgGradient: 'from-blue-500 to-cyan-500',
      ideal: selectedPlant.idealConditions.moisture,
      trend: 'up' as const
    },
    {
      title: 'Temperature',
      value: readings.temperature,
      unit: '°C',
      icon: Thermometer,
      color: 'red',
      bgGradient: 'from-red-500 to-orange-500',
      ideal: selectedPlant.idealConditions.temperature,
      trend: 'stable' as const
    },
    {
      title: 'Humidity',
      value: readings.humidity,
      unit: '%',
      icon: Wind,
      color: 'cyan',
      bgGradient: 'from-cyan-500 to-blue-500',
      ideal: selectedPlant.idealConditions.humidity,
      trend: 'down' as const
    },
    {
      title: 'pH Level',
      value: readings.ph,
      unit: 'pH',
      icon: FlaskRound,
      color: 'purple',
      bgGradient: 'from-purple-500 to-indigo-500',
      ideal: selectedPlant.idealConditions.ph,
      trend: 'stable' as const
    },
    {
      title: 'Light Intensity',
      value: readings.lightIntensity,
      unit: 'lux',
      icon: Sun,
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-500',
      ideal: { min: 1000, max: 3000 },
      trend: 'up' as const
    },
    {
      title: 'Nutrients',
      value: readings.nutrientLevel,
      unit: 'ppm',
      icon: Zap,
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-500',
      ideal: { min: 800, max: 1200 },
      trend: 'stable' as const
    }
  ];

  const getStatusColor = (value: number, ideal: { min: number; max: number }) => {
    if (value >= ideal.min && value <= ideal.max) return 'emerald';
    if (value < ideal.min - (ideal.min * 0.2) || value > ideal.max + (ideal.max * 0.2)) return 'rose';
    return 'amber';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Plant Dashboard</h1>
          <p className="text-lg text-gray-600">Monitor and optimize your {selectedPlant.name} growth conditions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25 flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Sync Data</span>
          </button>
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg border border-gray-200 flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Health Score */}
        <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/25">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Plant Health Score</h3>
              <p className="text-emerald-100 text-sm">Overall condition assessment</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex items-end space-x-3 mb-4">
            <span className="text-5xl font-bold">{healthScore.overall}</span>
            <span className="text-2xl opacity-80 mb-1">/ 100</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">
                {healthScore.trend === 'improving' ? 'Improving' : 
                 healthScore.trend === 'declining' ? 'Declining' : 'Stable'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">+5% this week</div>
            </div>
          </div>
        </div>

        {/* Device Status */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Smart Pot Status</h3>
              <p className="text-gray-500 text-sm">Device connectivity & health</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Wifi className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Connection</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 font-semibold">Connected</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Battery</span>
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-green-500" />
                <span className="font-semibold">87%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Last Sync</span>
              <span className="font-semibold text-gray-900">2 min ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Firmware</span>
              <span className="font-semibold text-gray-900">v2.1.4</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Quick Actions</h3>
              <p className="text-gray-500 text-sm">Instant plant care controls</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 text-blue-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 border border-blue-200">
              💧 Water Plant Now
            </button>
            <button className="w-full bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 border border-amber-200">
              🌱 Add Nutrients
            </button>
            <button className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 border border-purple-200">
              ⚙️ Calibrate Sensors
            </button>
          </div>
        </div>
      </div>

      {/* Live Sensor Data */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Sensor Readings</h2>
            <p className="text-gray-600">Real-time environmental monitoring for optimal plant growth</p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-700 font-semibold text-sm">Live Data</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensorCards.map((sensor) => {
            const Icon = sensor.icon;
            const TrendIcon = getTrendIcon(sensor.trend);
            const statusColor = getStatusColor(sensor.value, sensor.ideal);
            
            return (
              <div key={sensor.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${sensor.bgGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    statusColor === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                    statusColor === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {statusColor === 'emerald' ? '✓ Optimal' : statusColor === 'amber' ? '⚠ Warning' : '⚠ Critical'}
                  </div>
                </div>
                
                <h3 className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">{sensor.title}</h3>
                <div className="flex items-end space-x-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">{sensor.value.toFixed(1)}</span>
                  <span className="text-xl text-gray-500 mb-1">{sensor.unit}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Ideal: {sensor.ideal.min}-{sensor.ideal.max} {sensor.unit}
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className={`w-4 h-4 ${
                      sensor.trend === 'up' ? 'text-emerald-500' : 
                      sensor.trend === 'down' ? 'text-rose-500' : 'text-gray-400'
                    }`} />
                    <span className={`text-xs font-semibold ${
                      sensor.trend === 'up' ? 'text-emerald-500' : 
                      sensor.trend === 'down' ? 'text-rose-500' : 'text-gray-400'
                    }`}>
                      {sensor.trend === 'up' ? '+2.3%' : sensor.trend === 'down' ? '-1.1%' : '0%'}
                    </span>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mt-4 h-12 bg-gray-50 rounded-lg flex items-end justify-center space-x-1 p-2">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 bg-gradient-to-t ${sensor.bgGradient} rounded-full opacity-60`}
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section - Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {[
              { time: '2 min ago', action: 'Sensor data synchronized', icon: Activity, color: 'blue', bg: 'from-blue-500 to-cyan-500' },
              { time: '15 min ago', action: 'Automatic watering completed', icon: Droplets, color: 'blue', bg: 'from-blue-500 to-cyan-500' },
              { time: '1 hour ago', action: 'pH level automatically adjusted', icon: FlaskRound, color: 'purple', bg: 'from-purple-500 to-indigo-500' },
              { time: '3 hours ago', action: 'Nutrient levels optimized', icon: Zap, color: 'green', bg: 'from-green-500 to-emerald-500' },
              { time: '6 hours ago', action: 'Growth milestone achieved', icon: TrendingUp, color: 'emerald', bg: 'from-emerald-500 to-green-500' },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 bg-gradient-to-br ${activity.bg} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500 font-medium">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Active Alerts</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-amber-900">Soil Moisture Low</p>
                  <p className="text-sm text-amber-700 mb-2">Your plant needs watering soon to maintain optimal growth</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-amber-600 font-medium">30 minutes ago</p>
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors">
                      Water Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-emerald-900">Temperature Optimal</p>
                  <p className="text-sm text-emerald-700 mb-2">Perfect temperature range maintained for healthy growth</p>
                  <p className="text-xs text-emerald-600 font-medium">1 hour ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-blue-900">Scheduled Maintenance</p>
                  <p className="text-sm text-blue-700 mb-2">Sensor calibration recommended for optimal accuracy</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-blue-600 font-medium">Tomorrow</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;