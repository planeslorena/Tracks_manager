import { Injectable } from '@nestjs/common';
import Track from 'src/model/track.model';

//Iniciamos el proyecto mockeando con el arreglo declarado en el service
/*let tracks: Track[] = [
  { id: 14, artist: 'John Lennon', duration: 2.5, title: 'Imagine' },
  { id: 15, artist: 'Poul McCarney', duration: 2.1, title: 'Let it be' },
  { id: 16, artist: 'Megadeadth', duration: 6.8, title: 'Tornado of Souls' },
  { id: 17, artist: 'Rammstein', duration: 5.3, title: 'Sonne' },
];*/

//Luego mockeamos una base de datos, mediante un archivo json.
const BASE_URL = 'http://localhost:3030/tracks';

@Injectable()
export class TracksService {
  async getTracks(): Promise<Track[]> {
    const res = await fetch(BASE_URL);
    const tracks = await res.json();
    return tracks;
  }

  async getTrackById(id: number): Promise<Track> {
    const res = await fetch(BASE_URL);
    const tracks = await res.json();
    return tracks.find((tr) => tr.id == id);
  } 

  createTrack(newTrack: Track): Track {
    const newID = new Date().getTime();
    const trCreated = {
      ...newTrack,
      id: newID,
    };
    //tracks.push(trCreated);
    return trCreated;
  }

  deleteTrack(id: number): void {
    //tracks = tracks.filter((tr) => tr.id != id);
  }

  /*updateTrack(id: number, newTrack: Track): Track {
    /*const tr = tracks.find((tr) => tr.id == id);
    tr.artist = newTrack.artist;
    tr.duration = newTrack.duration;
    tr.title = newTrack.title;
    return tr;
  }*/
}
