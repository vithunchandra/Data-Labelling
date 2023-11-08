import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Task from "../../interface/TaskInterface";

export default function LastTask({task}: {task: Task}){
    const data = task.data;

    return(
        <>
            <div className="fs-5 fw-light">Last Task</div>
            <div className="row align-items-center my-1">
                <div className="col-6 fs-4 fw-bold text-capitalize">{task.name}</div>
                <div className="col-6 text-secondary text-end">{task.finish_date}</div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="text-center" style={{width: "10%"}}>Index</th>
                        <th scope="col" style={{width: "60%"}}>Data</th>
                        <th scope="col" className="text-end">Status</th>
                        <th scope="col" className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        data.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td className="text-center align-middle" style={{width: "10%"}}>{index + 1}</td>
                                    <td className="text-truncate align-middle" style={{width: "60%"}}>{item.data}</td>
                                    <td className="text-end align-middle">{item.status}</td>
                                    <td className="text-end align-middle">
                                        <IconButton color="secondary">
                                            <EditIcon fontSize="small"></EditIcon>
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}