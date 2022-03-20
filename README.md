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

2. Install the dependencies by executing:

```bash
npm install
```

3. Create .env file:

```bash
cp .env.sample .env
```

4. Update NODE_ENV in .env file to `production` and feel free to adjust the MONGO_URI with yours:

```bash
NODE_ENV=production
PORT=9000
MONGO_URI=mongodb://localhost:27017/dbmern
```

5. From root directory, build and run the service by:

```bash
npm run start
```

6. You should be able to check the `Berat Web Apps` via the browser or from terminal by executing:

```bash
open http://localhost:9000
```

7. If anything goes well, you can also run the test of these services by running:

```bash
npm run test
```

8. If you want to see the test result in the browser

```javascript
open coverage/index.html
```

## 5. Contributing 📝

Feel free to add some feedback. Would really glad to hear from you 🥳

## 6. References 🚀

- [Marmelab React-Admin](http://marmelab.com/react-admin)
- [Traversy Media](https://www.youtube.com/c/TraversyMedia)
