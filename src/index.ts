import express from 'express';
import bodyParser from 'body-parser';
import ApiRouter from './Routes/ApiRouter';
import UserRouterHandler from './Routes/UserRouterHandler';

const PORT = process.env.PORT || 6011;
const app = express();

const RoutesPath = {
    USERS: '/users'
}

const ApiRouters = {
    USERS: new ApiRouter(new UserRouterHandler())
}

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


