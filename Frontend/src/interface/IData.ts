import ITaskType from "./ITaskType";
import IUser from "./IUser";
interface ILabel{
    worker: string | IUser;
    answer: string;
}

interface IData{
    text: string;
    price: number;
    task: string | ITaskType;
    labels: ILabel
}

export type {
    ILabel,
    IData
}