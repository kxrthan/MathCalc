export interface Category {
  slug: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags?: string[];
  component?: string;
  relatedTools?: string[];
}
