const {useState, useEffect} = React

export function RateBookStars({onSelectRate}){
    
    const [rate, setRate] = useState('')
    const star = '\u2606'
    
    useEffect(()=>{
        onSelectRate(rate)
    }, [rate])

    return (
            <div className="rating-stars-container">
                <div className="rating">
                                    {[5,4,3,2,1].map(starValue => (
                                        <span key={starValue}
                                              className={`star ${rate >= starValue? "selected" : ""}`}  
                                              onClick={()=>setRate(starValue)}   
                                        >
                                        {star}
                        </span>
                    ))}
                </div>
            </div>
    )  
}