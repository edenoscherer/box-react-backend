import { Request, Response } from 'express';

import { Box } from '../models/Box';
import { File } from '../models/File';

class Controller {
    async store(req: Request, res: Response) {
        const box = await Box.findById(req.params.id);
        const file = await File.create({ title: req.file.originalname, path: req.file.filename });
        box.files.push(file);
        await box.save();
        req.io.sockets.in(box._id).emit('file', file);
        return res.json(file);
    }
}

export const FileController = new Controller();
