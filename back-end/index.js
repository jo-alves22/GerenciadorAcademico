import express from 'express';
import pkg from "body-parser";
import router from './routes/routes.js';

import sequelize from './utils/database.js';
import association from './models/Associations.js';

import cors from 'cors';

const app = express();
const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({ extended: true }));
// enable CORS before registering routes so that all endpoints are covered
app.use(cors());
app.use("/", router);

(async () => {
    try {
        association.associations();
        await sequelize.sync({ force: true });
        app.listen(3000, function() {
            console.log('Server listening on port 3000');
        });
    } catch (error) {
        console.log(error);
    }
})();



