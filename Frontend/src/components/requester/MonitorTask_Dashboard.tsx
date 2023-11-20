import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from "react-router-dom";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { Fragment } from "react";

export default function MonitorTask_Dashboard({task}: {task: Task[]}) {
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
                                        <td className="align-middle text-capitalize text-truncate" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.name}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.type}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.status? "Opened" : "Closed"}</td>
                                        <td className="align-middle text-center">
                                            {item.status ? 
                                                <Button variant="contained" startIcon={<UnpublishedIcon />} color="error">Close</Button>
                                                :
                                                <Button variant="contained" startIcon={<PublishIcon />} color="success">Open</Button>
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
                                                            <span className="fs-5">{task[index].data.length}</span>
                                                        </div>
                                                        <div className="col-4 d-flex align-items-center">
                                                            <AttachMoneyIcon fontSize="large" color="success" className="me-2" />
                                                            <span className="fs-5">{task[index].price}</span>
                                                        </div>
                                                        <div className="col-5 d-flex align-items-center">
                                                            <AddReactionOutlinedIcon fontSize="large" color="action" className="me-2" />
                                                            <span className="fs-5">{task[index].credibility} Credibility Score</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className='fw-bold fs-5'>Instruction: </label>
                                                <p className="ps-4">{item.instruction}</p>
                                                <div className="w-100 text-center">
                                                    <Link to={"monitor_task/"+index.toString()}>
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