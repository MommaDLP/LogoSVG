// TODO: Include packages needed for this application. 

const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');
const SVG =require('./lib/svg');

// TODO: Create an array of questions for user input
// maxLength will be needed for validation function on character limit. 

const questions = [
    // Question 1 
    {
        type: "input",
        message: "Please enter up to 3 characters for your logo.",
        name: "text"
    },
    // Question 2
    {
        type: "input",
        message: "Please enter in a color choice for your logo text.",
        name: "textcolor"
    },
    // Question 3
    {
        type: "list",
        message: "Please select a shape style for your logo.",
        name: "shape",
        choices: ["Triangle","Circle","Square"]
    },
    // Question 4
    {
        type: "input",
        message: "Please enter in the color of your logo shape.",
        name: "shapeColor"
    }
];

// TODO: Create a function to write SVG to file

const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        err ? console.error(err) : console.log('Generated logo.svg!')
   })
};

// TODO: Create a function to initialize app

// Change out 'shape goes here' to actual SVG file that will be saved. 
function init () {
    inquirer
        .prompt(questions).then((data) => {

            const {text, textcolor, shape, shapeColor} = data
            const svg = new SVG();
            let shapeObject;
            if (shape === "Triangle") {
                shapeObject = new Triangle();
            } else if (shape === "Circle") {
                shapeObject = new Circle();
            } else if (shape === 'Square') {
                shapeObject = new Square();
            }
            shapeObject.setColor(shapeColor);
            svg.setShape(shapeObject);
            svg.setText(text, textcolor)
            writeToFile('logo.svg', svg.render());
        });
    } 

// Function call to initialize app

init();