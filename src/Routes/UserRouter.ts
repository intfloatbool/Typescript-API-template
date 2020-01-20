import * as Express from 'express';
import { IDataProviderCreator } from '../Data/IDataProviderCreator';
import { FakeDataCreator } from '../Data/Factory/FakeDataCreator';
const Router: Express.Router = Express.Router();

const dataProviderCreator: IDataProviderCreator = new FakeDataCreator();
const dataProvider = dataProviderCreator.create();

Router.get('/', async (req, res) => {
    if(dataProvider) {
        const users = await dataProvider.getUsers();
        res.json(users);
    }  
});

export default Router;

//C:\Source\bitcoin_bonus\Main\BitcoinBonuses\UserBonusService\src\index.ts