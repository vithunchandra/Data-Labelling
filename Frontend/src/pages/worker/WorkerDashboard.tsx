import WavingHandIcon from '@mui/icons-material/WavingHand';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ProgressInfo from '../../components/dashboard/ProgressInfo';
import task from '../../dummy_data/task.json';
import LastTask from '../../components/dashboard/LastTask';
import chat from '../../dummy_data/chat.json';
import LastChat from '../../components/dashboard/LastChat';

export default function WorkerDashboard(){
    const progressInfo = [
        {
            icon: <InventoryIcon sx={{fontSize: '60px'}} color='info'></InventoryIcon>,
            titleText: 'Total Task',
            text: '10'
        },
        {
            icon: <AssignmentTurnedInIcon sx={{fontSize: '60px'}} color='success'></AssignmentTurnedInIcon>,
            titleText: 'Finished Task',
            text: '3'
        },
        {
            icon: <AssignmentIcon sx={{fontSize: '60px'}} color='action'></AssignmentIcon>,
            titleText: 'Ongoing Task',
            text: '7'
        },
    ]

    const lastTask = task[0];

    return(
        <>
            <div className="mw-100">
                <div className="display-6 fw-lighter mt-3">
                    Welcome Back, Vithun Chandra
                    <WavingHandIcon sx={{color: '#E8BEAC'}} fontSize='large' className='mx-2'/>
                </div>

                <div className='my-3 fs-5'>
                    Current Task Progress:
                </div>
                <div className='row align-items-center'>
                    {
                        progressInfo.map((item, index) => {
                            return <ProgressInfo icon={item.icon} titleText={item.titleText} text={item.text} key={index}></ProgressInfo>
                        })
                    }
                </div>
                
                <div className='row justify-content-between align-items-stretch mt-5 g-0'>
                    <div className='col-7 bg-white rounded-2 shadow-sm p-3'>
                        <LastTask task={lastTask}></LastTask>
                    </div>
                    <div className='col ms-4 bg-white rounded-2 shadow-sm p-3'>
                        <LastChat chat={chat}></LastChat>
                    </div>
                </div>
            </div>
        </>
    )
}