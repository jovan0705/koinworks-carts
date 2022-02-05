import { Link } from "react-router-dom";
import ProductPage from "../pages/ProductPage";

function Navbar () {
    return <div>
        <Link to='/'>Products</Link>
        <Link to='/cart'>My Cart</Link>
    </div>
}

export default Navbar