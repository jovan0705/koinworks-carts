import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MyItemCard from '../components/MyItemCard'
import {fetchMyItems} from '../store/actionCreator'

function MyCart () {
    const dispatch = useDispatch()
    const {products} = useSelector(store => store.productReducer)
    const {items} = useSelector(store => store.cartReducer)
    useEffect(() => {
        dispatch(fetchMyItems())
    }, [products])
    return <div className='d-flex flex-row flex-wrap'>
        {items.map(item => {
            return <MyItemCard key={item.id} id={item.Product.id} name={item.Product.name} count={item.count} imageUrl={item.Product.imageUrl}></MyItemCard>
        })}
    </div>
}

export default MyCart