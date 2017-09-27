const Similarities = require('./lib/Similarities');
const Table = require('cli-table2');
const Inquirer = require('inquirer');
const DNS = require('dns');
const GeoIP = require('geoip-lite');
const Colors = require('colors');

Inquirer.prompt([{type:'input',name:'ips',message:'Enter IPs: '}]).then((answers) => {
  let IPs = answers.ips.split(' ');

  let table = new Table({head: [""].concat(IPs).map(IP => Colors.cyan.bold(IP)), chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }});

  let sHostname = [], bVPN = [], sCountry = [], sRegion = [], sCity = [], iZip = [];

  let i = 1;

  IPs.forEach((ip) => {
    DNS.reverse(ip, (err, hostnames) => {

      i++;

      if (err) return;

      sHostname.push(hostnames[0]);

      bVPN.push(new Similarities.CIDR(ip).isVPN());

      let geo = GeoIP.lookup(ip);

      sCountry.push(geo.country);
      sRegion.push(geo.region);
      sCity.push(geo.city);
      iZip.push(geo.zip);

      if (i > IPs.length) {
        table.push(
          {'Hostname': sHostname},
          {'Is VPN': bVPN},
          {'Country': sCountry},
          {'Region': sRegion},
          {'City': sCity},
          {'Zip Code': iZip}
        );
        console.log(table.toString());
      }
    });
  });
});
