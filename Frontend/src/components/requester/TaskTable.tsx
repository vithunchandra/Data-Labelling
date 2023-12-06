// import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link, useFetcher } from "react-router-dom";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import { Fragment } from "react";
import ITask from "../../interface/ITask";

export default function TaskTable({task}: {task: ITask[]}) {
    const fetcher = useFetcher();

    const action = (_id : string) => {
        fetcher.submit({_id}, {
            method: "put",
            encType: "application/x-www-form-urlencoded",
            action: "/requester/monitor_task"
        })
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="align-middle text-center" style={{
                            width: '5%'
                        }}>No</th>
                        <th className="align-middle" style={{
                            width: 'auto'
                        }}>Nama</th>
                        <th className="align-middle text-center" style={{
                            width: '10%'
                        }}>Type</th>
                        <th className="align-middle text-center" style={{
                            width: '10%'
                        }}>Price</th>
                        <th className="align-middle text-center" style={{
                            width: '10%'
                        }}>Credibility</th>
                        <th className="align-middle text-center" style={{
                            width: '10%'
                        }}>Total Data</th>
                        <th className="align-middle text-center" style={{
                            width: '10%'
                        }}>Status</th>
                        <th className="align-middle text-center"  style={{
                            width: '10%'
                        }}>Action</th>
                    </tr>
                </thead>
                <tbody id="detail_parent">
                    {
                        task.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <tr>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{index + 1}</td>
                                        <td className="align-middle text-capitalize text-truncate" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.task_name}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.task_type[0].name}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.task_type[0].price}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.min_credibility}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.data.length}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.active? "Opened" : "Closed"}</td>
                                        <td className="align-middle text-center">
                                            {item.active ? 
                                                <Button variant="contained" startIcon={<UnpublishedIcon />} color="error" onClick={() => action(item._id)}>Close</Button>
                                                :
                                                <Button variant="contained" startIcon={<PublishIcon />} color="success" onClick={() => action(item._id)}>Open</Button>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8}>
                                            <div id={"detail"+index} className="collapse" data-bs-parent="#detail_parent">
                                                <span className='fw-bold fs-5'>Instruction: </span>
                                                <p className="ps-4">{item.task_description}</p>
                                                <div className="w-100 text-center">
                                                    <Link to={index.toString()}>
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