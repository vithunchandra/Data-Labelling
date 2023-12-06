import { Link } from "react-router-dom";
// import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ITask from "../../interface/ITask";

export default function TaskList ({task}: {task: ITask[]}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="align-middle text-center" style={{
                        width: '5%'
                    }}>No</th>
                    <th className="align-middle" style={{
                        width: '70%'
                    }}>Nama</th>
                    <th className="align-middle text-center" style={{
                        width: '15%'
                    }}>Total Data</th>
                    <th className="align-middle text-center"  style={{
                        width: '10%'
                    }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    task.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="align-middle text-center">{index + 1}</td>
                                <td className="align-middle text-capitalize text-truncate">{item.task_name}</td>
                                <td className="align-middle text-center">{item.data.length}</td>
                                <td className="align-middle text-center">
                                    {item.active ? 
                                        <Button variant="contained" startIcon={<EditIcon />} disabled>Edit</Button>
                                        :
                                        <Link to={item._id}>
                                            <Button variant="contained" startIcon={<EditIcon />}>Edit</Button>
                                        </Link>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}