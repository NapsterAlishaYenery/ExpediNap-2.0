import { ImagesModel } from "../shared/image.interface";
import { BaseMongoFields } from "../shared/shared.interface";



// ESTA ES TU INTERFAZ BASE
export interface ExcursionBase {
  name: string;
  shortDescription: string;
  longDescription: string;
  pricing: Pricing;
  location: Location;
  categories: string[];
  duration: Duration;
  inclusions: Inclusions;
  minimumAge: number;
  itinerary: Itinerary[];
  recommendations: string[];
  startingPoint: string;
  pickupInfo: PickupInfo;
  dropoffInfo: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  seo: Seo;
}

/**
 * Para el GET (All o By ID) y las RESPUESTAS de Create/Update.
 * Incluye la base + los campos que genera MongoDB.
 */
export interface ExcursionResponse extends ExcursionBase, BaseMongoFields {
  slug: string;
  order: number;
  images: ImagesModel;
  cloudinaryFolder: string;
}

/**
 * Para el POST (Create).
 * Es exactamente la base (puedes usar ExcursionBase directamente).
 */
export type CreateExcursionRequest = ExcursionBase

/**
 * Para el PUT/PATCH (Update).
 * Usamos Partial porque el usuario puede editar solo un campo si quiere.
 */
export type UpdateExcursionRequest = Partial<ExcursionBase>;


// interfaz de parametros de busqueda 
export interface ExcursionFilters {
  name?: string;
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
}
// INTERFACES DE CONTENIDO 
export interface Pricing {
  adultPrice: number;
  childPrice: number;
  infantPrice?: number;
  paymentTerms: 'full' | 'deposit' | 'pay_later';
  depositPercentage?: number;
  ageRanges: AgeRanges;
}

export interface AgeRanges {
  adult: number;
  child: number;
  infant: number;
}

export interface Location {
  locationName: string;
  coordinates?: {
    lat: Number,
    lng: Number
  }
  displayName?: string;
}

export interface Duration {
  value: number;
  unit: 'hour' | 'hours' | 'day' | 'days' | 'half_day';
}

export interface Inclusions {
  included: string[];
  notIncluded?: string[]
}

export interface Itinerary {
  titleItinerary: string;
  description: string;
  order?: number;
  icon?: string;
  _id?: string
}

export interface PickupInfo {
  included?: boolean;
  details: string;
  airbnbFriendly?: boolean;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string[]
}