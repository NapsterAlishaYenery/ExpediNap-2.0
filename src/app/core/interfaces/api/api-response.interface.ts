import { PaginationMetadata } from "../shared/shared.interface";

export interface ApiResponse<T> {
  ok: boolean;
  message: string;
  data: T; // Aquí irá el Blog, Yacht, User, etc.
  pagination?: PaginationMetadata; // Opcional, solo viene en los 'Get All'
  type?: string; // Solo viene en caso de error
}

