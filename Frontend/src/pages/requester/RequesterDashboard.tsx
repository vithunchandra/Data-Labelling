import { useState } from 'react'
import AddCardIcon from '@mui/icons-material/AddCard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { IconButton, Button } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import task from '../../dummy_data/task.json';
import CreateTask_Dashboard from '../../components/requester/CreateTask_Dashboard';
import MonitorTask_Dashboard from '../../components/requester/MonitorTask_Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import useAuth from '../../customHooks/authenticate';

export default function RequesterDashboard() {
  const {getUser} = useAuth()
  const money = getUser().wallet
  const tasks = useLoaderData()
  const navigate = useNavigate()
  
  let num = []
  let pick_tasks = []
  if(tasks.length > 5){
    for(let i = 0; i < 5; i++){
      let rdm = Math.floor(Math.random() * (tasks.length - 1));
      if(!num.includes(rdm)){
        num.push(rdm);
        pick_tasks.push(tasks[rdm])
      }else{
        --i;
      }
    }
  }else{
    pick_tasks = tasks.slice()
  }

  const[pickTask, setPickTask] = useState<any[]>(pick_tasks)
  const activeTask = tasks.filter((t) => t.active);
  
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
    <>
      <div className="mw-100 h-100 d-flex flex-column">
          <div className="display-6 fw-lighter">
              At Your Service, {getUser().name}
              <SupportAgentIcon sx={{fontSize: "50px"}} className='mx-2'/>
          </div>
          <div className='ms-2 fs-6 d-flex align-items-center'>
            <label className='me-3'>Money: {tandaPemisahTitik(money.toString())}</label>
            <IconButton onClick={() => navigate('top_up')}>
              <AddCardIcon color='warning' />
            </IconButton>
          </div>

          <div className='row mt-2 align-items-center justify-content-between rounded-2 bg-white shadow-sm p-2 g-0'>
            <div className='col-4 d-flex align-items-center'>
              <InventoryIcon fontSize="large" color='info' />
              <div className='ms-3'>
                <span className='fs-6 text-secondary'>Total Task</span>
                <div className='text-primary fs-4 fw-bold'>{tasks.length}</div>
              </div>
            </div>
            <div className='col-4 d-flex align-items-center'>
              <AssignmentTurnedInIcon fontSize="large" color='success' />
              <div className='ms-3'>
                <span className='fs-6 text-secondary'>Opened Task</span>
                <div className='text-primary fs-4 fw-bold'>{activeTask.length}</div>
              </div>
            </div>
            <div className='col-4 d-flex align-items-center'>
              <AssignmentLateIcon fontSize="large" color='error' />
              <div className='ms-3'>
                <span className='fs-6 text-secondary'>Closed Task</span>
                <div className='text-primary fs-4 fw-bold'>{tasks.length - activeTask.length}</div>
              </div>
            </div>
          </div>

          <div className='row mt-3 d-flex justify-content-between'>
            <div className='col-5 overflow-auto bg-white shadow-sm p-2 g-0'>
              <div className='d-flex justify-content-between align-items-center'>
                <label className='fs-2 fw-bold'>Create Task</label>
                <Link to={"create_task/add"}>
                  <Button variant='contained' color='success' startIcon={<AddCircleIcon />}>
                    <span>New Task</span>
                  </Button>
                </Link>
              </div>
              <CreateTask_Dashboard task={pickTask} />
            </div>
            <div className='col ms-4 overflow-auto bg-white shadow-sm p-2 g-0'>
              <label className='fs-2 fw-bold'>Monitor Task</label>
              <MonitorTask_Dashboard task={pickTask} setPickTask={setPickTask} />
            </div>
          </div>
      </div>
    </>
  );
}
