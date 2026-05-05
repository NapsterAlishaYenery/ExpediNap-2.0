export interface TableColumn {
  key: string;       // El nombre de la propiedad en el JSON (ej: 'totalPrice')
  label: string;     // El título que verá el usuario (ej: 'Monto Total')
  type?: 'text' | 'currency' | 'date' | 'badge' | 'boolean'; // Para saber cómo formatear
}
