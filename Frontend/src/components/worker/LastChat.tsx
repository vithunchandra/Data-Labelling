import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IChat } from '../../interface/IChat';
import { MarkUnreadChatAlt } from '@mui/icons-material';
import ChatEmpty from './ChatEmpty';

export default function LastChat({chat}: {chat: IChat[]}){
    const navigate = useNavigate()

    return(
        <>
            <div className="d-flex align-items-center">
                <MarkUnreadChatAlt className='me-3 mt-2' fontSize='large' color='primary'></MarkUnreadChatAlt>
                <span className='fs-4 fw-bold'>Last Chats</span>
            </div>
            {
                chat.length > 0 ? chat.map((item, index) => {
                    return <div className='row align-items-center p-2 g-0 my-2 card-hover' key={index} onClick={() => {
                        navigate(`./task/${item.task_id}`)
                    }}>
                        <div className='col-auto'>
                            <Avatar src={"https://picsum.photos/200"}></Avatar>
                        </div>
                        <div className='col mx-3'>
                            <div className='fw-bold'>{item.user.name}</div>
                            <div className='fw-light text-truncate' style={{maxWidth: '200px'}}>{item.text_chat}</div>
                        </div>
                        <div className='col-auto text-secondary text-end'>{new Date(item.timestamp).toDateString()}</div>
                    </div>
                }) : <ChatEmpty />
            }
        </>
    )
}