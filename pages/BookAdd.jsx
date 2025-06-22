import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { asyncDebounce, getRandomIntInclusive } from "../services/util.service.js"
import { SearchBookList } from "../cmps/SearchBookList.jsx"

const {useState, useRef, useEffect} = React

export function BookAdd(){
    
    const [searchField, setSearchField] = useState('')
    const [matchingBooks, setMatchingBooks] = useState([])
      
    const debouncedFetch = useRef(asyncDebounce(bookService.searchGoogleBooks), 1000).current

    useEffect(()=>{
        debouncedFetch(searchField)
            .then(setMatchingBooks)
    
    }, [searchField])

    function handleChange({target}) {
        setSearchField(target.value)
    }

    
    function checkIfBookExists(title) {
        return bookService.query()
            .then(books => books.some(book => book.title.toLocaleLowerCase() === title.toLocaleLowerCase()))
    }

    function onAddBook(requestedBook){
        const {title, authors, description, publishedDate, pageCount, categories, imageLinks, language} = requestedBook.volumeInfo
        checkIfBookExists(title)
            .then(res => {
               if (res) {
                showErrorMsg(`${title} already exists in the database`)
                return
            } else {
                let bookPrice = getRandomIntInclusive(1, 600)
                let bookObj = {title, 
                        authors, 
                        description, 
                        publishedDate, 
                        pageCount, 
                        categories, 
                        listPrice: {amount: bookPrice}, 
                        thumbnail: imageLinks.thumbnail,
                        language
                    }
                return bookService.addGoogleBook(bookObj)
                    .then(()=> showSuccessMsg(`${title} was added to the database`))
                    .catch(err => showErrorMsg(`Failed to save ${title}`))
            } 
            })
    }
        

    
    return(
        <section className="book-add-container">
            <input type="search" value={searchField} name='searchField' placeholder='Search a book online' onChange={handleChange}/>
            {matchingBooks && matchingBooks.length > 0 && <SearchBookList books={matchingBooks}/>}
        </section>
        
    )
}