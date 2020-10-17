import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface InputProps {
  name: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ name, type, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return <input type={type} ref={inputRef} defaultValue={defaultValue} {...rest} />;
}

export default Input;