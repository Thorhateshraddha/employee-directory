# Employee Directory — MERN Stack

Employee Directory implementation for Assignment 2. This application allows a company to manage employee records, departments, search, filtering and pagination.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose

## Requirements

- Node.js 18 or newer
- npm
- MongoDB Atlas cluster or local MongoDB

## 1. Configure and Start the Backend

Open a terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder. If a `.env.example` file is provided, copy it and rename the copy to `.env`.

Configure the required variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5174
```

Use the actual frontend origin configured for your environment.

Start the backend:

```bash
npm run dev
```

The API runs at:

`http://localhost:5000`

Check the health endpoint:

`http://localhost:5000/api/health`

### Seed Departments

In another terminal:

```bash
cd backend
npm run seed
```

The seeded departments are Engineering, Human Resources, Sales, Marketing, Finance and Operations.

The frontend loads the actual department IDs and names from `GET /api/departments`; the dropdown options are not hardcoded.

## 2. Configure and Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder. If a `.env.example` file is provided, copy it and rename the copy to `.env`.

Configure the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the Vite URL displayed in the terminal.

## 3. Features

- Create, view and edit employee records
- Activate/deactivate employee records
- Permanently delete employees with confirmation
- Search by employee name or email
- Filter by department and active status
- Individual employee details page
- Dashboard summary
- Department selector populated from the backend
- Server-side search, filtering and pagination
- Form validation and loading, success, empty and error states

## 4. Database Structure

The application uses two MongoDB collections:

**Department**
- Department name

**Employee**
- Name
- Email (unique)
- Job title
- Department reference
- Joining date
- Active status

Each employee references a department using its MongoDB ObjectId. This maintains the relationship between employee and department records.

## 5. API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/departments` | List departments |
| GET | `/api/employees?page=1&limit=10&search=&department=&status=` | List, search, filter and paginate employees |
| POST | `/api/employees` | Create employee |
| GET | `/api/employees/:id` | Retrieve employee details |
| PUT | `/api/employees/:id` | Update employee |
| PATCH | `/api/employees/:id/status` | Activate/deactivate employee |
| DELETE | `/api/employees/:id` | Permanently delete employee |

**Query parameters:**
- `page`: Page number
- `limit`: Number of records per page
- `search`: Search by employee name or email
- `department`: Department MongoDB ObjectId
- `status`: `active` or `inactive`

**Employee fields:** `name`, `email`, `jobTitle`, `department`, `joiningDate`, `isActive`.

## 6. Validation and Error Handling

- Validate required employee fields.
- Validate email format.
- Prevent duplicate email addresses.
- Validate department references.
- Handle invalid employee IDs and missing records.
- Display appropriate success and error messages.

## 7. Sample Data

Run the department seed script to populate the department collection.

After starting the application, create a few sample employee records through the employee form to demonstrate the application.

## 8. Frontend Project Structure

- `src/api`: Shared Axios client and API base URL
- `src/services`: Employee and department API methods
- `src/hooks`: Reusable employee and department data loading
- `src/components`: Common, dashboard, employee and layout components
- `src/pages`: Dashboard, employee directory, employee details and not-found page
- `src/utils`: Date formatting helpers

## 9. Security Before Publishing

Do not commit:
- `.env` files
- MongoDB connection strings
- Passwords or API keys
- `node_modules`
- Build output

The root `.gitignore` should exclude environment files, dependencies and build output.

## 10. Author

Shraddha Thorhate.
