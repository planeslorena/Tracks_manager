import { Module } from '@nestjs/common';
import { User } from './app.controller';
import { AppService } from './app.service';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';
import { PlaylistsController } from './controllers/playlists.controller';
import { PlaylistsService } from './services/playlists.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [User, TracksController, PlaylistsController, UsersController],
  providers: [AppService, TracksService, PlaylistsService, UsersService],
})
export class AppModule {}
