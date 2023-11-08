import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';

export default function Navbar({setIsDrawerOn, isDrawerOn} : {
    setIsDrawerOn: React.Dispatch<React.SetStateAction<boolean>>,
    isDrawerOn: boolean
}){
    return(
        <nav className={`navbar navbar-expand-lg bg-primary bg-white rounded-2 shadow-sm`}>
            <div className="container-fluid py-1">
                <IconButton type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" onClick={() => setIsDrawerOn(!isDrawerOn)} sx={{
                    visibility: isDrawerOn ? 'hidden' : 'visible'
                }}>
                    <MenuIcon/>
                </IconButton>
                <ul className="navbar-nav me-3">
                    <li className="nav-item">
                        <div className='d-flex align-items-center'>
                            <Avatar src='https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?pid=ImgDet&rs=1'/>
                            <div className='ms-2'>
                                Vithun Chandra
                            </div>
                        </div> 
                    </li>
                </ul>
            </div>
        </nav>
    )
}