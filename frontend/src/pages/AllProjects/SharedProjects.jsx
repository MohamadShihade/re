import React, { useEffect, useState } from "react";
import "./AllProjects.css";
import "./SharedProjects.css";
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
import { timeAgo } from "./AllProjects";

const SharedProjects = () => {
  const today = new Date();

  const { username, isAdmin, status } = useAuth();
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newProject, setNewProject] = useState("");
  const [currentProjectName, setCurrentProjectName] = useState("");
  const [currentProjectEmployees, setCurrentProjectEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("employee");
  const [dateFilter, setDateFilter] = useState(today);

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
    console.log("k;olpkllllllllll");
    dispatch(getAllProjects());
  }, []);

  let projects = useSelector((state) => state.project.projects);
  console.log(projects);

  /* ------------------------------- searchQuery ------------------------------ */

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

  let allProjectsNames = [];
  projects?.forEach((project) => {
    allProjectsNames.push(project.projectName);
  });
  console.log(allProjectsNames);
  const projectsNames = [...new Set(allProjectsNames)];
  console.log(projectsNames);

  projects = projects.filter((project) => project.projectName === currentProjectName);

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
      <div className="project_page_container_shared">
        <div className="projects_filters_container">
          <SearchBox onChange={handleSearchQueryChange}></SearchBox>
          <DropDownSelect onChange={handleFilterChange} options={options} />
          <DropDownSelect onChange={handleDateChange} options={dateOptions} />
        </div>
        <div style={{ display: "flex", width: "100%" }} className="project_page_container">
          <div className="projects_list">
            {projectsNames?.map((projectName) => (
              <>
                <div className="project_item" onClick={() => setCurrentProjectName(projectName)}>
                  <h5>{projectName}</h5>
                </div>
              </>
            ))}
          </div>

          <div className="shared_projects_container">
            <div className="shared_projects_name">{currentProjectName}</div>
            <div className="shared_projects_div">
              {currentProjectName && (
                <>
                  {projects?.map((project, index) => (
                    <div key={index} className="project_employee_div">
                      <div className="project_employee_epmloyee">{project.employee}</div>
                      <div className="project_employee_tasks">
                        {project.tasks.map((task) => (
                          <div className="sh_task">
                            <div className="sh_task_date">{new Date(task.date).toLocaleString()}</div>
                            <div className="sh_task_text">{task.task}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedProjects;
