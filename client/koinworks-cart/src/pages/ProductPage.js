import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAllProduct} from '../store/actionCreator'

function ProductPage () {
    const dispatch = useDispatch()
    const {products} = useSelector(store => store.productReducer)
    useEffect(() => {
        dispatch(fetchAllProduct())
    }, [])
    return <div>
        {JSON.stringify(products)}
    </div>
}

export default ProductPage