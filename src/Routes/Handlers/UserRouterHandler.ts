import {EventTypes} from "../../Data/Events/EventType";
import {ParamsDictionary} from "express-serve-static-core";
import * as Express from 'express';
import { FakeUserDataCreator } from '../../Data/Factory/FakeUserDataCreator';
import { ResponseItem, StatusType, FailedReason } from '../ResponseData/ResponseData';
import { User } from '../../Models/Users/User';
import UserValuesBuilder from '../../Data/Builders/UserValuesBuilder';
import { EventNames } from '../../Data/Events/EventName';
import ApiContainer from '../../Data/ApiContainer';
import RouterHandlerBase from './Base/RouterHandlerBase';
import ISafeRouterHandler from "./Base/ISafeRouterHandler";

const dataProviderCreator = new FakeUserDataCreator();
const dataProvider = dataProviderCreator.create();

export default class UserRouterHandler extends RouterHandlerBase implements ISafeRouterHandler {
    isSafe(req: Express.Request<ParamsDictionary>, res: Express.Response, nextFunc?: Express.NextFunction | undefined): Promise<boolean> {
        const isCorrect = req.body?.role === 'ADMIN';
        if(!isCorrect) {
            throw new Error("PERMISSION_DENIED");
        }
        return Promise.resolve(isCorrect);
    }
    onPost = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        
        this.getEventByType(EventTypes.ON_POST)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        const body = req.body;
        const responseItem = new ResponseItem();
        try {
            //checking role of user isnt admin - throws error
            await this.isSafe(req, res);

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
        this.getEventByType(EventTypes.ON_LIST)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
}