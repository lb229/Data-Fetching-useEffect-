
export function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
           <hr />
          <h3>{user.login}</h3>
          <img style={{borderRadius: '50%', width: '100px', height: '100px'}} src={user.avatar_url} alt={`Avatar for ${user.login}`} />
          <hr />
          <a href={user.html_url}>@{user.login}</a>
          
        </div>
      ))}
    </div>
  );
}