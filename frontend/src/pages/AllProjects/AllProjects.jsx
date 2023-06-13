import React, { useEffect, useState } from "react";
import "./AllProjects.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, getEmployeeProjects } from "../../actions/projects";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../api/index";
import { showToastMessage } from "../../helpers/toaster";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { addProject, addTask } from "../../store/projectSlice";
import SearchBox from "../../Components/SearchBox/SearchBox";
import DropDownSelect from "../../Components/DropDownSelect/DropDownSelect";

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

function ProjectTasks(props) {
  return (
    <div className="project_tasks_all">
      <div className="modal_title">
        {props.currentProject.projectName} ({props.currentProject.employee})
      </div>
      {props.currentProject?.tasks?.map((task, index) => (
        <div
          className={index % 2 === 0 ? `task` : `task dark_row`}
          style={
            task?.adminTask
              ? {
                  backgroundColor: "#8aff91",
                }
              : null
          }
          key={index}
        >
          <div className="task_date">{new Date(task.date).toLocaleString()}</div>
          <div className="task_text">
            {task?.adminTask && <h6>From Admin : {task.adminName}</h6>}
            {task.task}
          </div>
        </div>
      ))}

      {props.currentProject.projectName && (
        <div className="add_task">
          <input
            type="text"
            className="new_task_text"
            placeholder="update task here"
            onChange={(e) => props.setNewTask(e.target.value)}
            autocomplete="on"
            style={{
              width: "85%",
              borderRadius: "0px",
              margin: "0px",
              height: "55px",
            }}
          ></input>
          <div className="new_task" onClick={props.handleNewTask}>
            Add
          </div>
        </div>
      )}
    </div>
  );
}

const AllProjects = () => {
  const today = new Date();

  const { username, isAdmin, status } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProject, setCurrentProject] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("employee");
  const [dateFilter, setDateFilter] = useState(today);

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
    dispatch(getAllProjects(username));
  }, []);

  let projects = useSelector((state) => state.project.projects);
  console.log(projects);

  const handleNewTask = () => {
    if (newTask.length > 10 && newTask.length <= 150) {
      axios
        .patch(`${BASE_URL}/projects/${currentProject._id}`, { task: newTask, admin: isAdmin, username: username })
        .then((response) => {
          console.log(response.data);
          dispatch(addTask(response.data));
          //  setLoading(false)
          //toastWithMessage("Payment added successfully","success")
          showToastMessage("Task added successfully", "success");
          setNewTask("");
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
      showToastMessage("Task must be less than 150 characters and more than 10 ", "reject");
    }
    setRefresh(Math.floor(Math.random() * 100 + 1));
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

  /* ------------------------------- searchQuery ------------------------------ */
  console.log(filter.length);
  console.log(searchQuery);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };
  if (filter.length > 0 && searchQuery.length > 0) {
    projects = projects.filter((item) => item[filter].toString().toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (dateFilter !== "All") {
    projects = projects.filter((item) => {
      if (
        new Date(dateFilter).getFullYear() === new Date(item.updatedAt).getFullYear() &&
        new Date(dateFilter).getMonth() === new Date(item.updatedAt).getMonth() &&
        new Date(dateFilter).getDay() === new Date(item.updatedAt).getDay()
      ) {
        return item;
      }
    });
  }

  if (searchQuery.length > 0 && filter.length === 0) {
    projects = projects.filter((item) => item["employee"].toString().includes(searchQuery.toLowerCase()));
  }

  const options = [
    { name: "Employee", value: "employee" },
    { name: "Project Name", value: "projectName" },

    { name: "Task", value: "tasks" },
  ];

  const dateOptions = [
    { name: "Today", value: today },
    { name: "Last 2 hours", value: Date(new Date().valueOf() - 3 * 1000 * 60 * 60) },

    { name: "Yesterday", value: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24) },
    { name: "All", value: "All" },
  ];

  /* -------------------------------------------------------------------------- */
  return (
    <>
      <ToastContainer />
      <div className="project_page_container_all">
        <div className="projects_filters_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
          <DropDownSelect onChange={handleDateChange} options={dateOptions} />
        </div>
        <div className="projects_list" style={{ width: "100%", margin: "auto" }}>
          {projects?.map((project) => (
            <>
              <div
                style={{ display: "flex" }}
                className="project_item"
                onClick={() => {
                  setCurrentProject(project);
                  openModal(true);
                }}
              >
                <div className="project_name">
                  <h5>{project.projectName}</h5>
                </div>{" "}
                <div className="project_employee">
                  <b style={{ color: "red" }}> {project.employee}</b>
                </div>
                <div>
                  <h6 className="project_time" style={{ color: "blue" }}>
                    {timeAgo(new Date(project.updatedAt))}
                  </h6>
                </div>
                <div className="project_last_task">{project?.tasks[project?.tasks?.length - 1]?.task}</div>
              </div>
            </>
          ))}
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
        <div className="exit_butt" onClick={() => closeModal()}>
          Exit
        </div>
        <ProjectTasks setNewTask={setNewTask} currentProject={currentProject} handleNewTask={handleNewTask}></ProjectTasks>
      </Modal>
    </>
  );
};

export default AllProjects;
