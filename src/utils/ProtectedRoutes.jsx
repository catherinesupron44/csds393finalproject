import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser} from "aws-amplify/auth";
import { useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation()
  useEffect(() => {
    const checkAuth = async () => {
      setLoaded(false)
      try {
        const user = await getCurrentUser()
        setIsAuth(user)
        return user ? <Outlet/> : <Navigate to="/"/>
      } catch (err) {
        setIsAuth(false)
        console.log(err);
      } finally {
        setLoaded(true)
      }
      
    };
    checkAuth();
  }, [location.pathname]);
 
  if (!loaded) {
    return null;
  }
  
  if (!isAuth) {
  
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
};


export default ProtectedRoutes