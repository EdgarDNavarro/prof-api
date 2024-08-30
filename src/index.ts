import express, { NextFunction, Request, Response } from 'express'
import Router from './routes/index'
import cors from 'cors'
import { respError } from './utils'

const app = express()
app.use(express.json())
app.use(cors())

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
    console.log('Server running on port', PORT)
})