/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';

import { getUserData } from 'src/services/auth';
import { useQuery } from '@tanstack/react-query';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setCurrentToken(storedToken);
    }
  }, []);

  const {
    data: token,
    isLoading,
    isFetched: tokenIsFetched,
  } = useQuery({
    queryKey: ["user-me", "token"],
    queryFn: () => currentToken,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        const result = await getUserData(currentToken);
        if (result?.message === 'Unauthenticated.') {
          throw new Error('Unauthorized');
        }

        if (result) {
          setCurrentUser(result);
        } else {
          setCurrentUser(null);
          localStorage.removeItem('token');
        }
      } catch (error) {
        setCurrentUser(null);
        localStorage.removeItem('token');
      } finally {
        setIsLoaded(true);
      }
    };

    if (currentToken && tokenIsFetched) {
      fetchData();
    } else {
      setIsLoaded(true);
    }
  }, [currentToken, tokenIsFetched, token]);

  const changeCurrentUser = useCallback(async (userToken) => {
    setIsLoaded(false);
    try {
      const result = await getUserData(userToken);
      setCurrentUser(result);
      setCurrentToken(userToken);
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setCurrentToken('');
  }, []);

  const value = useMemo(
    () => ({
      isLoaded,
      setIsLoaded,
      currentUser,
      setCurrentUser,
      currentToken,
      setCurrentToken,
      errorMessage,
      setErrorMessage,
      successMessage,
      setSuccessMessage,
      changeCurrentUser,
      logoutHandler,
      tokenIsFetched,
    }),
    [
      isLoaded,
      currentUser,
      currentToken,
      errorMessage,
      successMessage,
      tokenIsFetched,
      changeCurrentUser,
      logoutHandler,
    ]
  );

  if (isLoading && !tokenIsFetched) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && tokenIsFetched && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};