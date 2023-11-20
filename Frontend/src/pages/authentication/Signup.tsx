import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function Signup(){
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState()

    return(
        <div className="row g-0 vh-100">
            <div className="col-8 d-flex justify-content-center align-items-center">
                <img src="../../../public/Logo_2.png" className="w-50"></img>
            </div>
            <div className="col d-flex p-5 align-items-center rounded-5 my-4 me-4 bg-white shadow">
                <form>
                    <h1 className="mb-4 text-center">Sign Up</h1>
                    <TextField className="my-2" fullWidth type="email" variant="outlined" label="Email" {...register('email')}/> 
                    <TextField className="my-2" fullWidth type="text" variant="outlined" label="Name" {...register('name')}/>
                    <TextField className="my-2" fullWidth type="password" variant="outlined" label="Password" {...register('password')}/>
                    <TextField className="my-2" fullWidth type="password" variant="outlined" label="Confirm Password" {...register('cofnirmPassword')}/><br />
                    <FormControl className="my-2">
                        <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                        <RadioGroup
                            row
                            defaultValue="requester"
                            name="role"
                        >
                            <FormControlLabel value="requester" control={<Radio />} label="Requester" />
                            <FormControlLabel value="worker" control={<Radio />} label="Worker" />
                        </RadioGroup>
                    </FormControl>

                    {
                        error && <span className="text-danger">{error}</span>
                    }
                    
                    <Button fullWidth size="large" variant="contained">Sign up</Button>
                    <div className="mt-3 text-end">
                        Have account? <Link className="link-offset-2 link-underline link-underline-opacity-0 link-opacity-75-hover" to={'/signin'}>Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}