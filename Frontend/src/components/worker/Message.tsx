export default function Message(
    {
        message,
        color,
        position,
        timestamp
    } : {
        message: string,
        color: string,
        position: string
        timestamp: string
    }
){
    return(
        <div className={`d-flex justify-content-${position} my-3`}>
            <div className="col-8">
                <div id={`${position === 'start' ? 'left-message-border' : 'right-message-border'}`} className={`text-bg-${color} rounded-2 px-3 py-2`}>
                    {message}
                    <div className={'text-end mt-1'} style={{fontSize: '0.8rem'}}>
                        {new Date(timestamp).toDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}