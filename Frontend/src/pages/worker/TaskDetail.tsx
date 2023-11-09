import { useState } from 'react'
import tasks from '../../dummy_data/task.json'

export default function TaskDetail(){
    const [taskIndex, setTaskIndex] = useState();
}

export function taskDetailLoader({params} : {params: Map<string, any>}){
    return params['task_id']
}