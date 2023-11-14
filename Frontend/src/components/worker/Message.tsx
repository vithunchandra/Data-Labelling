export default function Message(
    {
        message,
        color,
        position
    } : {
        message: string,
        color: string,
        position: string
    }
){
    return(
        <div className={`d-flex justify-content-${position} my-3`}>
            <div className="col-8">
                <div id={`${position === 'start' ? 'left-message-border' : 'right-message-border'}`} className={`text-bg-${color} rounded-2 px-3 py-2`}>
                    {message}
                </div>
            </div>
        </div>
    )
}