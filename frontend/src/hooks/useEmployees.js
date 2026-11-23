import { useCallback, useEffect, useState } from "react";
import { employeeService } from "../services/employeeService";
import { getErrorMessage } from "../api/client";
export default function useEmployees(params) {
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await employeeService.list(params);
      setEmployees(result.data || []);
      setPagination(
        result.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 },
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [
    params.page,
    params.limit,
    params.search,
    params.department,
    params.status,
  ]);
  useEffect(() => {
    load();
  }, [load]);
  return { employees, pagination, loading, error, reload: load };
}
