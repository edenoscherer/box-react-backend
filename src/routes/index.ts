import * as express from 'express';
import * as multer from 'multer';

import { FileController } from '../controllers/FileController';

// const multerConfig = require('../config/multer');
import { MulterConfig } from '../config/multer';
import { BoxController } from '../controllers/BoxController';

// const BoxController = require('../controllers/BoxController');
// const FileController = require('../controllers/FileController');

export const routes = express.Router();

routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes/:id/files', multer(MulterConfig).single('file'), FileController.store);
