import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SuperAdmin from "./SuperAdminSlice";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const reducers = combineReducers({
  SuperAdmin,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
