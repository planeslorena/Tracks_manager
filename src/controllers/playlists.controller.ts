import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
  } from '@nestjs/common';
import Track from 'src/model/track.model';
import Playlist from 'src/model/playlist.model';
import { PlaylistsService } from 'src/services/playlists.service';
import { UsersService } from 'src/services/users.service';

@Controller('/api/playlists')
export class PlaylistsController {
    constructor(private readonly playlistService: PlaylistsService, 
      private readonly usersService: UsersService) { }


    @Get()
    getPlaylists(
      @Query('artist') artista: string,
      @Query('name') nombrePlaylist: string,
    ): Playlist[] {
      return this.playlistService.getPlaylist(artista, nombrePlaylist);
    }

    @Get('/:id')
    getPlaylistsById(@Param() params : any): Playlist {
        const { id } = params;
        return this.playlistService.getPlaylistById(id);
    }

    @Put('/agregartrack/:id')
    addTrack(@Param() params : any, @Body() body: Track): Playlist | string {
        const { id } = params;
        const newTrack = body;
        return this.playlistService.addTrack(id, newTrack);
    }

    @Put('/eliminartrack/:id')
    deleteTrack(@Param() params : any, @Body() body: Track): Playlist | string {
        const { id } = params;
        const deleteTrack = body;
        return this.playlistService.deleteTrack(id, deleteTrack);
    }

    @Delete('/:id')
    deletePlaylist(@Param() params: any) {
      const { id } = params;
      this.playlistService.deletePlaylist(Number(id));
    } 
}

