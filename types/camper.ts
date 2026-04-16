import { GalleryImage } from './gallery-image';
import { Review } from './review';

type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryImage[];
  reviews: Review[];
};

type GetAllCampersParams = {
  page?: number;
  limit?: number;
  form?: string;
  engine?: string;
  transmission?: string;
  location?: string;
};

type GetAllCampersResponse = {
  total: number;
  items: Camper[];
};

export type { Camper, GetAllCampersParams, GetAllCampersResponse };
