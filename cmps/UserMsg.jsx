import { eventBusService } from "../services/event-bus.service.js"
const {useEffect, useState} = React


export function UserMsg(){
    const [msg, setMsg] = useState(null)

    useEffect(()=>{
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(()=>onCloseMsg(), 5000)
        })
        return () => unsubscribe()
    }, [])
    
    function onCloseMsg(){ 
        setMsg(null)

    }
    if (!msg) return null
    return(
        <div className="user-msg">
            <span>{msg.txt}</span>
            <button onClick={() => onCloseMsg()}>X</button>
        </div>
    )
}