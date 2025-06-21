import {ReviewPreview} from './ReviewPreview.jsx'

const {useState, useEffect} = React

export function ReviewsList({reviews, max, onDeleteReview}){
    
    const [firstIndexDisplayed, setFirstIndexDisplayed] = useState(0)
    const [lastIndexDisplayed, setLastIndexDisplayed] = useState(() => {
        if (reviews.length > max) return max-1
        else return reviews.length - 1
    })
    const [reviewsToDisplay, setReviewsToDisplay] = useState([])
    
    useEffect(()=>{
       setFirstIndexDisplayed(0)
       setLastIndexDisplayed(()=>{
            if (reviews.length > max) return max-1
            else return reviews.length - 1
       }) 
    }, [reviews.length])

    useEffect(()=>{
        console.log('firstIndexDisplayed', firstIndexDisplayed);
        console.log('lastIndexDisplayed', lastIndexDisplayed);
        console.log(reviews.length)
        setReviewsToDisplay(reviews.slice(firstIndexDisplayed, lastIndexDisplayed + 1))
    }, [firstIndexDisplayed, lastIndexDisplayed])
    
    function onLeftArrowClick(){
        setLastIndexDisplayed(firstIndexDisplayed - 1)
        setFirstIndexDisplayed((prev)=> prev - max > 0? prev - max : 0)
    }

    function onRightArrowClick(){
        setFirstIndexDisplayed(lastIndexDisplayed + 1)
        setLastIndexDisplayed(prev => (prev + max > reviews.length - 1)? reviews.length - 1 : prev + max)
    }

    function onRemoveReview(id){
        if (lastIndexDisplayed === reviews.length - 1) {
            if (lastIndexDisplayed !== 0) setLastIndexDisplayed(prev => prev - 1)
        }
        onDeleteReview(id)
    }

    const leftArrow = '\u2190'
    const rightArrow = '\u2192'
    
    

    return(
        <section className="reviews-list-container">
            {firstIndexDisplayed > 0 && <button onClick={onLeftArrowClick} className="scroll-btn-left">{leftArrow}</button>}
            {reviews.length !== 0 && reviewsToDisplay.map((review, i) => (<ReviewPreview key={review.fullname + i} review={review} onRemoveReview={onRemoveReview} />))}
            {lastIndexDisplayed !== reviews.length - 1 && <button onClick={onRightArrowClick} className="scroll-btn-right">{rightArrow}</button>}
        </section>
    )
}