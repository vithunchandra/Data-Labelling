import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, IconButton, TextField } from '@mui/material';
import DataTable from '../../components/worker/DataTable';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IData } from '../../interface/IData';
import { client } from '../../api/client';
import { AxiosError } from 'axios';
import useAuth from '../../customHooks/authenticate';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormSelect from '../../components/form/FormSelect';
import FormTextField from '../../components/form/FormTextField';

interface ILoader{
    data: IData[];
    page: number;
    totalPages: number;
}

interface IFilters{
    question: string;
    status: string;
}

export default function TaskData(){
    const {data, page, totalPages} = useLoaderData() as ILoader
    const [searchParams, setSearchParams] = useSearchParams()
    const formProps = useForm<IFilters>()
    const navigate = useNavigate()
    
    const handleFilter: SubmitHandler<IFilters> = (data: IFilters) => {
        searchParams.delete('question')
        searchParams.delete('status')
        const {question, status} = data
        question && searchParams.set('question', question)
        status && searchParams.set('status', status)
        setSearchParams(searchParams)
    }

    return(
        <div className='w-100 text-capitalize'>
            <FormProvider {...formProps}>
                <form onSubmit={formProps.handleSubmit(handleFilter)} className='row align-items-center justify-content-between px-3 p-2 shadow-sm rounded-2 bg-white mb-3 g-0'>
                    <div className='col-8 fs-5 fw-bold text-primary'>
                        <div className='row justify-content-end g-0'>
                            <div className='col-6 me-3'>
                                <FormSelect className='' defaultValue={''} label='Status' name='status' options={[
                                    {label: 'Unspecified', value: ''},
                                    {label: 'Unlabeled', value: 'false'},
                                    {label: 'Labeled', value: 'true'}
                                ]} size='small'/>
                            </div>
                            <div className='col'>
                                <FormTextField className='' defaultValue='' label='Question' name='question' type='text' variant='outlined' size='small'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-auto fs-4'>
                        <Button type='submit' variant='contained'>Filter</Button>
                    </div>
                </form>
            </FormProvider>

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
    const question = url.searchParams.get('question') !== null ? url.searchParams.get('question') : ''
    const status = url.searchParams.get('status') !== null ? url.searchParams.get('status') : ''
    console.log(status)
    const {getToken} = useAuth()
    try{
        const response = await client.get(`/worker/task/${task_id}/data`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            params: { page, question, status }
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