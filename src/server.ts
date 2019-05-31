import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as socketIo from 'socket.io';
import { routes } from './routes';

const app = express();
app.use(cors());
const server = new http.Server(app);


const io = socketIo(server);
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-zvrjq.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true,
});

declare global {
    namespace Express {
        export interface Request {
            io: SocketIO.Server;
        }
    }
}

app.use((req, res, next) => {
    req.io = io;
    return next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(routes);

server.listen(process.env.PORT || 3333);
