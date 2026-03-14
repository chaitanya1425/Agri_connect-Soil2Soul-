export type UserRole = 
  | 'farmer' 
  | 'customer' 
  | 'college' 
  | 'agency' 
  | 'krushi_kendra' 
  | 'seed_company' 
  | 'fertilizer_company' 
  | 'tool_company' 
  | 'community' 
  | 'scheme_provider' 
  | 'bank' 
  | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  phoneNumber?: string;
  photoURL?: string;
  bio?: string;
  cropsGrown?: string[];
  farmSize?: number;
  isVerified?: boolean;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName?: string;
  name: string;
  description: string;
  price: number;
  category: 'produce' | 'seeds' | 'fertilizers' | 'tools' | 'machinery';
  stock: number;
  unit: string;
  imageUrl: string;
  createdAt: any;
}

export interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: any;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'forum' | 'research' | 'announcement';
  likes: string[];
  createdAt: any;
}

export interface Workshop {
  id: string;
  collegeId: string;
  title: string;
  description: string;
  videoUrl?: string;
  pdfUrl?: string;
  date: any;
}

export interface Scheme {
  id: string;
  providerId: string;
  title: string;
  description: string;
  subsidyAmount?: number;
  eligibility?: string;
  link?: string;
}
