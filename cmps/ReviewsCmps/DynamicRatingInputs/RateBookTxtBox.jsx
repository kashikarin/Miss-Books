const {useState, useEffect} = React

export function RateBookTxtBox({onSelectRate}){
    
    const [rate, setRate] = useState('')
    const star = '\u2606'
    
    useEffect(()=>{
        onSelectRate(rate)
    }, [rate])

    return (
            <div className="rating-text-container">
                <div className="rating">
                    <input type="number" min={1} max={5} value={rate} onChange={(ev)=>setRate(ev.target.value)}/>
                </div>
            </div>
    )  
}