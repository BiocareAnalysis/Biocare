import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Battery, 
  Bluetooth, 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Smartphone,
  Cpu,
  Thermometer,
  Droplets,
  FlaskRound,
  Wind
} from 'lucide-react';
import SmartPotModel from './SmartPotModel';

const SmartPotDevice: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(87);

  const deviceInfo = {
    id: 'BP-2024-001',
    name: 'BioCare Smart Pot Pro',
    firmwareVersion: 'v2.1.4',
    lastSynced: '2 minutes ago',
    batteryLevel: batteryLevel,
    sensorHealth: {
      ph: 'good' as const,
      temperature: 'good' as const,
      humidity: 'warning' as const,
      moisture: 'good' as const,
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsConnecting(false);
    }, 2000);
  };

  const getSensorStatusIcon = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-rose-500" />;
    }
  };

  const getSensorStatusColor = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good': return 'text-emerald-600 bg-emerald-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      case 'error': return 'text-rose-600 bg-rose-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Pot Device</h1>
          <p className="text-gray-600 mt-1">Manage your BioCare smart pot connection and settings</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
            isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Overview */}
        <div className="space-y-6">
          {/* Connection Status Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Device Status</h2>
              <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-gray-300'}`}></div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Device ID</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{deviceInfo.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Model</span>
                <span className="font-medium">{deviceInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Firmware</span>
                <span className="font-medium">{deviceInfo.firmwareVersion}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Sync</span>
                <span className="font-medium text-emerald-600">{deviceInfo.lastSynced}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Battery Level</span>
                <div className="flex items-center space-x-2">
                  <Battery className={`w-5 h-5 ${batteryLevel > 20 ? 'text-emerald-500' : 'text-rose-500'}`} />
                  <span className="font-medium">{batteryLevel}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isConnected 
                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' 
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : isConnected ? (
                  <>
                    <WifiOff className="w-5 h-5" />
                    <span>Disconnect Device</span>
                  </>
                ) : (
                  <>
                    <Bluetooth className="w-5 h-5" />
                    <span>Connect Device</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sensor Health */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sensor Health</h2>
            
            <div className="space-y-4">
              {[
                { name: 'pH Sensor', status: deviceInfo.sensorHealth.ph, icon: FlaskRound },
                { name: 'Temperature Sensor', status: deviceInfo.sensorHealth.temperature, icon: Thermometer },
                { name: 'Humidity Sensor', status: deviceInfo.sensorHealth.humidity, icon: Wind },
                { name: 'Moisture Sensor', status: deviceInfo.sensorHealth.moisture, icon: Droplets },
              ].map((sensor) => {
                const Icon = sensor.icon;
                return (
                  <div key={sensor.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{sensor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSensorStatusIcon(sensor.status)}
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${getSensorStatusColor(sensor.status)}`}>
                        {sensor.status === 'good' ? 'Good' : sensor.status === 'warning' ? 'Warning' : 'Error'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-xl font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Calibrate Sensors</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-purple-50 text-purple-700 py-3 px-4 rounded-xl font-medium hover:bg-purple-100 transition-colors flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5" />
                <span>Sync Data</span>
              </button>
              <button className="bg-amber-50 text-amber-700 py-3 px-4 rounded-xl font-medium hover:bg-amber-100 transition-colors flex items-center justify-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button className="bg-green-50 text-green-700 py-3 px-4 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Pair New</span>
              </button>
              <button className="bg-rose-50 text-rose-700 py-3 px-4 rounded-xl font-medium hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2">
                <Cpu className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Model */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Smart Pot Visualization</h2>
            <SmartPotModel />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Interactive 3D model of your BioCare Smart Pot</p>
              <p className="text-xs text-gray-500 mt-1">Rotate and zoom to explore</p>
            </div>
          </div>

          {/* Connection Guide */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Connection Guide</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span>Ensure your smart pot is powered on and in pairing mode</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span>Enable Bluetooth on your device</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span>Click "Connect Device" and select your pot from the list</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                <span>Wait for the connection to establish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPotDevice;