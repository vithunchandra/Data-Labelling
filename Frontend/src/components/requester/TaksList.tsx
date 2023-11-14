import { Link } from "react-router-dom";
import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function TaskList ({task}: {task: Task[]}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="align-middle" style={{
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
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle text-capitalize text-truncate">{item.name}</td>
                                <td className="align-middle text-center">{item.data.length}</td>
                                <td className="align-middle text-center">
                                    {item.status ? 
                                        <Button variant="contained" startIcon={<EditIcon />} disabled>Edit</Button>
                                        :
                                        <Link to={index.toString()}>
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