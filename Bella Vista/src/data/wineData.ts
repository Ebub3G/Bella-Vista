import { Wine } from '../types';

export const wineCategories = [
  'Red',
  'White', 
  'Sparkling',
  'Rosé',
  'Dessert'
];

export const wines: Wine[] = [
  // Red Wines
  {
    id: 'w1',
    name: 'Barolo DOCG',
    producer: 'Giuseppe Mascarello',
    region: 'Piedmont, Italy',
    vintage: '2018',
    description: 'Full-bodied with notes of cherry, leather, and truffle. A classic expression of Nebbiolo.',
    priceGlass: 28,
    priceBottle: 145,
    category: 'Red',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    awards: ['Wine Spectator 94 pts', 'James Suckling 96 pts']
  },
  {
    id: 'w2',
    name: 'Chianti Classico Riserva',
    producer: 'Castello di Ama',
    region: 'Tuscany, Italy',
    vintage: '2019',
    description: 'Elegant Sangiovese with blackberry, violet, and earthy undertones.',
    priceGlass: 18,
    priceBottle: 85,
    category: 'Red',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'w3',
    name: 'Brunello di Montalcino',
    producer: 'Biondi-Santi',
    region: 'Tuscany, Italy',
    vintage: '2017',
    description: 'Prestigious Sangiovese with complex layers of dark fruit, herbs, and mineral notes.',
    priceBottle: 220,
    category: 'Red',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    awards: ['Wine Advocate 95 pts']
  },
  {
    id: 'w4',
    name: 'Amarone della Valpolicella',
    producer: 'Allegrini',
    region: 'Veneto, Italy',
    vintage: '2018',
    description: 'Rich and velvety with dried fruit, chocolate, and spice notes.',
    priceGlass: 22,
    priceBottle: 110,
    category: 'Red',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // White Wines
  {
    id: 'w5',
    name: 'Gavi di Gavi DOCG',
    producer: 'La Scolca',
    region: 'Piedmont, Italy',
    vintage: '2022',
    description: 'Crisp Cortese with citrus, green apple, and mineral notes.',
    priceGlass: 16,
    priceBottle: 75,
    category: 'White',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'w6',
    name: 'Soave Classico',
    producer: 'Pieropan',
    region: 'Veneto, Italy',
    vintage: '2022',
    description: 'Elegant Garganega with white flowers, pear, and almond finish.',
    priceGlass: 14,
    priceBottle: 65,
    category: 'White',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'w7',
    name: 'Vermentino di Sardegna',
    producer: 'Argiolas',
    region: 'Sardinia, Italy',
    vintage: '2022',
    description: 'Fresh and aromatic with Mediterranean herbs and sea breeze minerality.',
    priceGlass: 13,
    priceBottle: 58,
    category: 'White',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'w8',
    name: 'Greco di Tufo',
    producer: 'Feudi di San Gregorio',
    region: 'Campania, Italy',
    vintage: '2021',
    description: 'Complex white with tropical fruit, honey, and volcanic mineral notes.',
    priceGlass: 15,
    priceBottle: 70,
    category: 'White',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Sparkling Wines
  {
    id: 'w9',
    name: 'Franciacorta DOCG Brut',
    producer: 'Ca\' del Bosco',
    region: 'Lombardy, Italy',
    vintage: 'NV',
    description: 'Elegant Italian sparkling with fine bubbles, citrus, and brioche notes.',
    priceGlass: 20,
    priceBottle: 95,
    category: 'Sparkling',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'w10',
    name: 'Prosecco di Valdobbiadene DOCG',
    producer: 'Nino Franco',
    region: 'Veneto, Italy',
    vintage: 'NV',
    description: 'Premium Prosecco with delicate bubbles, green apple, and floral aromas.',
    priceGlass: 14,
    priceBottle: 65,
    category: 'Sparkling',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'w11',
    name: 'Lambrusco di Sorbara',
    producer: 'Cleto Chiarli',
    region: 'Emilia-Romagna, Italy',
    vintage: '2022',
    description: 'Dry sparkling red with bright acidity and red berry flavors.',
    priceGlass: 12,
    priceBottle: 55,
    category: 'Sparkling',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Rosé Wines
  {
    id: 'w12',
    name: 'Cerasuolo d\'Abruzzo',
    producer: 'Valentini',
    region: 'Abruzzo, Italy',
    vintage: '2022',
    description: 'Elegant rosé with cherry blossom, strawberry, and mineral complexity.',
    priceGlass: 16,
    priceBottle: 75,
    category: 'Rosé',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'w13',
    name: 'Bardolino Chiaretto',
    producer: 'Guerrieri Rizzardi',
    region: 'Veneto, Italy',
    vintage: '2022',
    description: 'Light and refreshing with red fruit and citrus notes.',
    priceGlass: 13,
    priceBottle: 60,
    category: 'Rosé',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Dessert Wines
  {
    id: 'w14',
    name: 'Moscato d\'Asti',
    producer: 'Paolo Saracco',
    region: 'Piedmont, Italy',
    vintage: '2022',
    description: 'Sweet and aromatic with peach, apricot, and floral notes.',
    priceGlass: 12,
    priceBottle: 55,
    category: 'Dessert',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'w15',
    name: 'Vin Santo del Chianti Classico',
    producer: 'Isole e Olena',
    region: 'Tuscany, Italy',
    vintage: '2015',
    description: 'Traditional dessert wine with honey, dried fruit, and nut flavors.',
    priceGlass: 18,
    priceBottle: 85,
    category: 'Dessert',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];