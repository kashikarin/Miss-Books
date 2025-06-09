const {NavLink, Outlet} = ReactRouterDOM

export function AboutUs(){
    return(
        <section className="about">
            <h1>About Miss Books...</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, illum. Cumque, alias eum dolores molestias corporis vitae iste? Tempora ut corporis deleniti aut. Sequi error sint repellat perspiciatis totam. Dolore?</p>
            <section className="further-details-container">
                <NavLink to='/about/team'>Team</NavLink>
                <NavLink to='/about/vision'>Vision</NavLink>
            </section>
            <Outlet />
        </section>    
    )
}