import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Download, 
  BarChart3, 
  Activity, 
  Zap, 
  Droplets, 
  Thermometer, 
  Eye, 
  Beaker,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import CountUp from 'react-countup';
import { format, subDays, subHours } from 'date-fns';
import { getHistoricalData, getCurrentReadings, getPlantHealthScore } from '../services/sensorService';
import { plantsDatabase } from '../data/plants';

type TimeRange = '24h' | '7d' | '30d' | '90d';
type MetricFilter = 'all' | 'moisture' | 'ph' | 'temperature' | 'humidity' | 'light' | 'nutrients';

interface AnalyticsData {
  timestamp: string;
  moisture: number;
  ph: number;
  temperature: number;
  humidity: number;
  light: number;
  nutrients: number;
  healthScore: number;
}

interface InsightCard {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [metricFilter, setMetricFilter] = useState<MetricFilter>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [currentReadings, setCurrentReadings] = useState(getCurrentReadings());
  const [selectedPlant] = useState(plantsDatabase[0]);
  const [healthScore, setHealthScore] = useState(getPlantHealthScore(currentReadings, selectedPlant));
  const [showComparison, setShowComparison] = useState(false);

  // Generate mock analytics data
  useEffect(() => {
    setIsLoading(true);
    
    const generateData = () => {
      const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : timeRange === '30d' ? 720 : 2160;
      const interval = timeRange === '24h' ? 1 : timeRange === '7d' ? 6 : timeRange === '30d' ? 24 : 72;
      
      const data: AnalyticsData[] = [];
      const now = new Date();
      
      for (let i = hours; i >= 0; i -= interval) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        const baseHealth = 75 + Math.sin(i / 24) * 15 + Math.random() * 10;
        
        data.push({
          timestamp: format(timestamp, timeRange === '24h' ? 'HH:mm' : 'MMM dd'),
          moisture: 45 + Math.sin(i / 12) * 15 + Math.random() * 8,
          ph: 6.2 + Math.sin(i / 18) * 0.8 + Math.random() * 0.3,
          temperature: 22 + Math.sin(i / 24) * 4 + Math.random() * 2,
          humidity: 55 + Math.sin(i / 16) * 20 + Math.random() * 5,
          light: 1500 + Math.sin(i / 12) * 800 + Math.random() * 200,
          nutrients: 950 + Math.sin(i / 20) * 150 + Math.random() * 50,
          healthScore: Math.max(0, Math.min(100, baseHealth))
        });
      }
      
      return data.reverse();
    };

    setTimeout(() => {
      setAnalyticsData(generateData());
      setIsLoading(false);
    }, 800);
  }, [timeRange]);

  const insights: InsightCard[] = [
    {
      id: '1',
      title: 'Optimal Growth Window Detected',
      description: 'Your plant experienced ideal conditions for 6 hours yesterday, leading to accelerated growth.',
      type: 'success',
      impact: 'high',
      confidence: 94
    },
    {
      id: '2',
      title: 'Moisture Pattern Optimization',
      description: 'Adjusting watering schedule by 2 hours could improve nutrient uptake by 15%.',
      type: 'info',
      impact: 'medium',
      confidence: 87
    },
    {
      id: '3',
      title: 'pH Drift Trend',
      description: 'Gradual pH increase detected over 5 days. Consider soil amendment within 48 hours.',
      type: 'warning',
      impact: 'medium',
      confidence: 91
    }
  ];

  const timeRanges = [
    { value: '24h' as TimeRange, label: '24 Hours' },
    { value: '7d' as TimeRange, label: '7 Days' },
    { value: '30d' as TimeRange, label: '30 Days' },
    { value: '90d' as TimeRange, label: '90 Days' }
  ];

  const metricFilters = [
    { value: 'all' as MetricFilter, label: 'All Metrics', icon: BarChart3 },
    { value: 'moisture' as MetricFilter, label: 'Moisture', icon: Droplets },
    { value: 'ph' as MetricFilter, label: 'pH Level', icon: Beaker },
    { value: 'temperature' as MetricFilter, label: 'Temperature', icon: Thermometer },
    { value: 'humidity' as MetricFilter, label: 'Humidity', icon: Activity },
    { value: 'light' as MetricFilter, label: 'Light', icon: Eye },
    { value: 'nutrients' as MetricFilter, label: 'Nutrients', icon: Zap }
  ];

  const getMetricColor = (metric: string) => {
    const colors = {
      moisture: '#3B82F6',
      ph: '#8B5CF6',
      temperature: '#EF4444',
      humidity: '#06B6D4',
      light: '#F59E0B',
      nutrients: '#10B981',
      healthScore: '#059669'
    };
    return colors[metric as keyof typeof colors] || '#6B7280';
  };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="h-80 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
          />
        </div>
      );
    }

    if (metricFilter === 'all') {
      return (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
              }} 
            />
            <Line type="monotone" dataKey="healthScore" stroke="#059669" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="moisture" stroke="#3B82F6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="humidity" stroke="#06B6D4" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="timestamp" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
            }} 
          />
          <Area 
            type="monotone" 
            dataKey={metricFilter} 
            stroke={getMetricColor(metricFilter)} 
            fill={getMetricColor(metricFilter)}
            fillOpacity={0.2}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Advanced insights and performance metrics for your plants</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {showComparison ? 'Hide' : 'Show'} Comparison
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { 
            title: 'Plant Health Score', 
            value: healthScore.overall, 
            suffix: '%', 
            change: '+3.2%', 
            trend: 'up', 
            icon: Activity,
            color: 'emerald'
          },
          { 
            title: 'Growth Rate', 
            value: 127, 
            suffix: '%', 
            change: '+12%', 
            trend: 'up', 
            icon: TrendingUp,
            color: 'blue'
          },
          { 
            title: 'Stress Events', 
            value: 2, 
            suffix: '', 
            change: '-50%', 
            trend: 'down', 
            icon: AlertTriangle,
            color: 'amber'
          },
          { 
            title: 'Optimal Hours', 
            value: 18.5, 
            suffix: 'h', 
            change: '+2.1h', 
            trend: 'up', 
            icon: Clock,
            color: 'purple'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${metric.color}-100 flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{metric.change}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <div className="flex items-baseline space-x-1">
                <CountUp
                  end={metric.value}
                  duration={2}
                  decimals={metric.suffix === 'h' ? 1 : 0}
                  className="text-2xl font-bold text-gray-900"
                />
                <span className="text-lg font-semibold text-gray-500">{metric.suffix}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        {/* Time Range Selector */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  timeRange === range.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Filters */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {metricFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => setMetricFilter(filter.value)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-2 ${
                    metricFilter === filter.value
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Main Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {metricFilter === 'all' ? 'Multi-Metric Overview' : `${metricFilters.find(f => f.value === metricFilter)?.label} Trend`}
          </h3>
          <motion.button
            whileHover={{ rotate: 180 }}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
        
        {renderChart()}
      </motion.div>

      {/* AI Insights Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                  <p className="text-sm text-gray-600">Intelligent analysis of your plant's performance</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-xl border-l-4 ${
                    insight.type === 'success' ? 'bg-emerald-50 border-emerald-500' :
                    insight.type === 'warning' ? 'bg-amber-50 border-amber-500' :
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {insight.impact} impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Confidence:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{insight.confidence}%</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Score Radial Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Health Breakdown</h3>
          
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="80%" data={[
                { name: 'Health', value: healthScore.overall, fill: '#059669' }
              ]}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#059669" />
              </RadialBarChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{healthScore.overall}%</div>
                <div className="text-sm text-gray-600">Overall Health</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            {Object.entries(healthScore.factors).map(([factor, score]) => (
              <div key={factor} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 capitalize">{factor}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{Math.round(score)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Comparison Mode */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Current vs Ideal Conditions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { metric: 'Moisture', current: currentReadings.moisture, ideal: selectedPlant.idealConditions.moisture, unit: '%' },
                { metric: 'pH', current: currentReadings.ph, ideal: selectedPlant.idealConditions.ph, unit: '' },
                { metric: 'Temperature', current: currentReadings.temperature, ideal: selectedPlant.idealConditions.temperature, unit: '°C' },
                { metric: 'Humidity', current: currentReadings.humidity, ideal: selectedPlant.idealConditions.humidity, unit: '%' }
              ].map((item) => (
                <div key={item.metric} className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-3">{item.metric}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current</span>
                      <span className="font-semibold text-gray-900">{item.current.toFixed(1)}{item.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ideal Range</span>
                      <span className="font-semibold text-emerald-600">
                        {item.ideal.min.toFixed(1)} - {item.ideal.max.toFixed(1)}{item.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.current >= item.ideal.min && item.current <= item.ideal.max 
                            ? 'bg-emerald-500' 
                            : 'bg-amber-500'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (item.current / (item.ideal.max * 1.2)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analytics;