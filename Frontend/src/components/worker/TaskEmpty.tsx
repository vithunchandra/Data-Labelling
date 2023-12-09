import FolderOffIcon from '@mui/icons-material/FolderOff';

export default function TaskEmpty(){
    return <div className='d-flex flex-column justify-content-center align-items-center' style={{height: '40vh'}}>
        <FolderOffIcon color='error' fontSize='large'/>
        <span className='text-danger fs-4'>Last Task is Empty</span>
    </div>
}