import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
// import './styles';

interface IInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<IInputProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, rest]);

  return <select ref={inputRef} {...rest} />;
};

export default Select;