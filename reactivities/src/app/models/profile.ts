import { IUser } from "./user";

export interface IProfile{
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
    following: boolean;
    followersCount: number;
    followingCount: number;
    photos?: IPhoto[];
}

export class Profile implements IProfile{
    username = '';
    displayName = '';
    image?: string | undefined;
    bio?: string | undefined;
    photos: IPhoto[] = [];
    following = false;
    followersCount = 0;
    followingCount = 0;
    
    constructor(user: IUser){
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}

export interface IUserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
}