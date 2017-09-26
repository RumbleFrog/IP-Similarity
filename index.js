const Similarities = require('./lib/Similarities');
const Table = require('cli-table2');
const Inquirer = require('inquirer');

// const CIDR = new Similarities.CIDR('lol');

Inquirer.prompt([{type:'input',name:'ips',message:'Enter IPs: '}]).then((answers) => {

})
