import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

// export const getDataFromAPI = createAsyncThunk('cartItems/data', () => {
//     return fetch(url)
//         .then((res) => res.json())
//         .catch((err) => console.log(err));
// }); FETCH APPROACH

export const getDataFromAPI = createAsyncThunk(
    'cartItems/data',
    async (name, thunkAPI) => {
        try {
            const resp = await axios(url);
            return resp.data; //in axios the response is at: resp.data object
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
); //async function approach

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },

        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(
                (curr) => curr.id !== itemId
            );
        },

        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id
            );
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id
            );
            cartItem.amount = cartItem.amount - 1;
        },

        calculateTotals: (state) => {
            let amount = 0;
            let totals = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                totals += item.amount * item.price;
            });

            state.amount = amount;
            state.total = totals;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getDataFromAPI.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDataFromAPI.fulfilled, (state, action) => {
                console.log({ action });
                state.isLoading = false;
                state.cartItems = action.payload;
            })
            .addCase(getDataFromAPI.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export default cartSlice.reducer;
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
    cartSlice.actions;
