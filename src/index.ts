require('dotenv').config()

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

const app : express.Express = express();

app.use(cors({
    origin: true,
    credentials: true,
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error));

server.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Sever running on port: ${process.env.SERVER_PORT || 3000}`);
});

app.use('/', router())