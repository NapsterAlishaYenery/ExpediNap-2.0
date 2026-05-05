import { FiscalDataInterface } from "../../fiscal-receipt-number/number-ncf.interface";
import { BaseMongoFields, ClientInterface, Pricing, StatusCount } from "../../shared/shared.interface";

export interface ExcursionPricing extends Pricing {
    adultPriceSnap: number;
    childPriceSnap: number;
    subtotal: number;
    tax: number;

}

export interface NumberOfPax {
    adults: number;
    children: number;
}

export interface OrderExcursionBase extends ClientInterface {
    excursionId: string;
    adults: number;
    children: number;
    travelDate: string;
    hotelName?: string;   // <--- NUEVO (Opcional para que no rompa)
    hotelNumber?: string; // <--- NUEVO (Opcional)
}

export interface OrderExcursionResponse extends BaseMongoFields {
    pax: NumberOfPax;
    pricing: ExcursionPricing;
    orderNumber: string;
    customer: ClientInterface;
    hotelName: string;    // <--- NUEVO
    hotelNumber: string;  // <--- NUEVO
    excursionId: string;
    excursionName: string;
    location: string;
    travelDate: string;
    status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled' | 'deleted';
    internalNotes: string | null;
    fiscalData?: FiscalDataInterface; // <--- AGREGAR ESTO
    // --- NUEVO CAMPO PARA PAYPAL ---
    paypalOrderId?: string; // Lo ponemos opcional (?) por si las órdenes viejas no lo tienen
}

export type CreateOrderExcursion = OrderExcursionBase;

export type UpdateOrderExcursion = Partial<Pick<OrderExcursionResponse, 'status' | 'internalNotes'>>;

export interface OrderExcursionStats {
    totalOrders: number;
    revenue: number
    statusCount: StatusCount;
}