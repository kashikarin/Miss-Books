import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { debounce, getRandomIntInclusive } from "../services/util.service.js"

const {useState, useRef, useEffect} = React
export function BookAdd(){
    
    const [searchField, setSearchField] = useState('')
    const [matchingBooks, setMatchingBooks] = useState([])
    const onFetchBooksDebounceRef = useRef(debounce(fetchMatchingGoogleBooks, 500)).current
    
    const books = [
        {
            price: 123,
            title: 'Love Love Love'
        },
        {
            price: 111,
            title: 'Love and War'
        }
    ]

    useEffect(()=>{
        onFetchBooksDebounceRef(searchField)
    }, [searchField])
    
    useEffect(()=>{
        fetchMatchingGoogleBooks(searchField)
    }, [])

    function handleChange({target}) {
        setSearchField(target.value)
               
    }

    function fetchMatchingGoogleBooks(searchField) {
        return fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
        .then(res => res.json())
        .then(data => data.items)
        .then(googleItems => googleItems.filter(googleItem => googleItem.volumeInfo.title.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())))
        .then(setMatchingBooks)
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
            <input type="search" value={searchField} placeholder='Search a book online' onChange={handleChange}/>
            <ul>
                {matchingBooks.length > 0 && matchingBooks.map(book => <li key={book.id}>
                    <span>{book.volumeInfo.title}</span>
                    <span onClick={() => onAddBook(book)}>+</span>
                </li>)}
            </ul>
        </section>
        
    )
}