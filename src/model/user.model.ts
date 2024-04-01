import Playlist from "./playlist.model";

interface User {
    id?: number | undefined;
	nombre: string;
	apellido: string;
	playLists?: number[] | undefined;
}

export default User;