import { animateCSS } from "../services/util.service.js"
import { DynamicCmp } from "./ReviewsCmps/DynamicRatingInputs/DynamicCmp.jsx"

const {useState, useEffect, useRef} = React

export function AddReview({onSaveReview, review, onCloseModal}){
    const [reviewToSave, setReviewToSave] = useState(review)
    const [invalidForm, setInvalidForm] = useState(true)
    const [failedSubmission, setFailedSubmission] = useState(false)
    const [cmpType, setCmpType] = useState('stars')
    const elAddReview = useRef()
    
    useEffect(()=>{
        if (reviewToSave !== null) {
            if (reviewToSave.fullname && reviewToSave.rating && reviewToSave.readDate) {
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

    function onSelectRate(rate){
        setReviewToSave(prevReview => ({...prevReview, rating: rate}))
    }

    const invalidReviewResponse = <h4>One of the fields is missing</h4>
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
                            <h5>Select a Rating Method:</h5>
                            <div className='rating-method-selection'>
                                <div>
                                    <input type="radio" id='stars' name='type' value='stars' defaultChecked onChange={(ev) => setCmpType(ev.target.value)}/>
                                    <label htmlFor="stars">Stars</label>
                                </div>
                                <div>
                                    <input type="radio" id='select' name='type' value='select' onChange={(ev) => setCmpType(ev.target.value)}/>
                                    <label htmlFor="select">Select</label>
                                </div>
                                <div>
                                    <input type="radio" id='txtBox' name='type' value='text' onChange={(ev) => setCmpType(ev.target.value)}/>
                                    <label htmlFor="txtBox">Text</label>
                                </div>
                            </div>
                            
                            
                            <div className="rating-container">
                                <label>Rate: </label>
                                <DynamicCmp cmpType={cmpType} onSelectRate={onSelectRate}/>         
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