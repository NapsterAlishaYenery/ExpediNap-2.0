import { BaseMongoFields, ImageStructure } from "../shared/shared.interface";

export interface Duration {
  time: number;
  unit: 'hour' | 'hours' | 'day' | 'days' | 'week' | 'weeks' | 'month' | 'months' | 'year' | 'years';
}

// ESTA ES TU INTERFAZ BASE
export interface ExcursionBase {
  name: string;
  slug: string;
  description: string;
  regularPriceUsd: number;
  offerPriceUsd: number;
  childPriceUsd: number; // <--- Agregado aquí
  location: string;
  categories: string[];
  includes: string[];
  minimumAge: number;
  itinerary: string;
  recommendations: string[];
  startingPoint: string;
  pickupTime: string;
  duration: Duration;
  images: ImageStructure;
}

/**
 * Para el GET (All o By ID) y las RESPUESTAS de Create/Update.
 * Incluye la base + los campos que genera MongoDB.
 */
export interface ExcursionResponse extends ExcursionBase, BaseMongoFields {}

/**
 * Para el POST (Create).
 * Es exactamente la base (puedes usar ExcursionBase directamente).
 */
export type CreateExcursionRequest = Omit<ExcursionBase, 'slug'>

/**
 * Para el PUT/PATCH (Update).
 * Usamos Partial porque el usuario puede editar solo un campo si quiere.
 */
export type UpdateExcursionRequest = Partial<Omit<ExcursionBase, 'slug'>>;


// interfaz de parametros de busqueda 
export interface ExcursionFilters {
  name?: string;
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
}