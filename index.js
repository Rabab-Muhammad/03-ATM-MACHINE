#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Initialize user Balance and Pin Code
let myBalance = 20000; //DOLLAR
let myPin = 5678;
//Print Welcome Message
console.log(chalk.blue("\n \tWelcome To My - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your 4 digit pin code:"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n\tCorrect Pin Code, Login Sucessfully!\n"));
    // console.log(`Your Current Account Balance is ${myBalance}`)
    let optionAnswer = await inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Please select option",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (optionAnswer.options === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "please select withdrawal Method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "FastCash",
                    type: "list",
                    message: "select amount",
                    choices: [5000, 10000, 15000, 20000, 25000]
                }
            ]);
            if (fastCashAns.FastCash > myBalance) {
                console.log(chalk.red("\n\tInsufficient Balance\n"));
            }
            else {
                myBalance -= fastCashAns.FastCash;
                console.log(`${fastCashAns.FastCash} Withdraw Sucessfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAnswer.amount > myBalance) {
                console.log(chalk.red("\n\tInsufficient Balance\n"));
            }
            else {
                myBalance -= amountAnswer.amount;
                console.log(`${amountAnswer.amount} Withdraw Sucessfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (optionAnswer.options) {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("\n\tIncorrect Pin Code, TRY AGAIN!\n"));
}
