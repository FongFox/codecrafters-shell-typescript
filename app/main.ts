import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "$ ",
});

// TODO: Uncomment the code below to pass the first stage
rl.prompt();
rl.on('line', (command) => {
  if(command.startsWith('exit')) {
    rl.close();
    return;
  }
  else if(command.startsWith('echo')) {
    const argument: string = command.slice(5);
    console.log(argument);
  }
  else if(command.startsWith('type')) {
    const commandName: string = command.slice(5);
    switch (commandName) {
      case 'echo': case 'type': case 'exit':
        console.log(`${commandName} is a shell builtin`); break;
      default:
        console.log(`${commandName}: not found`);
    }
  }
  else {
    console.log(`${command}: command not found`);
  }
  rl.prompt();
});

