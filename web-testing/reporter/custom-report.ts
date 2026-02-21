import type { 
  FullResult, 
  Reporter, 
  TestCase, 
  TestResult,
  TestStep 
} from '@playwright/test/reporter';
import chalk from 'chalk';

class WorkerReporter implements Reporter {

  onTestBegin(test: TestCase, result: TestResult) {
    console.log(
      chalk.blue(`[Worker-${result.workerIndex + 1}]`) +
      ' ' +
      chalk.yellow(`START: ${test.title}`)
    );
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
  
    if (step.category === 'test.step') {
      console.log(
        chalk.blue(`[Worker-${result.workerIndex + 1}]`) +
        ' ' +
        chalk.cyan(`STEP: ${step.title}`)
      );
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    if (step.category === 'test.step') {
      const statusColor =
        step.error ? chalk.red : chalk.green;

      console.log(
        chalk.blue(`[Worker-${result.workerIndex + 1}]`) +
        ' ' +
        statusColor(`STEP END: ${step.title} ${step.error ? '→ failed' : '→ passed'}`)
      );
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const statusColor =
      result.status === 'passed'
        ? chalk.green
        : result.status === 'failed'
        ? chalk.red
        : chalk.gray;

    console.log(
      chalk.blue(`[Worker-${result.workerIndex + 1}]`) +
      ' ' +
      statusColor(`END: ${test.title} → ${result.status}`)
    );
  }

  onEnd(result: FullResult) {
    console.log(
      chalk.green(`\nAll tests completed`) +
      '\n' +
      chalk.blue(`Status: ${result.status}`)
    );
  }
}

export default WorkerReporter;
