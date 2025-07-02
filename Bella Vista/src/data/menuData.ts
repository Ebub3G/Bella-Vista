import { MenuItem } from '../types';

export const menuCategories = [
  'Appetizers',
  'Main Courses',
  'Pasta',
  'Pizza',
  'Desserts',
  'Beverages'
];

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls filled with truffle cheese, served with marinara sauce',
    price: 14.99,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true,
    vegetarian: true
  },
  {
    id: '2',
    name: 'Crispy Calamari',
    description: 'Fresh squid rings with spicy marinara and lemon aioli',
    price: 12.99,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/6107787/pexels-photo-6107787.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Burrata Caprese',
    description: 'Creamy burrata with heirloom tomatoes, basil, and balsamic glaze',
    price: 16.99,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=800',
    vegetarian: true
  },

  // Main Courses
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon herb butter, roasted vegetables, and quinoa',
    price: 28.99,
    category: 'Main Courses',
    image: 'https://assets.epicurious.com/photos/62d6c5146b6e74298a39d06a/4:3/w_4031,h_3023,c_limit/BakedSalmon_RECIPE_04142022_9780_final.jpg',
    popular: true
  },
  {
    id: '5',
    name: 'Ribeye Steak',
    description: '12oz prime ribeye with garlic mashed potatoes and seasonal vegetables',
    price: 34.99,
    category: 'Main Courses',
    image: 'https://www.barillaforprofessionals.com/media/en-us/filer_public/19/d9/19d9cfc7-825c-47ba-922a-f963bd17660a/thick_spaghetti_carbonara_chef_lorenzo_crave_05-1.jpg'
  },
  {
    id: '6',
    name: 'Herb Crusted Chicken',
    description: 'Free-range chicken breast with Mediterranean herbs and roasted potatoes',
    price: 24.99,
    category: 'Main Courses',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Pasta
  {
    id: '7',
    name: 'Lobster Ravioli',
    description: 'House-made ravioli stuffed with fresh lobster in creamy tomato sauce',
    price: 26.99,
    category: 'Pasta',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: '8',
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with pancetta, eggs, pecorino, and black pepper',
    price: 18.99,
    category: 'Pasta',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIAO5SVJxyAeS1yWToONQyUirH6oaID48NTA&s'
  },
  {
    id: '9',
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic, red peppers, and fresh basil',
    price: 16.99,
    category: 'Pasta',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    spicy: true,
    vegetarian: true
  },

  // Pizza
  {
    id: '10',
    name: 'Margherita Pizza',
    description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil',
    price: 19.99,
    category: 'Pizza',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800',
    vegetarian: true
  },
  {
    id: '11',
    name: 'Prosciutto & Arugula',
    description: 'White sauce base with prosciutto di Parma, arugula, and parmesan',
    price: 24.99,
    category: 'Pizza',
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },

  // Desserts
  {
    id: '12',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: '13',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla gelato',
    price: 9.99,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800'
  },

  // Beverages
  {
    id: '14',
    name: 'Craft Beer Selection',
    description: 'Ask about our rotating selection of local craft beers',
    price: 6.99,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '15',
    name: 'House Wine',
    description: 'Selection of red and white wines by the glass',
    price: 8.99,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/696219/pexels-photo-696219.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];
