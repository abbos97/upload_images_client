import { NavLink } from "react-router-dom"


function HomePage() {
    return (
        <div className="container">
            <div className="col-2">
                <div className="child-1">
                    <div className="title">This website for upload images</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, voluptate. Minima iure nostrum repellendus quo tenetur debitis corrupti, temporibus pariatur, deserunt repellat illum aspernatur. Maiores maxime ut ea sed veritatis?</p>
                    
                </div>
                <div className="child-2">
                    <img src="/images/1.jpg" width={"100%"} height={"100%"} alt="image1" />
                    <NavLink to="/local" className="btn-local">Local Upload</NavLink>
                </div>
            </div>
        </div>
    )
}

export default HomePage