export interface Post {
  id: number;
  title: string;
  description: string;
  body: string;
  date: string;
  slug: string;
}

export interface ErrorObj {
  message: string;
}
