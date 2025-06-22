import { animateCSS } from "../services/util.service.js"

const {useState, useEffect, useRef} = React

export function AddReview({onSaveReview, review, onCloseModal}){
    const [reviewToSave, setReviewToSave] = useState(review)
    const [invalidForm, setInvalidForm] = useState(true)
    const [failedSubmission, setFailedSubmission] = useState(false)
    const elAddReview = useRef()
    useEffect(()=>{
        if (reviewToSave !== null) {
            const {fullname, rating, readDate} = reviewToSave
            if (fullname && rating && readDate) {
                setInvalidForm(false)
                setFailedSubmission(false)
            } else setInvalidForm(true)
        }
    }, [reviewToSave])

    useEffect(()=>{
        if (elAddReview.current) animateCSS(elAddReview.current, 'zoomIn')
    }, [])
    function handleChange({target}){ 
        let {name: field, value} = target
        setReviewToSave(prevReview => ({...prevReview, [field]: value}))
    }
    
    function handleSubmit(ev){
        ev.preventDefault()
        if (invalidForm) {
            setFailedSubmission(true)
            return 
        }
        setFailedSubmission(false)
        onSaveReview(reviewToSave)
        animateCSS(elAddReview.current, 'zoomOut')
            .then(()=> setReviewToSave(null))
        
        
    }

    function getThisDateStr(){
        let date = new Date()
        let yyyy = String(date.getFullYear())
        let mm = date.getMonth()
        mm += 1
        mm = String(mm)
        if (mm < 10){
            mm = "0" + mm
        }
        
        let dd = String(date.getDate())
        return `${yyyy}-${mm}-${dd}`
    }
    const invalidReviewResponse = <h4>One of the fields is missing</h4>
    const star = '\u2606'
    if (!reviewToSave) return null
    console.log(getThisDateStr())
    return(
        <section className="book-review-container">
            <div className="add-review-modal-cover">
                <div className="add-review-container" ref={elAddReview}>
                    <form onSubmit={handleSubmit}>
                        <button className='review-modal-close-btn' onClick={onCloseModal}>X</button>
                        <h4>Book Rating</h4>
                        <article className="review-fullname-container">
                            <label htmlFor="reviewFullname">Fullname: </label>
                            <input type="text" 
                                   id='reviewFullname' 
                                   name='fullname'
                                   value={reviewToSave.fullname} 
                                   onChange={handleChange} 
                            />
                        </article>
                        <article className="review-rating-container">
                            <label>Rate: </label>
                            <div className="rating-stars-container">
                                <div className="rating">
                                    {[5,4,3,2,1].map(starValue => (
                                        <span key={starValue}
                                              className={`star ${reviewToSave.rating >= starValue? "selected" : ""}`}  
                                              onClick={()=> setReviewToSave(prevReview => ({...prevReview, rating: starValue}))}   
                                        >
                                            {star}
                                        </span>
                                    ))}
                                </div>
                            </div>                           
                        </article>
                        <article className="read-date-container">
                            <label htmlFor="readDate">Date of reading the book: </label>
                            <input type="date" 
                                   id='readDate' 
                                   name='readDate'
                                   max={getThisDateStr()}
                                   value={reviewToSave.readDate}
                                   onChange={handleChange}
                            />
                        </article>
                        {failedSubmission? invalidReviewResponse : ""}
                        <button>Submit Review</button>
                    </form>
                </div>
            </div>
            <div className="review-modal"></div>
        </section>
    )
}