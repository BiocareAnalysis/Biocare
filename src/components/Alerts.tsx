import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Bell, 
  BellOff, 
  Eye, 
  EyeOff, 
  Trash2, 
  MoreHorizontal,
  Zap,
  Droplets,
  Thermometer,
  Activity,
  Beaker,
  Wifi,
  WifiOff,
  TrendingUp,
  AlertCircle,
  Info,
  X,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Settings,
  Shield,
  Target,
  Sparkles,
  Brain,
  Gauge,
  ArrowRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Alert } from '../types';
import StarBorder from './ui/StarBorder';
import MagicRings from './ui/MagicRings';
import ShinyText from './ui/ShinyText';
import GlareHover from './ui/GlareHover';
type AlertTab = 'active' | 'resolved' | 'history';
type AlertSeverity = 'all' | 'critical' | 'warning' | 'info';
type AlertCategory = 'all' | 'sensor' | 'device' | 'plant' | 'hydroponic';

interface AlertWithActions extends Alert {
  canDismiss: boolean;
  canResolve: boolean;
  canSnooze: boolean;
  explanation?: string;
  recommendation?: string;
  source: string;
  priority: number;
  estimatedImpact: string;
  autoResolveIn?: string;
}

const Alerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AlertTab>('active');
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity>('all');
  const [categoryFilter, setCategoryFilter] = useState<AlertCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [liveMode, setLiveMode] = useState(true);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Enhanced mock alerts data
  const [alerts, setAlerts] = useState<AlertWithActions[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Critical Moisture Depletion',
      message: 'Soil moisture has dropped to 12% - immediate intervention required to prevent plant stress',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isResolved: false,
      category: 'sensor',
      actionRequired: 'Water plant immediately',
      canDismiss: false,
      canResolve: true,
      canSnooze: false,
      explanation: 'Moisture sensor detected critically low soil moisture. Plant stress indicators are elevated. Root system may be compromised if not addressed within 30 minutes.',
      recommendation: 'Water thoroughly until drainage occurs. Check irrigation system for blockages. Monitor for next 2 hours.',
      source: 'Moisture Sensor #1',
      priority: 1,
      estimatedImpact: 'Plant death risk within 6 hours',
      autoResolveIn: undefined
    },
    {
      id: '2',
      type: 'warning',
      title: 'pH Drift Pattern Detected',
      message: 'pH has been gradually increasing over the past 72 hours (now 7.8) - trending outside optimal range',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isResolved: false,
      category: 'sensor',
      actionRequired: 'Adjust pH within 24 hours',
      canDismiss: true,
      canResolve: true,
      canSnooze: true,
      explanation: 'Gradual pH increase detected through AI pattern analysis. This trend could significantly affect nutrient uptake efficiency and overall plant health.',
      recommendation: 'Add pH down solution or organic matter to lower pH to optimal range (6.0-7.0). Test soil composition.',
      source: 'pH Sensor #1 + AI Analysis',
      priority: 2,
      estimatedImpact: '15% reduction in nutrient uptake',
      autoResolveIn: '24 hours'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Smart Device Battery Critical',
      message: 'Smart pot battery level at 8% - charging required to maintain monitoring',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isResolved: false,
      category: 'device',
      canDismiss: true,
      canResolve: false,
      canSnooze: true,
      explanation: 'Device battery critically low. Monitoring capabilities will be lost if battery depletes completely.',
      recommendation: 'Connect to charger immediately. Consider backup power solution.',
      source: 'Smart Pot Device',
      priority: 3,
      estimatedImpact: 'Loss of monitoring in 2-4 hours',
      autoResolveIn: undefined
    },
    {
      id: '4',
      type: 'info',
      title: 'Growth Acceleration Detected',
      message: 'Plant growth rate increased by 23% over the past week - optimal conditions maintained',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isResolved: false,
      category: 'plant',
      canDismiss: true,
      canResolve: true,
      canSnooze: false,
      explanation: 'AI analysis shows significant improvement in growth metrics. All environmental factors are within optimal ranges.',
      recommendation: 'Continue current care routine. Consider documenting successful parameters for future reference.',
      source: 'AI Growth Analysis',
      priority: 4,
      estimatedImpact: 'Positive - accelerated healthy growth',
      autoResolveIn: '7 days'
    },
    {
      id: '5',
      type: 'critical',
      title: 'Temperature Shock Event',
      message: 'Sudden temperature drop from 24°C to 16°C detected - potential cold stress',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      isResolved: false,
      category: 'sensor',
      actionRequired: 'Investigate temperature source',
      canDismiss: false,
      canResolve: true,
      canSnooze: false,
      explanation: 'Rapid temperature change detected. This could cause cellular damage and stress responses in the plant.',
      recommendation: 'Check for drafts, heating system issues, or environmental changes. Move plant if necessary.',
      source: 'Temperature Sensor #1',
      priority: 1,
      estimatedImpact: 'Potential cellular damage',
      autoResolveIn: undefined
    },
    {
      id: '6',
      type: 'info',
      title: 'Hydroponic System Optimization',
      message: 'Nutrient flow rate automatically adjusted for optimal uptake - efficiency increased 12%',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      isResolved: false,
      category: 'hydroponic',
      canDismiss: true,
      canResolve: true,
      canSnooze: false,
      explanation: 'Smart system automatically optimized nutrient delivery based on plant uptake patterns.',
      recommendation: 'Monitor results over next 48 hours. System learning will continue to improve efficiency.',
      source: 'Hydroponic AI Controller',
      priority: 5,
      estimatedImpact: 'Improved nutrient efficiency',
      autoResolveIn: '48 hours'
    }
  ]);
  // Simulate live alerts
  useEffect(() => {
    if (!liveMode) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const newAlert: AlertWithActions = {
          id: Date.now().toString(),
          type: Math.random() < 0.3 ? 'critical' : Math.random() < 0.6 ? 'warning' : 'info',
          title: 'New Environmental Change',
          message: 'Live monitoring detected a parameter change',
          timestamp: new Date().toISOString(),
          isResolved: false,
          category: 'sensor',
          canDismiss: true,
          canResolve: true,
          canSnooze: true,
          source: 'Live Monitoring',
          priority: Math.floor(Math.random() * 5) + 1,
          estimatedImpact: 'Minor adjustment needed'
        };
        
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [liveMode]);

  const filteredAlerts = alerts.filter(alert => {
    const matchesTab = activeTab === 'active' ? !alert.isResolved : 
                     activeTab === 'resolved' ? alert.isResolved : true;
    const matchesSeverity = severityFilter === 'all' || alert.type === severityFilter;
    const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
                         alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSeverity && matchesCategory && matchesSearch;
  }).sort((a, b) => a.priority - b.priority);

  const alertCounts = {
    active: alerts.filter(a => !a.isResolved).length,
    critical: alerts.filter(a => !a.isResolved && a.type === 'critical').length,
    resolved: alerts.filter(a => a.isResolved).length,
    total: alerts.length
  };

  const handleBulkAction = (action: 'dismiss' | 'resolve' | 'snooze') => {
    setAlerts(prev => prev.map(alert => {
      if (selectedAlerts.has(alert.id)) {
        if (action === 'resolve') {
          return { ...alert, isResolved: true };
        }
        // Handle other bulk actions
      }
      return alert;
    }));
    setSelectedAlerts(new Set());
    setShowBulkActions(false);
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getSeverityColor = (type: string) => {
    switch (type) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'warning': return 'from-amber-500 to-amber-600';
      case 'info': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sensor': return Gauge;
      case 'device': return Wifi;
      case 'plant': return Activity;
      case 'hydroponic': return Droplets;
      default: return AlertCircle;
    }
  };
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-red-50 to-amber-50 min-h-screen">
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <MagicRings
            color="#EF4444"
            colorTwo="#F59E0B"
            ringCount={3}
            speed={2}
            baseRadius={0.3}
            radiusStep={0.1}
            opacity={0.6}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold mb-3"
            >
              <ShinyText 
                text="Alert Command Center" 
                className="text-4xl font-bold"
                color="#DC2626"
                shineColor="#F59E0B"
                speed={2.5}
              />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Real-time monitoring and intelligent alert management
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-4 mt-6 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setLiveMode(!liveMode)}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                liveMode 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg' 
                  : 'bg-white/80 text-gray-600 border border-gray-200'
              }`}
            >
              {liveMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{liveMode ? 'Live' : 'Paused'}</span>
            </motion.button>
            
            <StarBorder
              as="button"
              color="#EF4444"
              speed="3s"
              onClick={() => setIsLoading(true)}
              className="px-6 py-3 text-sm font-medium transition-all hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </StarBorder>
          </div>
        </div>
      </motion.div>

      {/* Alert Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { 
            title: 'Active Alerts', 
            value: alertCounts.active, 
            change: '+2', 
            trend: 'up', 
            icon: Bell,
            color: 'red',
            description: 'Requiring attention'
          },
          { 
            title: 'Critical Issues', 
            value: alertCounts.critical, 
            change: '+1', 
            trend: 'up', 
            icon: AlertTriangle,
            color: 'red',
            description: 'Immediate action needed'
          },
          { 
            title: 'Resolved Today', 
            value: alertCounts.resolved, 
            change: '+5', 
            trend: 'up', 
            icon: CheckCircle,
            color: 'emerald',
            description: 'Successfully handled'
          },
          { 
            title: 'System Health', 
            value: 94, 
            suffix: '%',
            change: '+2%', 
            trend: 'up', 
            icon: Shield,
            color: 'blue',
            description: 'Overall system status'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20" />
            <div className="relative p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <metric.icon className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-bold ${
                  metric.trend === 'up' ? 'text-red-600' : 'text-emerald-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                  {metric.suffix && <span className="text-xl font-semibold text-gray-500">{metric.suffix}</span>}
                </div>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Controls & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30" />
        <div className="relative p-6 rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                { id: 'active' as AlertTab, label: 'Active', count: alertCounts.active },
                { id: 'resolved' as AlertTab, label: 'Resolved', count: alertCounts.resolved },
                { id: 'history' as AlertTab, label: 'History', count: alertCounts.total }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 text-sm font-bold rounded-lg transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id ? 'bg-gray-100' : 'bg-gray-200'
                  }`}>
                    {tab.count}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Search & Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as AlertSeverity)}
                className="px-4 py-2 bg-white/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as AlertCategory)}
                className="px-4 py-2 bg-white/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Categories</option>
                <option value="sensor">Sensor</option>
                <option value="device">Device</option>
                <option value="plant">Plant</option>
                <option value="hydroponic">Hydroponic</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedAlerts.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30" />
            <div className="relative p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  {selectedAlerts.size} alert{selectedAlerts.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('resolve')}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  Resolve All
                </button>
                <button
                  onClick={() => handleBulkAction('dismiss')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Dismiss All
                </button>
                <button
                  onClick={() => setSelectedAlerts(new Set())}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30" />
              <div className="relative p-12 rounded-3xl text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">All Clear!</h3>
                <p className="text-gray-600">No alerts match your current filters. Your system is running smoothly.</p>
              </div>
            </motion.div>
          ) : (
            filteredAlerts.map((alert, index) => {
              const SeverityIcon = getSeverityIcon(alert.type);
              const CategoryIcon = getCategoryIcon(alert.category);
              const isExpanded = expandedAlert === alert.id;
              const isSelected = selectedAlerts.has(alert.id);
              
              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 backdrop-blur-xl rounded-2xl shadow-lg border transition-all ${
                    alert.type === 'critical' 
                      ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-200/50' 
                      : alert.type === 'warning'
                      ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-200/50'
                      : 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-200/50'
                  } ${isSelected ? 'ring-2 ring-blue-500' : ''}`} />
                  
                  <div className="relative p-6 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      {/* Selection Checkbox */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                          const newSelected = new Set(selectedAlerts);
                          if (isSelected) {
                            newSelected.delete(alert.id);
                          } else {
                            newSelected.add(alert.id);
                          }
                          setSelectedAlerts(newSelected);
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </motion.button>

                      {/* Alert Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getSeverityColor(alert.type)} shadow-lg`}>
                        <SeverityIcon className="w-6 h-6 text-white" />
                      </div>

                      {/* Alert Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                              {alert.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                alert.type === 'critical' ? 'bg-red-100 text-red-700' :
                                alert.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {alert.type.toUpperCase()}
                              </span>
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                Priority {alert.priority}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(alert.timestamp))} ago</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 leading-relaxed">{alert.message}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <span className="font-medium">Source:</span>
                              <span>{alert.source}</span>
                            </div>
                            {alert.estimatedImpact && (
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <Target className="w-4 h-4" />
                                <span>{alert.estimatedImpact}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {alert.canSnooze && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                              >
                                Snooze
                              </motion.button>
                            )}
                            {alert.canResolve && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                              >
                                Resolve
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </motion.button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-200/50"
                            >
                              {alert.explanation && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                    <Brain className="w-4 h-4" />
                                    <span>Why This Happened</span>
                                  </h4>
                                  <p className="text-gray-700 text-sm leading-relaxed">{alert.explanation}</p>
                                </div>
                              )}
                              
                              {alert.recommendation && (
                                <div className="mb-4">
                                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                    <Lightbulb className="w-4 h-4" />
                                    <span>Recommended Action</span>
                                  </h4>
                                  <p className="text-gray-700 text-sm leading-relaxed">{alert.recommendation}</p>
                                </div>
                              )}

                              {alert.autoResolveIn && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>Auto-resolves in: {alert.autoResolveIn}</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Alerts;