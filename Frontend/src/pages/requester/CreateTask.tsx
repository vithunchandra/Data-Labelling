import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import TaskList from '../../components/requester/TaksList';
import task from '../../dummy_data/task.json'
import { Link } from 'react-router-dom';

export default function CreateTask() {
    return (
        <div>
            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                <div className="fw-bold fs-4 mb-2">Task</div>
                <TaskList task={task.filter((item) => item.requester == "vithun chandra")} />
            </div>
            <Link to={"add"}>
                <IconButton className='position-fixed fixed-bottom' style={{width:"7.5%", marginBottom:"0%", marginLeft:"90%"}}>
                    <AddCircleIcon sx={{fontSize: "100px"}}></AddCircleIcon>
                </IconButton>
            </Link>
        </div>
    )
}
