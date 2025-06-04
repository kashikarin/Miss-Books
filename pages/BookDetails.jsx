
import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React
const { useParams, Link, useNavigate } = ReactRouterDOM


export function BookDetails(){
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
        loadBook()
    }, [params.bookId])

    function loadBook(){
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => console.error('Oops', err))
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

    if (!book) return <div>Loading...</div>
    return(
            <section className="book-details-container">
                <article className="book-details-tags">
                    {book.listPrice.isOnSale && <span>On Sale</span>}
                    {getPageCountTag() && <span>{getPageCountTag()}</span>}
                    {getPublishedDateTag() && <span>{getPublishedDateTag()}</span>}
                </article>
                <articles className="book-details-list">
                    <p>{book.title}</p>
                    <p>{book.subTitle}</p>
                    <p>{[...book.authors]}</p>
                    <p>{book.publishedDate}</p>
                    <p>{book.description}</p>
                    <p>{book.pageCount}</p>
                    <img src={`${book.thumbnail}`} alt={`${book.title} cover image`} />
                    <p>Number of pages: {book.pageCount}</p>
                    <p>Language: {book.language}</p>
                    <p>{[...book.categories]}</p>
                    <p>Price: <span style={{color: getPriceColor()}}>{book.listPrice.amount + book.listPrice.currencyCode}</span></p>
                </articles>
                <article className="next-prev-btns">
                    <Link to={`/book/${book.prevBookId}`}><button>Previous</button></Link>
                    <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
                    <button onClick={handleBack}>Back</button>
                </article>
            </section>
    )
}