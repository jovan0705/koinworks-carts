import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ProductCard from '../components/ProductCard'
import {fetchAllProduct} from '../store/actionCreator'

function ProductPage () {
    const dispatch = useDispatch()
    const {products} = useSelector(store => store.productReducer)
    const {items} = useSelector(store => store.cartReducer)
    useEffect(() => {
        dispatch(fetchAllProduct())
    }, [items])
    return <div className='d-flex flex-row flex-wrap'>
        {products.map((product) => {
            return <ProductCard key={product.id} name={product.name} id={product.id} stock={product.stock} imageUrl={product.imageUrl}></ProductCard>
        })}
    </div>
}

export default ProductPage