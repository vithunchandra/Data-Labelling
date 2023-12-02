import { Button } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from "react-router-dom";
import { IData } from "../../interface/IData";

export default function DataTable({data}: {data: IData[]}){
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
                    data?.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle text-truncate">{item.text}</td>
                                <td className="align-middle text-center" >{item.label ? 'Labeled' : 'Unlabeled'}</td>
                                <td className="align-middle text-center">
                                    <Link to={`./${item._id}`}>
                                        <Button variant="outlined" startIcon={<CreateOutlinedIcon />}>Label</Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}