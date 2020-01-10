# Instructions

### `git clone https://github.com/DMcCulloch-Coder/cypher-text.git`

Clone the repository to your local machine: https://github.com/DMcCulloch-Coder/cypher-text.git

### `npm install`

- Installs all pre-reqs needed to run the application
- Create the mySQL database called "cypher-text-db"

### `npm start`

- Runs the app in the development mode.
- All required tables will be created on start up via Sequelize. If you need to load seed data to the db see the next step
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run seed-data`

- Run all the seed files in seeder directory.
- Must be ran after all tables have been created.
