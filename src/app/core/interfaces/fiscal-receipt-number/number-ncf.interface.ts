import { BaseMongoFields } from "../shared/shared.interface";


export interface NcfBase {
  ncf: string;
  tipoNcf: string;
  estado: 'available' | 'used' | 'expired' | 'reserved';
  fechaVencimiento: string; // ISO string
  orderId: string | null;
  usadoEn: string | null;
}

export interface NcfResponse extends NcfBase, BaseMongoFields {}

export interface CreateNcfRequest {
  tipoNcf: string;
  ncf: string;
  fechaVencimiento: string; // YYYY-MM-DD
}

export type FiscalDataInterface = CreateNcfRequest;

export interface CreateBulkNcfsRequest {
  ncfs: CreateNcfRequest[];
}

export interface CreateBulkNcfsResponse {
  count: number;
}

export interface NcfStatsItem {
  tipoNcf: string;       // viene como _id
  available: number; // o 'disponibles'
  used: number;      // o 'usados'
  expired: number;   // o 'vencidos'
}