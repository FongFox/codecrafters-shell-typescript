import {createInterface} from "readline";
import * as path from "node:path";
import * as constants from "node:constants";
import {accessSync} from "node:fs";
import { spawnSync } from "node:child_process";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ ",
});

const findInPath = (name: string): [boolean, string] => {
    const pathString: string = process.env.PATH ?? "";
    const directories: string[] = pathString.split(path.delimiter);
    for (const directory of directories) {
        try {
            const commandPath = `${directory}/${name}`;
            accessSync(commandPath, constants.X_OK);
            // console.log(`${name} is ${commandPath}`);
            return [true, commandPath];
        } catch (e) {
        }
    }

    return [false, ""];
};

// TODO: Uncomment the code below to pass the first stage
rl.prompt();
rl.on('line', (command) => {
    if (command.startsWith('exit')) {
        rl.close();
        return;
    }
    else if (command.startsWith('echo')) {
        const argument: string = command.slice(5);
        console.log(argument);
    }
    else if (command.startsWith('type')) {
        const commandName: string = command.slice(5);
        switch (commandName) {
            case 'echo':
            case 'type':
            case 'exit':
                console.log(`${commandName} is a shell builtin`);
                break;
            default:
                const [found, foundPath] = findInPath(commandName);
                if(found) {
                    console.log(`${commandName} is ${foundPath}`);
                } else {
                    console.log(`${commandName}: not found`);
                }
        }

    }
    else {
        const lineParts = command.split(" ");
        const programName: string = lineParts[0];
        const args: string[] = lineParts.slice(1);
        const [found, foundPath] = findInPath(programName);
        if(found) {
            spawnSync(programName, args, {stdio: 'inherit'});
        } else {
            console.log(`${command}: command not found`);
        }
    }
    rl.prompt();
});

