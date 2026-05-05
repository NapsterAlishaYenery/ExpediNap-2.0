// Reutilizamos o definimos las imágenes (puedes importarlas si prefieres)

import { BaseMongoFields, ImageStructure } from "../shared/shared.interface";


// Sub-interfaces basadas en tus esquemas de Mongoose
export interface YachtPrices {
  halfDay: number | null;
  fullDay: number | null;
}

export interface YachtTimeAvailable {
  halfDay: string[];
  fullDay: string;
}

export interface YachtExtra {
  type: string;
  available: boolean;
  included: boolean;
  description: string;
  price: number;
}

export interface YachtRiverSunset {
  price: number | null;
  timeTrip: string | null;
}

/**
 * INTERFAZ BASE DE YATE
 */
export interface YachtBase {
  name: string;
  slug: string;
  maxPax: number;
  description: string;
  saonaPrice?: YachtPrices;     // Opcional en el schema
  catalinaPrice?: YachtPrices;  // Opcional en el schema
  timeAvailable: YachtTimeAvailable;
  includes: string[];
  extras: YachtExtra[];
  riverSunset: YachtRiverSunset;
  images: ImageStructure;
}

/**
 * RESPUESTA DEL SERVIDOR (GET /all, GET /detail, etc.)
 */
export interface YachtResponse extends YachtBase, BaseMongoFields {}

/**
 * REQUEST PARA CREAR (POST)
 */
export type CreateYachtRequest = Omit<YachtBase, 'slug'>;

/**
 * REQUEST PARA ACTUALIZAR (PATCH)
 */
export type UpdateYachtRequest = Partial<Omit<YachtBase, 'slug'>>;