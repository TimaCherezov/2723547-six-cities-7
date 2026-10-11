import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import type { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { PRICE_CONFIG, ROOMS_CONFIG, GUESTS_CONFIG, RATING_CONFIG, AMENITIES_CONFIG, CITIES_LOCATION_CONFIG } from '../../../const/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const data = this.mockData;

    const name = getRandomItem(data.titles);
    const description = getRandomItem(data.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const city = getRandomItem(data.cities);
    const preview = getRandomItem(data.previewImages);
    const photos = getRandomItems(data.offerImages).slice(0, 6);

    const isPremium = Math.random() < 0.1;
    const isFavorite = Math.random() < 0.3;
    const rating = Number(
      (Math.random() * (RATING_CONFIG.max - RATING_CONFIG.min) + RATING_CONFIG.min).toFixed(1),
    );

    const type = getRandomItem(data.rentalTypes);
    const roomsCount = generateRandomValue(ROOMS_CONFIG.min, ROOMS_CONFIG.max);
    const guestsCount = generateRandomValue(GUESTS_CONFIG.min, GUESTS_CONFIG.max);
    const price = generateRandomValue(PRICE_CONFIG.min, PRICE_CONFIG.max);

    const amenities = getRandomItems(data.amenities).slice(
      0,
      generateRandomValue(AMENITIES_CONFIG.min, AMENITIES_CONFIG.max),
    );

    const authorName = getRandomItem(data.users);
    const email = getRandomItem(data.emails);
    const avatar = getRandomItem(data.avatars);
    const password = '123456';
    const userType = Math.random() < 0.8 ? 'basic' : 'pro';

    const location = CITIES_LOCATION_CONFIG[city];

    return [
      name,
      description,
      date,
      city,
      preview,
      photos.join(';'),
      isPremium,
      isFavorite,
      rating,
      type,
      roomsCount,
      guestsCount,
      price,
      amenities.join(';'),
      authorName,
      email,
      avatar,
      password,
      userType,
      `${location.latitude},${location.longitude}`,
    ].join('\t');
  }
}
