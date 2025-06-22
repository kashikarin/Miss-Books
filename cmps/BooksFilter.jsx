import { bookService } from "../services/book.service.js";
const {useState, useEffect, useRef} = React
import { debounce } from "../services/util.service.js";
 
export function BooksFilter({categories, priceRange, filterBy, onSetFilter}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterDebounceRef = useRef(debounce(onSetFilter, 400)).current
    
    useEffect(()=>{
           onSetFilterDebounceRef(filterByToEdit)

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

    function onClearFilter(){  
        setFilterByToEdit({...bookService.getDefaultFilter()})
        onSetFilter(bookService.getDefaultFilter())
    }

    function getCategoryOptions(){
        return categories.map(category => <option 
                        key={category} value={category}>{category}
                        </option>)
    }
    
    return(
        <section className="books-filter-container">
            <h1>Find a book:</h1>
            <article className="title-filter">
                <label htmlFor="titleFilter">Title: </label>
                <input type="text" 
                    id='titleFilter' 
                    name='title' 
                    value={filterByToEdit.title || ""}
                    onChange={handleChange}
                />
            </article>
            <article className="price-filter">
                <label htmlFor="priceFilter">Price(EUR): </label>
                <input type="range" 
                    id='priceFilter' 
                    name='price' 
                    value={filterByToEdit.price || ""}
                    title={filterByToEdit.price} 
                    onChange={handleChange}
                    min={priceRange.min}
                    max={priceRange.max}
            />  <span>{filterByToEdit.price}</span>
            </article>
            <article className="author-filter">
                <label htmlFor="authorFilter">Author: </label>
                <input type="text" 
                    id='authorFilter' 
                    name='author' 
                    value={filterByToEdit.author || ""}
                    onChange={handleChange}
                />
            </article>
            <article className="categories-filter">
                <label htmlFor="categoriesFilter">Category: </label>
                <select value={filterByToEdit.category} name="category" id="categoriesFilter" onChange={handleChange}>
                    <option value="">All categories</option>
                    {getCategoryOptions()}
                </select>
            </article>
            <button onClick={onClearFilter} className="books-filter-clear-btn">Clear Filter</button>
        </section>
    )    
}