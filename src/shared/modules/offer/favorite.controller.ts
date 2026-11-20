import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError, HttpMethod, RequestBody, RequestParams, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for FavoriteController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async index(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.findFavorites();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { params }: Request<RequestParams, RequestBody, unknown>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.updateFavoriteStatus(params.offerId as string, true);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerId}» not found.`,
        'FavoriteController',
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete(
    { params }: Request<RequestParams, RequestBody, unknown>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.updateFavoriteStatus(params.offerId as string, false);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${params.offerId}» not found.`,
        'FavoriteController',
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }
}
