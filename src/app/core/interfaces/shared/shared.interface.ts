/**

/**
 * Campos base que vienen de MongoDB
 * Todas tus respuestas de API (YachtResponse, ExcursionResponse) pueden extender de esta
 */
export interface BaseMongoFields {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interfaz genérica para la paginación (Opcional si quieres estandarizar)
 */
export interface PaginationMetadata {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface itemCuestion {
  question: string;
  answer: string;
  isOpen: boolean;
}

//interfac base para clientes para las ordenes de (Yates, excuriones y de trasnporte)
//ademas de ser la misma interfaz para los clientes que dejen su review
export interface ClientInterface {
  fullName: string;
  email: string;
  phone?: string | "1234567890"
}


// INTERFAS PARA LA LISTA EN SELECTS
export interface SimpleListResponse {
  _id: string;
  name: string;
}


//Interfaz para el precio de las ordenes y sus campos
export interface Pricing {
  totalPrice: number;
  currency: string;
}

//sub interfaz para los stats de las ordenes
export interface StatusCount {
  pending: number;
  confirmed: number;
  paid: number;
  completed: number;
  cancelled: number;
  deleted: number;
}

// Agrega esto en shared.interface.ts
