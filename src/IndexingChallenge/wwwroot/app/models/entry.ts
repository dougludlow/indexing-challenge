import {Group} from './group';

export interface Entry {
    id: number;
    groupId: number;
    count: number;
    date: Date;
    username: string;
    group: Group;
}