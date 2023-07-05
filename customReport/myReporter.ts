import {FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep}from '@playwright/test/reporter';


let totalTestCount: number;
let totalSpecCount:number;
let currentTest = 1;
const colors = {
    FgRed : "\x1b[31m",
  FgGreen : "\x1b[32m",
  Reset : "\x1b[0m",
}
function testCount(): string {
    return `${currentTest}/${totalTestCount}`;
  }
function getStatusColor(status: string): string{
    let colorCode = colors.FgRed;  
    if(status === 'passed') {
      colorCode = colors.FgGreen;
    }
    return colorCode;
  }
export default class MyReporter implements Reporter{
    onBegin(config: FullConfig, suite: Suite): void{
        totalTestCount = suite.allTests().length;
        console.log(`Starting the run with ${suite.allTests().length} tests`);
        totalSpecCount =suite.suites[0].suites.length;
        for (let i=0;i<totalSpecCount;i++){
            console.log('Suite Title: '+suite.suites[0].suites[i].suites[0].title);
        }  
    };

    onTestBegin(test: TestCase, result: TestResult): void{
          console.log(`Test ${testCount()} Started: ${test.title} `);
          currentTest++;  
      };

    onTestEnd(test: TestCase, result: TestResult): void{
        let status = getStatusColor(result.status);
        console.log("Test Ended: "+ test.title,status+"Result: "+ result.status+ colors.Reset); 
       
    };

    onStdOut(chunk: string|Buffer, test: void|TestCase, result: void|TestResult): void{     
        console.log(chunk);
    };

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void{

    };
  
    onStepEnd(test: TestCase, result: TestResult, step: TestStep): void{

    };

    onError(error: TestError): void{
        console.log("On Error: "+ error.message);

    };
  
    onEnd(result: FullResult): void | Promise<void>{
        let status = getStatusColor(result.status);
        console.log("On End: "+status+ result.status+colors.Reset);
    };
  
}