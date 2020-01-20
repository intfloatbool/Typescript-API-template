import * as Express from 'express';
import { FakeUserDataCreator } from '../Data/Factory/FakeUserDataCreator';
import { ResponseItem, StatusType, FailedReason } from './ResponseData/ResponseData';
import { User } from '../Models/Users/User';
import UserValuesBuilder from '../Data/Builders/UserValuesBuilder';
const Router: Express.Router = Express.Router();

const dataProviderCreator = new FakeUserDataCreator();
const dataProvider = dataProviderCreator.create();

Router.post('/', async (req, res) => {
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
});

Router.put('/:id', async (req, res) => {
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
});

Router.delete('/:id', async (req, res) => {
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
});

Router.get('/:id', async (req, res) => {
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
});

Router.get('/', async (req, res) => {
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
});

export default Router;

//C:\Source\bitcoin_bonus\Main\BitcoinBonuses\UserBonusService\src\index.ts