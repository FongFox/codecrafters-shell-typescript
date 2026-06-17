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
    console.log(command.slice(5));
  }
  else if(command.startsWith('type')) {
    const word: string = command.slice(5);
    if(word == 'echo' || word == 'type' || word == 'exit') {
      console.log(`${word} is a shell builtin`);
    }
    else {
      console.log(`${word}: command not found`);
    }
  }
  else {
    console.log(`${command}: command not found`);
  }
  rl.prompt();
});

