import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Playlist from 'src/model/playlist.model';
import Track from 'src/model/track.model';
import { UsersService } from './users.service';

let myPlaylists: Playlist[] = [
  {
    id: 1,
    duration: 100,
    title: 'rock nacional',
    cantCanciones: 10,
    tracks: [
      { id: 1, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
      { id: 2, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
      { id: 3, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
    ], 
    estilo: 'rock & roll',
  },
  {
    id: 2,
    duration: 180,
    title: 'pop internacional',
    cantCanciones: 7,
    tracks: [
      { id: 4, artist: 'madonna ', duration: 2, title: 'Let it be' },
      { id: 5, artist: 'Adelle', duration: 2, title: 'Let it be' },
      { id: 6, artist: 'Bruno Mars', duration: 5, title: 'Let it be' },
    ],
    estilo: 'pop',
  },
  {
    id: 3,
    duration: 180,
    title: 'urbano ',
    cantCanciones: 3,
    tracks: [
      { id: 4, artist: 'duki ', duration: 2.6, title: 'Let it be' },
      { id: 5, artist: 'tini', duration: 2.4, title: 'Let it be' },
      { id: 6, artist: 'fmk', duration: 5.3, title: 'Let it be' },
    ],
    estilo: 'pop',
  },
];

@Injectable()
export class PlaylistsService {
  private usersService?: UsersService;

  enviarService(usService: UsersService) {
    this.usersService = usService;
  }

  private existeTrackArtist(tracks: Track[], artist: string): boolean {
    return (
      tracks.filter((tr) => {
        return tr.artist.toUpperCase().includes(artist.toUpperCase());
      }).length > 0
    );
  }

  getPlaylist(artist: string, playlistName: string): Playlist[] {
    console.log(playlistName);
    let playToReturn = [...myPlaylists];
    playToReturn = playToReturn.filter((pl: Playlist) => {
      return (
        (!playlistName ||
          pl.title.toUpperCase().includes(playlistName.toUpperCase())) &&
        (!artist || this.existeTrackArtist(pl.tracks, artist))
      );
    });
    return playToReturn;
  }

  getPlaylistById(id: number): Playlist {
    return myPlaylists.find(list => list.id == id)
  }

  addTrack(id: any, newTrack: Track): Playlist | string {
    let updatedPlaylist = myPlaylists.find(list => list.id == id);
    const isTrack = updatedPlaylist.tracks.findIndex(track => track.id == newTrack.id)
    if (isTrack == -1) {
      updatedPlaylist.tracks.push(newTrack);
      updatedPlaylist.cantCanciones = updatedPlaylist.tracks.length;
      return updatedPlaylist;
    } else
      return 'La cancion ya se encuentra en la lista'
  }

  deleteTrack(id: any, deleteTrack: Track): string | Playlist {
    let updatedPlaylist = myPlaylists.find(list => list.id == id);
    const i = updatedPlaylist.tracks.findIndex(tr => tr.id == deleteTrack.id);
    if (i == -1) {
      return 'No se encontro track a eliminar';
    } else {
      updatedPlaylist.tracks.splice(i, 1);
      updatedPlaylist.cantCanciones = updatedPlaylist.tracks.length;
      return updatedPlaylist;
    }
  }

  deletePlaylist(id: number) {
    const users = this.usersService.getAllUsers();
    
    users.forEach(us => {
      if (us.playLists.includes(id)) {
        throw new HttpException("La playlist no puede borrarse porque esta siendo usada", HttpStatus.BAD_REQUEST)
      };
    });

    myPlaylists = myPlaylists.filter(pl => pl.id != id);
  }
}
