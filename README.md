# Tester Hotel API Test Project

This project is built to run automated API tests for the Tester Hotel application. The tests use Playwright and Faker for API interactions and data generation. Additionally, Docker is used to run a `rasilva1986/my-vue-app:v1` container for the application backend.

Here is the command:
  ```bash
  docker run -d -p 3000:3000 rasilva1986/my-vue-app:v1
  ```

## Prerequisites

Ensure that the following are installed on your system before running the tests:

- [Node.js](https://nodejs.org/) (version >= 18)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

To run these tests, ensure the following:
- Node.js installed on your machine.
- Docker installed for running the test application.
- Environment variables managed via `.env` file.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MehmetAyaz35/assignment02-mehmetayaz.git
   ```
2. **Navigate to the project directory**:

   ```bash
   cd assignment02-mehmetayaz
    ```
3. **Install project dependencies**:

   ```bash
   npm install
    ```
4. **Create a .env file in the root directory with the following content**:

   ```bash
   
   BASE_URL=http://localhost:3000/api
   TEST_USERNAME=tester01
   TEST_PASSWORD=GteteqbQQgSr88SwNExUQv2ydb7xuf8c
    ```
## Running the Application with Docker
1. **Build and run the Docker container to launch the application**:

2. **Verify that the application is running by visiting the URL set in your .env file (e.g., http://localhost:3000/).**

## Running the Tests
1. **Run the tests using Playwright’s Test Runner**:

```bash

npx playwright test
 ```
   or 

```bash

npm run test
```
 

2. **To run specific tests interactively**:

```bash

npx playwright test --ui
 ```
   or

```bash

npm run ui-mode
```
3. **To run the tests with a specific browser (e.g., Chromium)**:

```bash

npx playwright test --browser=chromium
 ```
## Randomized Data with Faker.js
This test suite utilizes Faker.js to generate randomized test data, ensuring the robustness and variability of test cases. 

## Environment Management with dotenv
I use the .env file to manage environment variables, such as BASE_URL, USERNAME, and PASSWORD. Ensure you define your environment variables correctly before running the tests.

Example .env File
```bash

BASE_URL=http://localhost:3000/api
TEST_USERNAME=tester01
TEST_PASSWORD=GteteqbQQgSr88SwNExUQv2ydb7xuf8c
 ```
## Running with .env Variables
To ensure the tests run with the .env environment variables, you can execute the following command:

```bash

. .env
```
This command ensures your test file runs with the environment variables loaded from the .env file.

## Project Structure
The key files and folders in the project are:

- testsuite.spec.ts: Contains the API test cases, including create, update, delete, and fetch operations for rooms and clients.
- apiHelper.ts: Provides helper functions for making API requests such as login, get all rooms, delete a room, etc.
- testData.ts: Contains utility functions to generate fake test data using Faker, such as generating client or room data.
- playwright.config.ts: Playwright's configuration file, specifying test settings, retry policies, and reporter settings.
- .env: Configuration file for storing environment variables.
- package.json: Contains the project’s npm scripts and dependencies.
- .gitignore: Ensures sensitive files such as .env, node_modules, and test result directories are not tracked by Git.

