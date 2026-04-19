export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  colors: string[];
  material: string;
  compatibility: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Clear Case',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1771142061212-71a82269ecb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BhcmVudCUyMHBob25lJTIwY2FzZXxlbnwxfHx8fDE3NzYzNzI2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Clear',
    description: 'Ultra-thin clear case that showcases your phone\'s original design while providing excellent protection.',
    colors: ['Clear', 'Smoke'],
    material: 'TPU',
    compatibility: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 14', 'Samsung Galaxy S24']
  },
  {
    id: '2',
    name: 'Premium Leather Wallet',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1764855310912-15dee3625bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwcGhvbmUlMjBjYXNlJTIwYnJvd258ZW58MXx8fHwxNzY5MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Leather',
    description: 'Handcrafted genuine leather wallet case with card slots and magnetic closure.',
    colors: ['Brown', 'Black', 'Tan'],
    material: 'Genuine Leather',
    compatibility: ['iPhone 15', 'iPhone 15 Pro Max', 'Samsung Galaxy S24 Ultra']
  },
  {
    id: '3',
    name: 'Marble Elegance',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1655339998457-2609fc241495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBtYXJibGUlMjBwYXR0ZXJufGVufDF8fHx8MTc3NjM3MjY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Patterned',
    description: 'Sophisticated marble pattern case with a glossy finish and shock-absorbing corners.',
    colors: ['White Marble', 'Black Marble', 'Rose Gold Marble'],
    material: 'Polycarbonate',
    compatibility: ['iPhone 15', 'iPhone 14', 'iPhone 13']
  },
  {
    id: '4',
    name: 'Floral Blossom',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1581003989510-ba20094d343c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9yYWwlMjBwaG9uZSUyMGNhc2UlMjBwaW5rfGVufDF8fHx8MTc3NjM3MjY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Patterned',
    description: 'Beautiful floral design that adds a touch of nature to your phone.',
    colors: ['Pink Floral', 'Blue Floral', 'Purple Floral'],
    material: 'Silicone',
    compatibility: ['iPhone 15', 'iPhone 15 Plus', 'Samsung Galaxy S24']
  },
  {
    id: '5',
    name: 'Silicone Protection Pro',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1681504984162-1be2d3f3e803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNpbGljb25lJTIwcGhvbmUlMjBjYXNlfGVufDF8fHx8MTc3NjM3MjY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Silicone',
    description: 'Soft-touch silicone case with anti-slip grip and raised edges for screen protection.',
    colors: ['Black', 'Navy', 'Red', 'White'],
    material: 'Liquid Silicone',
    compatibility: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 14 Pro']
  },
  {
    id: '6',
    name: 'Vibrant Colors Collection',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1623393835885-560a7c576aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBjb2xvcmZ1bCUyMG1pbmltYWx8ZW58MXx8fHwxNzc2MzcyNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Silicone',
    description: 'Bold and vibrant colors to match your style. Slim profile with maximum protection.',
    colors: ['Coral', 'Mint', 'Lavender', 'Yellow'],
    material: 'Silicone',
    compatibility: ['iPhone 15', 'iPhone 14', 'Samsung Galaxy S24']
  },
  {
    id: '7',
    name: 'Geometric Art Case',
    price: 31.99,
    image: 'https://images.unsplash.com/photo-1581003989336-2ae25a99c091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNvdmVyJTIwYXJ0aXN0aWMlMjBkZXNpZ258ZW58MXx8fHwxNzc2MzcyNjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Patterned',
    description: 'Modern geometric patterns for the contemporary aesthetic. Scratch-resistant coating.',
    colors: ['Geometric Blue', 'Geometric Gold', 'Geometric Black'],
    material: 'Hard Plastic',
    compatibility: ['iPhone 15 Pro', 'Samsung Galaxy S24 Ultra']
  },
  {
    id: '8',
    name: 'Rugged Armor Shield',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1581003989336-2ae25a99c091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBwaG9uZSUyMGNhc2UlMjBwYXR0ZXJufGVufDF8fHx8MTc3NjM3MjY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Rugged',
    description: 'Military-grade drop protection with reinforced corners and air-cushion technology.',
    colors: ['Carbon Black', 'Titanium Gray'],
    material: 'TPU + Polycarbonate',
    compatibility: ['iPhone 15', 'iPhone 15 Pro', 'Samsung Galaxy S24']
  }
];

export const categories = ['All', 'Clear', 'Leather', 'Silicone', 'Patterned', 'Rugged'];
