
import { BookPreview } from "./BookPreview.jsx"
import { bookService } from "../services/book.service.js"
const {Link} = ReactRouterDOM
export function BookList ({books, onRemoveBook}){
    
    function handleRemoveBook(id){
        onRemoveBook(id)
    }
        
    
    if (books.length === 0) return <h1>No books match your filter</h1>
    return(
            <ul className="book-list-container">
                {books && books.map((book, i) => (
                    <li key={book.id}>
                        <BookPreview book={book} idx={i}/>
                        <button className='books-li-x-btn' onClick={()=>handleRemoveBook(book.id)}>X</button>
                        <section className="book-preview-options">
                            <Link to={`/book/${book.id}`}><button className="book-details-button">Details</button></Link>
                            <Link to={`/book/edit/${book.id}`}><button className="book-edit-button">Edit</button></Link>
                            <button onClick={()=>handleRemoveBook(book.id)}>Remove</button>
                        </section>
                    </li>)
                    )
                }
            </ul>       
    )
}