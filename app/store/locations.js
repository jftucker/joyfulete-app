import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";

const slice = createSlice({
  name: "locations",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    locationsRequested: (locations, action) => {
      locations.loading = true;
    },

    locationsReceived: (locations, action) => {
      locations.list = action.payload;
      locations.loading = false;
      locations.lastFetch = Date.now();
    },

    locationsRequestFailed: (locations, action) => {
      locations.loading = false;
    },

    //   bugAssignedToUser: (locations, action) => {
    //     const { id: bugId, userId } = action.payload;
    //     const index = locations.list.findIndex((bug) => bug.id === bugId);
    //     locations.list[index].userId = userId;
    //   },

    locationAdded: (locations, action) => {
      locations.list.push(action.payload);
    },

    //   locationResolved: (locations, action) => {
    //     const index = locations.list.findIndex((bug) => bug.id === action.payload.id);
    //     locations.list[index].resolved = true;
    //   },
  },
});

export const {
  locationAdded,
  // locationResolved,
  // locationAssignedToUser,
  locationsReceived,
  locationsRequested,
  locationsRequestFailed,
} = slice.actions;
export default slice.reducer;

//   // Action Creators
// const url = "/locations";

export const loadLocations = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.locations;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: locationsRequested.type,
      onSuccess: locationsReceived.type,
      onError: locationsRequestFailed.type,
    })
  );
};

export const addLocation = (location) => locationAdded(location);

// export const resolveLocation = (id) =>
//   apiCallBegan({
//     url: url + "/" + id,
//     method: "patch",
//     data: { resolved: true },
//     onSuccess: locationResolved.type,
//   });

// export const assignLocationToUser = (bugId, userId) =>
//   apiCallBegan({
//     url: url + "/" + bugId,
//     method: "patch",
//     data: { userId },
//     onSuccess: locationAssignedToUser.type,
//   });

// Selectors
export const getLocations = createSelector(
  (state) => state.entities.locations,
  (locations) => locations.list
);

// export const getUnresolvedLocations = createSelector(
//   (state) => state.entities.locations,
//   (state) => state.entities.projects,
//   (locations, projects) => locations.list.filter((locations) => !locations.resolved)
// );

// export const getLocationsByUser = (userId) =>
//   createSelector(
//     (state) => state.entities.locations,
//     (locations) => locations.filter((location) => location.userId === userId)
//   );
