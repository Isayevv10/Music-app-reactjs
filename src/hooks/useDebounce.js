import React, { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debounceInput, setDebounceInput] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceInput(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceInput;
};

export default useDebounce;
