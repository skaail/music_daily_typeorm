import { AlbumService } from "../service/AlbumService"
import { Request, Response } from 'express'
import { album_random } from "../app"

const service = new AlbumService()

export const createAlbum = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const { nome, banda, nota } = req.body
        console.log(nome, banda)
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

export const getNotListenedAlbum = async (req: Request, res: Response) => {
    res.set('Access-Control-Allow-Origin', '*')
    
    try {
        const notListened = await service.getNotListenedAlbum()

        if(notListened.length === 0){
            res.status(200).json({ message: "Nenhum álbum para ouvir"})
        }else{
            res.json(notListened)
        }
        
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar albums"})
        console.log(err)
    }
}

export const getRandomAlbum = (req: Request, res: Response) => {
    try {
        console.log(album_random)
        res.json(album_random)
      } catch (error) {
        console.error('Erro ao ler o álbum aleatório:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
      }
}

export const deleteAlbumById = async (req: Request, res:Response) => {
    try {
        const id = req.params.id as unknown as number
        const album = await service.deleteAlbumById(id)
        res.json(album)
    } catch (error) {
        console.error('Erro ao ler o álbum aleatório:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}