import fs from 'fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { InputError, AccessError } from './error';
import swaggerDocument from '../swagger.json';
import {
  getEmailFromAuthorization,
  login,
  logout,
  register,
  getStore,
  setStore,
  save,
} from './service';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const catchErrors = (fn) => async (req, res) => {
  try {
    await fn(req, res);
    save();
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: 'A system error occurred' });
    }
  }
};

/***************************************************************
                       Auth Function
***************************************************************/

const authed = (fn) => async (req, res) => {
  const email = getEmailFromAuthorization(req.header('Authorization'));
  await fn(req, res, email);
};

app.post(
  '/admin/auth/login',
  catchErrors(async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);
    return res.json({ token });
  })
);

app.post(
  '/admin/auth/register',
  catchErrors(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await register(email, password, name);
    return res.json({ token });
  })
);

app.post(
  '/admin/auth/logout',
  catchErrors(
    authed(async (req, res, email) => {
      await logout(email);
      return res.json({});
    })
  )
);

/***************************************************************
                       Store Functions
***************************************************************/

app.get(
  '/store',
  catchErrors(
    authed(async (req, res, email) => {
      return res.json({ store: await getStore(email) });
    })
  )
);

app.put(
  '/store',
  catchErrors(
    authed(async (req, res, email) => {
      await setStore(email, req.body.store);
      return res.json({});
    })
  )
);

/***************************************************************
                       Running Server
***************************************************************/

// Variable to track whether the server has been started
let serverStarted = false;

const startServer = () => {
  if (!serverStarted) {
    const configData = JSON.parse(
      fs.readFileSync(path.join(__dirname, './config.json'))
    );
    const port = 'BACKEND_PORT' in configData ? configData.BACKEND_PORT : 5000;

    const server = app.listen(port, () => {
      console.log(`Backend is now listening on port ${port}!`);
      console.log(`For API docs, navigate to http://localhost:${port}`);
    });

    serverStarted = true; // Mark server as started
    return server;
  } else {
    console.log('Server is already running. Cannot start it again.');
    return null;
  }
};

const server = startServer(); // Start the server

export default server;
