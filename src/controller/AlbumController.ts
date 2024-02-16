import { AlbumService } from "../service/AlbumService";
import { Request, Response } from 'express'

const service = new AlbumService()

export const createAlbum = async (req: Request, res: Response) => {
    try {
        const { nome, banda, nota} = req.body
        const novoAlbum = await service.createAlbum(nome, banda, nota)
        res.status(201).json(novoAlbum)
    } catch(err) {
        res.status(500).json({message: "erro ao criar o album"})
        console.log(err)
    }
}

export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await service.getAllAlbums()
        res.json(albums)
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar albums "})
        console.log(err)
    }
}