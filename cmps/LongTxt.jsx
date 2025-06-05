
const {useState} = React
export function LongTxt({txt, maxLength = 100}){
    const [readMore, setReadMore] = useState(false)

    function handleReadMore(e){
        e.preventDefault()
        setReadMore(true)
    }

    function handleReadLess(e){
        e.preventDefault()
        setReadMore(false) 
    }

    return(
        <div className="long-txt-container">
            {!readMore && (
               <div className="no-read-more-container">
                    <span>{`${txt.slice(0, maxLength)}...`}</span>
                    <a href="#" onClick={handleReadMore}>Read more...</a> 
               </div>
            )}
            {readMore && (
               <div className="read-more-container">
                    <span>{txt}</span>
                    <a href="#" onClick={handleReadLess}>Read Less...</a> 
               </div>
            )}
        </div>
    )
}