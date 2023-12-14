import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Collapse, IconButton } from '@mui/material';
import IUser from '../../interface/IUser';
import { AddReactionOutlined } from '@mui/icons-material';

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
                <ul className="navbar-nav align-items-center me-3">
                    <li className='nav-item d-flex align-items-center'>
                        <AddReactionOutlined color='success' sx={{fontSize: '2rem'}}/>
                        <span className='ms-2 fs-5 text-success fw-bold'>{user.credibility}</span>
                    </li>
                    <li className="nav-item ms-4">
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