import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function postToDatabase(taskValue) {
  const taskData = {
    task: taskValue,
    status: "todo",
  };
  axios
    .post(`/${this.userData.uid}.json`, taskData)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.taskList.push({
          uid: response.data.name,
          value: taskData.task,
          status: taskData.status,
        });
      }
      //this.getFromDatabase();
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
    .then((response) => {
      //this.getFromDatabase();
      if (response.status === 200) {
        console.log(response);
        if (status === "todo") {
          const removeIndex = this.doneTaskList.findIndex((item) => {
            return item.uid === taskId;
          });
          this.taskList.unshift(this.doneTaskList[removeIndex]);
          this.doneTaskList.splice(removeIndex, 1);
        } else if (status === "done") {
          const removeIndex = this.taskList.findIndex((item) => {
            return item.uid === taskId;
          });
          this.doneTaskList.unshift(this.taskList[removeIndex]);
          this.taskList.splice(removeIndex, 1);
        }
      }
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
    .then((response) => {
      if (response.status === 200) {
        console.log(taskId);
        const removeIndex = this.taskList.findIndex((item) => {
          return item.uid === taskId;
        });
        this.taskList.splice(removeIndex, 1);
      }
      //this.getFromDatabase();
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
