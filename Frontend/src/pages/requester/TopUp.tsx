import { AccountBalanceWallet, Wallet } from "@mui/icons-material";
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import PaidIcon from '@mui/icons-material/Paid'
import useAuth from "../../customHooks/authenticate";
import { client } from "../../api/client";
import { AxiosError } from "axios";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function TopUp() {
    const [money, setWallet] = useState<number>(useLoaderData().wallet)
    const {register, handleSubmit, reset} = useForm();
    const fetcher = useFetcher();

    function tandaPemisahTitik(b:string){
        b=b.replace(".","");
        b=b.replace("-","");
        let c = "";
        let panjang = b.length;
        let j = 0;
        for (let i = panjang; i > 0; i--){
            j = j + 1;
            if (((j % 3) == 1) && (j != 1)){
                c = b.substring(i-1,i) + "." + c;
            } else {
                c = b.substring(i-1,i) + c;
            }
        }
        return c;
    }

    return (
        <div className="row h-100">
            <div className="col-6">
                <form className="p-3 rounded-2 shadow-sm bg-white" onSubmit={handleSubmit(data => {
                    if(data.amount > 0){
                        fetcher.submit(data, {
                            method: "post",
                            encType: "application/x-www-form-urlencoded",
                            action: "/requester/top_up"
                        })
                        reset()
                        setWallet(money + parseInt(data.amount))
                    }
                })}>
                    <div className="display-6 fw-bold">Top Up</div>
                    <div className="row mt-4">
                        <div className="col-3 text-end">Current Money</div>
                        <div className="col-auto">:</div>
                        <div className="col">{tandaPemisahTitik(money.toString())}</div>
                    </div>
                    <div className="row align-items-center my-2">
                        <div className="col-3 text-end">Top Up Amount</div>
                        <div className="col-auto">:</div>
                        <div className="col">
                            <TextField fullWidth type="number" variant="standard" defaultValue={0} {...register("amount")}></TextField>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-3 text-end"><AccountBalanceWallet /></div>
                        <div className="col-auto">:</div>
                        <div className="col">
                            <TextField fullWidth label="BankAccount" variant="standard" required {...register("bank_account")}></TextField>
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        <Button type="submit" variant="contained" color="success" endIcon={<PaidIcon sx={{color:"orange"}} />}>
                            Top Up
                        </Button>
                    </div>
                </form>
            </div>
            <div className="col-6"></div>
        </div>
    )
}

export async function TopUpLoader({params}) {
    const {getToken} = useAuth();
    
    try{
        const response = await client.get(
            "/user/wallet",
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
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

export async function TopUpAction({request, params}) {
    const {getToken} = useAuth();
    const formData = await request.formData();
    
    try{
        const response = await client.post(
            "/user/fill_wallet",
            Object.fromEntries(formData),
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
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