# SIRCLO BERAT APP 🏋🏻‍♀️

## 1. Introduction 🎬

Built with JavasScript , this is an implementation of `berat web app` which has some basic CRUD functions.

Stacks Used in this repo:

- Node.js as the runtime with an Express.js as the base framework
- Mongoose used for the ORM
- MongoDB as the main database
- React.js with React-Admin as a frontend framework

## 2. Prerequisites 💡

- Latest version of node.js
- MongoDB for the database

## 3. Folder Structure 📂

```
.
├── backend
├── frontend
├── package.json
└── README.md
```

## 4. Installation ⚙️

To setup this `web app` locally, you can follow these commands from your terminal:

1. Clone this repository:

```bash
git clone https://github.com/rizkiadi23/sirclo_berat_app.git
```

2. Go into the project directory and then install backend dependencies by executing:

```bash
cd sirclo_berat_app && npm install
```

3. After completing installation for the backend, run the following command to install frontend dependencies:

```bash
cd frontend && npm install
```

4. Once frontend dependencies successfully installed, go back to the root project directory, by executing:

```bash
cd ..
```

5. Create .env file:

```bash
cp .env.sample .env
```

6. From root directory, build and run the service by:

```bash
npm run start
```

7. You should be able to check the `Berat Web Apps` via the browser or from terminal by executing:

```bash
open http://localhost:9000
```

8. If anything goes well, you can also run the unit test for the backend modules by running this command:

```bash
npm run unit:test:backend
```

9. If you want to see the test result in the browser

```javascript
open coverage/backend/index.html
```

10. End to End (E2E) Test & Integration Test with Frontend haven't done yet 😢.

## 5. Contributing 📝

Feel free to add some feedback. Would really glad to hear from you 🥳

## 6. References 🚀

- [Marmelab React-Admin](http://marmelab.com/react-admin)
- [Traversy Media](https://www.youtube.com/c/TraversyMedia)
