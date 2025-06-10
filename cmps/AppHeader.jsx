const {NavLink} = ReactRouterDOM
export function AppHeader(){
    
    return(
        <section className="app-header-container">
            <h1 className='logo'>Miss Books</h1>
            <nav className='app-nav'>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/book'>Books</NavLink>
            </nav>
        </section>
        
    )
}