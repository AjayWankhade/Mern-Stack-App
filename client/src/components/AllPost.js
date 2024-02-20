import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function AllPost() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch(`http://localhost:5000/api`);
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      }
      if (response.ok) {
        setUserData(result);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Error fetching data");
    }
  }

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteUser/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      }
      if (response.ok) {
        setError("Deleted Successfully");

        setTimeout(() => {
          setError("");
          getData();
        }, 2000);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      setError("Error deleting user");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h1 className="text-center">Show Data</h1>
      {userData.length === 0 && (
        <p className="text-center">No data available.</p>
      )}
      <div className="row">
        {userData?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h6 className="text-center">{ele.name}</h6>
                <h6 className="mb-2 text-muted text-center">{ele.email}</h6>
                <p className="text-muted text-center">{ele.age}</p>
                <a
                  href="#"
                  className="card-link text-center"
                  onClick={() => deleteHandler(ele._id)}
                >
                  Delete User
                </a>
                <Link to={`/${ele._id}`} className="card-link text-center">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPost;
