export interface AdminStoreSeed {
  id: string;
  name: string;
  owner: string;
  email: string;
  category: string;
  joined: string;
  status: "active" | "flagged";
  description: string;
}

export const adminStoresSeed: AdminStoreSeed[] = [
  {
    id: "hassan",
    name: "Hassan's shop",
    owner: "Hassan Mezher",
    email: "hassan@shopora.com",
    category: "Apparel",
    joined: "Feb 12, 2024",
    status: "active",
    description: "Selling limited edition streetwear and wardrobe essentials.",
  },
  {
    id: "dani",
    name: "Dani's shop",
    owner: "Dani M.",
    email: "dani@shopora.com",
    category: "Footwear",
    joined: "Mar 02, 2024",
    status: "active",
    description: "Premium sneakers and sport-inspired drops.",
  },
  {
    id: "mhamad",
    name: "Mhamad's shop",
    owner: "Mhamad A.",
    email: "mhamad@shopora.com",
    category: "Audio",
    joined: "Jan 28, 2024",
    status: "flagged",
    description: "Audiophile-grade headphones and travel tech.",
  },
];
