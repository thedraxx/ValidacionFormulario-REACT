import React from "react";
import { useForm } from "./hooks/useForm";
import { Loader } from "./Loader";
import { Message } from "./Message";

let errorStyles = {
  fontWeight: "bold",
  color: "#dc3545",
  margin: "0.5rem",
};

const initialForm = {
  name: "",
  email: "",
  subject: "",
  comments: "",
};

const validationForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  if (!form.name.trim()) {
    errors.name = "Name is required";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "Name is invalid only accept letters and spaces";
  }

  if (!form.email.trim()) {
    errors.email = "email is required";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "Email is invalid";
  }

  if (!form.subject.trim()) {
    errors.subject = "subject is required";
  }

  if (!form.comments.trim()) {
    errors.comments = "comments is required";
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments = "max 255 characters";
  }

  return errors;
};

export const ContactForm = () => {
  const {
    form: form,
    errors: errors,
    loading: loading,
    response: response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationForm);

  return (
    <div>
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Escribe tu nombre"
          onChange={handleChange}
          value={form.name}
          onBlur={handleBlur}
          required
        />
        {errors.name && <p style={errorStyles}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Escribe tu email"
          onChange={handleChange}
          value={form.email}
          onBlur={handleBlur}
          required
        />
        {errors.email && <p style={errorStyles}>{errors.email}</p>}

        <input
          type="text"
          name="subject"
          placeholder="Asunto a tratar"
          onChange={handleChange}
          value={form.subject}
          onBlur={handleBlur}
          required
        />
        {errors.subjects && <p style={errorStyles}>{errors.subjects}</p>}
        <textarea
          name="comments"
          cols="50"
          rows="5"
          placeholder="Escribe tus comentarios"
          onChange={handleChange}
          value={form.comments}
          onBlur={handleBlur}
          required
        ></textarea>
        {errors.comments && <p style={errorStyles}>{errors.comments}</p>}
        <input type="submit" value="Enviar" />
      </form>
      {loading && <Loader />}
      {response && (
        <Message msg="Los datos han sido enviados" bgColor="#198754" />
      )}
    </div>
  );
};
