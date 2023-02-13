import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) { 
        res.json({messsage: "API is in /api/clients!!"});
    }
}

export const indexController = new IndexController;