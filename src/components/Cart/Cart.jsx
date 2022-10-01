// import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import Button from "react-bootstrap/Button";
import { serverTimestamp, doc, setDoc, collection, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/FirebaseConfig'
import "./Cart.css";

const Cart = () => {
  const ctx = useContext(CartContext);

  // Generar orden de compra:
  const createOrder = async () => {
    const itemsForDB = ctx.cartList.map(item => ({
      id: item.id,
      title: item.titulo,
      price: item.precio,
      quantity: item.qty
    }))
    let order = {
      buyer: {
        name: prompt('Enter your name'),
        email: prompt('Enter your email'),
        phone: prompt('Enter your cell phone number')
      },
      items: itemsForDB,
      date: serverTimestamp(),
      total: ctx.calcTotal()
    }
    const newOrderRef = doc(collection(db, "orders"))
    await setDoc(newOrderRef, order);

    ctx.cartList.forEach(async (item) => {
      const itemRef = doc(db, "products", item.id);
      await updateDoc(itemRef, {
        stock: increment(-item.qty)
      });
    });
    ctx.clear();
    // Swal.fire({
    //   icon: 'success',
    //   title: `SUCCESSFUL PURCHASE`,
    //   text: `Your order has been created! This is your ID order: ${newOrderRef.id}`,
    //   button: 'Okay'
    // });
    alert(`Your order has been created! This is your ID order: ${newOrderRef.id}`)
  }

  return (
    <>
      <div>
        <h1 className="titulo-cart">YOUR CART</h1>

        <Button className="btn-delete-all" onClick={ctx.clear} disabled={ctx.cartList.length === 0 }>
          DELETE ALL
        </Button>
        <Button disabled={ctx.cartList.length === 0 } onClick={createOrder}>BUY NOW</Button>

        {ctx.cartList.map((item) => (
          <ol key={item.id}>
            <h1>{item.titulo}</h1>
            <h3>Price: {item.precio}</h3>
            <h3>Quantity:{item.qty}</h3>
            <p>precio total por item: $ {ctx.calcTotalPerItem(item.id)}</p>
            <img className="img-cart" src={`${item.imagen}`} alt="" />
            <Button className="btn-delete-item" onClick={() => ctx.removeItem(item.id)}>
              Delete this product
            </Button>
          </ol>
        ))}
        <p>precio total por item: $ {ctx.calcTotal()}</p>
      </div>
    </>
  );
};

export default Cart;
