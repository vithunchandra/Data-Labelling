import IUser from "./IUser";

export interface IChat{
    _id: string;
    task_id: string;
    user: IUser;
    targetUser: IUser;
    text_chat: string;
    timestamp: string;
    is_read: boolean;
}