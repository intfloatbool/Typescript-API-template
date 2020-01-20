import * as Express from 'express';
import { FakeUserDataCreator } from '../Data/Factory/FakeUserDataCreator';
import { ResponseItem, StatusType, FailedReason } from './ResponseData/ResponseData';
const Router: Express.Router = Express.Router();

const dataProviderCreator = new FakeUserDataCreator();
const dataProvider = dataProviderCreator.create();


Router.get('/:id', async (req, res) => {
    const responseItem = new ResponseItem();
    try {
        const userId = req.params.id;
        const user = await dataProvider?.getItemById(Number(userId));
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
            const users = await dataProvider.getItems();    
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