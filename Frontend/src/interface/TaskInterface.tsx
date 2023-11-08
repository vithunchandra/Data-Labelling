import Data from "./DataInterface";

export default interface Task{
    name: string,
    requester: string,
    profile_image: string,
    type: string,
    status: boolean,
    finish_date: string,
    data: Data[]
}