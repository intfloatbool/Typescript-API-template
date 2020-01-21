import {EventEmitter} from 'events';
import {EventType} from "../Data/Events/EventType";
import {IRouterHandler, IEventListenerDelegate } from "./RouterInterfaces";
import {ParamsDictionary} from "express-serve-static-core";
import * as Express from 'express';
import { FakeUserDataCreator } from '../Data/Factory/FakeUserDataCreator';
import { ResponseItem, StatusType, FailedReason } from './ResponseData/ResponseData';
import { User } from '../Models/Users/User';
import UserValuesBuilder from '../Data/Builders/UserValuesBuilder';

const dataProviderCreator = new FakeUserDataCreator();
const dataProvider = dataProviderCreator.create();

export default class UserRouterHandler implements IRouterHandler {
    private _event: EventEmitter;
    constructor() {
        this._event = new EventEmitter();
    }
    async onPost(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
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
        res.json(responseItem);
    }    
    async onPut(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
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
        res.json(responseItem);
    }
    async onDelete(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        const responseItem = new ResponseItem();
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
        res.json(responseItem);
    }
    async onGet(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        const responseItem = new ResponseItem();
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
        res.json(responseItem);
    }
    async onList(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        const responseItem = new ResponseItem();
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
        
        res.json(responseItem);
    }
    addEventListener(evType: EventType, callBack: IEventListenerDelegate): void {
        this._event.addListener(evType.toString(), callBack);
    }
    getEvent(): EventEmitter {
        return this._event;
    }



}