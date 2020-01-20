import * as Express from 'express';
const Router: Express.Router = Express.Router();

Router.get('/', (req, res) => {
    res.json({response: "Hello bro this is users api router!!"});
});

export default Router;