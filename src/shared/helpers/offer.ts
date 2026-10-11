import { Offer } from '../types/index.js';
import { isAvailableCity, isAvailableRentalType, isAvailableUserType, toAmenityArray } from '../../guards/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    date,
    city,
    preview,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCount,
    guestsCount,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    location,
  ] = offerData.replace('\n', '').split('\t');

  return {
    name,
    description,
    date,
    city: isAvailableCity(city) ? city : 'Paris',
    preview,
    photos: photos.split(','),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: isAvailableRentalType(type) ? type : 'apartment',
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    price: Number.parseInt(price, 10),
    amenities: toAmenityArray(amenities.split(',')),
    author: {
      name: authorName,
      email: authorEmail,
      avatar: authorAvatar,
      password: authorPassword,
      type: isAvailableUserType(authorType) ? authorType : 'basic',
    },
    commentCount: 0,
    location: {
      latitude: Number(location.split(',')[0]),
      longitude: Number(location.split(',')[1]),
    },
  };
}
