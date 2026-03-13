import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  Clock, 
  Zap, 
  Eye, 
  MessageCircle, 
  RefreshCw,
  ChevronRight,
  Star,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  Calendar,
  Activity,
  Droplets,
  Thermometer,
  Beaker,
  Sun,
  Shield,
  Leaf,
  BarChart3,
  TrendingDown,
  Plus,
  Send,
  Cpu,
  Gauge,
  Layers,
  Wand2,
  Atom,
  Microscope,
  FlaskConical,
  Dna,
  Orbit
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import Orb from './ui/Orb';
import StarBorder from './ui/StarBorder';
import MagicRings from './ui/MagicRings';
import ShinyText from './ui/ShinyText';
import GlareHover from './ui/GlareHover';
interface AIInsight {
  id: string;
  title: string;
  description: string;
  reasoning: string;
  confidence: number;
  urgency: 'low' | 'medium' | 'high';
  category: 'watering' | 'lighting' | 'nutrients' | 'environment' | 'maintenance' | 'growth' | 'health' | 'prediction';
  expectedBenefit: string;
  actionSteps: string[];
  estimatedTime: string;
  type: 'recommendation' | 'prediction' | 'optimization' | 'alert' | 'discovery';
  impact: 'low' | 'medium' | 'high';
  timestamp: string;
  aiModel: string;
  dataPoints: number;
  successProbability: number;
}

interface QuickPrompt {
  id: string;
  text: string;
  icon: React.ComponentType<any>;
  category: string;
  gradient: string;
}

interface AIResponse {
  id: string;
  question: string;
  answer: string;
  confidence: number;
  timestamp: string;
  relatedInsights: string[];
}

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const [featuredInsightIndex, setFeaturedInsightIndex] = useState(0);
  const [showPredictions, setShowPredictions] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  // Enhanced mock AI insights data
  useEffect(() => {
    const mockInsights: AIInsight[] = [
      {
        id: '1',
        title: 'Optimal Watering Window Discovered',
        description: 'AI analysis reveals your plant absorbs water 23% more efficiently between 7-9 AM due to circadian rhythm patterns.',
        reasoning: 'Machine learning analysis of 2,847 data points over 30 days shows peak stomatal conductance occurs during morning hours when transpiration rates are optimal.',
        confidence: 94,
        urgency: 'medium',
        category: 'watering',
        expectedBenefit: '23% improvement in water uptake efficiency',
        actionSteps: [
          'Shift watering schedule to 7:30 AM daily',
          'Monitor soil moisture 2 hours post-watering',
          'Adjust volume based on absorption rate',
          'Track plant response over 7 days'
        ],
        estimatedTime: '2 minutes daily',
        type: 'optimization',
        impact: 'high',
        timestamp: new Date().toISOString(),
        aiModel: 'PlantCare Neural Network v3.2',
        dataPoints: 2847,
        successProbability: 89
      },
      {
        id: '2',
        title: 'Growth Acceleration Pattern Detected',
        description: 'Predictive models indicate potential 31% growth rate increase by adjusting light exposure timing and nutrient delivery.',
        reasoning: 'Deep learning analysis of photosynthetic efficiency curves combined with nutrient uptake patterns suggests synchronized optimization opportunity.',
        confidence: 87,
        urgency: 'high',
        category: 'growth',
        expectedBenefit: '31% faster growth rate with improved leaf development',
        actionSteps: [
          'Increase morning light exposure by 45 minutes',
          'Apply liquid fertilizer 30 minutes before peak light',
          'Maintain consistent temperature during growth spurts',
          'Monitor new leaf emergence weekly'
        ],
        estimatedTime: '5 minutes daily',
        type: 'prediction',
        impact: 'high',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        aiModel: 'Growth Prediction Engine v2.1',
        dataPoints: 4521,
        successProbability: 92
      },
      {
        id: '3',
        title: 'Stress Prevention Algorithm',
        description: 'AI detected early stress indicators 72 hours before visible symptoms. Preventive measures can eliminate 95% of potential damage.',
        reasoning: 'Advanced pattern recognition identified micro-changes in leaf reflectance and growth velocity that precede stress manifestation.',
        confidence: 96,
        urgency: 'high',
        category: 'health',
        expectedBenefit: 'Prevention of stress-related damage and growth setbacks',
        actionSteps: [
          'Increase humidity by 8% immediately',
          'Reduce light intensity by 15% for 48 hours',
          'Apply foliar spray with stress-reducing compounds',
          'Monitor recovery indicators'
        ],
        estimatedTime: '10 minutes setup',
        type: 'alert',
        impact: 'high',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        aiModel: 'Stress Prediction Matrix v4.0',
        dataPoints: 1892,
        successProbability: 95
      },
      {
        id: '4',
        title: 'Nutrient Synergy Optimization',
        description: 'Machine learning discovered optimal nutrient combinations that increase absorption by 28% when applied in specific sequences.',
        reasoning: 'Analysis of molecular interaction patterns and uptake kinetics reveals synergistic effects between nitrogen, phosphorus, and micronutrients.',
        confidence: 91,
        urgency: 'medium',
        category: 'nutrients',
        expectedBenefit: '28% improved nutrient utilization efficiency',
        actionSteps: [
          'Apply nitrogen-rich solution first',
          'Wait 15 minutes, then add phosphorus supplement',
          'Follow with micronutrient blend after 30 minutes',
          'Track leaf color changes over 2 weeks'
        ],
        estimatedTime: '3 minutes per application',
        type: 'discovery',
        impact: 'medium',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        aiModel: 'Nutrient Optimization AI v1.8',
        dataPoints: 3156,
        successProbability: 85
      },
      {
        id: '5',
        title: 'Environmental Harmony Protocol',
        description: 'AI identified perfect environmental balance that mimics your plant\'s native habitat, potentially extending lifespan by 40%.',
        reasoning: 'Biomimetic analysis of native ecosystem conditions combined with plant genetic markers suggests optimal environmental parameters.',
        confidence: 88,
        urgency: 'low',
        category: 'environment',
        expectedBenefit: '40% lifespan extension with enhanced vitality',
        actionSteps: [
          'Adjust temperature to 22.3°C during day, 18.7°C at night',
          'Maintain humidity at 67% with gentle air circulation',
          'Implement 14.5-hour light cycle with gradual transitions',
          'Monitor adaptation over 30 days'
        ],
        estimatedTime: '15 minutes initial setup',
        type: 'recommendation',
        impact: 'high',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        aiModel: 'Ecosystem Simulation Engine v2.3',
        dataPoints: 5847,
        successProbability: 78
      },
      {
        id: '6',
        title: 'Predictive Maintenance Alert',
        description: 'AI forecasts potential root system issues in 5-7 days based on subtle changes in water uptake patterns.',
        reasoning: 'Predictive analytics detected anomalous water absorption rates that historically precede root health complications.',
        confidence: 82,
        urgency: 'medium',
        category: 'prediction',
        expectedBenefit: 'Prevention of root rot and associated complications',
        actionSteps: [
          'Inspect root system for early signs of stress',
          'Improve drainage by adding perlite to soil mix',
          'Reduce watering frequency by 20% temporarily',
          'Apply beneficial bacteria supplement'
        ],
        estimatedTime: '20 minutes inspection and treatment',
        type: 'prediction',
        impact: 'medium',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        aiModel: 'Predictive Health Monitor v3.1',
        dataPoints: 2341,
        successProbability: 73
      }
    ];

    setInsights(mockInsights);
  }, []);

  const quickPrompts: QuickPrompt[] = [
    { 
      id: '1', 
      text: 'Why is my plant stressed?', 
      icon: AlertTriangle, 
      category: 'diagnosis',
      gradient: 'from-red-500 to-orange-500'
    },
    { 
      id: '2', 
      text: 'What should I do today?', 
      icon: Calendar, 
      category: 'daily',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: '3', 
      text: 'Optimize growth rate', 
      icon: TrendingUp, 
      category: 'optimization',
      gradient: 'from-emerald-500 to-green-500'
    },
    { 
      id: '4', 
      text: 'Explain recent alerts', 
      icon: Info, 
      category: 'explanation',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: '5', 
      text: 'Improve moisture stability', 
      icon: Droplets, 
      category: 'improvement',
      gradient: 'from-cyan-500 to-blue-500'
    },
    { 
      id: '6', 
      text: 'Predict next week\'s needs', 
      icon: Brain, 
      category: 'prediction',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];
  // Simulate AI responses
  const handleAskAI = async (question: string) => {
    setIsAsking(true);
    setAiThinking(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResponses = {
      'Why is my plant stressed?': 'Based on sensor data analysis, your plant is experiencing mild stress due to inconsistent watering patterns and suboptimal light exposure. The AI detected 15% reduction in photosynthetic efficiency over the past 3 days.',
      'What should I do today?': 'Today\'s AI recommendations: 1) Water at 7:30 AM (optimal absorption window), 2) Rotate plant 45° for even light exposure, 3) Check soil pH (trending upward), 4) Apply diluted liquid fertilizer if soil moisture is above 40%.',
      'Optimize growth rate': 'Growth optimization protocol activated: Increase morning light by 30 minutes, adjust nutrient timing to coincide with peak photosynthesis, maintain temperature at 23°C during growth spurts. Expected 25% growth rate improvement.',
      'Explain recent alerts': 'Recent alerts were triggered by: 1) Moisture sensor detecting 18% drop in 6 hours, 2) pH drift from 6.2 to 7.1 over 48 hours, 3) Temperature fluctuation outside optimal range. All issues are manageable with immediate attention.',
      'Improve moisture stability': 'Moisture stability enhancement: Add water-retention crystals to soil, implement drip irrigation system, adjust watering schedule to twice daily with smaller volumes, monitor soil composition for drainage issues.',
      'Predict next week\'s needs': 'Next week predictions: Expect 12% increase in water needs due to growth spurt, nutrient requirements will rise by 8%, light exposure should increase gradually by 15 minutes daily. Potential repotting needed in 10-14 days.'
    };
    
    const response: AIResponse = {
      id: Date.now().toString(),
      question,
      answer: mockResponses[question as keyof typeof mockResponses] || 'AI is analyzing your specific situation and will provide detailed insights based on your plant\'s unique data patterns and environmental conditions.',
      confidence: Math.floor(Math.random() * 20) + 80,
      timestamp: new Date().toISOString(),
      relatedInsights: insights.slice(0, 2).map(i => i.id)
    };
    
    setAiResponses(prev => [response, ...prev]);
    setAiQuestion('');
    setIsAsking(false);
    setAiThinking(false);
  };

  // Rotate featured insights
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedInsightIndex(prev => (prev + 1) % Math.min(insights.length, 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [insights.length]);

  const filteredInsights = insights.filter(insight => 
    selectedCategory === 'all' || insight.category === selectedCategory
  );

  const categories = [
    { id: 'all', label: 'All Insights', icon: Brain, color: 'purple' },
    { id: 'watering', label: 'Watering', icon: Droplets, color: 'blue' },
    { id: 'growth', label: 'Growth', icon: TrendingUp, color: 'emerald' },
    { id: 'health', label: 'Health', icon: Shield, color: 'red' },
    { id: 'nutrients', label: 'Nutrients', icon: Zap, color: 'amber' },
    { id: 'environment', label: 'Environment', icon: Sun, color: 'orange' },
    { id: 'prediction', label: 'Predictions', icon: Eye, color: 'indigo' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'from-red-500 to-red-600';
      case 'medium': return 'from-amber-500 to-amber-600';
      case 'low': return 'from-emerald-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return Lightbulb;
      case 'prediction': return Eye;
      case 'optimization': return Target;
      case 'alert': return AlertTriangle;
      case 'discovery': return Microscope;
      default: return Info;
    }
  };
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Premium Header with AI Orb */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute top-0 right-0 w-40 h-40 opacity-40">
          <Orb 
            hue={270}
            hoverIntensity={0.4}
            rotateOnHover={true}
            backgroundColor="transparent"
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
                text="AI Intelligence Hub" 
                className="text-4xl font-bold"
                color="#7C3AED"
                shineColor="#EC4899"
                speed={2.5}
              />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Advanced machine learning insights and predictive plant care
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-4 mt-6 lg:mt-0">
            <StarBorder
              as="button"
              color="#7C3AED"
              speed="3s"
              onClick={() => setShowPredictions(!showPredictions)}
              className="px-6 py-3 text-sm font-medium transition-all hover:scale-105"
            >
              {showPredictions ? 'Hide' : 'Show'} Predictions
            </StarBorder>
            
            <GlareHover
              width="auto"
              height="auto"
              background="linear-gradient(135deg, #7C3AED, #EC4899)"
              borderRadius="12px"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={0.3}
            >
              <button className="px-6 py-3 text-white font-medium rounded-xl flex items-center space-x-2 transition-all hover:scale-105">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Insights</span>
              </button>
            </GlareHover>
          </div>
        </div>
      </motion.div>

      {/* AI Assistant Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30" />
        <div className="relative p-8 rounded-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative w-16 h-16">
              {aiThinking ? (
                <MagicRings
                  color="#7C3AED"
                  colorTwo="#EC4899"
                  ringCount={3}
                  speed={3}
                  baseRadius={0.2}
                  radiusStep={0.1}
                  opacity={0.8}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">AI Plant Assistant</h3>
              <p className="text-gray-600">Ask me anything about your plant's care and optimization</p>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {quickPrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <motion.button
                  key={prompt.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAskAI(prompt.text)}
                  disabled={isAsking}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${prompt.gradient} opacity-20 rounded-xl`} />
                  <div className="relative p-4 rounded-xl border border-white/20 backdrop-blur-sm bg-white/80 hover:bg-white/90 transition-all">
                    <Icon className="w-5 h-5 text-gray-700 mb-2 mx-auto" />
                    <p className="text-xs font-medium text-gray-700 text-center leading-tight">{prompt.text}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Custom Question Input */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && aiQuestion.trim() && handleAskAI(aiQuestion)}
                placeholder="Ask AI about your plant's care, growth, or any concerns..."
                disabled={isAsking}
                className="w-full px-6 py-4 bg-white/80 border border-white/30 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
              {isAsking && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => aiQuestion.trim() && handleAskAI(aiQuestion)}
              disabled={isAsking || !aiQuestion.trim()}
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Ask</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      {/* AI Responses */}
      <AnimatePresence>
        {aiResponses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {aiResponses.map((response, index) => (
              <motion.div
                key={response.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30" />
                <div className="relative p-6 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-gray-900">Q: {response.question}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {response.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{response.answer}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{format(new Date(response.timestamp), 'MMM dd, HH:mm')}</span>
                        {response.relatedInsights.length > 0 && (
                          <span>{response.relatedInsights.length} related insights</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 text-white shadow-lg`
                  : 'bg-white/80 text-gray-600 hover:bg-white border border-white/20 backdrop-blur-sm'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {category.id === 'all' ? insights.length : insights.filter(i => i.category === category.id).length}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Featured Insights Carousel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30" />
        <div className="relative p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Featured AI Insights</h3>
                <p className="text-gray-600">Top priority recommendations for optimal plant care</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {insights.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFeaturedInsightIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === featuredInsightIndex ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {insights.slice(0, 3).map((insight, index) => {
              if (index !== featuredInsightIndex) return null;
              
              const TypeIcon = getTypeIcon(insight.type);
              
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getUrgencyColor(insight.urgency)} opacity-10 rounded-2xl`} />
                  <div className="relative p-6 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getUrgencyColor(insight.urgency)} flex items-center justify-center shadow-lg`}>
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{insight.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                              insight.urgency === 'high' ? 'bg-red-100 text-red-700' :
                              insight.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {insight.urgency.toUpperCase()} PRIORITY
                            </span>
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                              {insight.aiModel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{insight.confidence}%</div>
                        <div className="text-sm text-gray-600">Confidence</div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">{insight.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white/50 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-gray-700">Expected Benefit</span>
                        </div>
                        <p className="text-sm text-gray-900 font-semibold">{insight.expectedBenefit}</p>
                      </div>
                      <div className="bg-white/50 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Time Required</span>
                        </div>
                        <p className="text-sm text-gray-900 font-semibold">{insight.estimatedTime}</p>
                      </div>
                      <div className="bg-white/50 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">Success Rate</span>
                        </div>
                        <p className="text-sm text-gray-900 font-semibold">{insight.successProbability}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Cpu className="w-4 h-4" />
                          <span>{insight.dataPoints.toLocaleString()} data points</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{format(new Date(insight.timestamp), 'MMM dd, HH:mm')}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setExpandedInsight(insight.id)}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-blue-600 transition-all flex items-center space-x-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* All Insights Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence>
          {filteredInsights.map((insight, index) => {
            const TypeIcon = getTypeIcon(insight.type);
            const isExpanded = expandedInsight === insight.id;
            
            return (
              <motion.div
                key={insight.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getUrgencyColor(insight.urgency)} opacity-10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30`} />
                <div className="relative p-6 rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getUrgencyColor(insight.urgency)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{insight.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            insight.urgency === 'high' ? 'bg-red-100 text-red-700' :
                            insight.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {insight.urgency}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full capitalize">
                            {insight.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{insight.confidence}%</div>
                      <div className="text-xs text-gray-600">AI Confidence</div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">{insight.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{insight.impact} impact</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{insight.estimatedTime}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </motion.button>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200/50 pt-4 space-y-4"
                      >
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <Brain className="w-4 h-4" />
                            <span>AI Reasoning</span>
                          </h5>
                          <p className="text-sm text-gray-700 leading-relaxed">{insight.reasoning}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                            <Lightbulb className="w-4 h-4" />
                            <span>Action Steps</span>
                          </h5>
                          <ul className="space-y-2">
                            {insight.actionSteps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                                <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="bg-white/50 rounded-lg p-3">
                            <div className="text-xs text-gray-600 mb-1">Expected Benefit</div>
                            <div className="text-sm font-semibold text-gray-900">{insight.expectedBenefit}</div>
                          </div>
                          <div className="bg-white/50 rounded-lg p-3">
                            <div className="text-xs text-gray-600 mb-1">Success Probability</div>
                            <div className="text-sm font-semibold text-gray-900">{insight.successProbability}%</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                          <span>Model: {insight.aiModel}</span>
                          <span>{insight.dataPoints.toLocaleString()} data points analyzed</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Predictions Panel */}
      <AnimatePresence>
        {showPredictions && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30" />
            <div className="relative p-8 rounded-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Predictions</h3>
                  <p className="text-gray-600">Future insights based on current trends and patterns</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Next 3 Days',
                    prediction: 'Optimal growth conditions expected. 18% increase in photosynthetic activity predicted.',
                    confidence: 92,
                    icon: Calendar,
                    color: 'emerald'
                  },
                  {
                    title: 'Next Week',
                    prediction: 'Potential nutrient deficiency detected. Recommend phosphorus supplement by day 5.',
                    confidence: 78,
                    icon: AlertTriangle,
                    color: 'amber'
                  },
                  {
                    title: 'Next Month',
                    prediction: 'Growth spurt anticipated. Consider repotting and increased feeding schedule.',
                    confidence: 85,
                    icon: TrendingUp,
                    color: 'blue'
                  }
                ].map((prediction, index) => {
                  const Icon = prediction.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${prediction.color}-500/20 to-${prediction.color}-600/20 backdrop-blur-sm rounded-2xl border border-white/20`} />
                      <div className="relative p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-${prediction.color}-500 to-${prediction.color}-600 flex items-center justify-center shadow-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{prediction.title}</h4>
                            <div className="text-sm text-gray-600">{prediction.confidence}% confidence</div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{prediction.prediction}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIInsights;