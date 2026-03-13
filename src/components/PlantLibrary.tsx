import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Heart, 
  Eye, 
  ChevronRight,
  Leaf,
  Droplets,
  Sun,
  Home,
  Award,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  BookOpen,
  ArrowRight,
  X,
  Check,
  Sparkles,
  Brain,
  Target,
  Layers,
  Gauge,
  FlaskConical,
  Microscope,
  Atom,
  Dna,
  TreePine,
  Flower,
  Sprout,
  Cherry,
  Apple,
  Coffee,
  Wheat
} from 'lucide-react';
import { PlantData } from '../types';
import { plantsDatabase } from '../data/plants';
import Orb from './ui/Orb';
import StarBorder from './ui/StarBorder';
import MagicRings from './ui/MagicRings';
import ShinyText from './ui/ShinyText';
import GlareHover from './ui/GlareHover';
interface ExtendedPlantData extends PlantData {
  rating: number;
  growthRate: 'slow' | 'medium' | 'fast';
  airPurifying: boolean;
  petSafe: boolean;
  trending: boolean;
  featured: boolean;
  careScore: number;
  compatibility: number;
  popularityRank: number;
  seasonalAvailability: string[];
  nativeRegion: string;
  maxSize: string;
  lifespan: string;
  benefits: string[];
  companions: string[];
}

const PlantLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<ExtendedPlantData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPlants, setComparisonPlants] = useState<string[]>([]);
  const [featuredPlantIndex, setFeaturedPlantIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Enhanced plant database with premium features
  const [plants] = useState<ExtendedPlantData[]>([
    {
      ...plantsDatabase[0],
      rating: 4.8,
      growthRate: 'medium',
      airPurifying: true,
      petSafe: false,
      trending: true,
      featured: true,
      careScore: 85,
      compatibility: 92,
      popularityRank: 1,
      seasonalAvailability: ['spring', 'summer', 'fall'],
      nativeRegion: 'Mediterranean',
      maxSize: '60-90cm',
      lifespan: '2-3 years',
      benefits: ['Culinary use', 'Aromatherapy', 'Natural pest deterrent'],
      companions: ['Rosemary', 'Thyme', 'Oregano']
    },
    {
      id: 'fiddle-leaf-fig',
      name: 'Fiddle Leaf Fig',
      category: 'houseplants',
      difficulty: 'intermediate',
      isHydroponicFriendly: false,
      isIndoor: true,
      sunlightPreference: 'high',
      idealConditions: {
        ph: { min: 6.0, max: 7.0 },
        temperature: { min: 18, max: 26 },
        humidity: { min: 50, max: 70 },
        moisture: { min: 40, max: 60 }
      },
      imageUrl: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
      description: 'Stunning architectural houseplant with large, violin-shaped leaves that make a bold statement in any room.',
      careInstructions: {
        watering: 'Water when top inch of soil is dry, typically weekly',
        fertilizing: 'Monthly liquid fertilizer during growing season',
        pruning: 'Remove dead or damaged leaves, pinch growing tips',
        repotting: 'Every 2-3 years in spring with well-draining soil'
      },
      commonIssues: ['Brown spots from overwatering', 'Leaf drop from environmental stress', 'Scale insects'],
      propagationMethod: 'Stem cuttings in water or soil',
      rating: 4.6,
      growthRate: 'slow',
      airPurifying: true,
      petSafe: false,
      trending: true,
      featured: true,
      careScore: 72,
      compatibility: 88,
      popularityRank: 2,
      seasonalAvailability: ['spring', 'summer'],
      nativeRegion: 'Western Africa',
      maxSize: '1.5-3m indoors',
      lifespan: '10+ years',
      benefits: ['Air purification', 'Statement decor', 'Stress reduction'],
      companions: ['Rubber Plant', 'Monstera', 'Bird of Paradise']
    },
    {
      id: 'boston-fern',
      name: 'Boston Fern',
      category: 'houseplants',
      difficulty: 'beginner',
      isHydroponicFriendly: true,
      isIndoor: true,
      sunlightPreference: 'medium',
      idealConditions: {
        ph: { min: 5.0, max: 6.5 },
        temperature: { min: 16, max: 24 },
        humidity: { min: 60, max: 80 },
        moisture: { min: 50, max: 70 }
      },
      imageUrl: 'https://images.pexels.com/photos/1445419/pexels-photo-1445419.jpeg',
      description: 'Classic fern with graceful, arching fronds that create a lush, tropical atmosphere. Excellent natural air purifier.',
      careInstructions: {
        watering: 'Keep soil consistently moist but not waterlogged',
        fertilizing: 'Bi-weekly with diluted liquid fertilizer',
        pruning: 'Remove brown or yellowing fronds regularly',
        repotting: 'Annually in spring with peat-based potting mix'
      },
      commonIssues: ['Brown tips from low humidity', 'Yellowing from overwatering', 'Scale insects'],
      propagationMethod: 'Division of root ball',
      rating: 4.4,
      growthRate: 'fast',
      airPurifying: true,
      petSafe: true,
      trending: false,
      featured: false,
      careScore: 90,
      compatibility: 95,
      popularityRank: 8,
      seasonalAvailability: ['year-round'],
      nativeRegion: 'Tropical Americas',
      maxSize: '60-90cm',
      lifespan: '5-10 years',
      benefits: ['Air purification', 'Humidity regulation', 'Low maintenance'],
      companions: ['Peace Lily', 'Pothos', 'Philodendron']
    },
    {
      id: 'monstera-deliciosa',
      name: 'Monstera Deliciosa',
      category: 'houseplants',
      difficulty: 'beginner',
      isHydroponicFriendly: true,
      isIndoor: true,
      sunlightPreference: 'medium',
      idealConditions: {
        ph: { min: 5.5, max: 7.0 },
        temperature: { min: 18, max: 27 },
        humidity: { min: 50, max: 70 },
        moisture: { min: 40, max: 60 }
      },
      imageUrl: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
      description: 'Instagram-famous plant with stunning split leaves and easy-care nature. Perfect for beginners wanting dramatic foliage.',
      careInstructions: {
        watering: 'Water when top 2 inches of soil are dry',
        fertilizing: 'Monthly during growing season with balanced fertilizer',
        pruning: 'Trim aerial roots and dead leaves as needed',
        repotting: 'Every 2 years or when rootbound'
      },
      commonIssues: ['Yellow leaves from overwatering', 'Brown tips from low humidity', 'Pest issues'],
      propagationMethod: 'Node cuttings in water or soil',
      rating: 4.9,
      growthRate: 'fast',
      airPurifying: true,
      petSafe: false,
      trending: true,
      featured: true,
      careScore: 95,
      compatibility: 98,
      popularityRank: 3,
      seasonalAvailability: ['year-round'],
      nativeRegion: 'Central America',
      maxSize: '2-3m indoors',
      lifespan: '20+ years',
      benefits: ['Air purification', 'Fast growth', 'Instagram worthy'],
      companions: ['Pothos', 'Philodendron', 'Snake Plant']
    },
    {
      id: 'snake-plant',
      name: 'Snake Plant',
      category: 'houseplants',
      difficulty: 'beginner',
      isHydroponicFriendly: false,
      isIndoor: true,
      sunlightPreference: 'low',
      idealConditions: {
        ph: { min: 6.0, max: 7.5 },
        temperature: { min: 15, max: 29 },
        humidity: { min: 30, max: 50 },
        moisture: { min: 20, max: 40 }
      },
      imageUrl: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
      description: 'Nearly indestructible plant with striking upright leaves. Perfect for beginners and low-light conditions.',
      careInstructions: {
        watering: 'Water every 2-3 weeks, less in winter',
        fertilizing: 'Rarely needed, once in spring if desired',
        pruning: 'Remove damaged leaves at soil level',
        repotting: 'Every 3-5 years when severely rootbound'
      },
      commonIssues: ['Root rot from overwatering', 'Pest issues rare'],
      propagationMethod: 'Leaf cuttings or division',
      rating: 4.7,
      growthRate: 'slow',
      airPurifying: true,
      petSafe: false,
      trending: false,
      featured: false,
      careScore: 98,
      compatibility: 99,
      popularityRank: 4,
      seasonalAvailability: ['year-round'],
      nativeRegion: 'West Africa',
      maxSize: '60-120cm',
      lifespan: '20+ years',
      benefits: ['Extremely low maintenance', 'Air purification', 'Low light tolerance'],
      companions: ['ZZ Plant', 'Pothos', 'Peace Lily']
    }
  ]);
  const categories = [
    { id: 'all', label: 'All Plants', icon: Leaf, count: plants.length, color: 'emerald' },
    { id: 'houseplants', label: 'Houseplants', icon: Home, count: plants.filter(p => p.category === 'houseplants').length, color: 'green' },
    { id: 'herbs', label: 'Herbs', icon: Coffee, count: plants.filter(p => p.category === 'herbs').length, color: 'emerald' },
    { id: 'succulents', label: 'Succulents', icon: Sprout, count: plants.filter(p => p.category === 'succulents').length, color: 'teal' },
    { id: 'flowers', label: 'Flowers', icon: Flower, count: plants.filter(p => p.category === 'flowers').length, color: 'pink' },
    { id: 'vegetables', label: 'Vegetables', icon: Apple, count: plants.filter(p => p.category === 'vegetables').length, color: 'orange' },
    { id: 'tropical', label: 'Tropical', icon: TreePine, count: plants.filter(p => p.category === 'tropical').length, color: 'cyan' }
  ];

  const specialCollections = [
    { id: 'trending', label: 'Trending Now', icon: TrendingUp, plants: plants.filter(p => p.trending), color: 'red' },
    { id: 'featured', label: 'Featured', icon: Star, plants: plants.filter(p => p.featured), color: 'amber' },
    { id: 'beginner', label: 'Beginner Friendly', icon: Sprout, plants: plants.filter(p => p.difficulty === 'beginner'), color: 'green' },
    { id: 'air-purifying', label: 'Air Purifying', icon: Shield, plants: plants.filter(p => p.airPurifying), color: 'blue' },
    { id: 'pet-safe', label: 'Pet Safe', icon: Heart, plants: plants.filter(p => p.petSafe), color: 'emerald' },
    { id: 'low-light', label: 'Low Light', icon: Eye, plants: plants.filter(p => p.sunlightPreference === 'low'), color: 'indigo' }
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'name', label: 'A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'difficulty', label: 'Easiest First' },
    { value: 'care-score', label: 'Care Score' },
    { value: 'growth-rate', label: 'Fastest Growing' }
  ];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || plant.difficulty === selectedDifficulty;
    const matchesEnvironment = selectedEnvironment === 'all' || 
                              (selectedEnvironment === 'indoor' && plant.isIndoor) ||
                              (selectedEnvironment === 'hydroponic' && plant.isHydroponicFriendly) ||
                              (selectedEnvironment === 'pet-safe' && plant.petSafe) ||
                              (selectedEnvironment === 'air-purifying' && plant.airPurifying);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesEnvironment;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return b.rating - a.rating;
      case 'popularity': return a.popularityRank - b.popularityRank;
      case 'difficulty': 
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'care-score': return b.careScore - a.careScore;
      case 'growth-rate':
        const growthOrder = { fast: 1, medium: 2, slow: 3 };
        return growthOrder[a.growthRate] - growthOrder[b.growthRate];
      default: return 0;
    }
  });
  // Rotate featured plants
  useEffect(() => {
    const featuredPlants = plants.filter(p => p.featured);
    if (featuredPlants.length > 0) {
      const interval = setInterval(() => {
        setFeaturedPlantIndex(prev => (prev + 1) % featuredPlants.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [plants]);

  const toggleFavorite = (plantId: string) => {
    setFavorites(prev => 
      prev.includes(plantId) 
        ? prev.filter(id => id !== plantId)
        : [...prev, plantId]
    );
  };

  const viewPlantDetails = (plant: ExtendedPlantData) => {
    setSelectedPlant(plant);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== plant.id);
      return [plant.id, ...filtered].slice(0, 5);
    });
  };

  const addToComparison = (plantId: string) => {
    if (comparisonPlants.length < 3 && !comparisonPlants.includes(plantId)) {
      setComparisonPlants(prev => [...prev, plantId]);
    }
  };

  const removeFromComparison = (plantId: string) => {
    setComparisonPlants(prev => prev.filter(id => id !== plantId));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'emerald';
      case 'intermediate': return 'amber';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getGrowthRateColor = (rate: string) => {
    switch (rate) {
      case 'fast': return 'emerald';
      case 'medium': return 'blue';
      case 'slow': return 'amber';
      default: return 'gray';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-amber-400 fill-current' 
            : i < rating 
            ? 'text-amber-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 min-h-screen">
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
          <Orb 
            hue={120}
            hoverIntensity={0.3}
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
                text="Plant Discovery Center" 
                className="text-4xl font-bold"
                color="#059669"
                shineColor="#10B981"
                speed={2.5}
              />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Explore our curated collection of premium plants with AI-powered recommendations
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-4 mt-6 lg:mt-0">
            <StarBorder
              as="button"
              color="#10B981"
              speed="4s"
              onClick={() => setShowComparison(!showComparison)}
              className="px-6 py-3 text-sm font-medium transition-all hover:scale-105"
            >
              {showComparison ? 'Hide' : 'Compare'} Plants ({comparisonPlants.length})
            </StarBorder>
            
            <GlareHover
              width="auto"
              height="auto"
              background="linear-gradient(135deg, #059669, #10B981)"
              borderRadius="12px"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={0.3}
            >
              <button className="px-6 py-3 text-white font-medium rounded-xl flex items-center space-x-2 transition-all hover:scale-105">
                <BookOpen className="w-4 h-4" />
                <span>Plant Guide</span>
              </button>
            </GlareHover>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30" />
        <div className="relative p-6 rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search plants, benefits, or care tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Toggle & Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                  showFilters 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/80 text-gray-600 border border-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30" />
            <div className="relative p-6 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label} ({cat.count})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                  <select
                    value={selectedEnvironment}
                    onChange={(e) => setSelectedEnvironment(e.target.value)}
                    className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Environments</option>
                    <option value="indoor">Indoor Only</option>
                    <option value="hydroponic">Hydroponic Friendly</option>
                    <option value="pet-safe">Pet Safe</option>
                    <option value="air-purifying">Air Purifying</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDifficulty('all');
                      setSelectedEnvironment('all');
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special Collections */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900">Special Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialCollections.map((collection) => {
            const Icon = collection.icon;
            return (
              <motion.button
                key={collection.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${collection.color}-500/20 to-${collection.color}-600/20 backdrop-blur-sm rounded-2xl border border-white/20`} />
                <div className="relative p-4 rounded-2xl text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-${collection.color}-500 to-${collection.color}-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{collection.label}</h3>
                  <p className="text-xs text-gray-600">{collection.plants.length} plants</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
      {/* Featured Plant Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30" />
        <div className="relative p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Featured Plant</h3>
                <p className="text-gray-600">Handpicked for exceptional quality and care</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {plants.filter(p => p.featured).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFeaturedPlantIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === featuredPlantIndex ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {plants.filter(p => p.featured).map((plant, index) => {
              if (index !== featuredPlantIndex) return null;
              
              return (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <div className="relative">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={plant.imageUrl}
                        alt={plant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {plant.trending && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          TRENDING
                        </span>
                      )}
                      <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-3xl font-bold text-gray-900 mb-2">{plant.name}</h4>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          {renderStars(plant.rating)}
                          <span className="text-sm font-medium text-gray-600 ml-2">{plant.rating}</span>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${getDifficultyColor(plant.difficulty)}-100 text-${getDifficultyColor(plant.difficulty)}-700`}>
                          {plant.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">#{plant.popularityRank} Most Popular</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{plant.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/50 rounded-xl">
                        <div className="text-2xl font-bold text-emerald-600">{plant.careScore}%</div>
                        <div className="text-sm text-gray-600">Care Score</div>
                      </div>
                      <div className="text-center p-4 bg-white/50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">{plant.compatibility}%</div>
                        <div className="text-sm text-gray-600">Compatibility</div>
                      </div>
                      <div className="text-center p-4 bg-white/50 rounded-xl">
                        <div className={`text-2xl font-bold text-${getGrowthRateColor(plant.growthRate)}-600 capitalize`}>{plant.growthRate}</div>
                        <div className="text-sm text-gray-600">Growth Rate</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => viewPlantDetails(plant)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-green-600 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => toggleFavorite(plant.id)}
                        className={`p-3 rounded-xl transition-all ${
                          favorites.includes(plant.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(plant.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => addToComparison(plant.id)}
                        disabled={comparisonPlants.includes(plant.id) || comparisonPlants.length >= 3}
                        className="p-3 bg-white/80 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Layers className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* Results Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Plants'}
          </h2>
          <p className="text-gray-600">{filteredPlants.length} plants found</p>
        </div>
        {recentlyViewed.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Recently viewed:</span>
            <div className="flex space-x-1">
              {recentlyViewed.slice(0, 3).map(plantId => {
                const plant = plants.find(p => p.id === plantId);
                return plant ? (
                  <button
                    key={plantId}
                    onClick={() => viewPlantDetails(plant)}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm hover:scale-110 transition-transform"
                  >
                    <img src={plant.imageUrl} alt={plant.name} className="w-full h-full object-cover" />
                  </button>
                ) : null;
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* Plants Grid/List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }
      >
        <AnimatePresence>
          {filteredPlants.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30" />
              <div className="relative p-12 rounded-3xl text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Plants Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse our collections.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                    setSelectedEnvironment('all');
                  }}
                  className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          ) : (
            filteredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                {viewMode === 'grid' ? (
                  // Grid Card View
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 group-hover:shadow-xl transition-all" />
                    <div className="relative p-6 rounded-2xl">
                      <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                        <img
                          src={plant.imageUrl}
                          alt={plant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          {plant.trending && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                              HOT
                            </span>
                          )}
                          {plant.featured && (
                            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                              ⭐
                            </span>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 flex flex-col space-y-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(plant.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                              favorites.includes(plant.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(plant.id) ? 'fill-current' : ''}`} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToComparison(plant.id);
                            }}
                            disabled={comparisonPlants.includes(plant.id) || comparisonPlants.length >= 3}
                            className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                          >
                            <Layers className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {plant.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              {renderStars(plant.rating)}
                              <span className="text-xs text-gray-600">({plant.rating})</span>
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full bg-${getDifficultyColor(plant.difficulty)}-100 text-${getDifficultyColor(plant.difficulty)}-700`}>
                              {plant.difficulty}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">{plant.description}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            {plant.airPurifying && <Shield className="w-4 h-4 text-blue-500" />}
                            {plant.petSafe && <Heart className="w-4 h-4 text-emerald-500" />}
                            {plant.isHydroponicFriendly && <Droplets className="w-4 h-4 text-cyan-500" />}
                          </div>
                          <span className="font-medium">Care: {plant.careScore}%</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => viewPlantDetails(plant)}
                          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-green-600 transition-all flex items-center justify-center space-x-2"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                ) : (
                  // List View
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 group-hover:shadow-xl transition-all" />
                    <div className="relative p-6 rounded-2xl flex items-center space-x-6">
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={plant.imageUrl}
                          alt={plant.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                              {plant.name}
                            </h3>
                            <div className="flex items-center space-x-3 mt-1">
                              <div className="flex items-center space-x-1">
                                {renderStars(plant.rating)}
                                <span className="text-sm text-gray-600">({plant.rating})</span>
                              </div>
                              <span className={`px-2 py-1 text-xs font-bold rounded-full bg-${getDifficultyColor(plant.difficulty)}-100 text-${getDifficultyColor(plant.difficulty)}-700`}>
                                {plant.difficulty}
                              </span>
                              <span className="text-sm text-gray-500">#{plant.popularityRank} Popular</span>
                            </div>
                            <p className="text-gray-600 mt-2 line-clamp-2">{plant.description}</p>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              onClick={() => toggleFavorite(plant.id)}
                              className={`p-2 rounded-full transition-all ${
                                favorites.includes(plant.id)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(plant.id) ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={() => viewPlantDetails(plant)}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-green-600 transition-all flex items-center space-x-2"
                            >
                              <span>Details</span>
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PlantLibrary;