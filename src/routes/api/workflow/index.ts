'use strict'

import { Router, Request, Response } from "express";

// import AuthRoute from 'routes/auth/auth.route'
// import BuildRoute from './build/build.route'

import Temporal from './temporal'

class ApiWorkflow {

  private static instance = new ApiWorkflow();

  constructor() {
    if (ApiWorkflow.instance) {
      throw new Error("Error: Instantiation failed: Use ApiWorkflow.getInstance() instead of new.");
    }
    ApiWorkflow.instance = this;
  }

  public static getInstance(): ApiWorkflow {
    return ApiWorkflow.instance;
  }

  private async startWorkflow(request: Request, response: Response) {
    try {
      console.info(`ApiWorkflow execute startWorkflow`)
      console.debug(`ApiWorkflow execute startWorkflow receive payload`, request.body)
      const temporal = Temporal.getInstance()
      const result: any = await temporal.startWorkflow(request.body.issuesTaskId)
      const responseData = {
        ...result
      }
      console.debug(`ApiWorkflow execute startWorkflow success with responseData`, responseData)
      response
        .status(200)
        .json({
          code: '2000',
          data: {
            ...responseData
          }
        })
    } catch (error) {
      console.error(`ApiWorkflow execute startWorkflow error`, error)
      response
        .status(500)
        .json({})
    }
  }

  private async updateWorkflow(request: Request, response: Response) {
    try {
      console.info(`ApiWorkflow execute updateWorkflow`)
      console.debug(`ApiWorkflow execute updateWorkflow receive payload`, request.body)
      const temporal = Temporal.getInstance()
      const result: any = await temporal.updateWorkflow(request.body.screenId, request.body.workflowId, request.body.runId, request.body.issuesTaskId)
      const responseData = {
        ...result
      }
      console.debug(`ApiWorkflow execute updateWorkflow success with responseData`, responseData)
      response
        .status(200)
        .json({
          code: '2000',
          data: {
            ...responseData
          }
        })
    } catch (error) {
      console.error(`ApiWorkflow execute updateWorkflow error`, error)
      response
        .status(500)
        .json({})
    }
  }

  public route() {
    const router = Router();
    router.post('/', this.startWorkflow.bind(this))
    router.put('/', this.updateWorkflow.bind(this))
    return router
  }

}

export default ApiWorkflow;