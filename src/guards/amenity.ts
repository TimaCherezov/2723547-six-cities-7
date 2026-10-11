import { Amenity, AVAILABLE_AMENITIES_SET } from '../shared/types/index.js';

export const isAvailableAmenity = (amenity: string): amenity is Amenity => AVAILABLE_AMENITIES_SET.has(amenity);

export const toAmenityArray = (amenities: string[]): Amenity[] => amenities.filter((a): a is Amenity => isAvailableAmenity(a));
