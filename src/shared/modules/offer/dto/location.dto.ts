import { Max, Min } from 'class-validator';
import { CreateOfferMessages } from './create-offer.messages.js';

export class LocationDto {
  @Min(-90, { message: CreateOfferMessages.location.latitude.minValue })
  @Max(90, { message: CreateOfferMessages.location.latitude.maxValue })
  public latitude: number;

  @Min(-180, { message: CreateOfferMessages.location.longitude.minValue })
  @Max(180, { message: CreateOfferMessages.location.longitude.maxValue })
  public longitude: number;
}
