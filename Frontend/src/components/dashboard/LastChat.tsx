import ChatIcon from '@mui/icons-material/Chat';
import Chat from '../../interface/ChatInterface';
import { Avatar } from '@mui/material';

export default function LastChat({chat}: {chat: Chat[]}){
    return(
        <>
            <div className="d-flex align-items-center">
                <ChatIcon className='me-3 mt-2' fontSize='large' color='primary'></ChatIcon>
                <span className='fs-4 fw-bold'>Last Chats</span>
            </div>
            {
                chat.map((item, index) => {
                    return <div className='row align-items-center g-0 my-3' key={index}>
                        <div className='col-auto'>
                            <Avatar src={item.profile_image}></Avatar>
                        </div>
                        <div className='col mx-3'>
                            <div className='fw-bold'>{item.requester}</div>
                            <div className='fw-light text-truncate' style={{maxWidth: '200px'}}>{item.chat}</div>
                        </div>
                        <div className='col-auto text-secondary text-end'>{item.date}</div>
                    </div>
                    
                })
            }
        </>
    )
}