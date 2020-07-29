import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import locationsReducer from "./locations";
import projectsReducer from "./projects";
import usersReducer from "./users";

export default combineReducers({
  bugs: bugsReducer,
  locations: locationsReducer,
  // projects: projectsReducer,
  // users: usersReducer,
});
