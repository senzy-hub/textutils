import React, { useEffect, useState } from 'react';

function Alert(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props.alert) {
      setVisible(true);
      // After 1.5s (your alert timeout), fade out
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [props.alert]);

  if (!props.alert) return null;

  return (
    <div
      className={`alert alert-${props.alert.type} alert-dismissible`}
      role="alert"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <strong>{props.alert.type.toUpperCase()}:</strong> {props.alert.msg}
    </div>
  );
}

export default Alert;
