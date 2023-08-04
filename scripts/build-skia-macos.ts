import { configurations } from "./skia-configuration";
import { executeCmd } from "./utils";

const configuration = configurations.mac;

console.log("Building skia for macos...");
let command = "";

Object.keys(configuration.targets).forEach((targetKey) => {
  command +=
    (command !== "" ? " && " : "") +
    `yarn ts-node ./scripts/build-skia.ts mac ${targetKey}`;
});

executeCmd(command, "mac", () => {
  console.log(`Done building skia for macos.`);
});
