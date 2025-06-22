import { bookService } from "../services/book.service.js"
import { animateCSS } from "../services/util.service.js"
const {useState, useEffect, useRef} = React
const {useNavigate, useParams} = ReactRouterDOM

export function BookEdit(){
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()
    const elModalRef = useRef()

    useEffect(()=>{
        if (params.bookId){
            loadBook()
        }
    }, [])
    
    useEffect(()=>{
        if (elModalRef.current) animateCSS(elModalRef.current, 'fadeInDown')
    }, [])

    function loadBook(){
        if (params.bookId) {
            bookService.get(params.bookId)
            .then(setBookToEdit)
        }
    }

    function handleChangeTitle({target}){
        let {value} = target
        setBookToEdit(prevBookToEdit => ({...prevBookToEdit, title: value}))
    }

    function handleChangePrice({target}){
        let {value} = target
        console.log(value);
        console.log(bookToEdit)
        setBookToEdit(prevBookToEdit => ({...prevBookToEdit, listPrice: {...prevBookToEdit.listPrice, amount: +value}}))
    }

    function saveBook(ev){
        ev.preventDefault()
        console.log(bookToEdit)
        bookService.save(bookToEdit)
            .then(()=> {
                showSuccessMsg(`${bookToEdit.title} was saved!`)
                return animateCSS(elModalRef.current, 'fadeOutUp')
            })
            .catch(err => showErrorMsg(`failed to save ${bookToEdit.title}`))
            .finally(() => navigate('/book'))
    }

    const {title, listPrice} = bookToEdit
    console.log(listPrice)

    return(
        <section className="book-edit-wrapper">
            <div className="book-edit-container" ref={elModalRef}>
                <h2>{params.bookId? "Update Book Details" : "Add a Book"}</h2>
                <form onSubmit={saveBook}>
                    <div className="edit-title-container">
                        <label htmlFor="editTitle">Title: </label><br />
                        <input type="text" 
                        id='editTitle' 
                        value={title} 
                        name='title'
                        onChange={handleChangeTitle} 
                        />
                    </div>
                    <div className="edit-price-container">
                        <label htmlFor="editPrice">Price: </label><br />
                        <input type="number" 
                        id='editPrice' 
                        value={listPrice.amount} 
                        name='price' 
                        onChange={handleChangePrice}
                        />
                    </div>
                    <button className="edit-book-submit-btn">Save</button>
                </form>    
            </div>
            
        </section>
    )
}