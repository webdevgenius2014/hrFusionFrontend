import { useAppSelector } from "../hooks";
export const getCurrentUser = (state) => state?.userReducer?.currentUser;
