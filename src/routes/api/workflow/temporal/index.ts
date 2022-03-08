import { Worker, State } from '@temporalio/worker';
import { v4 as uuid } from 'uuid';
import { Connection, WorkflowClient } from '@temporalio/client';
// import { greet } from './activities'

//generate interface workflow

// type IIssuesLoan2258b90f90001b4c34859017c119686d4Workflow = () => {
//   execute(): Promise<string>;
//   signals: {
//     issuesLoan2_screen_b39814e20001b8cf7545017c021fbe10(): void; issuesLoan2_screen_1232c3200001b4c34859017c1195e06a(): void;
//   };
//   queries: {
//     checkScreen(): string;
//   };
// }

// type IIssuesLoan240958df90001b34dc971017c0bdbf9fcWorkflow = () => {
//   execute(): Promise<string>;
//   signals: {
//     issuesLoan2_screen_b39814e20001b8cf7545017c021fbe10(): void;
//   };
//   queries: {
//     checkScreen(): string;
//   };
// }

const WORKER_STATE = {
  INITIALIZED: 'INITIALIZED',
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  STOPPING: 'STOPPING',
  DRAINING: 'DRAINING',
  DRAINED: 'DRAINED',
  FAILED: 'FAILED',
}

const TASK_QUEUE = {
  WORKFLOW_SCREEN_QUEUE: "WORKFLOW_SCREEN_QUEUE"
}

class Temporal {

  private static instance = new Temporal();

  constructor() {
    if (Temporal.instance) {
      throw new Error("Error: Instantiation failed: Use Temporal.getInstance() instead of new.");
    }
    this.createWorker = this.createWorker.bind(this);
    // this.createWorkflowClient = this.createWorkflowClient.bind(this);
    this.startWorkflow = this.startWorkflow.bind(this);
    this.updateWorkflow = this.updateWorkflow.bind(this);
    Temporal.instance = this;
  }

  public static getInstance(): Temporal {
    return Temporal.instance;
  }

  public async createWorker() {
    try {
      console.info(`Temporal execute createWorker`)
      const worker = await Worker.create({ workDir: __dirname, taskQueue: TASK_QUEUE.WORKFLOW_SCREEN_QUEUE });
      console.info(`Temporal execute createWorker with state`, worker.getState())
      if (worker.getState() === WORKER_STATE.STOPPED || worker.getState() === WORKER_STATE.STOPPING) {
        // Start accepting tasks on the `tutorial` queue
        await worker.run();
      }
    } catch (error) {
      console.error(`Temporal execute createWorker error`, error)
    }

  }

  // private async createWorkflowClient() {
  //   try {
  //     console.info(`Temporal execute createWorkflowClient`)
  //     await this.createWorker()
  //     const connection = new Connection({
  //       address: "192.168.18.49:31329"
  //     });
  //     const client = new WorkflowClient(connection.service);
  //     return client
  //   } catch (error) {
  //     console.error(`Temporal execute createWorker error`, error)
  //   }
  // }

  public async startWorkflow(issuesIdTask: string) {
    try {
      console.info(`Temporal execute startWorkflow`)
      // await this.createWorker()
      const connection = new Connection({
        address: "temporal-frontend.temporal:7233"
      });
      const client = new WorkflowClient(connection.service);
      const workflowId: string = uuid();
      const issuesTaskId = `I${issuesIdTask[0].toUpperCase()}${issuesIdTask.substring(1, issuesIdTask.length)}Workflow`
      const workflow = client.createWorkflowHandle(issuesTaskId, { taskQueue: TASK_QUEUE.WORKFLOW_SCREEN_QUEUE, workflowId: workflowId });
      const runId = await workflow.start()
      console.info(`Temporal execute startWorkflow workflowId`, workflowId)
      console.info(`Temporal execute startWorkflow runId`, runId)
      //@ts-ignore
      const screenId = await workflow.query.checkScreen()
      console.info(`Temporal execute startWorkflow screenId`, screenId)
      return {
        workflowId: workflowId,
        runId: runId,
        screenId: screenId
      }
    } catch (error) {
      console.error(`Temporal execute startWorkflow error`, error)
      throw error
    }
  }

  public async updateWorkflow(screenId: string, workflowId: string, runId: string, issuesIdTask: string) {
    try {
      console.info(`Temporal execute updateWorkflow`)
      console.debug(`Temporal execute updateWorkflow receive workflowId`, workflowId)
      console.debug(`Temporal execute updateWorkflow receive runId`, runId)
      console.debug(`Temporal execute updateWorkflow receive issuesIdTask`, issuesIdTask)
      // await this.createWorker()
      const connection = new Connection({
        address: "temporal-frontend.temporal:7233"
      });
      console.info(`Temporal execute updateWorkflow create connection success`)
      const client = new WorkflowClient(connection.service);
      console.info(`Temporal execute updateWorkflow start client.createWorkflowHandle(workflowId, runId)`)
      //@ts-ignore
      const workflow = client.connectToExistingWorkflow({ workflowId, runId });
      // const workflow = client.createWorkflowHandle(workflowId, runId);
      console.info(`Temporal execute updateWorkflow start workflow.signal with screenId ${screenId}`)
      //@ts-ignore
      await workflow.signal[screenId]()
      console.info(`Temporal execute updateWorkflow start workflow.signal with screenId ${screenId} successFul`)
      console.info(`Temporal execute updateWorkflow start workflow.query.checkScreen()`)
      //@ts-ignore
      const screenIdNew = await workflow.query.checkScreen()
      console.info(`Temporal execute updateWorkflow start workflow.query.checkScreen() successFul with new screenId ${screenIdNew}`)
      return {
        workflowId: workflowId,
        runId: runId,
        screenId: screenIdNew
      }
    } catch (error) {
      console.error(`Temporal execute updateWorkflow error`, error)
      throw error
    }
  }


}

export default Temporal;