import { Send } from "@mui/icons-material";
import { Avatar, Button, TextField } from "@mui/material"
import { useFetcher, useLoaderData } from "react-router-dom"
import Message from "./Message";
// import chats from '../../dummy_data/chat_2.json'
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

export default function ChatBox() {
    const chats = useLoaderData();
    const fetcher = useFetcher();
    const {register, handleSubmit, reset} = useForm();
    console.log(chats);

    return (
        <div className='d-flex h-100 py-1 flex-column'>
            <div className='d-flex align-items-center p-2 rounded-top-2 shadow-sm bg-white'>
                <Avatar className='me-3' src="/static/images/avatar/1.jpg" />
                <span className='fw-bold'>{chats.user.name}</span>
            </div>
            <div className='flex-fill p-2 shadow overflow-y-auto' style={{scrollbarWidth: 'none'}}>
                {
                    chats.chat.map((chat, index) => {
                        return <Message 
                            message={chat.text_chat} 
                            color={chat.user === chats.user._id ? 'secondary' : 'primary'} 
                            position={chat.user === chats.user._id ? 'start' : 'end'} 
                            key={index}
                        />
                    })
                }
            </div>
            <div>
                <form className='row align-items-end bg-white pt-2 pb-3 px-3 rounded-bottom-2 shadow-sm g-0' onSubmit={handleSubmit(data => {
                    fetcher.submit(data, {
                        method: "post",
                        encType: "application/x-www-form-urlencoded",
                        action: "/requester/monitor_task/"+chats.task_id+"/chat/"+chats.user._id
                    })
                    reset();
                })}>
                    <div className='col me-4'>
                        <TextField
                            label="Message"
                            multiline
                            maxRows={4}
                            color='primary'
                            variant="standard"
                            size='small'
                            fullWidth
                            {...register("chat")}
                        />
                    </div>
                    <div className='col-auto'>
                        <Button variant="contained" endIcon={<Send />} type="submit">
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export async function workerIDLoader({params} : {params: Map<string, any>}){
    const {getToken} = useAuth();

    try{
        const response = await client.get(
            "/task/id/"+params["task_id"],
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                params: {
                    expand : 1
                }
            }
        )
        const res = response.data[0].worker.find((w) => w.user._id == params['worker'])
        res.task_id = params["task_id"]
        return res
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}

export async function sendChat({request, params} : {request: any, params: any}){
    const {getToken} = useAuth();
    const formData = await request.formData();

    const chat = formData.get("chat")

    try{
        const response = await client.post(
            "/chat/create/",
            {task_id: params.task_id, text: chat, worker_id: params.worker},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
            }
        )
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}