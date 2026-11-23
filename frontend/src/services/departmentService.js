import api from "../api/client";
export const departmentService = {
  list: () => api.get("/departments").then((r) => r.data.data),
};
