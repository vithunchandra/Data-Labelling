import { Avatar, Button, TextField } from '@mui/material'
import { IChat } from '../../interface/IChat'
import Message from './Message'
import { Send } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { client } from '../../api/client'
import useAuth from '../../customHooks/authenticate'
import IUser from '../../interface/IUser'
import { AxiosError } from 'axios'

export default function Chat({task_id, requester_id, user_id}: {task_id: string, requester_id: string, user_id: string}){
    const [isRefetch, setIsRefetch] = useState(false)
    const [requester, setRequester] = useState<IUser | undefined>(undefined)
    const [chats, setChats] = useState<IChat[] | undefined>(undefined)
    const {getToken} = useAuth()
    const [message, setMessage] = useState('');
    console.log(requester_id)

    async function sendMessage(){
        try{
            const response = await client.post(`worker/task/${task_id}/chat`, {message}, {
                headers: {Authorization: `Bearer ${getToken()}`}
            })
            setMessage('')
            return setIsRefetch(true)
        }catch(err){
            if(err instanceof AxiosError){
                return console.log(err)
            }
            return console.log(err)
        }

    }

    useEffect(() => {
        let isFetching = true

        async function refetch(){
            const responseUser = await client.get(`user/${requester_id}`)
            const responseChat = await client.get(`worker/task/${task_id}/chat`, {
                headers: {Authorization: `Bearer ${getToken()}`}
            })

            console.log(responseChat)
            
            if(isFetching){
                setRequester(responseUser.data)
                setChats(responseChat.data)
                setIsRefetch(false)
            }
        }

        try{
            refetch()
        }catch(err){
            if(err instanceof AxiosError){
                console.log(err.message)
            }
            console.log(err)
        }

        return () => {
            isFetching = false
        };
    }, [isRefetch, task_id])

    useEffect(() => {
        setMessage('')
    }, [task_id])

    return(
        <div className='d-flex h-100 py-1 flex-column'>
            <div className='d-flex align-items-center p-2 rounded-top-2 shadow-sm bg-white'>
                <Avatar className='me-2' src={'https://picsum.photos/200'}/>
                <span className='fw-bold'>{requester?.name}</span>
            </div>
            <div className='flex-fill overflow-auto p-2 shadow' style={{minHeight: '0'}}>
                {
                    chats?.map((chat, index) => {
                        return <Message 
                            message={chat.text_chat} 
                            color={chat.user === user_id ? 'primary' : 'secondary'} 
                            position={chat.user === user_id ? 'end' : 'start'} 
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className='col-auto'>
                        <Button variant="contained" endIcon={<Send />} onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}