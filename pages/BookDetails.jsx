
import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"
import {ReviewsList} from '../cmps/ReviewsCmps/ReviewsList.jsx'
import { animateCSS } from "../services/util.service.js"
const { useState, useEffect } = React
const { useParams, Link, useNavigate } = ReactRouterDOM



export function BookDetails(){
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const initialReviewDetails = {id: "", fullname: "", rating: "", readDate: ""}
    const [showReviewModal, setShowReviewModal] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        loadBook()
    }, [params.bookId])

    function loadBook(){
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => console.error('Oops', err))
            .finally(()=>setIsLoading(false))
    }



    function onSaveReview(newReview){
        bookService.saveReview(params.bookId, newReview)
            .then(()=> showSuccessMsg(`Your review to ${book.title} was added`))
            .then(()=> setBook((prevBook) => {
                if (prevBook.reviews) {
                    return ({...prevBook, reviews: [...prevBook.reviews, newReview]})
                } else {
                    return ({...prevBook, reviews: [newReview]})
                }
            }))
            .catch(err => showErrorMsg(`failed to add your review to ${book.title}`))
            .finally(()=> {
                setShowReviewModal(false)
            })
    }

    function onCloseModal(){
        setShowReviewModal(false)
    }

    function onDeleteReview(reviewId){
        bookService.deleteReview(params.bookId, reviewId)
            .then(()=> showSuccessMsg(`Review to ${book.title} was deleted successfully`))
            .then(()=> setBook((prevBook) => {
                if (prevBook.reviews.length > 1) {
                    let filterredReviews = prevBook.reviews.slice(0)
                    filterredReviews = filterredReviews.filter(review => review.id !== reviewId) 
                    return ({...prevBook, reviews: [...filterredReviews]})
                } else {
                    delete prevBook.reviews
                    return ({...prevBook})
                }
            }))
            .catch(err => showErrorMsg(`failed to remove review to ${book.title}`))
    }

    function getPageCountTag(){
        const {pageCount} = book
        if (pageCount >= 500) return 'Serious Reading'
        if (pageCount >= 200) return 'Descent Reading' 
        if (pageCount <= 100) return 'Light Reading'
        return undefined 

    }

    function getPublishedDateTag(){
        const {publishedDate} = book
        if (new Date().getFullYear() - publishedDate > 10) return 'Vintage'
        if (new Date().getFullYear() === publishedDate) return 'New'
        return undefined
    }

    function handleBack(){
        setBook(null)
        navigate('/book')

    }

    function getPriceColor(){
        const {amount} = book.listPrice
        if (amount >= 150) return 'red'
        if (amount <= 20) return 'green'
        return 'black'
    }

    if (isLoading || !book) return <div className="loader">Loading...</div>
    return(
            <section className="book-details-container">
                {book.listPrice.isOnSale && <span className='on-sale-header'>SALE</span>}
                <article className="book-details-tags">
                    {getPageCountTag() && <p className='book-details-page-count-tag'>{getPageCountTag()}</p>}
                    {getPublishedDateTag() && <p className='book-details-published-date-tag'>{getPublishedDateTag()}</p>}
                </article>
                <article className="book-details-list">
                    <div className="book-details-grid1">
                        <p>Title<span>: {book.title}</span></p>
                        <p>Subtitle<span>: {book.subtitle}</span></p>
                        <p>{book.authors.length > 1? 'Authors:' : 'Author:' }<span>: {[...book.authors]}</span></p>
                        <p>Published on<span>: {book.publishedDate}</span></p>
                        <p>Number of pages<span>: {book.pageCount}</span></p>
                        <p>Language<span>: {book.language}</span></p>
                        <p>Categories<span>: {[...book.categories]}</span></p>
                        <p>Price<span>: </span><span style={{color: getPriceColor()}}> {book.listPrice.amount + book.listPrice.currencyCode}</span></p>
                    </div>
                    <img src={book.thumbnail} className="book-details-grid2" alt={`${book.title} cover image`} />
                    <p className="book-details-grid3">Description<span>{book.description}</span></p>
                </article>
                <article className="reviews-container">
                    <h4>What readers thought: </h4>
                    <div>
                        {book.reviews && <ReviewsList reviews={book.reviews} max={3} onDeleteReview={onDeleteReview} />}
                        {!book.reviews && <span className='no-reviews-response'>No reviews for this book yet.</span>}
                    </div>                       
                    <h4>Read it? Rate it!</h4>
                    <button 
                        onClick={()=>setShowReviewModal(true)}
                        className='add-review-modal-btn'
                    >
                        Add Review
                    </button>
                </article>                   
                <article className="nav-btns">
                    <Link to={`/book/${book.prevBookId}`} className="button-like">Previous</Link>
                    <button className='book-details-back-btn' onClick={handleBack}>Back</button>
                    <Link to={`/book/${book.nextBookId}`} className="button-like">Next</Link>

                </article>
                {showReviewModal && <AddReview book={book} review={initialReviewDetails} onSaveReview={onSaveReview} onCloseModal={onCloseModal} onDeleteReview={onDeleteReview}/>}
            </section>
    )
}