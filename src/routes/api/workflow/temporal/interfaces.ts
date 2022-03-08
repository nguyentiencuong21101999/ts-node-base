
// Define our Example Workflow type (this step is optional).
// Workflow types are useful for generating type safe workflow clients
// in environments where the Workflow implemetations are unavailable.

type IWorkflow = () => {
  execute(): Promise<string>;
  signals: {

    // gen code issuesTask
    issuesLoan2_screen_b39814e20001b8cf7545017c021fbe10(): void;
    issuesLoan2_screen_b39814e20001b8cf7545017c021fb123(): void;
  };
  queries: {
    checkScreen(): string;
  };
};

export default IWorkflow