import { Avatar, Button } from '@mui/material';
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function BanList() {
    const[banList, setBanList] = useState(
        [
            {
                worker : "Remi Perry",
                task : "text classification"
            },
            {
                worker : "Lisa Ferrell",
                task : "text summarization"
            },
            {
                worker : "Lia Decker",
                task : "text classification"
            },
            {
                worker : "Murray Tyler",
                task : "text classification"
            },
            {
                worker : "Sean Larson",
                task : "text summarization"
            },
        ]
    );

    return (
        <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
            <div className="fw-bold fs-4 mb-2">Ban List</div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="align-middle text-center" style={{
                            width: '5%'
                        }}>No</th>
                        <th className="align-middle" style={{
                            width: '60%'
                        }}>Worker Name</th>
                        <th className="align-middle text-center" style={{
                            width: '20%'
                        }}>Task Name</th>
                        <th className="align-middle text-center"  style={{
                            width: '15%'
                        }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        banList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="align-middle text-center">{index + 1}</td>
                                    <td className="align-middle text-capitalize text-truncate">
                                        <div className='d-flex align-items-center'>
                                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            <label className='ms-3'>{item.worker}</label>
                                        </div>
                                    </td>
                                    <td className="align-middle text-center">{item.task}</td>
                                    <td className="align-middle text-center">
                                        <Button variant="contained" color='error' startIcon={<></>}>Unban</Button>
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