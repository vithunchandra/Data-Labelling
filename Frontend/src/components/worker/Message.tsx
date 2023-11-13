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
                <div className={`text-bg-${color} rounded-2 p-2`} style={{borderTopLeftRadius: 0}}>
                    {message}
                </div>
            </div>
        </div>
    )
}