import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SuperAdmin from "./SuperAdminSlice";
import DepRole from "./DepRoleSlice";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
 
const reducers = combineReducers({
  SuperAdmin,
  DepRole,
});
const expireTransform = expireReducer(reducers, {
  expireSeconds: 9000,
  
});
const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [expireTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});


 
const persistor = persistStore(store);
export { store, persistor };
