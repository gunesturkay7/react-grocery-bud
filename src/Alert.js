import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert, setAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
      return () => clearTimeout(timeOut);
    }, 2000);
  }, []);
  return <p className={`alert alert-${alert.type}`}>{alert.msg}</p>;
};

export default Alert;
