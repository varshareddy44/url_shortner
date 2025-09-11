import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        window.location.href = "/"; // redirect to login/home
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    document.cookie = "session=; Max-Age=0"; // clear cookie
    window.location.href = "/";
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <div className="profile-container">
      <img
        src={user.picture}
        alt="Profile"
        className="profile-pic"
      />
      <h2 className="name-chip">{user.name}</h2>
      <p>{user.email}</p>
      <p>
        <strong>User ID:</strong> {user.userId}
      </p>
      <p>
        <strong>Account Created:</strong>{" "}
        {new Date(user.accountCreated).toLocaleString()}
      </p>
      <button className="btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}
