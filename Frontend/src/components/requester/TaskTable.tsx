import Task from "../../interface/TaskInterface";
import { Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from "react-router-dom";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';

export default function TaskTable({task}: {task: Task[]}) {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="align-middle" style={{
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
                                <>
                                    <tr key={index}>
                                        <td className="align-middle" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{index + 1}</td>
                                        <td className="align-middle text-capitalize text-truncate" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.name}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.type}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.price}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.credibility}</td>
                                        <td className="align-middle text-center" data-bs-toggle="collapse" data-bs-target={"#detail"+index} role="button">{item.data.length}</td>
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
                                        <td colSpan={8}>
                                            <div id={"detail"+index} className="collapse" data-bs-parent="#detail_parent">
                                                <span className='fw-bold fs-5'>Instruction: </span>
                                                <p className="ps-4">{item.instruction}</p>
                                                <div className="w-100 text-center">
                                                    <Link to={index.toString()}>
                                                        <Button variant="contained" startIcon={<InfoOutlinedIcon />}>Detail</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}