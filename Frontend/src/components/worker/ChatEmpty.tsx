import { SpeakerNotesOff } from "@mui/icons-material";

export default function ChatEmpty(){
    return <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '40vh'}}>
        <SpeakerNotesOff fontSize="large" color="success"/>
        <span className="text-danger fs-4">Chat is Empty</span>
    </div>
}