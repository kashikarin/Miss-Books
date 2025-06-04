import { AppHeader } from "./cmps/AppHeader.jsx"
import {HomePage} from './pages/HomePage.jsx'
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"


const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function App() {
    return(
        <Router>
            <section className="app">
                 <AppHeader /> 
                 <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path='/about' element={<AboutUs />} />
                        <Route path='/book' element={<BookIndex />}/>
                        <Route path='/book/:bookId' element={<BookDetails />}/>
                    </Routes>
                </main> 
            </section>
        </Router>
    )
}