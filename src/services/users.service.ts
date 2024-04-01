import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from 'src/model/user.model';
import { PlaylistsService } from './playlists.service';

const myUsers: User[] = [
    {
        id: 1,
        nombre: 'lorena',
        apellido: 'planes',
        playLists: [1, 2]
    },
    {
        id: 2,
        nombre: 'clara',
        apellido: 'salias',
        playLists: [2]
    }
]
export default myUsers;

@Injectable()
export class UsersService {
    constructor(private readonly playlistService: PlaylistsService) { 
        playlistService.enviarService(this);
    }
    
    private idUser: number = 1;

    getAllUsers(): User[] {
        return myUsers;
    }

    getUserById(id: number): object {
        const user = myUsers.find(us => us.id == id);
        const playlist = user.playLists.map((pl) => {
            return this.playlistService.getPlaylistById(pl)
        })
        return {
            ...user,
            playLists: playlist
        }
    }

    createUser(newUser: User): User {
        try {
            const userCreate = {
                ...newUser,
                id: this.idUser,
                playLists: [],
            }
            this.idUser++;
            return userCreate;
        } catch (error) {
            throw new HttpException("Error al crear el usuario", HttpStatus.BAD_REQUEST)
        }
    }

    addPlaylistToUSer(idUser: number, idPlaylist: number): User {
        const playlist = this.playlistService.getPlaylistById(idPlaylist);
        const user = myUsers.find(us => us.id == idUser);

        if (!playlist || !user) {
            throw new HttpException("El usuario o playlist no existe", HttpStatus.BAD_REQUEST);
        }

        if (user.playLists.includes(Number(idPlaylist))) {
            throw new HttpException("La playlist ya se encuentra en el usuario", HttpStatus.BAD_REQUEST);
        }

        user.playLists.push(Number(idPlaylist));
        return user;
    }
}