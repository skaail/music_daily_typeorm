import { AlbumService } from "../service/AlbumService";
import { Request, Response } from 'express'

const service = new AlbumService()

export const createAlbum = async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
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
    res.set('Access-Control-Allow-Origin', '*')
    try {
        const albums = await service.getAllAlbums()
        res.json(albums)
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar albums "})
        console.log(err)
    }
}

export const getAlbumById = async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id as unknown as number
        const album = await service.getAlbumById(id)
        res.json(album)
    } catch (err) {
        res.status(500).json({ message: "Album não encontrado "})
        console.log(err)
    }
}

export const darNota =  async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id as unknown as number
        const updates = req.body
        const updateAlbum = await service.darNota(id, updates)

        if(!updateAlbum){
            res.status(404).json({ message: "Album não encontrado"})
        }

        res.json(updateAlbum)
    } catch (err) {
        res.status(500).json({message: "Falha ao atualizar o album"})
        console.log(err)
    }
}