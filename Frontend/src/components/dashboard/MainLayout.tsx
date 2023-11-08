import { useState } from "react";
import Navbar from "./Navbar";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";

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
        <div className="w-100 h-100 p-4">
            <div className="row flex-nowrap h-100 g-0">
                <div className="col-auto">
                    <div id="sidebar" className="collapse collapse-horizontal bg-white show h-100 rounded-2 shadow-sm">
                        <div id="sidebar-nav">
                            <div className="w-100 d-flex align-items-center justify-content-between ps-3 py-2 fs-3 fw-bold">
                                <div className="d-flex align-items-center fs-3 fw-bold">
                                    <img src="../../../public/Logo.png" className="me-2" style={{width: "50px"}}></img>
                                    <span>Datle</span>
                                </div>
                                <IconButton data-bs-toggle="collapse" data-bs-target="#sidebar" onClick={() => setIsDrawerOn(!isDrawerOn)}>
                                    <ChevronLeftIcon fontSize="large" />
                                </IconButton>
                            </div>
                            <List className="px-2">
                                {
                                    navigation.map((item, index) => {
                                        return <Link to={item.path} className="text-decoration-none text-black" key={index}>
                                            <ListItemButton sx={{
                                                marginY: "5px"
                                            }}>
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
                <div className="col ms-3 d-flex flex-column">
                    <Navbar isDrawerOn={isDrawerOn} setIsDrawerOn={setIsDrawerOn}></Navbar>
                    <div className="container-fluid overflow-auto">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}