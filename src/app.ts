import express, { Request, Response } from "express"
import { json } from "body-parser"
import { AppDataSource } from "./data-source"
import { createAlbum, getAllAlbums } from './controller/AlbumController'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(json())

    app.get('/', (req: Request, res: Response) => {
        return res.json("ok")
    })

    app.post("/album", createAlbum)
    app.get("/album", getAllAlbums)
    app.get("/album/:id", getAllAlbums)

    return app.listen(4000)
})