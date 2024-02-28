import { DeleteResult, IsNull } from "typeorm"
import { AppDataSource } from "../data-source"
import { Album } from "../entity/Album"
const albumArt = require('album-art')
const {getSpotifyAuthToken} = require('spotify-get-track-link')
const axios = require('axios')

async function getAlbumArt(nome:string, banda:string): Promise<string> {
    return await albumArt(banda, {album: nome})
}

async function getUri(nome: string, banda: string): Promise<string>{
    const token = await getSpotifyAuthToken("47d629387eff4cc2a731e7f2c290302e", "5bcf17b2ac36460480687f83171004ae")

	const res = await axios.get(
		`https://api.spotify.com/v1/search?q=${nome}%252520${banda}&type=album&type=album&limit=20`,
		{
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		}
	);
	return res.data.albums.items[0].uri;
}



export class AlbumService {
    repository = AppDataSource.getRepository(Album)

    async createAlbum(nome: string, banda: string, nota?: number | undefined): Promise<Album>{
        const link = await getUri(nome, banda)

        const capa = await getAlbumArt(nome, banda)
        const novoAlbum = this.repository.create({nome, banda, capa, link, nota})

        return await this.repository.save(novoAlbum)
    }

    async getAllAlbums(): Promise<Album[]>{
        const albums = await this.repository.find()
        const nonNullAlbums = albums.filter(album => album.nota !== null);

        return nonNullAlbums
    }

    async getAlbumById(id: number): Promise<Album | null> {
        return await this.repository.findOne({where: {id: id}})
    }

    async darNota(id: number, updates: Partial<Album>): Promise<Album | null> {
        const result = await this.repository.update(id, updates)

        if (result.affected === 0) {
            return null
        }

        return await this.repository.findOne({where: {id: id}})
    }

    async getNotListenedAlbum(): Promise<Album[]> {
        return await this.repository.findBy({nota: IsNull()})
    }

    async findRandomAlbum(): Promise<Album | undefined> {
        const not_listened = await this.repository.findBy({nota: IsNull()})
        const randomIndex = Math.floor(Math.random() * not_listened.length)
        
        const album = not_listened[randomIndex]
        
        return album
    }

    async deleteAlbumById(id: number): Promise<DeleteResult> {
        const album = await this.repository.findOne({where: {id: id}})
        const res = await this.repository.delete({id: album?.id})

        return res
    }

    async updateAlbum(id: number, updates: Partial<Album>): Promise<Album | null> {
        const result = await this.repository.update(id, updates)

        if (result.affected === 0) {
            return null
        }

        return await this.repository.findOne({where: {id: id}})
    }

    
}

