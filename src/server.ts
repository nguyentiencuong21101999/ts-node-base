import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
//@ts-ignore
// import PackageJson from '../package.json'

import ApiRoute from './routes/api/api.route'
import Temporal from './routes/api/workflow/temporal'

(async () => {
  try {

    //
    console.info(`Start Temporal Create Worker`)
    const temporal = Temporal.getInstance()
    await temporal.createWorker()

    // rest of the code remains same
    const app = express();
    const PORT = 4000;

    app.use(cors({
      // origins: '*', // ["http://localhost:3001"]
      // credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      // headers: ['X-Requested-With'],
      // allowedHeaders: Object.keys(this.requestModel.headers),
      preflightContinue: false,
      optionsSuccessStatus: 204
    }))
    app.use(bodyParser.json({
      type: 'application/json'
    }))
    app.use(bodyParser.urlencoded({ extended: true }));
    const apiRoute = ApiRoute.getInstance()

    //generate api prefix
    // app.use('/api', apiRoute.route())
    app.listen(PORT, '0.0.0.0', () => {
      // console.log(`⚡️[server]: Version ${PackageJson.version} Server is running at https://localhost:${PORT}`);
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });

  } catch (ex: any) {
    console.error(ex.stack)
    process.exit(1)
  }
})();