import { ReactElement, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../store/authSlice";

interface Props {
  children: ReactNode
}

export function PrivateRoute({ children }: Props): ReactElement {
  const user = useSelector(authSelector);
  const naviagate = useNavigate();
  useEffect(() => {
    if(! user) {
      naviagate('/auth/login');
    }
  }, [user]);
  
  return (
    <>
      { children }
    </>
  )
}