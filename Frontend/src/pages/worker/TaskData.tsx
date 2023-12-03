import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton, TextField } from '@mui/material';
import DataTable from '../../components/worker/DataTable';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IData } from '../../interface/IData';
import { client } from '../../api/client';
import { AxiosError } from 'axios';
import useAuth from '../../customHooks/authenticate';
import { useLoaderData, useNavigate } from 'react-router-dom';

interface ILoader{
    data: IData[];
    page: number;
    totalPages: number;
}

export default function TaskData(){
    const {data, page, totalPages} = useLoaderData() as ILoader
    const navigate = useNavigate()
    console.log(page, totalPages)

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
                <DataTable data={data} />
                <div className='w-100 text-end'>
                    <span className='d-inline-block'>
                        <IconButton className={`${page - 1 > 0 ? '' : 'invisible'}`} 
                            size='large'
                            onClick={() => navigate(`../viewdata?page=${page - 1}`)}
                        >
                            <ChevronLeft fontSize='inherit' />
                        </IconButton>
                    </span>
                    <span className='d-inline-block mx-2 fs-5'>{page}</span>
                    <span className='d-inline-block'>
                        <IconButton className={`${(page + 1) <= totalPages ? '' : 'invisible'}`} 
                            size='large'
                            onClick={() => navigate(`../viewdata?page=${page + 1}`)}
                        >
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

export async function dataLoader({params, request}: any){
    const task_id = params['task_id']
    const url = new URL(request.url)
    const page = url.searchParams.get('page') !== null ? parseInt(url.searchParams.get('page')!) : 1
    const {getToken} = useAuth()
    try{
        const response = await client.get(`/worker/task/${task_id}/data`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: { page }
        })
        console.log(response.data)
        return {...response.data, page} as ILoader
    }catch(err){
        if(err instanceof AxiosError){
            return console.log(err.response?.data.message)
        }
        return console.log(err)
    }
}