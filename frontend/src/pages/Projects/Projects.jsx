import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeProjects } from "../../actions/projects";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../api/index";
import { showToastMessage } from "../../helpers/toaster";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { addProject, addTask } from "../../store/projectSlice";

const Projects = () => {
  const { username, isAdmin, status } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProject, setCurrentProject] = useState({});
  console.log(currentProject.projectName);
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeProjects(username));
  }, []);

  const projects = useSelector((state) => state.project.projects);
  console.log(projects);

  const handleNewTask = () => {
    setNewTask("");

    if (newTask.length >= 2 && newTask.length <= 150) {
      axios
        .patch(`${BASE_URL}/projects/${currentProject._id}`, { task: newTask })
        .then((response) => {
          console.log(response.data);
          dispatch(addTask(response.data));
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          showToastMessage("Task added successfullyfdfffffffffffff", "success");

          setTimeout(() => {
            //  setShowNewPaymentForm(false)
          }, 1000);

          console.log("PDF file uploaded successfully");
        })
        .catch((error) => {
          // setLoading(false)
          // toastWithMessage(error.message, "error");
          // showToastMessage(error.message , "error")
          //setShowNewPaymentForm(false)

          console.error(error);
        });
    } else {
      setNewTask("");

      showToastMessage("Task must be less than 150 characters and more than 10 ", "reject");
    }
    setNewTask("");
  };

  const handleNewProject = () => {
    if (newProject.length > 3) {
      axios
        .post(`${BASE_URL}/projects`, { projectName: newProject, employee: username })
        .then((response) => {
          console.log(response.data);
          const newProject = response.data;
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          dispatch(addProject(newProject));
          showToastMessage("Project added successfully", "success");
          setTimeout(() => {
            //  setShowNewPaymentForm(false)
          }, 1000);

          console.log("PDF file uploaded successfully");
        })
        .catch((error) => {
          // setLoading(false)
          // toastWithMessage(error.message, "error");
          // showToastMessage(error.message , "error")
          //setShowNewPaymentForm(false)

          console.error(error);
        });

      closeModal();
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="project_page_container">
        <div className="projects_list">
          <div className="add_project_button" onClick={openModal}>
            Add new Project
          </div>
          {projects?.map((project) => (
            <>
              <div className="project_item" onClick={() => setCurrentProject(project)}>
                <h5>{project.projectName}</h5>
              </div>
            </>
          ))}
        </div>

        <div className="project_tasks">
          {currentProject?.tasks?.map((task, index) => (
            <div
              className={index % 2 === 0 ? `task` : `task dark_row`}
              style={task?.adminTask ? { backgroundColor: "#ff9595" } : null}
              key={index}
            >
              {" "}
              {console.log(task)}
              <div className="task_date">{new Date(task.date).toLocaleString()}</div>
              <div className="task_text">
                {task?.adminTask && <h6>From Admin : {task.adminName}</h6>}
                {task.task}
              </div>
            </div>
          ))}

          {currentProject.projectName && (
            <div style={{ position: "inherit" }} className="add_task">
              <input
                type="text"
                className="new_task_text"
                placeholder="update task here"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ width: "85%", borderRadius: "0px", margin: "0px", height: "55px" }}
                autocomplete="on" ></input>
              <div className="new_task" onClick={handleNewTask}>
                Add
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="new_Modal"
        overlayClassName="new_Overlay"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {" "}
        <button class="btn-close close__button" onClick={closeModal}></button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add New Project</h2>
        <input
          type="text"
          className="new_task_text"
          placeholder="add new Project here"
          onChange={(e) => setNewProject(e.target.value)}
          autocomplete="on"></input>
        <div className="add_proj" onClick={handleNewProject}>
          Add Project
        </div>
      </Modal>
    </>
  );
};

export default Projects;
