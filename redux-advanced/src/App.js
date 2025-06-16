import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import StatusBarMessage from './components/UI/StatusBarMessage';
import { sendCartData, getCartData } from './store/cart-slice';

let isInitialRunning = true;

const App = () => {
  const isCartVisible = useSelector(state => state.main.isCartVisibility);
  const cart = useSelector(state => state.cart);
  const statusMessage = useSelector(state => state.main.statusMessage);

  const dispatchAction = useDispatch();

  useEffect(() => {
    dispatchAction(getCartData());
  }, []);

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }
    if (cart.isCartContentChanged) {
      dispatchAction(sendCartData(cart));
    }
  }, [cart]);

  return (
    <>
      {statusMessage &&
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      }
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
};

export default App;
