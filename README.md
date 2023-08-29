# React + Express + MySQL

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Vite](https://vitejs.dev/)
- [MySQL](https://www.mysql.com/)
- [PNPM](https://pnpm.js.org/)

### Installation

1. Clone the repo

   ```sh
   git clone  https://github.com/NaimCode/authTest
   ```

2. Install client packages

   ```sh
   pnpm install
   ```

3. Install server packages

   ```sh
   cd server
   pnpm install
   ```

4. Create a `.env` file in the root of the server folder and add the following

   ```sh
   DATABASE_URL=
   SESSION_SECRET=
   JWT_SECRET=
   CLIENT_URL= #dev http://localhost:5173
   SMTP_USER=
   SMTP_PASSWORD=
   ```

5. Create a `.env` file in the root of the client folder and add the following

   ```sh
   VITE_API_URL= #dev http://localhost:3000
   ```

## Setup Database (MySQL) with Prisma and PlanetScale

1. Create a new database on PlanetScale and copy the connection string into the `.env` file. [PlanetScale](https://planetscale.com/)

2. Push the schema to PlanetScale

   ```sh
   cd server
   pnpm prisma db push
   ```

3. Generate type definitions

   ```sh
   pnpm prisma generate
   ```

## Usage

1. Start the server

   ```sh
   cd server
   pnpm dev
   ```

2. Start the client

   ```sh
   pnpm dev
   ```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Naim - [@naimcode](https://github.com/NaimCode)
