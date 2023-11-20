import { useState } from 'react';
import tasks from '../../dummy_data/task.json'
import { useLoaderData, useNavigate } from 'react-router-dom';
import ListLabel from '../../components/requester/ListLabel';
import DataArrayIcon from '@mui/icons-material/DataArray';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PublishIcon from '@mui/icons-material/Publish';
import { Button, Chip, CircularProgress, CircularProgressProps, Typography, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

export default function DetailTask(){
    const Req_tasks = tasks.filter((item) => item.requester == "vithun chandra");
    const[task, setTask] = useState(Req_tasks[parseInt(useLoaderData() as string)]);
    const navigate = useNavigate();

    const labeled = task.data.reduce((total, d) => d.labels.filter((l) => l.status == "labeled").length + total, 0)
    const totalData = task.data.reduce((total, d) => d.labels.length + total, 0);
    const progress = Math.floor(labeled/totalData*100);

    function CircularProgressWithLabel(props: CircularProgressProps & { value: number },) {
        return (
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(props.value)}%`}</Typography>
            </Box>
          </Box>
        );
    }

    const taskData = [
        {
            icon: <DataArrayIcon sx={{fontSize: "40px"}} color="warning" className="me-2"></DataArrayIcon>,
            data: `${task.data.length} Data`
        },
        {
            icon: <AttachMoneyIcon sx={{fontSize: "40px"}} color="success" className="me-2"></AttachMoneyIcon>,
            data: task.price
        },
        {
            icon: <AddReactionOutlinedIcon sx={{fontSize: "40px"}} color="action" className="me-2"></AddReactionOutlinedIcon>,
            data: `${task.credibility} Credibility Score`
        }
    ]

    return (
        <>
            <div className="w-100 d-flex justify-content-between mb-3">
                <Button color='info' variant='contained' startIcon={<ArrowBackIosIcon />} onClick={() => navigate("..", {relative: "path"})}>Back</Button>
                {task.status ? 
                    <Button variant="contained" startIcon={<UnpublishedIcon />} color="error" size='large'>Close</Button>
                    :
                    <Button variant="contained" startIcon={<PublishIcon />} color="success" size='large'>Open</Button>
                }
            </div>
            <div className="w-100 d-flex flex-column text-capitalize shadow-sm p-3 rounded-2 bg-white">
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <div className="display-6 fw-bold">{task.name}</div>
                    </div>
                    <div className="col-auto d-flex align-items-center">
                        <div className="fs-2 fw-light text-secondary">{task.type}</div>
                    </div>
                </div>
                <div className="fs-5 mt-1">{task.start_date} - {task.finish_date}</div>
                <div className="fw-bold fs-4 mt-4">Task Information</div>
                <div className="w-75 row flex-row justify-content-between mb-4 g-0">
                    {
                        taskData.map((item, index) => {
                            return <div className="col-auto d-flex align-items-center" key={index}>
                                {item.icon}
                                <span className="fs-5">{item.data}</span>
                            </div>
                        })
                    }
                </div>
                <div className="fs-5">
                    <span className="fw-bold">Instruction:</span><br/>
                    <p className='fs-6 ps-4'>
                        {task.instruction}
                    </p>
                </div>
                <div>
                    <span className="fs-5 fw-bold">Overall Progress:</span><br/>
                    <div className="progress my-2" role="progressbar" style={{height:"30px"}}>
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width:`${progress}%`}}>{progress}%</div>
                        <div className="progress-bar bg-danger" style={{width: `${100-progress}%`}}>{100-progress}%</div>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-3 mt-4 bg-white rounded-2 shadow-sm">
                {
                    task.data.map((item, index) => {
                        const isLabeled = item.labels.filter((l) => l.status == "labeled");
                        return (
                            <div className='w-100 mb-2 border p-3 rounded' key={index}>
                                <div className='w-100 d-flex justify-content-betweeen'>
                                    <label className='w-100 fs-5 fw-bold' data-bs-toggle="collapse" data-bs-target={"#label_"+index} role='button'>Data:</label>
                                    <Chip label={item.status} variant="filled" />
                                </div>
                                <div className='d-flex'>
                                    <label className='fs-6 ps-4' data-bs-toggle="collapse" data-bs-target={"#label_"+index} role='button' style={{width:"90%", textAlign:"justify"}}>{item.data}</label>
                                    <div className='d-flex align-items-end justify-content-end my-3' style={{width:"10%"}}>
                                        <CircularProgressWithLabel value={Math.floor(isLabeled.length/item.labels.length*100)} />
                                    </div>
                                </div>
                                <div id={"label_"+index} className='collapse'>
                                    <ListLabel label={item.labels} key={index} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Link to={"chat"}>
                <Button className='position-fixed fixed-bottom' color='success' variant='contained' style={{width:"5%", marginBottom:"1%", marginLeft:"92%"}}>
                    <ForumOutlinedIcon sx={{fontSize: "50px", color:"black"}}></ForumOutlinedIcon>
                </Button>
            </Link>
        </>
    )
}

export function taskMonitorLoader({params} : {params: Map<string, any>}){
    return params['task_id']
}