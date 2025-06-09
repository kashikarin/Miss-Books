import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import {BooksFilter} from '../cmps/BooksFilter.jsx'
import { BookDetails } from "./BookDetails.jsx"

const {useState, useEffect} = React
const {useNavigate} = ReactRouterDOM

export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const navigate = useNavigate()


    
    useEffect(()=>{
        loadBooks()       
    },[filterBy])

    function loadBooks(){
        bookService.query(filterBy)
            .then(setBooks)
    }

    function onSetFilter(filterByObj){
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterByObj}))
    }

    function getMinMaxPrice(){
        if (!books || !books.length) return {min: 0, max: 600}
        let min = books[0].listPrice.amount
        let max = books[0].listPrice.amount
        for (let i=1; i<books.length; i++){
            min = Math.min(min, books[i].listPrice.amount)
            max = Math.max(max, books[i].listPrice.amount)
        }
        return {min, max}
    }      

    if (!books) return <h1>Loading...</h1>
    return(
        <section className="book-index-container">
        <BooksFilter categories={bookService.getCategories(books)} priceRange={getMinMaxPrice(books)} filterBy={filterBy} onSetFilter={onSetFilter}/>
        <button onClick={()=>navigate('/book/edit')} className="add-book-btn">Add Book</button>
        <BookList books={books} />
        </section>        
    )
}