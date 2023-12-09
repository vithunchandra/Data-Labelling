// import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link, useFetcher } from "react-router-dom";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { Fragment } from "react";
import ITask from "../../interface/ITask";

export default function MonitorTask_Dashboard({task, setPickTask}: {task: ITask[], setPickTask: any}) {
    const fetcher = useFetcher();
    
    const action = (idx: number, _id: string) => {
        const tmp = task.slice();
        tmp[idx].active = !tmp[idx].active;
        setPickTask(tmp)

        fetcher.submit({_id}, {
            method: "put",
            encType: "application/x-www-form-urlencoded",
            action: "/requester/monitor_task"
        })
    }

    return (
        <div key={"mtd"}>
            <table className="table">
                <thead>
                    <tr>
                        <th className="align-middle text-center" style={{
                            width: '5%'
                        }}>No</th>
                        <th className="align-middle" style={{
                            width: '24%'
                        }}>Nama</th>
                        <th className="align-middle text-center" style={{
                            width: '8%'
                        }}>Type</th>
                        <th className="align-middle text-center" style={{
                            width: '8%'
                        }}>Status</th>
                        <th className="align-middle text-center"  style={{
                            width: '10%'
                        }}>Action</th>
                    </tr>
                </thead>
                <tbody id="dash_detail_parent">
                    {
                        task.map((item, index) => {
                            return (
                                <Fragment key={"mt"+index}>
                                    <tr>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{index + 1}</td>
                                        <td className="align-middle text-capitalize text-truncate" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.task_name}</td>
                                        <td className="align-middle text-center text-truncate" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.task_type[0].name}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.active? "Opened" : "Closed"}</td>
                                        <td className="align-middle text-center">
                                            {item.active ? 
                                                <Button variant="contained" startIcon={<UnpublishedIcon />} color="error" onClick={() => action(index, item._id)}>Close</Button>
                                                :
                                                <Button variant="contained" startIcon={<PublishIcon />} color="success" onClick={() => action(index, item._id)}>Open</Button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div id={"detail"+index} className="collapse" data-bs-parent="#dash_detail_parent">
                                                <div className="container-fluid p-3 bg-white rounded-2 mb-2 shadow-sm">
                                                    <div className="w-100 row flex-row justify-content-between g-0">
                                                        <div className="col-3 d-flex align-items-center">
                                                            <DataArrayIcon fontSize="large" color="warning" className="me-2" />
                                                            <span className="fs-5">{item.data.length}</span>
                                                        </div>
                                                        <div className="col-4 d-flex align-items-center">
                                                            <AttachMoneyIcon fontSize="large" color="success" className="me-2" />
                                                            <span className="fs-5">{item.task_type[0].price}</span>
                                                        </div>
                                                        <div className="col-5 d-flex align-items-center">
                                                            <AddReactionOutlinedIcon fontSize="large" color="action" className="me-2" />
                                                            <span className="fs-5">{item.min_credibility} Credibility Score</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className='fw-bold fs-5'>Instruction: </label>
                                                <p className="ps-4">{item.task_description}</p>
                                                <div className="w-100 text-center">
                                                    <Link to={"monitor_task/"+item._id}>
                                                        <Button variant="contained" startIcon={<InfoOutlinedIcon />}>Detail</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}