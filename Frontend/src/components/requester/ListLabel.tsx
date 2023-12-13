import { Chip, Avatar, Typography, Popover, Button } from "@mui/material";
import Label from "../../interface/LabelInterface";
import React, { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useFetcher, useNavigate } from "react-router-dom";

export default function ListLabel({label, task_id, ban_list} : {label : Label[], task_id: string}) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;

    const navigate = useNavigate();
    const fetcher = useFetcher();
    console.log({ban_list, anchorEl: anchorEl?.value});

    return (
        <table className="table mt-3">
            <thead>
                <tr>
                    <th className="align-middle" style={{
                            width: '25%'
                    }}>Worker</th>
                    <th className="align-middle" style={{
                            width: '75%'
                    }}>Label</th>
                </tr>
            </thead>
            <tbody>
                {
                    label.map((item, index) => {
                        return <tr key={index}>
                            <td className="align-middle text-truncate">
                                <Button className="d-flex align-items-center text-dark" value={item.worker._id} onClick={handleClick}>
                                    <Avatar src={"https://picsum.photos/200?random="+item.worker._id} />
                                    <label className="ms-2" role="button">{item.worker.name}</label>
                                </Button>
                                <Popover
                                    id={item.worker._id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    
                                >
                                    <div className="p-2">
                                        <div className="d-flex flex-column justify-content-between align-items-start" style={{width:"100px"}}>
                                            <Button className="d-flex text-dark" onClick={() => {
                                                navigate('chat/'+anchorEl?.value);
                                            }}>
                                                <ChatIcon color="success" />
                                                <span className="ms-2">Chat</span>
                                            </Button>
                                            <Button className="d-flex text-dark" onClick={() => {
                                                fetcher.submit({task_id: task_id, banned_worker_id: anchorEl?.value}, {
                                                    method: "post",
                                                    encType: "application/x-www-form-urlencoded",
                                                    action: "/requester/ban_list"
                                                })
                                                ban_list = ban_list.filter((b) => b._id != anchorEl?.value)
                                                setAnchorEl(null)
                                            }}>
                                                {ban_list.find((b) => b._id == anchorEl?.value) ?
                                                    <>
                                                        <AccountCircleIcon color="success" />
                                                        <span className="ms-2">UnBan</span>
                                                    </>
                                                    :
                                                    <>
                                                        <NoAccountsIcon color="error" />
                                                        <span className="ms-2">Ban</span>
                                                    </>
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                </Popover>
                            </td>
                            <td className="align-middle text-truncate">{item.answer}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}