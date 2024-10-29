import  { createContext, useState } from "react";

export const LoadingContext = createContext({});

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ({ children }) => {
  const [loading, setLoaading] = useState(false);

  const isLoading = (flag) => {
    setLoaading(flag);
  };

  return (
    <LoadingContext.Provider value={{ loading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
