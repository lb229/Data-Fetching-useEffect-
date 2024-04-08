import React, { useState } from "react";
import { UserList } from "./UserList";

export function GitHubUser() {
  const [username, setUsername] = useState(""); 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleUsername(e) {
    setUsername(e.target.value); 
  }

  async function handleUserSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (username !== "") {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const userData = await response.json();
          setUsers((prev) => [...prev, userData]); 
          setError(null);
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message}`);
        }
      } else {
        setError("Please enter a username");
      }
    } catch (error) {
      console.error(error);
      setError("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form name="inputUserGit">
        <input
          type="text"
          placeholder="Search user"
          value={username}
          onChange={handleUsername}
        />
        <button onClick={handleUserSubmit}>Submit</button>
      </form>

      {loading && <div>Loading....</div>}
      {error && <div>{error}</div>}

      <h1>User List:</h1>
      <UserList users={users}/>
      <hr />
    </div>
  );
}
