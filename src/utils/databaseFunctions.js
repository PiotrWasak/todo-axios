import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function postToDatabase(taskValue) {
  const taskData = {
    task: taskValue,
    status: "todo",
  };
  axios
    .post(`/${this.userData.uid}.json`, taskData)
    .then(() => {
      this.getFromDatabase();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updateDatabase(taskId, status) {
  axios
    .patch(`${this.userData.uid}/${taskId}.json`, {
      status: status,
    })
    .then(() => {
      this.getFromDatabase();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getFromDatabase() {
  this.taskList.splice(0, this.taskList.length);
  this.doneTaskList.splice(0, this.doneTaskList.length);
  axios
    .get(`${this.userData.uid}.json`)
    .then((response) => {
      Object.entries(response.data).forEach((element) => {
        const task = {
          uid: element[0],
          value: element[1].task,
          status: element[1].status,
        };
        if (task.status === "todo") {
          this.taskList.push(task);
        } else if (task.status === "done") {
          this.doneTaskList.push(task);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteFromDatabase(taskId) {
  axios
    .delete(`${this.userData.uid}/${taskId}.json`)
    .then(() => {
      console.log("Succesfully deleted");
      this.getFromDatabase();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getUserData() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.userData = user;
      this.getFromDatabase();
    } else {
      console.log("User not logged in");
    }
  });
}
