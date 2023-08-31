import React, { useEffect, useState } from "react";

function CreateUser() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  function addUser(newUser) {
    setUsers([...users, newUser]); // Update the users state with the new user
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      username: name,
      password: password,
      age: age,
    };

    fetch("/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => addUser(user));
        setFormErrors([]);
      } else {
        r.json().then((err) => setFormErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Username: </label>
      <input
        id="username"
        name="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="strength">Age: </label>
      <input
        type="number"
        id="age"
        name="age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      {formErrors.length > 0
        ? formErrors.map((err) => (
            <p key={err} style={{ color: "red" }}>
              {err}
            </p>
          ))
        : null}
      <button type="submit">Add User</button>
    </form>
  );
}

export default CreateUser;
