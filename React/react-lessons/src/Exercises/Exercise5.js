"use client";

import { useState } from "react";
import styles from "./Exercise5.module.css";

export default function UserTableApp() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    const newUser = { name, phone, email };

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = newUser;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, newUser]);
    }

    setName("");
    setPhone("");
    setEmail("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setName(users[index].name);
    setPhone(users[index].phone);
    setEmail(users[index].email);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    if (editIndex === index) {
      setEditIndex(null);
      setName("");
      setPhone("");
      setEmail("");
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <div className={styles.container}>
      <h2>Registration List</h2>

      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles.button} onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
        {editIndex !== null && (
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users available
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}