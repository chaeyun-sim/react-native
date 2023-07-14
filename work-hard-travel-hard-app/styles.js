import { StyleSheet } from "react-native";
import { theme } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
    paddingTop: 30
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "20%"
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  todoText: {
    fontSize: 16,
    fontWeight: 500
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  editInput: {
    width: 190,
    fontSize: 16
  },
  ok: {
    fontSize: 13,
    color: "tomato"
  },
  deleteAll: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 15
  },
  allButton: {
    backgroundColor: theme.grey,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 7,
  }
});
