export function SearchBookList({books}) {
    return(
        <ul>
            {books.map(book => <li key={book.id}>
                    <span>{book.volumeInfo.title}</span>
                    <span onClick={() => onAddBook(book)}>+</span>
                </li>)}
        </ul>
    )
}