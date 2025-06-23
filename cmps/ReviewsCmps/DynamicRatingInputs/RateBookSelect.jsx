const {useEffect, useState} = React

export function RateBookSelect({onSelectRate}){
    
    const [rate, setRate] = useState('')
    const star = '\u2606'
    
    useEffect(()=>{
        onSelectRate(rate)
    }, [rate])

    function getOptionTxt(value){
        let txt = ''
        for (let i=0; i<+value; i++) {
            txt+=star
        }
        return txt
    }
    return (
            <div className="rating-select-container">
                <select name="bookRating" id="rate-select" onChange={(ev)=>setRate(ev.target.value)}>
                    {[5,4,3,2,1].map(starValue => (
                                        <option className='star-option' value={starValue}>{getOptionTxt(starValue)}</option>
                    ))}
                </select>
            </div>
    )  
}