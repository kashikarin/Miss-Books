import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
const {useState, useEffect} = React

export function BookIndex(){
    const [books, setBooks] = useState(null)
    
    useEffect(()=>{
        loadBooks()
    },[])

    function loadBooks(){
        bookService.query()
            .then(setBooks)
    }
    if (!books) return <h1>Loading...</h1>
    return(
        <section className="book-index-container">
        <BookList books={books}/>
           
        </section>        
    )
}