import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import {BooksFilter} from '../cmps/BooksFilter.jsx'
import { getTruthyValues, getMinMaxPrice} from "../services/util.service.js"
import { BooksDashboard } from "../cmps/BooksDashboard.jsx"

const {useState, useEffect} = React
const {useNavigate, useSearchParams} = ReactRouterDOM

export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [showDashboard, setShowDashboard] = useState(false)    
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    const navigate = useNavigate()
    
    useEffect(()=>{
        loadBooks() 
        setSearchParams(getTruthyValues(filterBy))      
    }, [filterBy])

    function loadBooks(){
        bookService.query(filterBy)
            .then(setBooks)
    }

    function onSetFilter(filterByObj){
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterByObj}))
    }

   function onRemoveBook(id){
        let book = books.find(book => book.id === id)
        let newBooksArr = books.filter(book => book.id !== id)
        bookService.remove(id)
            .then(()=>showSuccessMsg(`${book.title} was removed!`))
            .then(() => setBooks(newBooksArr))
            .catch(err => showErrorMsg(`failed to remove ${book.title}`))
    }

    function onCloseDashboard(){
        setShowDashboard(false)
    }
    
    if (!books) return <h1>Loading...</h1>
    
    return(
        <section className="book-index-container">
            <BooksFilter categories={bookService.getCategories(books)} priceRange={getMinMaxPrice(books)} filterBy={filterBy} onSetFilter={onSetFilter}/>
            <button onClick={()=>navigate('/book/edit')} className="add-book-btn">Add Book</button>
            <button onClick={()=> setShowDashboard(true)}>Map Books By Categories</button>
            <BookList books={books} onRemoveBook={onRemoveBook}/>
            {showDashboard && <BooksDashboard onCloseDashboard={onCloseDashboard}/>}
        </section>        
    )
}