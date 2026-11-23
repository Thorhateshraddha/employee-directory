import { useEffect, useState } from "react";
import api from "../api/client";

const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);
  const [departmentsError, setDepartmentsError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchDepartments = async () => {
      try {
        setDepartmentsLoading(true);
        setDepartmentsError("");

        const response = await api.get("/departments");

        const departmentData = response.data.data;

        if (!Array.isArray(departmentData)) {
          throw new Error("Invalid departments response from server");
        }

        if (active) {
          setDepartments(departmentData);
        }
      } catch (error) {
        console.error("Department loading failed:", error);

        if (active) {
          setDepartments([]);

          setDepartmentsError(
            error.response?.data?.message ||
              (error.code === "ECONNABORTED"
                ? "Department request timed out. Check your backend and database."
                : error.message || "Unable to load departments."),
          );
        }
      } finally {
        if (active) {
          setDepartmentsLoading(false);
        }
      }
    };

    fetchDepartments();

    return () => {
      active = false;
    };
  }, []);

  return {
    departments,
    departmentsLoading,
    departmentsError,
  };
};

export default useDepartments;
