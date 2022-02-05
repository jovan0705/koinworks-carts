import {Card} from 'react-bootstrap';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { decreaseItem, increaseItem, fetchMyItems, fetchAllProduct } from '../store/actionCreator';
import Swal from 'sweetalert2'

function MyItemCard (props) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    const dispatch = useDispatch()
    const {items} = useSelector(store => store.cartReducer)
    const {products} = useSelector(store => store.productReducer)
    useEffect(() => {
        dispatch(fetchMyItems())
    }, [products])

    const onIncrease = () => {
        dispatch(increaseItem(props.id))
            .then((data) => {
                dispatch(fetchAllProduct())
                if (data.response) {
                    throw new Error (data.response.data.message)
                }
                Toast.fire({
                    icon: 'success',
                    title: data.message
                  })
            })
            .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: err.message,
                      })
            })

    }

    const onDecrease = () => {
        dispatch(decreaseItem(props.id))
            .then((data) => {
                dispatch(fetchAllProduct())
                if (data.response) {
                    throw new Error (data.response.data.message)
                }
                Toast.fire({
                    icon: 'success',
                    title: data.message
                  })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry',
                    text: err.message,
                  })
            })
    }

    return <Card style={{ width: '17.2rem' }} className='mx-3 mt-4'>
    <Card.Body>
        <Card.Img variant="top" src={props.imageUrl} style={{maxHeight: '30vh', height: '30vh', overflow: 'hidden'}}/>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className='mb-0'>
        Amount  
        </Card.Text>
        <div className='d-flex flex-row justify-content-center mt-2 align-items-center'>
            <button className='btn btn-outline-secondary' style={{marginRight: '10px'}} onClick={() => onDecrease()}>-</button>
            <Card.Text style={{marginTop: 'auto', marginBottom: 'auto', fontSize: '20px'}}>
            {props.count}
            </Card.Text>
            <button className='btn btn-outline-secondary' style={{marginLeft: '10px'}} onClick={() => onIncrease()}>+</button>
        </div>
    </Card.Body>
    </Card>
}

export default MyItemCard