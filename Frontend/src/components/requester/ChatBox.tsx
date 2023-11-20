import { Send } from "@mui/icons-material";
import { Avatar, Button, TextField } from "@mui/material"
import { useLoaderData } from "react-router-dom"
import Message from "./Message";
import chats from '../../dummy_data/chat_2.json'

export default function ChatBox() {
    const worker = useLoaderData() as string;
    const rdm = Math.floor(Math.random()*3);

    return (
        <div className='d-flex h-100 py-1 flex-column'>
            <div className='d-flex align-items-center p-2 rounded-top-2 shadow-sm bg-white'>
                <Avatar className='me-3' src="/static/images/avatar/1.jpg" />
                <span className='fw-bold'>{worker}</span>
            </div>
            <div className='flex-fill p-2 shadow overflow-y-auto' style={{scrollbarWidth: 'none'}}>
                {
                    chats.map((chat, index) => {
                        return <Message 
                            message={chat.message} 
                            color={chat.user_id === rdm.toString() ? 'primary' : 'secondary'} 
                            position={chat.user_id === rdm.toString() ? 'end' : 'start'} 
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

export function workerIDLoader({params} : {params: Map<string, any>}){
    return params['worker']
}