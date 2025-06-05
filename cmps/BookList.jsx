
import { BookPreview } from "./BookPreview.jsx"
const {Link} = ReactRouterDOM
export function BookList ({books}){
    if (books.length === 0) return <h1>No books match your filter</h1>
    return(
        <ul className="book-list-container">
            {books && books.map((book, i) => (
                <li key={book.id}>
                    <BookPreview book={book} idx={i}/>
                    <section className="book-preview-options">
                        <Link to={`/book/${book.id}`}><button className="book-details-button">Details</button></Link>
                    </section>
                </li>
            ))}
        </ul>
    )
}