import { Chip, Avatar, Typography, Popover, Button } from "@mui/material";
import Label from "../../interface/LabelInterface";
import React, { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useNavigate } from "react-router-dom";

export default function ListLabel({label} : {label : Label[]}) {
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
                        const id = open ? item.worker : undefined;
                        return <tr key={index}>
                            <td className="align-middle text-truncate">
                                <Button className="d-flex align-items-center text-dark" value={item.worker._id} onClick={handleClick}>
                                    <Avatar alt={item.worker.name} src="/static/images/avatar/3.jpg" />
                                    <label className="ms-2" role="button">{item.worker.name}</label>
                                </Button>
                                <Popover
                                    id={id+"_"+index+"_"+item.worker._id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    
                                >
                                    <Typography sx={{ p: 2 }}>
                                        <div className="d-flex flex-column justify-content-between align-items-start" style={{width:"80px"}}>
                                            <Button className="d-flex text-dark" onClick={() => {
                                                navigate('chat/'+anchorEl?.value);
                                            }}>
                                                <ChatIcon color="success" />
                                                <span className="ms-2">Chat</span>
                                            </Button>
                                            <Button className="d-flex text-dark" onClick={() => {
                                                navigate('');
                                            }}>
                                                <NoAccountsIcon color="error" />
                                                <span className="ms-2">Ban</span>
                                            </Button>
                                        </div>
                                    </Typography>
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