# Release Checklist Tool

A simple web application to manage software release checklists.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Neon)

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (or use provided Neon DB)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd release-checklist
```

2. Set up environment variables
Create a `.env` file in the root directory:
```
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Initialize database
```bash
node db/init.js
```

5. Start backend server
```bash
npm start
```

6. Install frontend dependencies (in a new terminal)
```bash
cd frontend
npm install
```

7. Start frontend development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### Get all releases
```
GET /api/releases
```

### Get single release
```
GET /api/releases/:id
```

### Create new release
```
POST /api/releases
Body: {
  "name": "Release v1.0",
  "date": "2024-12-31T00:00:00Z",
  "additionalInfo": "Optional info"
}
```

### Update release steps
```
PATCH /api/releases/:id/steps
Body: {
  "completedSteps": [1, 2, 3]
}
```

### Update release info
```
PATCH /api/releases/:id/info
Body: {
  "additionalInfo": "Updated info"
}
```

### Delete release
```
DELETE /api/releases/:id
```

### Get standard steps
```
GET /api/steps
```

## Database Schema

```sql
CREATE TABLE releases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  additional_info TEXT,
  completed_steps INTEGER[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Standard Release Steps

1. Code freeze
2. Run automated tests
3. Perform security audit
4. Update documentation
5. Create release notes
6. Deploy to staging
7. QA testing
8. Deploy to production
9. Monitor metrics
10. Send release announcement

## Deployment

- Frontend: Deployed on Vercel/Netlify
- Backend: Deployed on Render/Railway
- Database: Neon PostgreSQL

## License

MIT
