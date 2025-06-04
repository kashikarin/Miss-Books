import { bookService } from "../services/book.service.js";
const {useState, useEffect} = React
 
export function BooksFilter({priceRange, filterBy, onSetFilter}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(()=>{
        console.log(filterByToEdit);
        
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    
    function handleChange(ev){
        ev.preventDefault();
        let {name, value} = ev.target
        switch (ev.target.type) {
            case 'range':
            case 'number':
                value = +value
                break
            case 'checkbox':
                value = ev.target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({...prevFilter, [name]: value}))
    }

    return(
        <section className="books-filter-container">
            <h1>Find a book:</h1>
            <article className="title-filter">
                <label htmlFor="titleFilter">Title: </label>
                <input type="text" 
                    id='titleFilter' 
                    name='title' 
                    value={filterByToEdit.title}
                    onChange={handleChange}

                />
            </article>
            <article className="price-filter">
                <label htmlFor="priceFilter">Price(EUR): </label>
                <input type="range" 
                    id='priceFilter' 
                    name='price' 
                    value={filterByToEdit.price}
                    title={filterByToEdit.price} 
                    onChange={handleChange}
                    min={priceRange.min}
                    max={priceRange.max}
                    
            />  <span>{filterByToEdit.price}</span>
            </article>
            <button onClick={()=>setFilterByToEdit(bookService.getDefaultFilter())} className="books-filter-clear-btn">Clear Filter</button>
        </section>
    )    
}