import { FiscalDataInterface } from "../../fiscal-receipt-number/number-ncf.interface";
import { BaseMongoFields, ClientInterface, Pricing, StatusCount } from "../../shared/shared.interface";

export interface Yachtpricing extends Pricing {
    basePrice: number;
    tax: number;

}

export interface OrderYachtBase extends ClientInterface {
    yachtId: string;
    destination: string;
    duration: string;
    travelDate: string;

}

export interface OrderYachtResponse extends BaseMongoFields {
    pricing: Yachtpricing;
    orderNumber: string;
    customer: ClientInterface;
    yachtId: string;
    yachtName: string;
    destination: string;
    duration: string;
    timeTrip: string;
    travelDate: string;
    status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled' | 'deleted';
    isAvailable: boolean;
    internalNotes: string | null;
    // --- INTEGRACIÓN FISCAL ---
    fiscalData?: FiscalDataInterface;
}

export type CreateOrderYacht = OrderYachtBase;

export type UpdateOrderYacht = Partial<Pick<OrderYachtResponse, 'status' | 'isAvailable' | 'internalNotes'>>;

export interface OrderYachtStats {
    totalOrders: number;
    revenue: number
    statusCount: StatusCount;
}