import { createSlice } from "@reduxjs/toolkit"

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    }
    ,
    reducers: {
        add_to_cart: (state, action) => {
            const is_item_present = state.cart.find(item => item.id == action.payload.id);
            if (is_item_present) state.cart[is_item_present].quantity = state.cart[is_item_present].quantity + 1;
            else state.cart.push({ ...action.payload, quantity: 1 })

        },
        // clear the cart
        clear_cart: (state) => {
            state.cart = []
        },
        // remove item from cart

        remove_from_cart: (state, action) => {
            const cart_without_removable_item = state.cart.filter(item => item.id != action.payload.id)
            state.cart = cart_without_removable_item;

        },
        //

        increase_quantity_of_item_cart: (state, action) => {
            const is_item_present = state.cart.find(item => item.id == action.payload.id);
            is_item_present.quantity++;
        },
        //
        decrease_quantity_of_item_cart: (state, action) => {
            const is_item_present = state.cart.find(item => item.id == action.payload.id);
            if (is_item_present.quantity == 1) {
                is_item_present.quantity = 0;
                const cart_without_removable_item = state.cart.filter(item => item.id != action.payload.id)
                state.cart = cart_without_removable_item;
            }
            else {
                is_item_present.quantity--;
            }
        },
    }
})

// 
export const { add_to_cart, remove_from_cart, increase_quantity_of_item_cart, decrease_quantity_of_item_cart, clear_cart } = CartSlice.actions

export default CartSlice.reducer;   