import { Request, Response, NextFunction } from 'express';

/**
 * Interface about checking of some router predictions
 */
export default interface ISafeRouterHandler {
    /**
     * Checking some predictions of http request
     * @param req = request of router
     * @param res = response of router
     * @param nextFunc = ?next middleware function
     */
    isSafe(req: Request, res: Response, nextFunc?: NextFunction): Promise<boolean>;
}