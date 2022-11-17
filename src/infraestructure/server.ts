import expres, { Application } from 'express';
import cors from 'cors';
import toDoesRoutes from './driverAdapters/todo/todoes.routes';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        toDoes: '/v1/api/toDoes',
    }

    constructor() {
        this.app = expres();
        this.port = process.env.PORT || '';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        //Cors
        this.app.use(cors());

        //Read body
        this.app.use(expres.json());
    }

    routes() {
        this.app.use(this.apiPaths.toDoes, toDoesRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server run port' + this.port);
        })
    }
}

export default Server;