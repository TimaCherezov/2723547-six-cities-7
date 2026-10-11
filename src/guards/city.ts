import { City, AVAILABLE_CITIES_SET } from '../shared/types/index.js';

export const isAvailableCity = (city: string): city is City => AVAILABLE_CITIES_SET.has(city);
