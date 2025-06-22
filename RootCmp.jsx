import { AppHeader } from "./cmps/AppHeader.jsx"
import {HomePage} from './pages/HomePage.jsx'
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { NotFound } from "./pages/NotFound.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { Team } from "./cmps/AboutCmps/Team.jsx"
import { Vision } from "./cmps/AboutCmps/Vision.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"
import { BooksDashboard } from "./cmps/BooksDashboard.jsx"


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
                        <Route path='/about' element={<AboutUs />}>
                            <Route path='/about/team' element={<Team />}/>   
                            <Route path='/about/vision' element={<Vision />}/>   
                        </Route>
                        <Route path='/bookAdd' element={<BookAdd />}/>
                        <Route path='/book' element={<BookIndex />}/>
                        <Route path='/book/:bookId' element={<BookDetails />}/>
                        <Route path='/book/edit' element={<BookEdit />}/>
                        <Route path='/book/edit/:bookId' element={<BookEdit />} />
                        <Route path='/book/googlebookssearch' element={<BookAdd />} />
                        <Route path='/*' element={<NotFound />} />
                    </Routes>
                </main>
            <UserMsg />
            </section>
        </Router>
    )
}