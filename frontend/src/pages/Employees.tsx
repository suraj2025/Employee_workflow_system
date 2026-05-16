import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import type { Employee } from "../types/employee";

import { createEmployee, deleteEmployee, getEmployees, searchEmployees, updateEmployee } from "../services/employeeService";
import { toast } from "react-toastify";

function Employees() {

    const [employees, setEmployees] = useState<Employee[]>([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const [searchName, setSearchName] =
        useState("");

    const [department, setDepartment] =
        useState("");
    const [openModal, setOpenModal] =
        useState(false);

    const [employeeForm, setEmployeeForm] =
        useState({
            employeeCode: "",
            name: "",
            email: "",
            department: "",
            designation: "",
            salary: "",
        });

    const [editingEmployeeId, setEditingEmployeeId] =
        useState<number | null>(null);

    const handleEditEmployee = (
        employee: Employee
    ) => {

        setEditingEmployeeId(employee.id);

        setEmployeeForm({
            employeeCode: employee.employeeCode,
            name: employee.name,
            email: employee.email,
            department: employee.department,
            designation: employee.designation,
            salary: employee.salary.toString(),
        });

        setOpenModal(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setEmployeeForm({
            ...employeeForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveEmployee = async () => {

        try {

            if (editingEmployeeId) {

                await updateEmployee(
                    editingEmployeeId,
                    employeeForm
                );

            } else {

                await createEmployee(employeeForm);
            }

            toast.success(
                editingEmployeeId
                    ? "Employee updated successfully"
                    : "Employee created successfully"
            );

            setOpenModal(false);

            fetchEmployees();

            setEditingEmployeeId(null);

            setEmployeeForm({
                employeeCode: "",
                name: "",
                email: "",
                department: "",
                designation: "",
                salary: "",
            });

        } catch (error) {

            toast.error(
                "Something went wrong"
            );
        }
    };

    const handleDeleteEmployee = async (
        id: number
    ) => {

        try {

            await deleteEmployee(id);

            fetchEmployees();
            toast.success(
  "Employee deleted successfully"
);

        } catch (error) {

            toast.error(
                "Something went wrong"
            );
        }
    };
    useEffect(() => {
        fetchEmployees();
    }, [page]);
    const fetchEmployees = async () => {

        try {

            setLoading(true);

            const request = {

                name: searchName,

                department,

                page,

                size: 10,

                sortBy: "id",

                sortDirection: "asc",
            };

            const data =
                await searchEmployees(request);

            setEmployees(data.content);

            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchEmployees();

    }, [page]);

    return (

        <DashboardLayout>

            <div className="flex items-center justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Employees
                </h1>

                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    Add Employee
                </button>

            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="bg-white p-4 rounded-2xl shadow mb-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={(e) =>
                                setSearchName(e.target.value)
                            }
                            className="border p-3 rounded-lg"
                        />

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(e.target.value)
                            }
                            className="border p-3 rounded-lg"
                        >

                            <option value="">
                                All Departments
                            </option>

                            <option value="IT">
                                IT
                            </option>

                            <option value="HR">
                                HR
                            </option>

                            <option value="Finance">
                                Finance
                            </option>

                            <option value="Admin">
                                Admin
                            </option>

                        </select>

                        <button
                            onClick={fetchEmployees}
                            className="bg-blue-600 text-white rounded-lg"
                        >
                            Search
                        </button>

                    </div>

                </div>
                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-4">
                                Employee Code
                            </th>

                            <th className="text-left p-4">
                                Name
                            </th>

                            <th className="text-left p-4">
                                Department
                            </th>

                            <th className="text-left p-4">
                                Designation
                            </th>

                            <th className="text-left p-4">
                                Salary
                            </th>
                            <th className="text-left p-4">
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="text-center p-6"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : (

                            employees.map((employee) => (

                                <tr
                                    key={employee.id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {employee.employeeCode}
                                    </td>

                                    <td className="p-4">
                                        {employee.name}
                                    </td>

                                    <td className="p-4">
                                        {employee.department}
                                    </td>

                                    <td className="p-4">
                                        {employee.designation}
                                    </td>

                                    <td className="p-4">
                                        ₹{employee.salary}
                                    </td>
                                    <td className="p-4 flex gap-3">

                                        <button
                                            onClick={() =>
                                                handleEditEmployee(employee)
                                            }
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteEmployee(employee.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

            <div className="flex items-center justify-center gap-4 mt-6">

                <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                    className="bg-gray-200 px-4 py-2 rounded"
                >
                    Prev
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    disabled={page + 1 === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-200 px-4 py-2 rounded"
                >
                    Next
                </button>

            </div>
            {
                openModal && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white w-full max-w-2xl rounded-2xl p-6">

                            <div className="flex items-center justify-between mb-6">

                                <h2 className="text-2xl font-bold">
                                    Add Employee
                                </h2>

                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="text-red-500"
                                >
                                    X
                                </button>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <input
                                    type="text"
                                    name="employeeCode"
                                    placeholder="Employee Code"
                                    value={employeeForm.employeeCode}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={employeeForm.name}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={employeeForm.email}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="text"
                                    name="department"
                                    placeholder="Department"
                                    value={employeeForm.department}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="text"
                                    name="designation"
                                    placeholder="Designation"
                                    value={employeeForm.designation}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="Salary"
                                    value={employeeForm.salary}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                            </div>

                            <div className="flex justify-end mt-6">

                                <button
                                    onClick={handleSaveEmployee}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                                >

                                    {
                                        editingEmployeeId
                                            ? "Update Employee"
                                            : "Save Employee"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

        </DashboardLayout>
    );
}

export default Employees;