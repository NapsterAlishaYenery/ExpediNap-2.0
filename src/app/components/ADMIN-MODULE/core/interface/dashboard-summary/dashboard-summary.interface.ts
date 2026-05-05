import { NcfStatsItem } from "../../../../../core/interfaces/fiscal-receipt-number/number-ncf.interface";
import { OrderExcursionStats } from "../../../../../core/interfaces/orders/order-excursions/order-excursion.interface";
import { OrderTransferStats } from "../../../../../core/interfaces/orders/order-transfers/order-transfer.interface";
import { OrderYachtStats } from "../../../../../core/interfaces/orders/order-yachts/order-yacht.interface";


export interface DashboardSummary {
    excursions: OrderExcursionStats;
    yachts: OrderYachtStats;
    transfers: OrderTransferStats;
    ncf: NcfStatsItem[];
}