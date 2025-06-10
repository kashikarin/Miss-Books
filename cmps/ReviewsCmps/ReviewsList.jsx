import {ReviewPreview} from './ReviewPreview.jsx'

const {useState, useEffect} = React

export function ReviewsList({reviews, max, onDeleteReview}){
    
    const length = reviews.length

    const [firstIndexDisplayed, setFirstIndexDisplayed] = useState(0)
    const [lastIndexDisplayed, setLastIndexDisplayed] = useState(() => {
        if (length > max) return max-1
        else return length - 1
    })
    const [reviewsToDisplay, setReviewsToDisplay] = useState([])
    
    useEffect(()=>{
        setReviewsToDisplay(reviews.slice(firstIndexDisplayed, lastIndexDisplayed + 1))
    }, [firstIndexDisplayed, lastIndexDisplayed])

    

    function onLeftArrowClick(){
        setLastIndexDisplayed(firstIndexDisplayed - 1)
        setFirstIndexDisplayed((prev)=> prev - max > 0? prev - max : 0)
    }

    function onRightArrowClick(){
        setFirstIndexDisplayed(lastIndexDisplayed + 1)
        setLastIndexDisplayed(prev => (prev + max > length - 1)? length - 1 : prev + max)
    }

    function onRemoveReview(id){
        onDeleteReview(id)
    }

    const leftArrow = '\u2190'
    const rightArrow = '\u2192'
    
    

    return(
        <section className="reviews-list-container">
            {firstIndexDisplayed > 0 && <button onClick={onLeftArrowClick} className="scroll-btn-left">{leftArrow}</button>}
            {length !== 0 && reviewsToDisplay.map((review, i) => (<ReviewPreview key={review.fullname + i} review={review} onRemoveReview={onRemoveReview} />))}
            {lastIndexDisplayed !== length - 1 && <button onClick={onRightArrowClick} className="scroll-btn-right">{rightArrow}</button>}
        </section>
    )
}