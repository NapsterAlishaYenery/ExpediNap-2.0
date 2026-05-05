import { FiscalDataInterface } from "../../fiscal-receipt-number/number-ncf.interface";
import { BaseMongoFields, ClientInterface, Pricing as Pricing, StatusCount } from "../../shared/shared.interface";

export interface OrdertransferBase extends ClientInterface {
    transferType: string;
    pickUpLocation: string;
    destination: string;
    numPassengers: number;
    pickUpDate: string; // ISO String recomendado para el transporte de datos
    flightNumber?: string | null;
    arrivalTime?: string | null;
}

export interface OrdertransferResponse extends BaseMongoFields {
    orderNumber: string;
    customer: ClientInterface;
    transferType: string;
    pickUpLocation: string;
    destination: string;
    numPassengers: number;
    pickUpDate: string;
    status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled' | 'deleted'
    pricing: Pricing;
    arrivalTime: string | null;
    flightNumber: string | null;
    internalNotes: string | null;
    // --- CAMPO FISCAL ---
    fiscalData?: FiscalDataInterface;
}

export type CreateOrderTransfer = OrdertransferBase;

export type UpdateOrderTransfer = Partial<Pick<OrdertransferResponse, 'status' | 'pricing' | 'internalNotes'>>;

export interface OrderTransferStats {
    totalOrders: number;
    revenue: number;
    averageTicket: number;
    statusCount: StatusCount
}