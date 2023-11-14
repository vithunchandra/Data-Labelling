import Data from "./DataInterface";

export default interface Task{
    name: string,
    requester: string,
    profile_image: string,
    type: string,
    price: string,
    status: boolean,
    finish_date: string,
    credibility: number,
    instruction: string,
    total_worker: number,
    data: Data[]
}