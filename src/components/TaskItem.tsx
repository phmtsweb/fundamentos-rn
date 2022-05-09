import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import penIcon from "../assets/icons/pen/pen.png";
import trashIcon from "../assets/icons/trash/trash.png";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
  task: Task;
}

type TaskAlertProps = {
  id: number;
  taskName: string;
};

export function TaskItem({
  index,
  toggleTaskDone,
  removeTask,
  task,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setCurrentTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, currentTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  const tasksRemoveAlert = ({ id, taskName }: TaskAlertProps) =>
    Alert.alert(
      "Remove item",
      `Do you want to proceed to delete ${taskName}?`,
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => removeTask(id),
        },
      ]
    );
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            //TODO - use style prop
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={currentTitle}
            onChangeText={setCurrentTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginHorizontal: 0 }}>
          {!isEditing ? (
            <TouchableOpacity
              onPress={handleStartEditing}
              style={{ paddingHorizontal: 10 }}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleCancelEditing}
              style={{ paddingHorizontal: 10 }}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: "rgba(196,196,196,0.24)",
            marginHorizontal: 0,
          }}
        />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingLeft: 10,
            paddingRight: 24,
            opacity: isEditing ? 0.2 : 1,
          }}
          onPress={() =>
            tasksRemoveAlert({ id: task.id, taskName: task.title })
          }
          disabled={isEditing}

          //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
