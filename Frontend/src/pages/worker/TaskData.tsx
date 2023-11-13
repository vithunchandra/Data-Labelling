import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IconButton, TextField } from '@mui/material';
import DataTable from '../../components/worker/DataTable';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import tasks from '../../dummy_data/task.json';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function TaskData(){
    const taskIndex = useLoaderData() as number;
    const task = tasks[taskIndex];
    const [selectValue, setSelectValue] = useState<boolean>();

    function selectChange(event: SelectChangeEvent){
        setSelectValue(event.target.value === 'true' ? true : false);
    }

    return(
        <div className='w-100 text-capitalize'>
            <div className='row align-items-center justify-content-between px-3 p-2 shadow-sm rounded-2 bg-white mb-3 g-0'>
                <div className='col-auto fs-4'>Filter</div>
                <div className='col-8 fs-5 fw-bold text-primary'>
                    <div className='row justify-content-end g-0'>
                        <div className='col-6 me-3'>
                            <FormControl fullWidth size='small'>
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    labelId='status'
                                    onChange={selectChange}
                                    label="Status"
                                    defaultValue=''
                                >
                                    <MenuItem value="true">Labeled</MenuItem>
                                    <MenuItem value="false">Unlabeled</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='col'>
                            <TextField label="Data Question" size='small' fullWidth></TextField>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-100 p-2 shadow-sm rounded-2 bg-white'>
                <div className='fs-4 fw-bold ms-1'>Data</div>
                <DataTable data={task.data} />
                <div className='w-100 text-end'>
                    <span className='d-inline-block'>
                        <IconButton size='large'>
                            <ChevronLeft fontSize='inherit' />
                        </IconButton>
                    </span>
                    <span className='d-inline-block mx-2 fs-5'>2</span>
                    <span className='d-inline-block'>
                        <IconButton size='large'>
                            <ChevronRight fontSize='inherit' />
                        </IconButton>
                    </span>
                </div>
            </div>

            <div className='text-end'>
                
            </div>
        </div>
    )
}

export function taskDataLoader({params} : {params: Map<string, any>}){
    return params['task_id'];
}