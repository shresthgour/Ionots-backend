# Travel Agency Booking System

## Project Description
A comprehensive travel agency booking system with features for browsing tour packages, making bookings, and admin management.

## Technologies Used
- Frontend: React/Next.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Additional Libraries: 
  - Mongoose
  - PDF-lib
  - JSON Web Token (JWT)

## Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

## Installation

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=adminpassword
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Packages
- `GET /api/packages`: Retrieve all packages
- `GET /api/packages/:id`: Retrieve specific package

### Bookings
- `POST /api/bookings`: Create a new booking

### Admin
- `POST /api/admin/login`: Admin login
- `POST /api/admin/packages`: Add new package
- `PUT /api/admin/packages/:id`: Update package
- `DELETE /api/admin/packages/:id`: Delete package

## Authentication
Admin routes require a JWT token obtained from the login endpoint.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
MIT License