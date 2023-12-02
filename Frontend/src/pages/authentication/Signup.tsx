import { Button } from "@mui/material"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import FormTextField from "../../components/form/FormTextField"
import { FormRadio } from "../../components/form/FormRadio"
import { client } from "../../api/client"
import { AxiosError } from "axios"
import useAuth from "../../customHooks/authenticate"

const radioOptions = [
    {
        value: 'requester',
        label: 'Requester'
    },
    {
        value: 'worker',
        label: 'Worker'
    }
]

interface IFormInputs{
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: number;
}

export default function Signup(){
    const formProps = useForm<IFormInputs>()
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

    const signup: SubmitHandler<IFormInputs> = async (data) => {
        let user;
        const { getUser, login } = useAuth()
        try{
            const response = await client.post('/auth/register', data)
            login(response.data.user)
            user = getUser()
        }catch(err: unknown){
            if(err instanceof AxiosError){
                return setError(err.response?.data.message)
            }
        }
        if(user){
            if(user.role === 'admin'){
                navigate('/admin')
            }else if(user.role === 'requester'){
                navigate('/requester')
            }else{
                navigate('/worker')
            }
        }else{
            setError('Authorization failed')
        }
    }

    return(
        <div className="row g-0 vh-100">
            <div className="col-8 d-flex justify-content-center align-items-center">
                <img src="../../../public/Logo_2.png" className="w-50"></img>
            </div>
            <div className="col d-flex p-5 align-items-center rounded-5 my-4 me-4 bg-white shadow">
                <FormProvider {...formProps}>
                    <form onSubmit={formProps.handleSubmit(signup)}>
                        <h1 className="mb-4 text-center">Sign Up</h1>
                        <FormTextField className={'my-2'} variant={"outlined"} name="email" label="Email" type="email" defaultValue=""/>
                        <FormTextField className={'my-2'} variant={"outlined"} name="name" label="Name" type="text" defaultValue=""/>
                        <FormTextField className={'my-2'} variant={"outlined"} name="password" label="Password" type="password" defaultValue=""/>
                        <FormTextField className={'my-2'} variant={"outlined"} name="confirmPassword" label="Confirm Password" type="password" defaultValue=""/>
                        <FormRadio className={'my-2'} name="role" label="Role" options={radioOptions} defaultValue={1}/>

                        {
                            error && <span className="text-danger">{error}</span>
                        }

                        <Button type="submit" fullWidth size="large" variant="contained">Sign up</Button>
                        <div className="mt-3 text-end">
                            Have account? <Link className="link-offset-2 link-underline link-underline-opacity-0 link-opacity-75-hover" to={'/signin'}>Sign in</Link>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}