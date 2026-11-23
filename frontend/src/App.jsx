import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeForm from "./components/employees/EmployeeForm";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeDirectory />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
