import { useState } from "react";
import { helpHttp } from "../helpers/helphttp";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      alert("Enviado");
      setLoading(true);
      helpHttp()
        .post(`https://formsubmit.co/ajax/cerrano.francisco22@gmail.com`, {
          body: form,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        })
        .then((res) => {
          setLoading(false);
          setResponse(true);
          setForm(initialForm);
          setTimeout(() => {
            setResponse(false);
          }, 4000);
        });
    } else {
      return;
    }
  };

  return {
    form: form,
    errors: errors,
    loading: loading,
    response: response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
