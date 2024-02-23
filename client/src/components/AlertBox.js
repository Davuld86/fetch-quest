import React, { useEffect, useState } from 'react';
import './AlertBox.css';

const AlertBox = ({ message, color }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {visible && (
        <div className="alert-box" style={{backgroundColor:`${color}`}}>
          <span className="message">{message}</span>
        </div>
      )}
    </>
  );
};

export default AlertBox;
