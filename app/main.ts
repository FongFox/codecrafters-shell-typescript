import {createInterface} from "readline";
import * as path from "node:path";
import * as constants from "node:constants";
import {accessSync} from "node:fs";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ ",
});

// TODO: Uncomment the code below to pass the first stage
rl.prompt();
rl.on('line', (command) => {
    if (command.startsWith('exit')) {
        rl.close();
        return;
    } else if (command.startsWith('echo')) {
        const argument: string = command.slice(5);
        console.log(argument);
    } else if (command.startsWith('type')) {
        const commandName: string = command.slice(5);
        switch (commandName) {
            case 'echo':
            case 'type':
            case 'exit':
                console.log(`${commandName} is a shell builtin`);
                break;
            default:
                const pathString: string = process.env.PATH ?? "";
                const directories: string[] = pathString.split(path.delimiter);
                let lineExists: boolean = false;
                for (const directory of directories) {
                    try {
                        const commandPath = `${directory}/${commandName}`;
                        accessSync(commandPath, constants.X_OK);
                        console.log(`${commandName} is ${commandPath}`);
                        lineExists = true;
                        break;
                    } catch (e) {
                    }
                }

                if (!lineExists) {
                    console.log(`${commandName}: not found`);
                }
        }

    } else {
        console.log(`${command}: command not found`);
    }
    rl.prompt();
});

