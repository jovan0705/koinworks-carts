import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchMyItems} from '../store/actionCreator'

function MyCart () {
    const dispatch = useDispatch()
    const {items} = useSelector(store => store.cartReducer)
    useEffect(() => {
        dispatch(fetchMyItems())
    }, [])
    return <div>
        {JSON.stringify(items)}
    </div>
}

export default MyCart