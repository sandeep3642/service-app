// src/pages/RedirectToExternal.jsx
import { useEffect } from "react";

const RedirectToExternal = () => {
  useEffect(() => {
    window.location.href = "https://sol-dice.vercel.app/";
  }, []);

  return <p>Redirecting...</p>;
};

export default RedirectToExternal;
