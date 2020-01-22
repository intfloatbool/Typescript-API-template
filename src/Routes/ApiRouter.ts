import { IApiRouter, IRouterHandler } from "./RouterInterfaces";
import * as Express from 'express';
import Authorization from '../Middlewares/Authorization';

export default class ApiRouter implements IApiRouter {
    private _handler: IRouterHandler;
    private _router: Express.Router;
    constructor(handler: IRouterHandler) {
        this._handler = handler;
        this._router = Express.Router();

        this._router.post('/', Authorization,this._handler.onPost);
        this._router.put('/:id', Authorization, this._handler.onPut);
        this._router.delete('/:id', Authorization, this._handler.onDelete);
        this._router.get('/:id', Authorization, this._handler.onGet);
        this._router.get('/', Authorization, this._handler.onList);
    }
    
    getHandler = () => this._handler;
    setHandler(handler: IRouterHandler): void {
        this._handler = handler;
    }    
    getRouter(): Express.Router {
        return this._router;
    }

}