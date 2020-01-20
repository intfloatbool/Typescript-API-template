import * as Express from 'express';
import { IDataProviderCreator } from '../Data/IDataProviderCreator';
import { FakeDataCreator } from '../Data/Factory/FakeDataCreator';
const Router: Express.Router = Express.Router();

const RequestParams = {
    ID: 'id'
}

const dataProviderCreator: IDataProviderCreator = new FakeDataCreator();
const dataProvider = dataProviderCreator.create();

Router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    console.log(`Params: \n ${JSON.stringify(req.params)}`);
    const user = await dataProvider?.getUserById(Number(userId));
    if(user) {
        res.json(user);
    }
});

Router.get('/', async (req, res) => {
    if(dataProvider) {
        const users = await dataProvider.getUsers();
        res.json(users);
    }  
});

export default Router;

//C:\Source\bitcoin_bonus\Main\BitcoinBonuses\UserBonusService\src\index.ts