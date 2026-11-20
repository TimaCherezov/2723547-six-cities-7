export const CreateOfferMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 10, max is 100',
  },
  description: {
    invalidFormat: 'description is required',
    lengthField: 'min length is 20, max is 1024',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  city: {
    invalid: 'city must be one of six cities',
  },
  preview: {
    invalidUrl: 'preview must be a valid URL',
  },
  photos: {
    invalidFormat: 'photos must be an array of valid URLs',
    countField: 'photos must contain exactly 6 items',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  rating: {
    minValue: 'min rating is 1',
    maxValue: 'max rating is 5',
  },
  type: {
    invalid: 'type must be apartment, house, room or hotel',
  },
  roomsCount: {
    invalidFormat: 'roomsCount must be an integer',
    minValue: 'min rooms count is 1',
    maxValue: 'max rooms count is 8',
  },
  guestsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'min guests count is 1',
    maxValue: 'max guests count is 10',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'min price is 100',
    maxValue: 'max price is 100000',
  },
  amenities: {
    invalidFormat: 'amenities must be an array',
    invalidItem: 'amenities must contain only valid amenities',
  },
  author: {
    invalidId: 'author field must be a valid id',
  },
  location: {
    latitude: {
      minValue: 'min latitude is -90',
      maxValue: 'max latitude is 90',
    },
    longitude: {
      minValue: 'min longitude is -180',
      maxValue: 'max longitude is 180',
    },
  },
} as const;
