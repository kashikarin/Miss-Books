
import { BookPreview } from "./BookPreview.jsx"
import { bookService } from "../services/book.service.js"
import { animateCSS } from "../services/util.service.js"

const {useRef} = React
const {Link} = ReactRouterDOM

const bookDetailsIcon = <i className="fa-solid fa-magnifying-glass"></i>
const bookEditIcon = <i className="fa-solid fa-pencil"></i>

export function BookList ({books, onRemoveBook}){
    const bookPreviewRef = useRef()
    function handleRemoveBook(id){
        animateCSS(bookPreviewRef.current)
        onRemoveBook(id)
    }
        
    
    if (books.length === 0) return <h1>No books match your filter</h1>
    return(
            <ul className="book-list-container">
                {books && books.map((book, i) => (
                    <li key={book.id}>
                        <BookPreview book={book} idx={i} className='book-preview' ref={bookPreviewRef}/>
                        <button className='books-li-x-btn' onClick={()=>handleRemoveBook(book.id)}>X</button>
                        <section className="book-preview-options">
                            <Link to={`/book/${book.id}`}><button className="book-details-button">{bookDetailsIcon}</button></Link>
                            <Link to={`/book/edit/${book.id}`}><button className="book-edit-button">{bookEditIcon}</button></Link>
                        </section>
                    </li>)
                    )
                }
            </ul>       
    )
}