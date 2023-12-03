import { useEffect, useState } from "react";
import Navbar from "./worker/Navbar";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";
import IUser from "../interface/IUser";
import useAuth from "../customHooks/authenticate";
import { client } from "../api/client";



export default function MainLayout({navigation, user}: {navigation: NavigationInterface[], user: IUser}){
    const [isDrawerOn, setIsDrawerOn] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [pageName, setPageName] = useState(navigation[selectedIndex].name)
    const { getToken } = useAuth()
    client.defaults.headers.common['Authorization'] = "Bearer " + getToken()

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        setPageName(navigation[selectedIndex].name)
    }, [selectedIndex])

    return(
        <div className="w-100 h-100">
            <div className="row flex-nowrap h-100 g-0">
                <div className="col-auto">
                    <div id="sidebar" className="collapse collapse-horizontal bg-white show h-100 rounded-2 shadow-sm">
                        <div id="sidebar-nav" className="d-flex flex-column h-100">
                            <div className="w-100 d-flex align-items-center justify-content-between ps-3 py-2 fs-3 fw-bold">
                                <div className="d-flex align-items-center fs-3 fw-bold">
                                    <img src="../../public/Logo.png" className="me-2" style={{width: "50px"}}></img>
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
                                            <ListItemButton
                                            selected={selectedIndex === index}
                                            onClick={(event) => handleListItemClick(event, index)}
                                            sx={{marginY: "5px"}}
                                            >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.name}></ListItemText>
                                            </ListItemButton>
                                        </Link>
                                    })
                                }
                            </List>
                            <div className="flex-fill"></div>
                            <div className='d-flex align-items-center py-2 px-2 border-top border-3 fs-6'>
                                Created By <span className="ms-1 d-inline-block text-primary"> @DatleTeams</span><br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col px-3 pt-3 h-100 d-flex flex-column overflow-auto">
                    <Navbar isDrawerOn={isDrawerOn} setIsDrawerOn={setIsDrawerOn} pageName={pageName} user={user}></Navbar>
                    <div className="flex-fill pt-4" style={{minHeight: '0'}}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}