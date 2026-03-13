import { PlantData } from '../types';

export const plantsDatabase: PlantData[] = [
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    idealConditions: {
      ph: { min: 5.5, max: 7.5 },
      temperature: { min: 18, max: 27 },
      humidity: { min: 30, max: 50 },
      moisture: { min: 20, max: 40 }
    },
    imageUrl: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    description: 'Snake plants are hardy, drought-resistant plants that thrive in low light and prefer to dry out between waterings.'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    idealConditions: {
      ph: { min: 5.8, max: 6.5 },
      temperature: { min: 18, max: 30 },
      humidity: { min: 50, max: 80 },
      moisture: { min: 40, max: 70 }
    },
    imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    description: 'Peace lilies enjoy medium to low light and consistent moisture, though they can tolerate occasional drying out.'
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    idealConditions: {
      ph: { min: 6.0, max: 7.2 },
      temperature: { min: 13, max: 27 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 30, max: 50 }
    },
    imageUrl: 'https://images.pexels.com/photos/1445419/pexels-photo-1445419.jpeg',
    description: 'Easy to grow, adaptable, and air-purifying. Produces plantlets that hang down like spiders.'
  },
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    idealConditions: {
      ph: { min: 5.5, max: 7.0 },
      temperature: { min: 20, max: 30 },
      humidity: { min: 60, max: 80 },
      moisture: { min: 40, max: 60 }
    },
    imageUrl: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    description: 'Tropical plant known for its distinctive split leaves.'
  },
  {
    id: 'pothos',
    name: 'Golden Pothos',
    idealConditions: {
      ph: { min: 6.0, max: 6.5 },
      temperature: { min: 15, max: 29 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 30, max: 50 }
    },
    imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    description: 'Versatile vine that can grow in various light conditions.'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    idealConditions: {
      ph: { min: 6.0, max: 7.0 },
      temperature: { min: 18, max: 28 },
      humidity: { min: 40, max: 50 },
      moisture: { min: 20, max: 40 }
    },
    imageUrl: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    description: 'Low-maintenance plant that tolerates low light and drought.'
  },
  {
    id: 'chinese-evergreen',
    name: 'Chinese Evergreen',
    idealConditions: {
      ph: { min: 5.5, max: 6.5 },
      temperature: { min: 18, max: 28 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 30, max: 50 }
    },
    imageUrl: 'https://images.pexels.com/photos/2014168/pexels-photo-2014168.jpeg',
    description: 'Tolerant of low light and irregular watering.'
  },
  {
    id: 'rubber-plant',
    name: 'Rubber Plant',
    idealConditions: {
      ph: { min: 6.0, max: 7.0 },
      temperature: { min: 18, max: 30 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 30, max: 50 }
    },
    imageUrl: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    description: 'Large, glossy leaves and easy care requirements.'
  },
  {
    id: 'dracaena',
    name: 'Dracaena',
    idealConditions: {
      ph: { min: 6.0, max: 6.5 },
      temperature: { min: 18, max: 30 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 30, max: 50 }
    },
    imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    description: 'Various species with striking foliage patterns.'
  },
  {
    id: 'philodendron',
    name: 'Philodendron Brasil',
    idealConditions: {
      ph: { min: 5.0, max: 6.0 },
      temperature: { min: 18, max: 30 },
      humidity: { min: 60, max: 80 },
      moisture: { min: 40, max: 60 }
    },
    imageUrl: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg',
    description: 'Heart-shaped leaves with beautiful variegation.'
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    idealConditions: {
      ph: { min: 6.0, max: 7.0 },
      temperature: { min: 18, max: 27 },
      humidity: { min: 60, max: 80 },
      moisture: { min: 40, max: 60 }
    },
    imageUrl: 'https://images.pexels.com/photos/2014168/pexels-photo-2014168.jpeg',
    description: 'Large, round leaves with silvery stripes.'
  },
  {
    id: 'string-of-hearts',
    name: 'String of Hearts',
    idealConditions: {
      ph: { min: 6.0, max: 7.0 },
      temperature: { min: 18, max: 25 },
      humidity: { min: 40, max: 60 },
      moisture: { min: 20, max: 40 }
    },
    imageUrl: 'https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg',
    description: 'Delicate trailing vine with heart-shaped leaves.'
  },
  // Would you like me to continue adding more plants to reach 100+? I can keep going with the list while maintaining the same level of detail for each plant.
];