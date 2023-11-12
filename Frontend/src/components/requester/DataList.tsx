import { Button, IconButton } from "@mui/material";
import Data from "../../interface/DataInterface";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { FieldValue, UseFormRegister } from "react-hook-form";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


export default function DataList({data, editIndex, setEditIndex, register} : {data: Data[], editIndex: {index:number, action:string}, setEditIndex : React.Dispatch<React.SetStateAction<{index:number, action:string}>>, register: UseFormRegister<FieldValue>}) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="align-middle" style={{
                        width: '5%'
                    }}>No</th>
                    <th className="align-middle" style={{
                        width: '70%'
                    }}>Data</th>
                    <th className="align-middle text-center" style={{
                        width: '15%'
                    }}>Status</th>
                    <th className="align-middle"  style={{
                        width: '10%'
                    }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                {index == editIndex.index ? 
                                    <td><input className="form-control" defaultValue={item.data} {...register("data."+index)} /></td>
                                    :
                                    <td className="align-middle text-capitalize text-truncate">{item.data}</td>
                                }
                                <td className="align-middle text-center">{item.status}</td>
                                <td className="align-middle">
                                    {item.status == "labeled" ? 
                                        <Button type="button" variant="outlined" startIcon={<EditIcon />} disabled>Edit</Button>
                                        :
                                        index == editIndex.index ?
                                        <div className="d-flex">
                                            <IconButton type="submit" onMouseEnter={() => {
                                                const tmp = editIndex
                                                tmp.action = "save"
                                                setEditIndex({...tmp})
                                            }} onMouseLeave={() => {
                                                const tmp = editIndex
                                                tmp.action = ""
                                                setEditIndex({...tmp})
                                            }}>
                                                <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
                                            </IconButton>
                                            <IconButton type="submit" onMouseEnter={() => {
                                                const tmp = editIndex
                                                tmp.action = "delete"
                                                setEditIndex({...tmp})
                                            }} onMouseLeave={() => {
                                                const tmp = editIndex
                                                tmp.action = ""
                                                setEditIndex({...tmp})
                                            }}>
                                                <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
                                            </IconButton>
                                        </div>
                                        :
                                        <Button type="button" variant="outlined" startIcon={<EditIcon />} onClick={() => {
                                            const tmp = editIndex
                                            tmp.index = index
                                            setEditIndex({...tmp})
                                        }}>Edit</Button>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}