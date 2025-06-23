
export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function debounce(func, time = 500){
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(()=>{
            func(...args)
        }, time)
    }
}

export function asyncDebounce(func, time = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        Promise.resolve(func(...args))
          .then(resolve)
          .catch(reject);
      }, time);
    });
  };
}

export function animateCSS(el, animation = 'bounce') {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }


        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

export function getTruthyValues(obj) {
    const newObj = {}
    for (const key in obj) {
        const value = obj[key]
        if (value || typeof value === 'boolean') {
            newObj[key] = value
        }
    }
    return newObj
}
  // NOTICE_CR this is dependent on the books array, but the filter refetches 
  // the books, so if i push the price to the max it re-fetches the books and need to reload the page to change agine

 export function getMinMaxPrice(books){
        if (!books || !books.length) return {min: 0, max: 600}
        let min = books[0].listPrice.amount
        let max = books[0].listPrice.amount
        for (let i=1; i<books.length; i++){
            min = Math.min(min, books[i].listPrice.amount)
            max = Math.max(max, books[i].listPrice.amount)
        }
        return {min, max}
    }      