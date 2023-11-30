import ITaskType from "./ITaskType";
import IUser from "./IUser";
interface ILabel{
    _id: string;
    worker: string | IUser;
    answer: string;
}

interface IData{
    _id: string;
    text: string;
    price: number;
    task: string | ITaskType;
    label: ILabel
}

export type {
    ILabel,
    IData
}