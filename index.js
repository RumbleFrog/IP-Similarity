const Similarities = require('./lib/Similarities');
const Table = require('cli-table2');
const Inquirer = require('inquirer');

let table = new Table();

// const CIDR = new Similarities.CIDR('lol');

Inquirer.prompt([{type:'input',name:'ips',message:'Enter IPs: '}]).then((answers) => {
  let IPs = answers.ips.split(' ');

  let table = new Table({head: IPs});

  let sHostname, bVPN, sCountry, sRegion, sCity, iZip = []; 


})
