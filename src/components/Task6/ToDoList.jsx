import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import Firestore instance from firebase.js
import './ToDoList.css';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"; 
import { getAuth, signOut } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';

const ToDoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openText, setOpenText] = useState("Add New Task");
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    due: "",
    prior:"Low"
  });
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const auth = getAuth(); 
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setOpenText(isOpen ? "Add New Task" : "Close");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser; 
      if (user) {
        const taskData = { ...formData, userId: user.uid }; 
        await addDoc(collection(db, "tasks"), taskData); 
        alert("Task added successfully");
        setFormData({ title: "", desc: "", due: "", prior:"Low" });
      } else {
        alert("Please log in to add a task.");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTasks(user.uid);
      } else {
        setTasks([]);
      }
    });
  
    return unsubscribe;
  }, [auth, tasks]); 

  const fetchTasks = async (userId) => {
    try {
      const q = query(collection(db, "tasks"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    console.log("Tasks:", tasks);
  }, [tasks]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // User signed out
        setCurrentUser(null);
        setTasks([]);
        alert("Logged out successfully")
        navigate('/')
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId)); 
      // Remove the deleted task from the local state
      setTasks(tasks.filter(task => task.id !== taskId));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "tasks", editFormData.id), editFormData);
      setTasks(tasks.map(task => task.id === editFormData.id ? { ...task, ...editFormData } : task));
      alert("Task updated successfully");
      setEditFormData({}); // Reset the edit form data
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  return (
    <div className='to-do-list'>
      <div className="to-do-list-container">
        <h2 className="title">To Do List</h2>
        <button className="add-task-container-btn" style={{ textAlign: "center", margin: "auto", display: "block" }} onClick={handleOpen} id='login-btn'>{openText}</button>
        <button onClick={handleLogout} style={{ textAlign: "center", margin: "auto", display: "block",marginTop:"14px" }}id="login-btn">Logout</button>
        {isOpen &&
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="input-field-task">
              <label htmlFor="task-title">Title:</label>
              <input type="text" name="title" onChange={handleChange}required/>
            </div>
            <div className="input-field-task">
              <label htmlFor="task-desc">Description:</label>
              <input type="text" name="desc" onChange={handleChange}required/>
            </div>
            <div className="input-field-task">
              <label htmlFor="task-desc">Due Date:</label>
              <input type="date" name="due" onChange={handleChange}required/>
            </div>
            <div className="input-field-task">
              <label htmlFor="task-desc">Priority:</label>
              <select name="prior" onChange={handleChange}required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <input type="submit" value="Add" id='login-btn'/>
          </form>
        }
      </div>
      <div className="task-list">
      {tasks.map(task => (
  <div key={task.id} className="task">
    {editFormData.id === task.id ? (
      <form onSubmit={handleUpdate}>
        {/* Edit form fields */}
        <input type="text" name="title" value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}required/>
        <input type="text" name="desc" value={editFormData.desc} onChange={(e) => setEditFormData({ ...editFormData, desc: e.target.value })}required/>
        <input type="date" name="due" value={editFormData.due} onChange={(e) => setEditFormData({ ...editFormData, due: e.target.value })}required/>
        <select name="prior" value={editFormData.prior} onChange={(e) => setEditFormData({ ...editFormData, prior: e.target.value })}required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" id='login-btn'style={{marginLeft:"12px"}}>Update</button>
      </form>
    ) : (
      <>
        <p>Title: {task.title}</p><br />
        <p>Description: {task.desc}</p><br />
        <p>Due Date: {task.due}</p><br />
        <p>Priority: {task.prior}</p><br />

        <div>
        <button onClick={() => setEditFormData(task)}id='login-btn'>Edit</button>
        <button onClick={() => handleDelete(task.id)}id='login-btn'style={{marginLeft:"12px"}}>Delete</button>
        </div>
      </>
    )}
  </div>
))}

      </div>
    </div>
  );
};

export default ToDoList;
