import express, { Request, Response } from "express"
import { json } from "body-parser"
import { AppDataSource } from "./data-source"
import { createAlbum, darNota, deleteAlbumById, getAlbumById, getAllAlbums, getNotListenedAlbum, getRandomAlbum } from './controller/AlbumController'
import cron from 'node-schedule'
import { AlbumService } from "./service/AlbumService"
import { Album } from "./entity/Album"

export var album_random: Album

export function getRandom(){
    return album_random
}



AppDataSource.initialize().then(() => {
    

    const app = express()
    const albumService = new AlbumService()

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
    app.get('/album/aleatorio', getRandomAlbum)

    app.post("/album", createAlbum)
    app.get("/album", getAllAlbums)
    app.get("/album/:id", getAlbumById)
    app.put("/album/:id/", darNota)

    app.delete("/album/:id", deleteAlbumById)
    
    
    cron.scheduleJob('* * * * * *', async () => {
    const randomAlbum = await albumService.findRandomAlbum();
    if (randomAlbum) {
        album_random = randomAlbum
    } else {
       console.log('Nenhum álbum encontrado.');
    }
    });

    return app.listen(4000)
})
