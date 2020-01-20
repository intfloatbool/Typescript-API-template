import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 6011;
const app = express();

import UserRouter from './Routes/UserRouter';

const Routes = {
    USERS: '/users'
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(Routes.USERS, UserRouter);

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

