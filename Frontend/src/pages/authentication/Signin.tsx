import { Button } from "@mui/material"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import FormTextField from "../../components/form/FormTextField";
import { client } from "../../api/client";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";

interface IFormInputs{
    email: string;
    password: string;
}

export default function Signin(){
    const formProps = useForm<IFormInputs>()
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

    const login: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
        let user;
        const { getUser, login } = useAuth()
        try{
            const response = await client.post('/auth/login', data)
            login(response.data.user)
            user = getUser()
        }catch(err: unknown){
            if(err instanceof AxiosError){
                return setError(err.response?.data.message)
            }
            console.log(err)
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
                    <form onSubmit={formProps.handleSubmit(login)}>
                        <h1 className="mb-4 text-center">Sign In</h1>
                        <FormTextField className="" name="email" label="Email" type="email" variant="outlined" defaultValue="" size="medium"/>
                        <FormTextField className="" name="password" label="Password" type="password" variant="outlined" defaultValue="" size="medium"/>
         
                        {
                            error && <span className="text-danger">{error}</span>
                        }
                        
                        <Button type="submit" className="mt-4" fullWidth size="large" variant="contained">Sign In</Button>
                        <div className="mt-3 text-end">
                            Don't Have account? <Link className="link-offset-2 link-underline link-underline-opacity-0 link-opacity-75-hover" to={'/signup'}>Sign up</Link>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}