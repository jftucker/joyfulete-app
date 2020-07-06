import client from "./client";

const endpoint = "/activities";

const getActivities = () => client.get(endpoint);

const addActivity = (activity, onUploadProgress) => {
  const data = new FormData();
  data.append("name", activity.name);
  // data.append("price", activity.price);
  // data.append("categoryId", activity.category.value);
  // data.append("description", activity.description);

  // activity.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  if (activity.location)
    data.append("location", JSON.stringify(activity.location));

  // Parent > Child

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addActivity,
  getActivities,
};
