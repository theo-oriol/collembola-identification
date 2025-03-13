export interface Project {
    id: number;
    name: string;
    description: string;
    title: string;
    images: Image[];
    createdAt: string; // Use Date if it's a Date type
  }

  export interface Image {
    title: string;
    url: string;
  }