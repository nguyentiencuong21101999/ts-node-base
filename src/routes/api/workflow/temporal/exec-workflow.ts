// import { v4 as uuid } from 'uuid';
// import { Connection, WorkflowClient } from '@temporalio/client';
// // import { example } from './workflows';
// import IWorkflow from './interfaces'

// async function run() {
//   // Connect to localhost with default ConnectionOptions,
//   // pass options to the Connection constructor to configure TLS and other settings.
//   const connection = new Connection({
//     address: "192.168.18.49:31329"
//   });
//   // Workflows will be started in the "default" namespace unless specified otherwise
//   // via options passed the WorkflowClient constructor.
//   const client = new WorkflowClient(connection.service);
//   // Create a typed handle for the example Workflow.
//   // const workflowId: string = uuid();
//   // const workflow = client.createWorkflowHandle<IWorkflow>('thanh nguyen', { taskQueue: 'tutorial', workflowId: workflowId });
//   // await workflow.signal.issuesLoan2_screen_b39814e20001b8cf7545017c021fbe10()
//   // await workflow.execute();
//   // const runId = await workflow.start()
//   // console.log('workflowId', workflowId);
//   // console.log('runId', runId);

//   // const screenId = await workflow.query.checkScreen()
//   // console.log('screenId', screenId);

//   // const workflow = client.createWorkflowHandle<IWorkflow>('de37af04-025a-4f9b-86e6-395751962abe', '149fe246-d60a-47e0-8121-2743b6c79a78');
//   // const result = await workflow.signal.issuesLoan2_screen_b39814e20001b8cf7545017c021fb123()
//   // console.log('result', result);
//   // const screenId = await workflow.query.checkScreen()
//   // console.log('screenId', screenId);

//   // workflow.signalWithStart()
//   const result = await workflow.result()

//   console.log('result', result);

// }

// run().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
