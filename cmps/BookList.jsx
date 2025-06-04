
import { BookPreview } from "./BookPreview.jsx"
export function BookList ({books}){
    return(
        <ul className="book-list-container">
            {books && books.map((book, i) => (
                <li key={book.id}>
                    <BookPreview book={book} idx={i}/>
                    <section className="book-preview-options">
                        <button className="book-details-button">Details</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}