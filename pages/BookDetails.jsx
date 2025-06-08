
import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React
const { useParams, Link, useNavigate } = ReactRouterDOM


export function BookDetails(){
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
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

    function getPageCountTag(){
        const {pageCount} = book
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading' 
        if (pageCount < 100) return 'Light Reading'
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
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return 'black'
    }

    if (isLoading || !book) return <div className="loader">Loading...</div>
    return(
            <section className="book-details-container">
                <article className="book-details-tags">
                    {book.listPrice.isOnSale && <p className='book-details-onsale-tag'>On Sale</p>}
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
                    <div className="book-details-grid2">
                        <img src={`${book.thumbnail}`} alt={`${book.title} cover image`} />
                    </div>
                    <div className="book-details-grid3">
                        <p>Description<span>{book.description}</span></p>
                    </div>
                </article>
                <article className="next-prev-btns">
                    <Link to={`/book/${book.prevBookId}`}><button>Previous</button></Link>
                    <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
                </article>
                <button className='book-details-back-btn' onClick={handleBack}>Back</button>
                
            </section>
    )
}