
import { LongTxt } from "./LongTxt.jsx"
export function BookPreview({book, idx}){
    const maxLength = 100

    function getBookDescription(){
        if (book.description.length > maxLength){
            return undefined
        } 
        return book.description
    }
    
    return(
        <article className="book-preview-container" >
            <span className='book-preview-title'>{book.title}</span>
            <span className='book-preview-authors'>Author: {book.authors}</span>
            <span>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</span>
            <img src={`../assets/BooksImages/${idx+1}.jpg`} alt={`${book.title} image`} />
            <p>Book Description <span>{getBookDescription() || <LongTxt txt={book.description} maxLength={maxLength} />}</span></p>
        </article>
    )
}