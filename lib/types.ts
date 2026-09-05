export type CouponType = "deal" | "free-shipping" | "percentage" | "fixed-amount";

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  category: string;
  description: string;
  website: string;
  featured?: boolean;
}

export interface Coupon {
  id: string;
  storeId: string;
  title: string;
  description: string;
  discount: string;
  code?: string;
  type: CouponType;
  expires?: string;
  affiliateUrl: string;
  featured?: boolean;
  verified?: boolean;
  popular?: boolean;
  category: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  date: string;
  author: string;
}
