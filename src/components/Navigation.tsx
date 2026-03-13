import React from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  Cpu, 
  Droplets, 
  BarChart3, 
  Bell, 
  Lightbulb, 
  BookOpen, 
  Settings,
  Wifi,
  WifiOff,
  Activity,
  TrendingUp
} from 'lucide-react';
import { NavigationTab } from '../types';

interface NavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  isDeviceConnected: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, isDeviceConnected }) => {
  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'plants' as NavigationTab, label: 'Plant Selection', icon: Leaf, badge: null },
    { id: 'device' as NavigationTab, label: 'Smart Pot', icon: Cpu, badge: null },
    { id: 'hydroponics' as NavigationTab, label: 'Hydroponics', icon: Droplets, badge: null },
    { id: 'analytics' as NavigationTab, label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'alerts' as NavigationTab, label: 'Alerts', icon: Bell, badge: 3 },
    { id: 'recommendations' as NavigationTab, label: 'AI Insights', icon: Lightbulb, badge: 2 },
    { id: 'library' as NavigationTab, label: 'Plant Library', icon: BookOpen, badge: null },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <nav className="bg-white border-r border-gray-100 w-72 min-h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">BioCare</h1>
            <p className="text-sm text-gray-500 font-medium">Smart Agriculture Platform</p>
          </div>
        </div>
        
        {/* Connection Status */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Device Status</span>
            <div className={`w-2 h-2 rounded-full ${isDeviceConnected ? 'bg-emerald-400 animate-pulse' : 'bg-gray-300'}`}></div>
          </div>
          <div className="flex items-center space-x-2">
            {isDeviceConnected ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-700 font-medium">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">Offline</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 px-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer - Plant Health Score */}
      <div className="p-6 border-t border-gray-100">
        <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">Plant Health Score</h3>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
            </div>
            <span className="text-lg font-bold text-emerald-600">87%</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 font-medium">Excellent condition</p>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">+3%</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;