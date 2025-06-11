export type Bicycle = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  category: 'City Bike' | 'Mountain Bike' | 'Gravel' | 'Road' | 'Electric';
  brand: string;
  price: number;
  weightKg: number;
  frameMaterial: 'Carbon' | 'Aluminum' | 'Steel' | 'Titanium';
  brakeType: 'Disc' | 'Rim';
  wheelSize: 26 | 27.5 | 28 | 29;
  isElectric: boolean;
  imageUrl: string;
};