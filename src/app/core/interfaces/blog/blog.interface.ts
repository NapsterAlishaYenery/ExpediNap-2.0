import { BaseMongoFields } from "../shared/shared.interface";

/**
 * INTERFAZ BASE DE BLOG
 * Representa los campos que el usuario llena manualmente.
 */
export interface BlogBase {
  title: string;
  category: string[];
  type: string;
  author: string; // Por defecto es 'Expedinap Team'
  meta_title: string;
  meta_description: string;
  keywords: string[];
  excerpt: string;
  image: string; // URL o nombre del archivo
  alt: string;
  content: string; // Contenido en formato HTML
}

/**
 * RESPUESTA DEL SERVIDOR (GET /all, GET /detail, etc.)
 * Incluye el slug generado por el backend y los campos de auditoría.
 */
export interface BlogResponse extends BlogBase, BaseMongoFields {
  slug: string;
}

/**
 * REQUEST PARA CREAR (POST)
 * Usamos la base tal cual (el backend se encarga del slug).
 */
export type CreateBlogRequest = BlogBase;

/**
 * REQUEST PARA ACTUALIZAR (PATCH)
 */
export type UpdateBlogRequest = Partial<BlogBase>;