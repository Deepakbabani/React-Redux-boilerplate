#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs"); // File System module to handle file operations
const path = require("path");
const childProcess = require("child_process");
const DEPENDENCIES = [
  "@reduxjs/toolkit",
  "react-redux",
  "axios",
  "react-router-dom",
  "redux-persist",
];

// this will create a copy of directory
const createDirs = (folderStructure, path = ".", projectName, userName) => {
  if (folderStructure) {
    Object.entries(folderStructure).forEach(([dir, files]) => {
      fs.mkdirSync(`${path}/${dir}`, { recursive: true }); // Create directories
      files.forEach((file) => {
        if (typeof file === "string") {
          let srcPath = `${path}/${dir}/${file}`.replace(
            `./${projectName}/`,
            ""
          );
          let fileContent = fs.readFileSync(srcPath, "utf8");
          if (file === "HomePage.tsx") {
            fileContent = fileContent.replace(
              "<h1>Vite + React</h1>",
              `<h1>Hello ${userName}</h1>`
            );
          }
          fs.writeFileSync(`${path}/${dir}/${file}`, fileContent);
        } else {
          createDirs(file, `${path}/${dir}`, projectName, userName);
        }
      }); // Create files
    });
  }
};

function generateStructure(directoryPath, folderName) {
  const files = fs.readdirSync(directoryPath);
  let structure = {
    [folderName]: [],
  };

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      structure[folderName].push(generateStructure(filePath, file));
    } else {
      structure[folderName].push(file);
    }
  });
  return structure;
}

let folderStructure = generateStructure("src", "src");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt the user for the project name
function promptForProjectName(callback) {
  rl.question("Enter the project name: ", (projectName) => {
    callback(projectName || "project_without_name");
  });
}

// Function to prompt the user for their name
function promptForUserName(callback) {
  rl.question("Enter your name: ", (userName) => {
    callback(userName || "Dumbledore");
  });
}

// Define a command that prompts the user for the project details
const createProjectCommand = () => {
  console.log("Creating a new project...");
  promptForProjectName((projectName) => {
    console.log(`Project name: ${projectName}`);
    promptForUserName((userName) => {
      console.log(`Hello, ${userName}!`);
      console.log(`Wait let me just cook your project.....`);
      console.log(
        "🚀 Project should be live on port 5173! within some seconds........ 🎉"
      );
      console.log("🙏 Thanks & Regards, Deepak Babani 🙏");
      childProcess.exec(
        `npx create-vite ${projectName} --template react-ts`,
        (err, stdout, _stderr) => {
          if (err) {
            console.error(err);
            return;
          } else {
            childProcess.exec(
              `cd ${projectName} && npm install ${DEPENDENCIES.join(" ")}`,
              (err) => {
                if (err) {
                  console.log(err);
                  return;
                } else {
                  createDirs(
                    {
                      [projectName]: [folderStructure],
                    },
                    ".",
                    projectName,
                    userName
                  );
                  childProcess.exec(
                    `cd ${projectName} && npm run dev`,
                    (err) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
      //   process.exit();
    });
  });
};

createProjectCommand();
