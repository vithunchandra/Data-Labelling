import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useState } from 'react';

export default function Filters({taskType} : {taskType: string[]}){
    const [type, setType] = useState('');

    return(
        <>
            <div className="fs-5">Filters</div>
            <form className="row align-items-center g-0 mt-3">
                <div className="col-4">
                    <FormControl fullWidth size='small'>
                        <InputLabel id="task-type">Task Type</InputLabel>
                        <Select
                            labelId="task-type"
                            id="task-type"
                            label="Task Type"
                            value={type}
                            onChange={(event) => setType(event.target.value as string)}
                            fullWidth
                            sx={{
                                textTransform: 'capitalize'
                            }}
                        >
                            {
                                taskType.map((item, index) => {
                                    return <MenuItem value={item} sx={{textTransform: 'capitalize'}} key={index}>{item}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="col-auto flex-fill mx-5">
                    <input type='date' className='form-control w-100' />
                </div>
                <div className="col-auto flex-fill">
                    <TextField variant="outlined"label="Task Name" size="small" fullWidth></TextField>
                </div>
            </form>
        </>
    )
}