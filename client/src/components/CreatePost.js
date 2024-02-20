import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  function handleName(e) {
    setName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleAge(e) {
    setAge(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const addUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/api/createUser`, {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      console.log(response.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      setName("");
      setAge(0);
      setEmail("");
      navigate("/all");
    }
  }
  return (
    <div classNameName="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 classNameName="text-center">Enter the Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={handleAge}
          />
        </div>
        <div className="mb-3 form-check"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
