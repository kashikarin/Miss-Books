import { bookService } from "../services/book.service.js"
import { animateCSS } from "../services/util.service.js"

const {useEffect, useState, useRef} = React

export function BooksDashboard({onCloseDashboard}){
    const [booksMapByCtg, setBooksMapByCtg] = useState({})
    const elDashboardModal = useRef()
    
    useEffect(()=>{
        bookService.getBookCountByCategory()
            .then(setBooksMapByCtg)
    }, [])
    
    useEffect(()=>{
        if (elDashboardModal.current) animateCSS(elDashboardModal.current, 'fadeInDown')
    }, [])
    
    function getCategories(){
        let categories = Object.keys(booksMapByCtg)
        return categories.filter(category => category !== 'total')
    }

    function getRate(category){
        return Math.round((booksMapByCtg[category] / booksMapByCtg.total)*100)
    }

    function handleClose(){
        if (elDashboardModal.current) animateCSS(elDashboardModal.current, 'fadeOutUp')
            .then(()=> onCloseDashboard())
    }
    
    const categories = getCategories()
    console.log(" categories:", categories)

    return(
        <section className="dashboard-backdrop">
            <div ref={elDashboardModal} className="dashboard-container">
                        <div className="dashboard-wrapper">
                            {categories.map(category => <div key={category} className='category-dashboard-item-container'>
                                                        <div className='category-dashboard-item' style={{height: `${getRate(category)}%`}}>
                                                            {`${getRate(category)}%`}
                                                        </div>
                                                        <div className='category-dashboard-label'>{category}</div>
                                            </div>)}                
                <span onClick={handleClose}>X</span>
                <div className="fifty-percent-line"></div>
            </div>
            </div>
        </section>
        
    )
}