import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions/userActions";

const UserPage = () => {
  const state = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  });
};