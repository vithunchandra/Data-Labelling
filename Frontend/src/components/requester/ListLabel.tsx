import { Chip } from "@mui/material";
import Label from "../../interface/LabelInterface";

export default function ListLabel({label} : {label : Label[]}) {
    return (
        <table className="table mt-3">
            <thead>
                <tr>
                    <th className="align-middle" style={{
                            width: '20%'
                    }}>Worker</th>
                    <th className="align-middle text-center" style={{
                            width: '15%'
                    }}>Status</th>
                    <th className="align-middle" style={{
                            width: '65%'
                    }}>Label</th>
                </tr>
            </thead>
            <tbody>
                {
                    label.map((item, index) => {
                        return <tr key={index}>
                            <td className="align-middle">{item.worker}</td>
                            <td className="align-middle text-center">
                                {item.status == "labeled" ? 
                                    <Chip label={item.status} variant="outlined" color="success" />
                                    :
                                    <Chip label={item.status} variant="outlined" color="error" />
                                }
                            </td>
                            <td className="align-middle">{item.label}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}