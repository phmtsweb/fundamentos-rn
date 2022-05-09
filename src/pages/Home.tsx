import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskExistsAlert = () =>
    Alert.alert(
      "Task already created",
      "You can not create two tasks with the same name",
      [
        {
          text: "OK",
        },
      ]
    );

  function handleEditTask(id: number, taskNewTitle: string) {
    setTasks((oldTasks) =>
      oldTasks.map((task) => ({
        id: task.id,
        title: task.id === id ? taskNewTitle : task.title,
        done: task.done,
      }))
    );
  }

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);
    if (taskExists) {
      return taskExistsAlert();
    }
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldTasks) => [...oldTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks((oldTasks) =>
      oldTasks.map((task) => ({
        id: task.id,
        title: task.title,
        done: task.id === id ? !task.done : task.done,
      }))
    );
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
