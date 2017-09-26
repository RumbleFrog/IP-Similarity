const fs = require('fs');
const request = require('request');
const netmask = require('netmask');


function CIDR (ip) {

  this.cidrs = [];

  if (!fs.existsSync('./storage/cidr.bin'))
    this.downloadCIDR()
  else
    this.cidrs = JSON.parse(fs.readFileSync('./storage/cidr.bin'));

  this.ip = ip;

  return this;
}

CIDR.prototype.isVPN = function () {
  this.cidrs.forEach((cidr) => {
    let block = new netmask(cidr);
  })

  return this.cidrs.some((element, index, array) => {
    let block = new netmask(element);

    return block.contains(this.ip);
  });
}

CIDR.prototype.downloadCIDR = function () {
  request('https://raw.githubusercontent.com/RumbleFrog/CIDR-Blocker/master/parser/storage/parsed.json')
    .pipe(fs.createWriteStream('./storage/cidr.bin'))

  this.cidrs = JSON.parse(fs.readFileSync('./storage/cidr.bin'));

  return this;
}

module.exports = CIDR;
