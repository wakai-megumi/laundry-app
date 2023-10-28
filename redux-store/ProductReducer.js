import { createSlice } from "@reduxjs/toolkit"

export const ProductSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
    }
    ,
    reducers: {
        get_products: (state, action) => {
            state.product.push({ ...action.payload })
        },
        increase_quantity_of_item: (state, action) => {
            const item_present = state.product.findIndex(item => item.id == action.payload.id)

            state.product[item_present].quantity++


        },
        decrease_quantity_of_item: (state, action) => {
            const is_item_present = state.product.find(item => item.id == action.payload.id);
            if (is_item_present.quantity == 1) {
                is_item_present.quantity = 0;
                const cart_without_removable_item = state.product.filter(item => item.id != action.payload.id)

                state.cart = cart_without_removable_item;
            }
            else {
                is_item_present.quantity--;
            }
        }
    }
})

// 
export const { get_products, increase_quantity_of_item, decrease_quantity_of_item } = ProductSlice.actions

export default ProductSlice.reducer;