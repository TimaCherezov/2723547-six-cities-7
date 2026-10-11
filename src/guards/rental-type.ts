import { RentalType, AVAILABLE_RENTAL_TYPES_SET } from '../shared/types/index.js';

export const isAvailableRentalType = (type: string): type is RentalType => AVAILABLE_RENTAL_TYPES_SET.has(type);
