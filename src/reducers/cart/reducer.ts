import { produce } from 'immer'
import { SelectedProduct } from '../../contexts/ProductsContext'
import { ActionTypes } from './actions'

interface Payload {
  product?: SelectedProduct
  amount?: number
  productId?: string
}

interface Action {
  type: string
  payload: Payload
}

interface CartState {
  cart: SelectedProduct[]
  amount: number
}
export function cartReducer(state: CartState, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return produce(state, (draft) => {
        draft.cart.push(action.payload.product!)
      })

    case ActionTypes.SET_PRODUCT_AMOUNT:
      return produce(state, (draft) => {
        draft.amount = action.payload.amount!
      })

    case ActionTypes.REMOVE_PRODUCT: {
      const index = state.cart.findIndex(
        (product) => product.id === action.payload.productId,
      )

      if (!index) return state

      return produce(state, (draft) => {
        draft.cart.slice(index, 1)
      })
    }

    default:
      return state
  }
}
