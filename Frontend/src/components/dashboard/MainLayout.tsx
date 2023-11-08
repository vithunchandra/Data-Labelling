import { useState } from "react";
import Navbar from "./Navbar";
import Offcanvas from "./Offcanvas";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Outlet } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

export default function MainLayout({navigation, role}: {navigation: NavigationInterface[], role: string}){
    const [isDrawerOn, setIsDrawerOn] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return(
        <div className="w-100 d-flex align-items-center p-4">
            <div className="row flex-nowrap w-100 g-0">
                <div className="col-auto">
                    <div id="sidebar" className="collapse collapse-horizontal show bg-light rounded-4">
                        <div id="sidebar-nav" style={{height: "90vh"}}>
                            <div className="w-100 d-flex align-items-center justify-content-between ps-3 py-2 fs-3 border-bottom border-2 fw-bold">
                                <div className="d-flex align-items-center fs-3 fw-bold">
                                    <img src="../../../public/Logo.png" className="me-2" style={{width: "50px"}}></img>
                                    <span>Datle</span>
                                </div>
                                <IconButton data-bs-toggle="collapse" data-bs-target="#sidebar" onClick={() => setIsDrawerOn(!isDrawerOn)}>
                                    <ChevronLeftIcon fontSize="large" />
                                </IconButton>
                            </div>
                            <List>
                                {
                                    navigation.map((item, index) => {
                                        return <Link to={item.path} className="text-decoration-none text-black" key={index}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name}></ListItemText>
                                            </ListItemButton>
                                        </Link>
                                    })
                                }
                            </List>
                        </div>
                    </div>
                </div>
                <div className="col ms-3">
                    <Navbar isDrawerOn={isDrawerOn} setIsDrawerOn={setIsDrawerOn}></Navbar>
                    <div className="container bg-light rounded-4">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}