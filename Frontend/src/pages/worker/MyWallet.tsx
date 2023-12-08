import { AccountBalanceWallet, Wallet } from "@mui/icons-material";
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { client } from "../../api/client";
import useAuth from "../../customHooks/authenticate";
import { AxiosError } from "axios";

export default function MyWallet(){
    const [wallet, setWallet] = useState(0)
    const [input, setInput] = useState<number>(0);
    const [bankAccount, setBankAccount] = useState('');
    const [error, setError] = useState('')
    const {getToken} = useAuth()

    async function drawWallet(){
        try{
            const response = await client.put(`user/wallet/draw`, {amount: input}, {
                headers: {Authorization: `Bearer ${getToken()}`}
            })

            setWallet(response.data.wallet)
        }catch(err){
            if(err instanceof AxiosError){
                setError(err.response?.data.message)
            }
            console.log(err)
        }

        setInput(0)
    }

    useEffect(() => {
        let ignore = false

        async function fetchWallet(){
            try{
                const response = await client.get(`user/wallet`, {
                    headers: {Authorization: `Bearer ${getToken()}`}
                })
                
                if(!ignore){
                    setWallet(response.data.wallet)
                }
            }catch(err){
                if(err instanceof AxiosError){
                    setError(err.response?.data.message)
                }
                return console.log(err)
            }
        }

        fetchWallet()

        return () => {ignore = true}
    }, [])

    return(
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-6">
                <div className="p-3 rounded-2 shadow-sm bg-white">
                    <div className="display-6 fw-bold">Draw Wallet</div>
                    <div className="row mt-4">
                        <div className="col-3 text-end">Current Wallet</div>
                        <div className="col-auto">:</div>
                        <div className="col">{wallet}</div>
                    </div>
                    <div className="row align-items-center my-2">
                        <div className="col-3 text-end">Draw Amount</div>
                        <div className="col-auto">:</div>
                        <div className="col">
                            <TextField fullWidth type="number" variant="standard" value={input} onChange={(e) => setInput(parseInt(e.target.value))}></TextField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 text-end">Left Amount</div>
                        <div className="col-auto">:</div>
                        <div className="col">{wallet - input}</div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-3 text-end"><AccountBalanceWallet /></div>
                        <div className="col-auto">:</div>
                        <div className="col">
                            <TextField fullWidth label="BankAccount" variant="standard" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)}></TextField>
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        {error && <span className="text-danger">{error}</span>}
                        <Button variant="contained" color="success" endIcon={<Wallet />} onClick={drawWallet}>
                            Draw
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}