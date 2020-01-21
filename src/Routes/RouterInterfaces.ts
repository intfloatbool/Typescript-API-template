import {EventType} from '../Data/Events/EventType';
import {Request, Response, NextFunction, Router} from 'express';
import {EventEmitter} from 'events';

export interface IEventListenerDelegate {
    (req: Request, res:Response, ...params: any[]): void;
}

export interface IRouter {
    setHandler(handler: IRouterHandler): void;
    getRouter(): Router;
}

export interface IRouterHandler {
    onPost(req: Request, res:Response, next?: NextFunction): Promise<void>;
    onPut(req: Request, res:Response, next?: NextFunction): Promise<void>;
    onDelete(req: Request, res:Response, next?: NextFunction): Promise<void>;
    onGet(req: Request, res:Response, next?: NextFunction): Promise<void>;
    onList(req: Request, res:Response, next?: NextFunction): Promise<void>;

    addEventListener(evType: EventType, callBack: IEventListenerDelegate): void;
    getEvent(): EventEmitter;
}