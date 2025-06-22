import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import {BooksFilter} from '../cmps/BooksFilter.jsx'
import { BookDetails } from "./BookDetails.jsx"
import { animateCSS, getTruthyValues} from "../services/util.service.js"
import { BooksDashboard } from "../cmps/BooksDashboard.jsx"



const {useState, useEffect, useRef} = React
const {useNavigate, useSearchParams} = ReactRouterDOM

export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [showMap, setShowMap] = useState(false)    
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    const navigate = useNavigate()
    const elDashboardModal = useRef()
    

  

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

    function onRemoveBook(id){
        let book = books.find(book => book.id === id)
        let newBooksArr = books.filter(book => book.id !== id)
        bookService.remove(id)
            .then(()=>showSuccessMsg(`${book.title} was removed!`))
            .then(() => setBooks(newBooksArr))
            .catch(err => showErrorMsg(`failed to remove ${book.title}`))
    }

    function onCloseDashboard(){
        setShowMap(false)
    }
    
    if (!books) return <h1>Loading...</h1>
    
    return(
        <section className="book-index-container">
            <BooksFilter categories={bookService.getCategories(books)} priceRange={getMinMaxPrice(books)} filterBy={filterBy} onSetFilter={onSetFilter}/>
            <button onClick={()=>navigate('/book/edit')} className="add-book-btn">Add Book</button>
            <button onClick={()=> setShowMap(true)}>Map Books By Categories</button>
            <BookList books={books} onRemoveBook={onRemoveBook}/>
            {showMap && <BooksDashboard onCloseDashboard={onCloseDashboard}/>}
        </section>        
    )
}