import { Request, Response } from 'express';

import { Box } from '../models/Box';

class Controller {
    async store(req: Request, res: Response) {
        const box = await Box.create({ title: req.body.title });
        return res.json(box);
    }

    async show(req: Request, res: Response) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAr: -1 } },
        });
        return res.json(box);
    }
}
export const BoxController = new Controller();
