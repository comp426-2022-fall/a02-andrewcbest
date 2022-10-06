#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";

// pass in arguments
const args = minimist(process.argv.slice(2));

// set defaults
let timezone = moment.tz.guess();
let latitude = 35.9;
let longitude = 75.1;
let days = 1;

// show help if requested
if (args.h){
    show_help();
}

// read in coordinate
if(args.n){
  latitude = args.n;
}
if(args.s){
  latitude = -args.s;
}
if(args.e){
  longitude = args.e;
}
if(args.w){
  longitude = args.w;
}
// read in day
if(args.d){
  days = args.d 
}
// read in timezone
if(args.z){
  timezone = args.z
}

// get data from API
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&temperature_unit=fahrenheit&timezone=' + timezone);
const data = await response.json();

// print data if requested
if (args.j){
  console.log(data)
  process.exit(0)
}

// print day
if (days == 0) {
  console.log("Today:")
} else if (days > 1) {
  console.log("In " + days + "Days:")
} else {
  console.log("Tomorrow:")
}

// print whether you need galoshes
if(data.daily.precipitation_hours[days] == 0){
  console.log("No need for galoshes!")
}
else{
  console.log("Wear your galoshes!")
}

// output for help
function show_help(){
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("    -h            Show this help message and exit.");
    console.log("    -n, -s        Latitude: N positive; S negative.");
    console.log("    -e, -w        Longitude: E positive; W negative.");
    console.log("    -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("    -j            Echo pretty JSON from open-meteo API and exit.");

    process.exit(0);
}











