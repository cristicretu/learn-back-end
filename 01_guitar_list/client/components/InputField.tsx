import React, { InputHTMLAttributes } from "react";

import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  // size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <h2>{label}</h2>
      <input className="px-4 py-2 rounded-md outline-none bg-gray-200 dark:bg-gray-800" {...props}>
      </input>
      {error ? <div>error</div> : null}
    </div>
  )
}