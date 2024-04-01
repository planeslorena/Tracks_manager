import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import User from 'src/model/user.model';
import { UsersService } from 'src/services/users.service';


@Controller('/api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getAllUsers(): User[] {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param() params: any): object {
        const { id } = params;
        return this.userService.getUserById(id);
    } 
    
    @Post()
    createUser(@Body() body: User): User | string {
        const newUser = body;
        const user = this.userService.createUser(newUser);
        return user;

    }

    @Post('/usuario/:idUser/playlist/:idPlaylist')
    addPlaylistToUser(@Param() params: any) : User{
        const { idUser, idPlaylist } = params;
        return this.userService.addPlaylistToUSer(idUser, idPlaylist);
    }

}
