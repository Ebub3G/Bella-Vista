export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface BasketItem extends MenuItem {
  quantity: number;
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryInstructions?: string;
}

export interface OrderSummary {
  items: BasketItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryInfo: DeliveryInfo;
}

export interface ReservationInfo {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface Wine {
  id: string;
  name: string;
  producer: string;
  region: string;
  vintage: string;
  description: string;
  priceGlass?: number;
  priceBottle: number;
  category: 'Red' | 'White' | 'Sparkling' | 'Rosé' | 'Dessert';
  image: string;
  featured?: boolean;
  awards?: string[];
}