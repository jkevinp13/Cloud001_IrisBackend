import dotenv from 'dotenv';
import Server from './src/infraestructure/server';

dotenv.config();

const application = new Server();

application.listen();