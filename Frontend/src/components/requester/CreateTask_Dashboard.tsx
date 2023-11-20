import { Link } from "react-router-dom";
import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function CreateTask_Dashboard({task}: {task: Task[]}) {
    return (
        <div key={"ctd"}>
            <table className="table">
                <thead>
                    <tr>
                        <th className="align-middle text-center" style={{
                            width: '5%'
                        }}>No</th>
                        <th className="align-middle" style={{
                            width: '20%'
                        }}>Nama</th>
                        <th className="align-middle text-center" style={{
                            width: '10%'
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
                                <tr key={"ct"+index}>
                                    <td className="align-middle text-center">{index + 1}</td>
                                    <td className="align-middle text-capitalize text-truncate">{item.name}</td>
                                    <td className="align-middle text-center">{item.data.length}</td>
                                    <td className="align-middle text-center">
                                        {item.status ? 
                                            <Button variant="contained" startIcon={<EditIcon />} disabled>Edit</Button>
                                            :
                                            <Link to={"create_task/"+index.toString()}>
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
        </div>
    )
}