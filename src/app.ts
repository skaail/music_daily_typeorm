import express, { Request, Response } from "express"
import { json } from "body-parser"
import { AppDataSource } from "./data-source"
import { createAlbum, darNota, getAllAlbums, getNotListenedAlbum, getRandomAlbum } from './controller/AlbumController'
import cron from 'node-schedule'
import { AlbumService } from "./service/AlbumService"
import fs from 'fs'

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
    app.get("/album/:id", getAllAlbums)
    app.put("/album/:id/", darNota)
    


    cron.scheduleJob('* * * * *', async () => {
    const randomAlbum = await albumService.findRandomAlbum();
    if (randomAlbum) {
        console.log('Álbum aleatório do dia:', randomAlbum);
        fs.writeFileSync('randomAlbum.json', JSON.stringify(randomAlbum));
        
    } else {
        console.log('Nenhum álbum encontrado.');
    }
    });

    return app.listen(4000)
})