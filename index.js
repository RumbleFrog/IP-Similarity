const Similarities = require('./lib/Similarities');
const Table = require('cli-table2');
const Inquirer = require('inquirer');
const DNS = require('dns');
const GeoIP = require('geoip-lite');

let table = new Table();

// const CIDR = new Similarities.CIDR('lol');

Inquirer.prompt([{type:'input',name:'ips',message:'Enter IPs: '}]).then((answers) => {
  let IPs = answers.ips.split(' ');

  let table = new Table({head: IPs});

  let sHostname, bVPN, sCountry, sRegion, sCity, iZip = [];

  IPs.forEach((ip) => {
    DNS.resolveNs(ip, (err, addresses) => {
      sHostname.push(addresses[0]);
      bVPN.push(new Similarities.CIDR(ip).isVPN());

      let geo = GeoIP.lookup(ip);

      sCountry.push(geo.country);
      sRegion.push(geo.region);
      sCity.push(geo.city);
      iZip.push(geo.zip);
    });
  });

  table.push(
    {'Hostname': sHostname},
    {'Is VPN': bVPN},
    {'Country': sCountry},
    {'Region': sRegion},
    {'City': sCity},
    {'Zip Code': iZip}
  );

  console.log(table.toString());


});
