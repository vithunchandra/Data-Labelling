import { IData } from "./IData";
import ITaskType from "./ITaskType";
import IUser from "./IUser";

export default interface ITask{
    _id: string;
    task_name: string;
    task_description: string;
    possible_label: string[];
    start_date: string;
    end_date: string;
    active: boolean;
    min_credibility: number;
    requester: IUser;
    task_type: ITaskType;
    data: IData[] | string[];
}