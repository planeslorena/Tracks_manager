import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import Track from 'src/model/track.model';
import { TracksService } from 'src/services/tracks.service';

@ApiTags('Tracks')
@Controller('/api/tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) { }

  @Get()
  @ApiOperation({ summary: 'Retorna todos los tracks' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Numero de identificacion unico',
            example: 12
          },
          title: {
            type: 'string',
            description: 'Titulo de la cancion',
            example: 'Verte reir'
          },
          duration: {
            type: 'number',
            description: 'Duracion de la cancion',
            example: 2.5
          },
          artist: {
            type: 'string',
            description: 'Interprete de la cancion',
            example: 'No te va a gustar'
          }
        }
      }
    }
  })

  getTracks(): Promise<Track[]> {
    return this.trackService.getTracks();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retorna el track determinado por el id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Numero de identificacion unico',
          example: 12
        },
        title: {
          type: 'string',
          description: 'Titulo de la cancion',
          example: 'Verte reir'
        },
        duration: {
          type: 'number',
          description: 'Duracion de la cancion',
          example: 2.5
        },
        artist: {
          type: 'string',
          description: 'Interprete de la cancion',
          example: 'No te va a gustar'
        }
      }
    }
  })
  getTrackByID(@Param() params: any): Promise<Track> | string {
    const { id } = params;
    const track = this.trackService.getTrackById(id);
    if (track) {
      return track;
    }
    return 'No se encontro track';
  }
/*
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo track' })
  @ApiBody({
    type: Track,
    description: 'Se envía objeto de clase Track, que contiene los datos de la canción a crear',
  })
  createTrack(@Body() body: Track): Track | string {
    const newTrack = body;
    const track = this.trackService.createTrack(newTrack);
    if (track) {
      return track;
    }
    return 'Fallo la creacion de track';
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Actualiza track determinado por el id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true
  })
  @ApiBody({
    type: Track,
    description: 'Se envían los nuevos datos de la cancion a actualizar',
  })
  updateTrack(@Param() params: any, @Body() body: Track): Track | string {
    const newTrack = body;
    const { id } = params;
    const track = this.trackService.updateTrack(id, newTrack);
    if (track) {
      return track;
    }
    return 'Error actualizando Track';
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Elimina track determinado por el id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true
  })
  deleteTrack(@Param() params: any): void {
    const { id } = params;
    this.trackService.deleteTrack(id);
    return;
  }*/
}
