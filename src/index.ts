import express from 'express';
import bodyParser from 'body-parser';
import ApiRouter from './Routes/ApiRouter';
import UserRouterHandler from './Routes/UserRouterHandler';
import { EventTypes } from './Data/Events/EventType';
import { EventNames } from './Data/Events/EventName';

const PORT = process.env.PORT || 6011;
const app = express();

const RoutesPath = {
    USERS: '/users'
}

const ApiRouters = {
    USERS: new ApiRouter(new UserRouterHandler())
}

ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_POST, EventNames.OnConnectionStart, (apiContainer) => {
    console.log(`On Start event: Api container! \n ${apiContainer}`);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(RoutesPath.USERS, ApiRouters.USERS.getRouter());

app.get('/', (req, res) => {
    const body = req.body;
    if(body.name) {   
        res.send(`Hi man ${body.name} !`);
        return;
    }
    res.send('Hey baby');
});

app.listen(PORT, () => {
    console.log(`Applicatuin running at port: ${PORT}`);
});


