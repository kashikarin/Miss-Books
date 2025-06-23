import { getRandomIntInclusive, loadFromStorage, makeId, saveToStorage, makeLorem } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    saveReview,
    deleteReview,
    getDefaultFilter,
    getCategories,
    getMinMaxPrice,
    addGoogleBook,
    searchGoogleBooks,
    getFilterFromSearchParams,
    getBookCountByCategory
}

function query(filterBy = {}) {
    
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            if (filterBy.author) {
                const regExp = new RegExp(filterBy.author, 'i')
                books = books.filter(book => regExp.test(...book.authors))
            }
            if (filterBy.category) {
                const regExp = new RegExp(filterBy.category, 'i')
                books = books.filter(book => regExp.test(...book.categories))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        let newBook = book
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

        newBook.subtitle = makeLorem(4)
        newBook.authors = [makeLorem(1)],
        newBook.publishedDate = getRandomIntInclusive(1950, 2024),
        newBook.description = makeLorem(20),
        newBook.pageCount = getRandomIntInclusive(20, 600),
        newBook.categories = [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
        newBook.thumbnail = `http://coding-academy.org/books-photos/${getRandomIntInclusive(1,20)}.jpg`,
        newBook.language = "en",
        newBook.listPrice = {
            amount: book.listPrice.amount,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
        console.log(newBook)
        return storageService.post(BOOK_KEY, newBook)
    }
}

function getEmptyBook(title = '', price = '') {
    return { title, listPrice: {amount: price, currencyCode: 'EUR', isOnSale: false} }
}

function getDefaultFilter() {
    return { title: '', price: '', author: '', category: '' }
}

function saveReview(bookId, review){ 
    return get(bookId)
        .then(book => {
            if (book.reviews) {
                let length = book.reviews.length
                book.reviews.push(review)
                book.reviews[length - 1].id = length - 1
            } else {
                book.reviews = [review]
            }
            let length = book.reviews.length
            book.reviews[length - 1].id = length - 1
            return storageService.put(BOOK_KEY, book)
        })
}

function deleteReview(bookId, reviewId){
    return get(bookId)
        .then(book => {
            book.reviews = [...book.reviews.filter(review => review.id !== reviewId)]
            if (book.reviews.length === 0) delete book.reviews
            return storageService.put(BOOK_KEY, book)
        })
}

function _setNextPrevBookId(book, gFilterBy) {
    return query(gFilterBy).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: makeId(),
                title: makeLorem(2),
                subtitle: makeLorem(4),
                authors: [
                    makeLorem(1)
                ],
                publishedDate: getRandomIntInclusive(1950, 2024),
                description: makeLorem(20),
                pageCount: getRandomIntInclusive(20, 600),
                categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
                language: "en",
                listPrice: {
                    amount: getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        console.log('books', books)
    }

        saveToStorage(BOOK_KEY, books)
}

function getCategories(books){       
        let categoriesMap = {}
        for (let i=0; i<books.length; i++) {
            for (let j=0; j<books[i].categories.length; j++){
                categoriesMap[books[i].categories[j]] = i
            }
        }        
        return Object.keys(categoriesMap)
    }

      // NOTICE_CR move to util.service.js
  // NOTICE_CR this is dependent on the books array, but the filter refetches the books, so if i push the price to the max it re-fetches the books and need to reload the page to change agine
function getMinMaxPrice(filterBy) {
    return query(filterBy)
        .then(books => {
            if (!books || !books.length) return { min: 0, max: 600 };
            let min = books[0].listPrice.amount;
            let max = books[0].listPrice.amount;
            for (let i = 1; i < books.length; i++) {
            min = Math.min(min, books[i].listPrice.amount);
            max = Math.max(max, books[i].listPrice.amount);
            }
            return { min, max };
        })
  }

    
//add a simple new book object to our database and return it in a Promise
function addGoogleBook(book) {
    let newBook = book
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

        newBook.subtitle = makeLorem(4)
        newBook.listPrice.currencyCode = "EUR"
        newBook.listPrice.isOnSale = Math.random() > 0.7
        return storageService.post(BOOK_KEY, newBook)
        
}
let gCache = {}
function searchGoogleBooks(txt){
    if (!txt) return Promise.resolve([])
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
    return fetch(url)
        .then(res => res.json())
        .then(data => data.items)
        .then(items => {
            if (!gCache[txt]){
                gCache[txt] = items
                console.log('hi1')
                return items
            } else{
                                console.log('hi2')

                return Promise.resolve(gCache[txt])
            }
        })
        .catch(err => {
            console.error('search failed')
            throw err
        })
}

 function getFilterFromSearchParams(srcParams){
    const txt = srcParams.get('txt') || ""
    const minSpeed = srcParams.get('minSpeed') || ""
    return {txt, minSpeed}
}

function getBookCountByCategory(){
    return storageService.query(BOOK_KEY)
        .then(books => {
            let ctgs = getCategories(books)           
            let ctgsMap = {}
            for (let i=0; i<ctgs.length; i++) {
                ctgsMap[ctgs[i]] = 0
            }
            let booksMapByCategory = books.reduce((map, book) => {
                for (let i=0; i<book.categories.length; i++){
                    map[book.categories[i]]++
                }
                return map
            }, ctgsMap)
            booksMapByCategory.total = books.length
            return booksMapByCategory
        })
}