import { Link } from "react-router-dom";
import ProductPage from "../pages/ProductPage";

function Navbar () {
    return <div className="m-0 d-flex" style={{backgroundColor: '#91C483', padding: '10px'}}>
        <div className="col-10" style={{textAlign: 'left', paddingLeft: '20px'}}>
            <h1>LOGO</h1>
        </div>
        <div className="col-2 d-flex" style={{marginTop: 'auto', marginBottom: 'auto'}}>
            <Link to='/' className="col-6" style={{textDecoration: 'none', color: '#EEEEEE', fontSize: '20px'}}>Products</Link>
            <Link to='/cart' className="col-6" style={{textDecoration: 'none', color: '#EEEEEE', fontSize: '20px'}} >My Cart</Link>
        </div>
    </div>
}

export default Navbar