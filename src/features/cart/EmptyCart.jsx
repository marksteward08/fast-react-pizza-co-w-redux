import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div>
      <Link className="text-blue-800" to="/menu">
        &larr; Back to menu
      </Link>

      <p className="font-bold text-gray-800">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
