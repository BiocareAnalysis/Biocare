import React, { useState, useMemo } from 'react';
import { PlantData, CustomPlantInput } from '../types';
import { Plus, Search, Filter, Star, Droplets, Sun, Thermometer, FlaskRound } from 'lucide-react';
import Select from 'react-select';

interface PlantSelectorProps {
  plants: PlantData[];
  selectedPlantId: string;
  onSelectPlant: (id: string) => void;
  onAddCustomPlant: (plant: CustomPlantInput) => void;
}

const PlantSelector: React.FC<PlantSelectorProps> = ({ 
  plants, 
  selectedPlantId, 
  onSelectPlant,
  onAddCustomPlant
}) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [formData, setFormData] = useState<CustomPlantInput>({
    name: '',
    category: 'houseplants',
    difficulty: 'beginner',
    isHydroponicFriendly: false,
    isIndoor: true,
    sunlightPreference: 'medium',
    ph: { min: 6, max: 7 },
    temperature: { min: 20, max: 25 },
    humidity: { min: 40, max: 60 },
    moisture: { min: 30, max: 50 },
    description: '',
    careInstructions: {
      watering: '',
      fertilizing: '',
      pruning: '',
      repotting: ''
    }
  });

  // Filter plants based on search and category
  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [plants, searchTerm, selectedCategory]);

  const plantOptions = useMemo(() => 
    filteredPlants.map(plant => ({
      value: plant.id,
      label: plant.name,
      plant: plant
    })), [filteredPlants]
  );

  const selectedOption = plantOptions.find(option => option.value === selectedPlantId);
  const selectedPlant = plants.find(p => p.id === selectedPlantId);

  const categories = [
    { id: 'all', name: 'All Plants', count: plants.length },
    { id: 'houseplants', name: 'Houseplants', count: plants.filter(p => p.category === 'houseplants').length },
    { id: 'herbs', name: 'Herbs', count: plants.filter(p => p.category === 'herbs').length },
    { id: 'succulents', name: 'Succulents', count: plants.filter(p => p.category === 'succulents').length },
    { id: 'flowers', name: 'Flowers', count: plants.filter(p => p.category === 'flowers').length },
    { id: 'vegetables', name: 'Vegetables', count: plants.filter(p => p.category === 'vegetables').length },
    { id: 'tropical', name: 'Tropical', count: plants.filter(p => p.category === 'tropical').length },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomPlant(formData);
    setShowForm(false);
    setFormData({
      name: '',
      category: 'houseplants',
      difficulty: 'beginner',
      isHydroponicFriendly: false,
      isIndoor: true,
      sunlightPreference: 'medium',
      ph: { min: 6, max: 7 },
      temperature: { min: 20, max: 25 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 30, max: 50 },
      description: '',
      careInstructions: {
        watering: '',
        fertilizing: '',
        pruning: '',
        repotting: ''
      }
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-amber-100 text-amber-700';
      case 'advanced': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Plant Selection</h1>
          <p className="text-lg text-gray-600">Choose your plant to optimize growing conditions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Custom Plant</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plants by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
              />
            </div>
          </div>

          {/* Plant Selector Dropdown */}
          <div className="lg:w-96">
            <Select
              value={selectedOption}
              onChange={(option) => option && onSelectPlant(option.value)}
              options={plantOptions}
              isSearchable={true}
              placeholder="Select a plant..."
              className="text-lg"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '56px',
                  borderColor: '#e2e8f0',
                  borderRadius: '12px',
                  '&:hover': {
                    borderColor: '#cbd5e1'
                  }
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#f0fdf4' : 'white',
                  color: state.isSelected ? 'white' : '#374151',
                  ':active': {
                    backgroundColor: '#10b981',
                    color: 'white'
                  }
                })
              }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Plant Preview */}
      {selectedPlant && (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl">
          <div className="relative h-80 bg-gradient-to-br from-emerald-50 to-green-100">
            <img 
              src={selectedPlant.imageUrl}
              alt={selectedPlant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedPlant.name}</h2>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedPlant.difficulty)}`}>
                      {selectedPlant.difficulty}
                    </span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedPlant.category}
                    </span>
                    {selectedPlant.isHydroponicFriendly && (
                      <span className="bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Hydroponic Friendly
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">4.8</span>
                  </div>
                  <span className="text-white/80 text-sm">Popular choice</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{selectedPlant.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FlaskRound className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-900">pH Level</h3>
                </div>
                <p className="text-2xl font-bold text-blue-800 mb-1">
                  {selectedPlant.idealConditions.ph.min} - {selectedPlant.idealConditions.ph.max}
                </p>
                <p className="text-blue-600 text-sm">Optimal range</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-red-900">Temperature</h3>
                </div>
                <p className="text-2xl font-bold text-red-800 mb-1">
                  {selectedPlant.idealConditions.temperature.min}°C - {selectedPlant.idealConditions.temperature.max}°C
                </p>
                <p className="text-red-600 text-sm">Ideal range</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-cyan-900">Humidity</h3>
                </div>
                <p className="text-2xl font-bold text-cyan-800 mb-1">
                  {selectedPlant.idealConditions.humidity.min}% - {selectedPlant.idealConditions.humidity.max}%
                </p>
                <p className="text-cyan-600 text-sm">Preferred level</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-green-900">Soil Moisture</h3>
                </div>
                <p className="text-2xl font-bold text-green-800 mb-1">
                  {selectedPlant.idealConditions.moisture.min}% - {selectedPlant.idealConditions.moisture.max}%
                </p>
                <p className="text-green-600 text-sm">Target moisture</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlants.slice(0, 12).map((plant) => (
          <div
            key={plant.id}
            onClick={() => onSelectPlant(plant.id)}
            className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
              selectedPlantId === plant.id 
                ? 'border-emerald-500 shadow-lg shadow-emerald-500/25' 
                : 'border-gray-100 hover:border-emerald-300'
            }`}
          >
            <div className="relative h-48 bg-gray-200">
              <img 
                src={plant.imageUrl} 
                alt={plant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(plant.difficulty)}`}>
                  {plant.difficulty}
                </span>
              </div>
              {plant.isHydroponicFriendly && (
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Hydro
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{plant.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sun className={`w-4 h-4 ${
                    plant.sunlightPreference === 'high' ? 'text-yellow-500' :
                    plant.sunlightPreference === 'medium' ? 'text-orange-500' : 'text-gray-500'
                  }`} />
                  <span className="text-xs text-gray-600 capitalize">{plant.sunlightPreference} light</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">4.{Math.floor(Math.random() * 9) + 1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more button */}
      {filteredPlants.length > 12 && (
        <div className="text-center">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200">
            Show {filteredPlants.length - 12} More Plants
          </button>
        </div>
      )}

      {/* Custom Plant Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Custom Plant</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Plant Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter plant name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="houseplants">Houseplants</option>
                    <option value="herbs">Herbs</option>
                    <option value="succulents">Succulents</option>
                    <option value="flowers">Flowers</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="tropical">Tropical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="Describe your plant"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">pH Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.ph.min}
                      onChange={(e) => setFormData({...formData, ph: {...formData.ph, min: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.ph.max}
                      onChange={(e) => setFormData({...formData, ph: {...formData.ph, max: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Temperature (°C)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={formData.temperature.min}
                      onChange={(e) => setFormData({...formData, temperature: {...formData.temperature, min: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      required
                      value={formData.temperature.max}
                      onChange={(e) => setFormData({...formData, temperature: {...formData.temperature, max: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Humidity (%)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={formData.humidity.min}
                      onChange={(e) => setFormData({...formData, humidity: {...formData.humidity, min: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      required
                      value={formData.humidity.max}
                      onChange={(e) => setFormData({...formData, humidity: {...formData.humidity, max: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Moisture (%)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      value={formData.moisture.min}
                      onChange={(e) => setFormData({...formData, moisture: {...formData.moisture, min: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      required
                      value={formData.moisture.max}
                      onChange={(e) => setFormData({...formData, moisture: {...formData.moisture, max: Number(e.target.value)}})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25"
                >
                  Add Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantSelector;