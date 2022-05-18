import { configureStore } from '@reduxjs/toolkit';

import postReducer from './posts.js';

const store = configureStore({
    reducer: {
        posts: postReducer,
    },
})

export default store;