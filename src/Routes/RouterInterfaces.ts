import {EventTypes} from '../Data/Events/EventType';
import {Request, Response, NextFunction, Router} from 'express';
import {EventEmitter} from 'events';
import { EventNames } from '../Data/Events/EventName';
import ApiContainer from '../Data/ApiContainer';

export interface IEventListenerDelegate {
    (apiContainer: ApiContainer): void;
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

    addEventListener(evType: EventTypes, evName: EventNames ,callBack: IEventListenerDelegate): void;
    getEventByType(evType: EventTypes): EventEmitter | undefined;
}