import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import {
    calculateTotals,
    getDataFromAPI,
} from './redux/features/cart/cartSlice';

function App() {
    const { cartItems, isLoading } = useSelector((store) => store.cart);
    const { isOpen } = useSelector((store) => store.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems]);

    useEffect(() => {
        dispatch(getDataFromAPI());
    }, []);

    if (isLoading) {
        return (
            <div className='loading'>
                <h1>loading...</h1>
            </div>
        );
    }
    return (
        <main>
            {isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    );
}
export default App;
