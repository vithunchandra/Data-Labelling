import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Collapse, IconButton } from '@mui/material';
import IUser from '../../interface/IUser';

export default function Navbar({setIsDrawerOn, isDrawerOn, pageName, user} : {
    setIsDrawerOn: React.Dispatch<React.SetStateAction<boolean>>,
    isDrawerOn: boolean,
    pageName: string,
    user: IUser
}){
    return(
        <nav className={`navbar navbar-expand-lg bg-white rounded-2 shadow`}>
            <div className="container-fluid">
                <div className='d-flex align-items-center'>
                    <Collapse orientation='horizontal' in={!isDrawerOn}>
                        <IconButton color='primary' type="button" data-bs-toggle="collapse" className='' data-bs-target="#sidebar" onClick={() => setIsDrawerOn(!isDrawerOn)} sx={{
                            visibility: isDrawerOn ? 'hidden' : 'visible',
                        }}>
                            <MenuIcon/>
                        </IconButton>
                    </Collapse>
                    <div className='fs-4 ms-4'>{pageName}</div>
                </div>
                <ul className="navbar-nav me-3">
                    <li className="nav-item">
                        <div className='d-flex align-items-center'>
                            <Avatar src='https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?pid=ImgDet&rs=1'/>
                            <div className='ms-2'>
                                {user.name}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}