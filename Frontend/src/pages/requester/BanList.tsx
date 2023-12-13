import { Avatar, Button } from '@mui/material';
import { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router-dom';
import useAuth from '../../customHooks/authenticate';
import { client } from '../../api/client';
import { AxiosError } from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function BanList() {
    const[banList, setBanList] = useState(useLoaderData());
    const fetcher = useFetcher();

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
                            width: '30%'
                        }}>Worker Name</th>
                        <th className="align-middle" style={{
                            width: '50%'
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
                                            <Avatar src={"https://picsum.photos/200?random="+item.baned_user[0]._id} />
                                            <label className='ms-3'>{item.baned_user[0].name}</label>
                                        </div>
                                    </td>
                                    <td className="align-middle text-truncate">{item.task_name}</td>
                                    <td className="align-middle text-center">
                                        <Button variant="contained" color='success' startIcon={<AccountCircleIcon />} onClick={() => {
                                            fetcher.submit({task_id: item._id, banned_worker_id: item.baned_user[0]._id}, {
                                                method: "post",
                                                encType: "application/x-www-form-urlencoded",
                                                action: "/requester/ban_list"
                                            })
                                            const tmp = banList.slice()
                                            tmp.splice(index, 1)
                                            setBanList(tmp)
                                        }}>Unban</Button>
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

export async function BanListLoader({params}) {
    const {getToken} = useAuth();
    
    try{
        const response = await client.get(
            "/user/get_all_banned_user",
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}

export async function toggleBan({request, params}) {
    const {getToken} = useAuth();
    const formData = await request.formData();
    
    try{
        const response = await client.post(
            "/task/toggle_ban",
            Object.fromEntries(formData),
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        )
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}