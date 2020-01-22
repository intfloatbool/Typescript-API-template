import express from 'express';
import bodyParser from 'body-parser';
import ApiRouter from './Routes/ApiRouter';
import UserRouterHandler from './Routes/Handlers/UserRouterHandler';
import AuthorizationRouter from './Routes/Authorization/AuthorizationRouter';
import { EventTypes } from './Data/Events/EventType';
import { EventNames } from './Data/Events/EventName';

import Config from './Config/Config';

const PORT = process.env.PORT || 6011;
const app = express();

const RoutesPath = {
    USERS: '/users',
    LOGIN: '/login'
}

const ApiRouters = {
    USERS: new ApiRouter(new UserRouterHandler())
}

const Routers = {
    LOGIN: new AuthorizationRouter()
}

//TEST
ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_DELETE, EventNames.OnConnectionStart, (apiContainer) => {
    console.log(`*DELETE* ON START_EVENT \n ${JSON.stringify(apiContainer.RequsetObj?.body)}`);
});
ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_DELETE, EventNames.OnConnectionFinish, (apiContainer) => {
    console.log(`*DELETE* ON FINISH_EVENT \n ${JSON.stringify(apiContainer.ResponseItem)}`);
});

ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_GET, EventNames.OnConnectionStart, (apiContainer) => {
    console.log(`*GET* ON START_EVENT \n ${JSON.stringify(apiContainer.RequsetObj?.body)}`);
});
ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_GET, EventNames.OnConnectionFinish, (apiContainer) => {
    console.log(`*GET* ON FINISH_EVENT \n ${JSON.stringify(apiContainer.ResponseItem)}`);
});

ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_LIST, EventNames.OnConnectionStart, (apiContainer) => {
    console.log(`*LIST* ON START_EVENT \n ${JSON.stringify(apiContainer.RequsetObj?.body)}`);
});
ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_LIST, EventNames.OnConnectionFinish, (apiContainer) => {
    console.log(`*LIST* ON FINISH_EVENT \n ${JSON.stringify(apiContainer.ResponseItem)}`);
});

ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_POST, EventNames.OnConnectionStart, (apiContainer) => {
    console.log(`*POST* ON START_EVENT \n ${JSON.stringify(apiContainer.RequsetObj?.body)}`);
});
ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_POST, EventNames.OnConnectionFinish, (apiContainer) => {
    console.log(`*POST* ON FINISH_EVENT \n ${JSON.stringify(apiContainer.ResponseItem)}`);
});

ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_PUT, EventNames.OnConnectionStart, (apiContainer) => {
    console.log(`*PUT* ON START_EVENT \n ${JSON.stringify(apiContainer.RequsetObj?.body)}`);
});
ApiRouters.USERS.getHandler().addEventListener(EventTypes.ON_PUT, EventNames.OnConnectionFinish, (apiContainer) => {
    console.log(`*PUT* ON FINISH_EVENT \n ${JSON.stringify(apiContainer.ResponseItem)}`);
});

//END-TEST

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(RoutesPath.USERS, ApiRouters.USERS.getRouter());
app.use(RoutesPath.LOGIN, Routers.LOGIN.getRouter());

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


