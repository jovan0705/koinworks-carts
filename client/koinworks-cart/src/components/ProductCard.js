import {Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchMyItems } from '../store/actionCreator';
import { addItem, removeItem } from '../store/actionCreator';
import Swal from 'sweetalert2'

function ProductCard (props) {
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
    const [exist, setExist] = useState(false)
    const {items} = useSelector(store => store.cartReducer)
    function isExist () {
        items.forEach(el => {
            if (el.productId === props.id) {
                setExist(true)
            }
        })
    }
    useEffect(() => {
        dispatch(fetchMyItems())
    }, [])

    useEffect(() => {
        isExist()
    }, [items])

    const onAdd = () => {
        dispatch(addItem(props.id))
            .then((data) => {
                console.log(data)
                if (data.response) {
                    throw new Error (data.response.data.message)
                }
                dispatch(fetchMyItems())
                Toast.fire({
                    icon: 'success',
                    title: data.message
                  })
                  setExist(true)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry',
                    text: err.message,
                  })
            })
    }

    const onRemove = () => {
        dispatch(removeItem(props.id))
            .then((data) => {
                dispatch(fetchMyItems())
                if (data.response) {
                    throw new Error (data.response.data.message)
                }
                Toast.fire({
                    icon: 'success',
                    title: data.message
                  })
                  setExist(false)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry',
                    text: err.message,
                  })
            })
        
    }

    return  <Card style={{ width: '17.2rem' }} className='mx-3 mt-4'>
            <Card.Body>
            <Card.Img variant="top" src={props.imageUrl} style={{maxHeight: '30vh', height: '30vh', overflow: 'hidden'}}/>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                Stock: {props.stock}
                </Card.Text>
                {(!exist) ? <button className='btn btn-outline-primary' style={{marginRight: '5px'}} onClick={() => onAdd()}>Add Item</button> : <button className='btn btn-outline-danger' style={{marginLeft: '5px'}} onClick={() => onRemove()}>Remove Item</button>}
            </Card.Body>
            </Card>
}

export default ProductCard