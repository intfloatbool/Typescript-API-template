import {EventEmitter} from 'events';
import {EventTypes} from "../Data/Events/EventType";
import {IRouterHandler, IEventListenerDelegate } from "./RouterInterfaces";
import {ParamsDictionary} from "express-serve-static-core";
import * as Express from 'express';
import { FakeUserDataCreator } from '../Data/Factory/FakeUserDataCreator';
import { ResponseItem, StatusType, FailedReason } from './ResponseData/ResponseData';
import { User } from '../Models/Users/User';
import UserValuesBuilder from '../Data/Builders/UserValuesBuilder';
import { EventNames } from '../Data/Events/EventName';
import ApiContainer from '../Data/ApiContainer';

const dataProviderCreator = new FakeUserDataCreator();
const dataProvider = dataProviderCreator.create();

export default class UserRouterHandler implements IRouterHandler {
    private _eventDict: Map<EventTypes, EventEmitter>;
    constructor() {
        this._eventDict = new Map<EventTypes, EventEmitter>();
        this.initializeEventDict();
    }

    initializeEventDict() {
        this._eventDict.set(EventTypes.ON_DELETE, new EventEmitter());
        this._eventDict.set(EventTypes.ON_GET, new EventEmitter());
        this._eventDict.set(EventTypes.ON_LIST, new EventEmitter());
        this._eventDict.set(EventTypes.ON_POST, new EventEmitter());
        this._eventDict.set(EventTypes.ON_PUT, new EventEmitter());
    }
    onPost = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        
        this.getEventByType(EventTypes.ON_POST)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        const body = req.body;
        const responseItem = new ResponseItem();
        try {
            if(!body) {
                throw new Error("No body of request.");
            }
            const firstName = body.firstName;
            const phoneNumber = body.phoneNumber;
            const user = await dataProvider.create(new User(
                new UserValuesBuilder()
                .setFirstName(firstName)
                .setPhoneNumber(phoneNumber)
                .build()
            ));

            if(user) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = user;
            } 

        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_POST)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }    
    onPut = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        this.getEventByType(EventTypes.ON_PUT)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        const responseItem = new ResponseItem();
        const body = req.body;
        try {
            if(!body) {
                throw new Error("No body of request.");
            }
            const firstName = body.firstName;
            const phoneNumber = body.phoneNumber;

            const userId = req.params.id;
            const user = await dataProvider.update(Number(userId), 
                new UserValuesBuilder()
                    .setFirstName(firstName)
                    .setPhoneNumber(phoneNumber)
                    .build()
                );
            if(user) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = user;
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`Cannot find item with id${userId}!`);
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_PUT)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    onDelete = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        const responseItem = new ResponseItem();
        this.getEventByType(EventTypes.ON_DELETE)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        try {
            const userId = req.params.id;
            const isUserDeleted = await dataProvider.delete(Number(userId));
            if(isUserDeleted) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = {deleted: true};
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`Cannot find item with id${userId}!`);
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_DELETE)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    onGet = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        const responseItem = new ResponseItem();
        this.getEventByType(EventTypes.ON_GET)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        try {
            const userId = req.params.id;
            const user = await dataProvider.read(Number(userId));
            if(user) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = user;
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`Cannot find item with id${userId}!`);
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_GET)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    onList = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        const responseItem = new ResponseItem();
        this.getEventByType(EventTypes.ON_LIST)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        try {
            if(dataProvider) {
                const users = await dataProvider.list();    
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = users;         
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`DataProvier is null!`); 
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString()); 
        }
        this.getEventByType(EventTypes.ON_LIST)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    addEventListener = (evType: EventTypes, evName: EventNames, callBack: IEventListenerDelegate): void => {
        const event = this._eventDict.get(evType);
        event?.addListener(evName.toString(), callBack);
    }
    getEventByType = (eventType: EventTypes): EventEmitter | undefined => {
        return this._eventDict.get(eventType);
    }
}