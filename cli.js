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

// read in day
if (args.d){
  console.log("hi");
  days = args.d;
}

if(args.d == 0){
  days = 0;
}

// read in coordinate
if(args.n){
  // chek if valid
  if(args.n < 0){
    console.log("Latitude must be in range")
    process.exit(0)
  }

  latitude = Math.round((args.n * 100)/100)
}
if(args.s){
  //check if valid
  if(args.s > 0){
    console.log("Latitude must be in range")
    process.exit(0)
  }

  latitude = Math.round((-args.s * 100) / 100);

}
if(args.e){
  //check if valid
  if(args.e < 0){
    console.log("Longitude must be in range")
    process.exit(0)
  }
  longitude = args.e;
}
if(args.w){
  //check if valid
  if(args.w < 0){
    console.log("Longitude must be in range")
    process.exit(0)
  }
  longitude = args.w;
}

// read in timezone
if(args.z){
  timezone = args.z;
}

if(args.t){
  timezone = args.t;
}



// get data from API
const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=" + timezone);
                             
const data = await response.json();

// print data if requested
if (args.j){
  console.log(data)
  process.exit(0)
}

// print day
console.log(days)
if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + "days.")
} else {
  console.log("tomorrow.")
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











