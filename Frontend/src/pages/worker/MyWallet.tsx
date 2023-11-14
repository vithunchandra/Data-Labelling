import { AccountBalanceWallet, Wallet } from "@mui/icons-material";
import { Button, TextField } from "@mui/material"
import { useState } from "react"

export default function MyWallet(){
    const [wallet, setWallet] = useState(1000000)
    const [input, setInput] = useState<number>(0);
    const [bankAccount, setBankAccount] = useState('');

    return(
        <div className="row h-100">
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
                        <Button variant="contained" color="success" endIcon={<Wallet />}>
                            Draw
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-6"></div>
        </div>
    )
}