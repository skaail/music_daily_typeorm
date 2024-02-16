import { Repository } from "typeorm"
import { Album } from "../entity/Album"
import { AppDataSource } from "../data-source"
const albumArt = require( 'album-art')

async function getAlbumArt(nome:string, banda:string): Promise<string> {
    
    return await albumArt(banda, {album: nome})
}

export class AlbumService {
    repository = AppDataSource.getRepository(Album)

    async createAlbum(nome: string, banda: string, nota?: number | undefined): Promise<Album>{
        const capa = await getAlbumArt(nome, banda)
        const novoAlbum = this.repository.create({nome, banda, capa , nota })

        return await this.repository.save(novoAlbum)
    }

    async getAllAlbums(): Promise<Album[]>{
        return await this.repository.find()
    }

    async getAlbumById(id: number): Promise<Album | null> {
        return await this.repository.findOne({where: {id: id}})
    }
}