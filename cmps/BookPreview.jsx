
export function BookPreview({book, idx}){
    return(
        <article className="book-preview-container" >
            <span>{book.title}</span>
            <span>Author: {book.authors}</span>
            <span>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</span>
            <img src={`../assets/BooksImages/${idx+1}.jpg`} alt={`${book.title} image`} />
            <p>Book Description: {book.description}</p>
        </article>
    )
}