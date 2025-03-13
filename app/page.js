"use client"
import React, { useEffect, useState } from 'react';
 
const page = () => {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [mainTask, setmainTask] = useState([]);

  useEffect(() => {
    setmainTask(loadTasksFromLocalStorage());
  }, []);

  const handleChangeTitle = (e) => {
    settitle(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setdesc(e.target.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    let updatedTasks = [...mainTask, { title, desc }];
    settitle('');
    setdesc('');
    setmainTask(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const saveTasksToLocalStorage = (updatedTasks) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const loadTasksFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      let savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  };

  const handleDelete = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setmainTask(copyTask);
    saveTasksToLocalStorage(copyTask);
  };

  let renderTask;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i}>
        <div className="info">
          <h5>Title: {t.title}</h5>
          <h6>{t.desc}</h6>
          <button onClick={() => handleDelete(i)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    ));
  }
  const PAGE_TITLE = 'Todo List BY GARV'
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <title>{PAGE_TITLE}</title>
      <h1>TODO LIST</h1>
      <form onSubmit={handleSumbit}>
        <div className="inputs">
          <input
            maxLength={200}
            required
            type="text"
            className="inp1"
            placeholder="Write Title Here..."
            value={title}
            onChange={handleChangeTitle}
          />
          <input
            maxLength={1000}
            required
            type="text"
            className="inp2"
            placeholder="Write Description Here..."
            value={desc}
            onChange={handleChangeDesc}
          />
          <button>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <ul>{renderTask}</ul>
      </form>
    </>
  );
};

export default page;