import type { City } from './city.type.js';
import type { RentalType } from './rental-type.type.js';
import type { Amenity } from './amenity.type.js';
import {User} from './user.type.js';

export type MockServerData = {
  cities: City[];
  titles: string[];
  descriptions: string[];
  previewImages: string[];
  offerImages: string[];
  rentalTypes: RentalType[];
  amenities: Amenity[];
  users: User[];
  emails: string[];
  avatars: string[];
};
