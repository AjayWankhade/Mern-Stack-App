import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdatePost() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  function handleName(e) {
    setName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleAge(e) {
    setAge(e.target.value);
  }
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/api/getUser/${id}`);

    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("updated user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/api/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
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
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);
  return (
    <div>
      <div classNameName="container my-2">
        {error && <div class="alert alert-danger">{error}</div>}
        <h2 classNameName="text-center">Edit the Data</h2>
        <form onSubmit={handleUpdate}>
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
    </div>
  );
}

export default UpdatePost;
