
export function BookPreview({book, idx}){
    return(
        <article className="book-preview-container" style={{backgroundImage:`url(../assets/BooksImages/${idx+1}.jpg)`}}>
            <h1>{book.title}</h1>
            <h3>Author: {book.authors}</h3>
            <p>Book Description: {book.description}</p>
            <h6>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h6>
        </article>
    )
}