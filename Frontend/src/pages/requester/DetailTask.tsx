import { useState } from 'react';
import tasks from '../../dummy_data/task.json'
import { useLoaderData } from 'react-router-dom';
import ListLabel from '../../components/requester/ListLabel';

export default function DetailTask(){
    const[task, setTask] = useState(tasks[parseInt(useLoaderData() as string)]);

    return (
        <div>
            {
                task.data.map((item, index) => {
                    return (
                        <div>
                            {item.data}
                            <ListLabel label={item.labels} key={index} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export function taskMonitorLoader({params} : {params: Map<string, any>}){
    return params['task_id']
}