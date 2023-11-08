import { Button } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Data from "../../interface/DataInterface";

export default function DataTable({data} : {data: Data[]}){
    return(
        <table className="table">
            <thead>
                <tr>
                    <th className="align-middle" style={{
                        width: '5%'
                    }}>No</th>
                    <th className="align-middle" style={{
                        width: '60%'
                    }}>Data</th>
                    <th className="align-middle text-center" style={{
                        width: 'auto'
                    }}>Status</th>
                    <th className="align-middle text-center" style={{
                        width: 'auto'
                    }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => {
                        return(
                            <tr>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle text-truncate">{item.data}</td>
                                <td className="align-middle text-center" >{item.status}</td>
                                <td className="align-middle text-center">
                                    <Button variant="outlined" startIcon={<CreateOutlinedIcon />}>Label</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}