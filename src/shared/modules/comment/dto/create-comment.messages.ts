export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 1024',
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: 'min rating is 1',
    maxValue: 'max rating is 5',
  },
  offerId: {
    invalidId: 'offerId field must be a valid id',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
