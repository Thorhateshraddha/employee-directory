import api from "../api/client";
export const employeeService = {
  list: (params = {}) => api.get("/employees", { params }).then((r) => r.data),
  get: (id) => api.get(`/employees/${id}`).then((r) => r.data.data),
  create: (payload) => api.post("/employees", payload).then((r) => r.data),
  update: (id, payload) =>
    api.put(`/employees/${id}`, payload).then((r) => r.data),
  updateStatus: (id, isActive) =>
    api.patch(`/employees/${id}/status`, { isActive }).then((r) => r.data),
  remove: (id) => api.delete(`/employees/${id}`).then((r) => r.data),
};
