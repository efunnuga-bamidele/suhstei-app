import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// persistence init
const persistConfig = {
    key: 'root',
    storage: storage,
    // blacklist: ['user'], // navigation will not be persisted
    // whitelist: ['navigation'], // only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
    );

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);