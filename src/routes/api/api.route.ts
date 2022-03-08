'use strict'

import { Router } from "express";

// import AuthRoute from 'routes/auth/auth.route'
import ApiWorkflow from './workflow'

class ApiRoute {

  private static instance = new ApiRoute();

  constructor() {
    if (ApiRoute.instance) {
      throw new Error("Error: Instantiation failed: Use ApiRoute.getInstance() instead of new.");
    }
    ApiRoute.instance = this;
  }

  public static getInstance(): ApiRoute {
    return ApiRoute.instance;
  }

  public route() {
    const router = Router();
    const apiWorkflow = ApiWorkflow.getInstance();
    // router.use('/auth', AuthRoute.route())
    router.use('/workflow', apiWorkflow.route())
    return router
  }

}

export default ApiRoute;