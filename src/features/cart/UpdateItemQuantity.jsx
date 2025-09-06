import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentQuantityById,
  increaseItemQuantity,
  decreaseItemQuantity,
} from '../cart/cartSlice';

import Button from '../../ui/Button';
function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type={'round'}
      >
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type={'round'}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
