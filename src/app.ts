import express, { Request, Response } from "express"
import { json } from "body-parser"
import { AppDataSource } from "./data-source"
import { createAlbum, darNota, getAllAlbums, getNotListenedAlbum } from './controller/AlbumController'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(json())

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.get('/', (req: Request, res: Response) => {
        return res.json("ok")
    })

    app.get("/album/recomendacao", getNotListenedAlbum)

    app.post("/album", createAlbum)
    app.get("/album", getAllAlbums)
    app.get("/album/:id", getAllAlbums)
    app.put("/album/:id/", darNota)
    

    return app.listen(4000)
})