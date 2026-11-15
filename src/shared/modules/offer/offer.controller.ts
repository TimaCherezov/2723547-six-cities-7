import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestBody,
  RequestParams
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component, City } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { UpdateOfferRequest } from './update-offer-request.type.js';

const DEFAULT_OFFER_COUNT = 60;

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Put, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.premium });
  }

  public async index(
    { query }: Request<RequestParams, RequestBody, unknown, { count?: string }>,
    res: Response,
  ): Promise<void> {
    const parsedCount = Number.parseInt(query.count ?? '', 10);
    const offers = await this.offerService.find(Number.isNaN(parsedCount) ? DEFAULT_OFFER_COUNT : parsedCount);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async show(
    { params }: Request<RequestParams, RequestBody, unknown>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.findById(params.offerId as string);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerId}» not found.`,
        'OfferController',
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const responseData = fillDTO(OfferRdo, result);
    this.created(res, responseData);
  }

  public async update(
    { params, body }: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.updateById(params.offerId as string, body);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerId}» not found.`,
        'OfferController',
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete(
    { params }: Request<RequestParams, RequestBody, unknown>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.deleteById(params.offerId as string);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerId}» not found.`,
        'OfferController',
      );
    }

    this.noContent(res, offer);
  }

  public async premium(
    { params }: Request<RequestParams, RequestBody, unknown>,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(params.city as City);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }
}
