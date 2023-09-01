import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

function CreateUser() {
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      age: "",
    },
    onSubmit: (values) => {
      fetch("/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error("Failed to create user.");
          }
        })
        .then((user) => {
          setUsers([...users, user]);
          formik.resetForm();
          setFormErrors([]);
        })
        .catch((error) => {
          setFormErrors([error.message]);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <label htmlFor="age">Age: </label>
      <input
        id="age"
        name="age"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.age}
      />
      {formik.errors.username && formik.touched.username && (
        <p style={{ color: "red" }}>{formik.errors.username}</p>
      )}
      {formik.errors.password && formik.touched.password && (
        <p style={{ color: "red" }}>{formik.errors.password}</p>
      )}
      {formik.errors.age && formik.touched.age && (
        <p style={{ color: "red" }}>{formik.errors.age}</p>
      )}
      {formErrors.length > 0 && (
        <p style={{ color: "red" }}>{formErrors.join(", ")}</p>
      )}
      <button type="submit">Add User</button>
    </form>
  );
}

export default CreateUser;