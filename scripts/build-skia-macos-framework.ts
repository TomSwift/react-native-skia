/* eslint-disable max-len */
import { configurations } from "./skia-configuration";
import { executeCmdSync, checkFileExists } from "./utils";

/**
 * This build script takes the prebuilt Skia Binaries and creates
 * macos Fat Libraries (archives with all archs inside of one file).
 *
 * Requirements: Requires and tests that all Skia Binaries for the macos
 * archs are built and available in the libs folder.
 *
 * This build script is run after the Skia Binaries are built.
 */

console.log("Building macos Fat Libraries from Skia Binaries");
console.log("");

console.log("Checking prerequisites...");

// Check deps
Object.keys(configurations.mac.targets).forEach((targetKey) => {
  configurations.mac.outputNames.forEach((out) => {
    checkFileExists(
      `package/libs/macos/${targetKey}/${out}`,
      `package/libs/macos/${targetKey}/${out}`,
      `package/libs/macos/${targetKey}/${out} not found`
    );
  });
});

console.log("");
console.log("Prerequisites met. Starting build.");
console.log("");

console.log("");
console.log("Building xcframeworks...");

configurations.mac.outputNames.forEach((out) => {
  const libName = out.split(".")[0];
  console.log(`Building ${libName}.a`);
  executeCmdSync(`rm -rf ./package/libs/macos/${libName}.a`);
  executeCmdSync(
    "lipo -create " + 
      `./package/libs/macos/x64/${libName}.a ` +
      `./package/libs/macos/arm64/${libName}.a ` +
      ` -output ./package/libs/macos/${libName}.a `
  );
});

console.log("Frameworks successfully built.");
