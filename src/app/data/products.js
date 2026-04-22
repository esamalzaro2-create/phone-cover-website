export const iphoneModels = [
  'iPhone 12',
  'iPhone 12 Pro',
  'iPhone 12 Pro Max',
  'iPhone 13',
  'iPhone 13 Pro',
  'iPhone 13 Pro Max',
  'iPhone 14',
  'iPhone 14 Pro',
  'iPhone 14 Pro Max',
  'iPhone 15',
  'iPhone 15 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max',
  'iPhone 17',
  'iPhone 17 Pro',
  'iPhone 17 Pro Max',
];
import img1 from '../../../assets/1.jpeg';
import img2 from '../../../assets/2.jpeg';
import img3 from '../../../assets/3.jpeg';
import img4 from '../../../assets/4.jpeg';
import img5 from '../../../assets/5.jpeg';
import img6 from '../../../assets/6.jpeg';
import img7 from '../../../assets/7.jpeg';
import img8 from '../../../assets/8.jpeg';
import img9 from '../../../assets/9.jpeg';
import img10 from '../../../assets/10.jpeg';
import img11 from '../../../assets/11.jpeg';
import img12 from '../../../assets/12.jpeg';
import img13 from '../../../assets/13.jpeg';
import img14 from '../../../assets/14.jpeg';
import img15 from '../../../assets/15.jpeg';
import img16 from '../../../assets/16.jpeg';
import img17 from '../../../assets/17.jpeg';


export const categories = ['All', 'Anime', 'TV Show', 'Cartoon', 'Funny', 'Islam'];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// soldOut: false        ← المنتج كله متاح لكل الموبيلات
// soldOut: true         ← المنتج كله خلص (Pre-Order للكل)
// soldOutModels: [...]  ← موبيلات معينة خلصت بس
//
// مثال:
// soldOut: false,
// soldOutModels: ['iPhone 13', 'iPhone 14 Pro']
// ← يعني 13 و 14 Pro خلصوا بس الباقي متاح
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const products = [
  {
    id: '1',
    name: 'Good Person Case',
    price: 250,
    image: img1,
    category: 'Cartoon',
    description: 'Unique cartoon design with bold artwork. Premium quality print that lasts.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: ['iPhone 13', 'iPhone 14 Pro', 'iPhone 15 Pro Max'],
  },
  {
    id: '2',
    name: 'Sun & Moon Case',
    price: 250,
    image: img2,
    category: 'Cartoon',
    description: 'Beautiful celestial sun and moon design with vibrant colors.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '3',
    name: 'Makkah Case',
    price: 250,
    image: img3,
    category: 'Islam',
    description: 'Stunning Makkah night view design. A perfect gift for Muslims.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '4',
    name: 'Vintage Radio Case',
    price: 250,
    image: img4,
    category: 'Cartoon',
    description: 'Aesthetic vintage radio and coffee design. Perfect for retro lovers.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '5',
    name: 'Porsche GT3 Case',
    price: 250,
    image: img5,
    category: 'Funny',
    description: 'Porsche 911 GT3 RS Grand Tourismo design for car enthusiasts.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '6',
    name: 'Islamic Quote Case',
    price: 250,
    image: img6,
    category: 'Islam',
    description: 'Beautiful Arabic calligraphy — لا تحزن إن الله معنا.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '7',
    name: 'Jujutsu Kaisen Case',
    price: 250,
    image: img7,
    category: 'Anime',
    description: 'Jujutsu Kaisen manga collage design for anime fans.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '8',
    name: 'Anime Manga Case',
    price: 250,
    image: img8,
    category: 'Anime',
    description: 'Bold black and white anime manga artwork design.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '9',
    name: "Don't Touch My Phone",
    price: 250,
    image: img9,
    category: 'Funny',
    description: "Funny angry face with Don't Touch My Phone text. Great for laughs!",
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '10',
    name: 'Attack on Titan Case',
    price: 250,
    image: img10,
    category: 'Anime',
    description: 'Attack on Titan Colossal Titan close-up manga art design.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '11',
    name: 'Astronaut Case',
    price: 250,
    image: img11,
    category: 'Cartoon',
    description: 'Cute lonely astronaut sitting under the stars. Aesthetic and minimal.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '12',
    name: 'JJK White Case',
    price: 250,
    image: img12,
    category: 'Anime',
    description: 'Jujutsu Kaisen character art on clean white background.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '13',
    name: 'Gojo Satoru Case',
    price: 250,
    image: img13,
    category: 'Anime',
    description: 'Gojo Satoru iconic pose on sleek black case.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '14',
    name: 'One Piece Jolly Roger',
    price: 250,
    image: img14,
    category: 'Anime',
    description: 'One Piece Wanted poster collage with the iconic Skull logo.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '15',
    name: 'Luffy Wanted Case',
    price: 250,
    image: img15,
    category: 'Anime',
    description: 'Monkey D. Luffy Wanted poster colorful collage design.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '16',
    name: 'One Piece Luffy Case',
    price: 250,
    image: img16,
    category: 'Anime',
    description: 'Luffy action pose with One Piece logo on dark frosted case.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '17',
    name: 'House of Stark Case',
    price: 250,
    image: img17,
    category: 'TV Show',
    description: 'Game of Thrones House Stark — Winter is Coming. For GoT fans.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
  {
    id: '17',
    name: 'House of Stark Case',
    price: 250,
    image: img17,
    category: 'TV Show',
    description: 'Game of Thrones House Stark — Winter is Coming. For GoT fans.',
    material: 'Hard Polycarbonate',
    soldOut: false,
    soldOutModels: [],
  },
];
