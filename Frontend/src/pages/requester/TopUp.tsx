import { AccountBalanceWallet, Wallet } from "@mui/icons-material";
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import PaidIcon from '@mui/icons-material/Paid'

export default function TopUp() {
    const [money, setWallet] = useState<number>(1234567890)
    const [bankAccount, setBankAccount] = useState('');

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
                <div className="p-3 rounded-2 shadow-sm bg-white">
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
                            <TextField fullWidth type="number" variant="standard" defaultValue={0}></TextField>
                        </div>
                    </div>
                    <div className="row align-items-center mt-3">
                        <div className="col-3 text-end"><AccountBalanceWallet /></div>
                        <div className="col-auto">:</div>
                        <div className="col">
                            <TextField fullWidth label="BankAccount" variant="standard" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)}></TextField>
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        <Button variant="contained" color="success" endIcon={<PaidIcon sx={{color:"orange"}} />}>
                            Top Up
                        </Button>
                    </div>
                </div>
            </div>
            <div className="col-6"></div>
        </div>
    )
}
