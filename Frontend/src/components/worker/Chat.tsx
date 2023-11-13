import { Avatar, Button, TextField } from '@mui/material'
import { IChat } from '../../interface/IChat'
import UserInterface from '../../interface/UserInterface'
import Message from './Message'
import { Send } from '@mui/icons-material'

export default function Chat({user, targetUser, chats}: {
    user: UserInterface,
    targetUser: UserInterface,
    chats: IChat[]
}){
    return(
        <div className='d-flex h-100 py-1 flex-column'>
            <div className='d-flex align-items-center p-2 rounded-top-2 shadow-sm bg-white'>
                <Avatar src={targetUser.profile_image}/>
                <span className='fw-bold'>{targetUser.name}</span>
            </div>
            <div className='flex-fill overflow-y-auto p-2 shadow-sm chat-background' style={{scrollbarWidth: 'none'}}>
                {
                    chats.map((chat, index) => {
                        return <Message 
                            message={chat.message} 
                            color={chat.user_id === user._id ? 'primary' : 'secondary'} 
                            position={chat.user_id === user._id ? 'end' : 'start'} 
                            key={index}
                        />
                    })
                }
            </div>
            <div>
                <div className='row align-items-end bg-white pt-2 pb-3 px-3 rounded-bottom-2 shadow-sm g-0'>
                    <div className='col me-4'>
                        <TextField
                            label="Message"
                            multiline
                            maxRows={4}
                            color='primary'
                            variant="standard"
                            size='small'
                            fullWidth
                        />
                    </div>
                    <div className='col-auto'>
                        <Button variant="contained" endIcon={<Send />}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}