import React, { useState } from 'react';
import './App.css';

function App() {
  const [unplannedTasks, setUnplannedTasks] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' },
    { id: 4, text: 'Task 4' },
    { id: 5, text: 'Task 5' },
    { id: 6, text: 'Task 6' },
    { id: 7, text: 'Task 7' },
    { id: 8, text: 'Task 8' },
    { id: 9, text: 'Task 9' },
    { id: 10, text: 'Task 10' },
  ]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [thisWeekTasks, setThisWeekTasks] = useState([]);
  const [thisMonthTasks, setThisMonthTasks] = useState([]);

  const onDragStart = (ev, taskId, source) => {
    ev.dataTransfer.setData('taskId', taskId);
    ev.dataTransfer.setData('source', source);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, targetSection) => {
    const taskId = ev.dataTransfer.getData('taskId');
    const source = ev.dataTransfer.getData('source');
    const draggedTask = source === 'unplanned' ? 
      unplannedTasks.find(task => task.id === parseInt(taskId)) :
      source === 'today' ? 
        todayTasks.find(task => task.id === parseInt(taskId)) :
        source === 'tomorrow' ?
          tomorrowTasks.find(task => task.id === parseInt(taskId)) :
          source === 'thisWeek' ?
            thisWeekTasks.find(task => task.id === parseInt(taskId)) :
            thisMonthTasks.find(task => task.id === parseInt(taskId));

    if (source === targetSection) {
      return;
    }

    if (source === 'unplanned') {
      setUnplannedTasks(unplannedTasks.filter(task => task.id !== draggedTask.id));
    } else if (source === 'today') {
      setTodayTasks(todayTasks.filter(task => task.id !== draggedTask.id));
    } else if (source === 'tomorrow') {
      setTomorrowTasks(tomorrowTasks.filter(task => task.id !== draggedTask.id));
    } else if (source === 'thisWeek') {
      setThisWeekTasks(thisWeekTasks.filter(task => task.id !== draggedTask.id));
    } else if (source === 'thisMonth') {
      setThisMonthTasks(thisMonthTasks.filter(task => task.id !== draggedTask.id));
    }

    switch (targetSection) {
      case 'unplanned':
        setUnplannedTasks([...unplannedTasks, draggedTask]);
        break;
      case 'today':
        setTodayTasks([...todayTasks, draggedTask]);
        break;
      case 'tomorrow':
        setTomorrowTasks([...tomorrowTasks, draggedTask]);
        break;
      case 'thisWeek':
        setThisWeekTasks([...thisWeekTasks, draggedTask]);
        break;
      case 'thisMonth':
        setThisMonthTasks([...thisMonthTasks, draggedTask]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="section" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, 'unplanned')}>
          <h2>Unplanned</h2>
          {unplannedTasks.map(task => (
            <div key={task.id} className="task" draggable onDragStart={(e) => onDragStart(e, task.id, 'unplanned')}>
              {task.text}
            </div>
          ))}
        </div>
        <div className="section" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, 'today')}>
          <h2>Today</h2>
          {todayTasks.map(task => (
            <div key={task.id} className="task" draggable onDragStart={(e) => onDragStart(e, task.id, 'today')}>
              {task.text}
            </div>
          ))}
        </div>
        <div className="section" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, 'tomorrow')}>
          <h2>Tomorrow</h2>
          {tomorrowTasks.map(task => (
            <div key={task.id} className="task" draggable onDragStart={(e) => onDragStart(e, task.id, 'tomorrow')}>
              {task.text}
            </div>
          ))}
        </div>
        <div className="section" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, 'thisWeek')}>
          <h2>This Week</h2>
          {thisWeekTasks.map(task => (
            <div key={task.id} className="task" draggable onDragStart={(e) => onDragStart(e, task.id, 'thisWeek')}>
              {task.text}
            </div>
          ))}
        </div>
        <div className="section" onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, 'thisMonth')}>
          <h2>This Month</h2>
          {thisMonthTasks.map(task => (
            <div key={task.id} className="task" draggable onDragStart={(e) => onDragStart(e, task.id, 'thisMonth')}>
              {task.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
