import express, { NextFunction, Request, Response } from 'express'
import Router from './routes/index'
import cors, { CorsOptions } from 'cors'
import { respError } from './utils'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import colors from 'colors'

const corsOptions: CorsOptions = {
    origin: async function (origin, callback) {

        if (!origin || [process.env.FRONTEND_URL].includes(origin) || process.argv[2] === '--api') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Esto permite enviar cookies y encabezados de autenticación
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(morgan('dev'))

const PORT = 3021

app.get('/ping', (req, res) => {
    console.log('Someone pinged here!!')
    res.send('pong')
})
app.use('/api', Router)

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json(respError({
            msg: 'Foreign key constraint failed.',
            details: err.message,
        }));
    }

    res.status(500).json(respError({
        msg: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }));

})

app.listen(PORT, () => {
    console.log(colors.cyan.bold.italic(`------------------------------`))
    console.log(colors.cyan.bold.italic(`Server running on port ${PORT}`))
    console.log(colors.cyan.bold.italic(`------------------------------`))
})
