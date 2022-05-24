import { IProfile } from "./profile";

export interface IActivity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: IProfile;
    attendees: IProfile[];
}

export class Activity implements IActivity {
    constructor(init?: ActivityFormValues) {
        Object.assign(this, init);
    }
    id = '';
    title = '';
    date = new Date();
    description = '';
    category = '';
    city = '';
    venue = '';
    hostUsername = '';
    isCancelled = false;
    isGoing = false;
    isHost = false;
    host?: IProfile | undefined;
    attendees: IProfile[] = [];
}

export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(activity?: ActivityFormValues) {
        if (activity) {
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.date = activity.date;
            this.venue = activity.venue;
            this.city = activity.city;
        }
    }
}