// core/interfaces/legal-content.interface.ts

export interface LegalSection {
  /**
   * Título opcional de la sección (ej: "1.1 Información que Recopilamos")
   */
  title?: string;
  
  /**
   * Contenido principal del párrafo
   */
  content: string;
  
  /**
   * Lista de puntos o viñetas opcionales para detallar información
   */
  items?: string[];
}

export interface LegalContent {
  /**
   * Título principal de la página (ej: "Privacy Policy")
   */
  title: string;
  
  /**
   * Fecha para mostrar al usuario cuándo se actualizó por última vez
   */
  lastUpdated: string;
  
  /**
   * Array de secciones que componen el cuerpo del documento legal
   */
  sections: LegalSection[];
}