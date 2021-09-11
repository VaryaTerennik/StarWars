// const http = require('http');
const express = require('express')
const fs = require('fs')
const axios = require('axios')
const app = express()

// http
//   .createServer(function (request, response) {
//     response.setHeader(
//       'Content-Type',
//       'text/html; charset=utf-8;'
//     )
    // response.setHeader(
    //     'Access-Control-Allow-Origin',
    //     '*'
    //   );


app.use(function (request, response, next) {
  let now = new Date()
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  let data = `${hour}:${minutes}:${seconds} ${
    request.method
  } ${request.url} ${request.get('user-agent')}`
  console.log(data)
  fs.appendFile('server.log', data + '\n', function () {})
  next()
})

app.get('/', function (request, response) {
  response.send('Hello')
})

// app.get('/people', function (request, response) {
//   let oPeopleData = new Array();

//   let fnProcess = function(oResponse){
//     let oData = oResponse.data
//     oPeopleData = oPeopleData.concat(oData.results)
//     if(oData.next) {
//       fnCallAxios(oData.next);
//     } else {
//       response.send(oPeopleData);
//     }
//   }

//  let fnCallAxios = function(sUrl) {
//   axios({
//     method: 'get',
//     url: sUrl
//   }).then(fnProcess);

// }

// fnCallAxios("https://swapi.dev/api/people/");

// })

// app.get('/films', function (request, response) {
//   let oFilmsData = new Array();

//   let fnProcess = function(oResponse){
//     let oData = oResponse.data
//     oFilmsData = oFilmsData.concat(oData.results)
//     if(oData.next) {
//       fnCallAxios(oData.next);
//     } else {
//       response.send(oFilmsData);
//     }
//   }

//  let fnCallAxios = function(sUrl) {
//   axios({
//     method: 'get',
//     url: sUrl
//   }).then(fnProcess);

// }

// fnCallAxios("https://swapi.dev/api/films/");

// })

// response.setHeader(
//   'Access-Control-Allow-Origin',
//   '*'
// );

let fnGetInformation = function(sObj, startUrl) {

  app.get(sObj, function (request, response) {
    response.setHeader(
      'Access-Control-Allow-Origin',
      '*'
    );
    let oInformData = new Array();
  
    let fnProcess = function(oResponse){
      let oData = oResponse.data
      oInformData = oInformData.concat(oData.results)
      if(oData.next) {
        fnCallAxios(oData.next);
      } else {
        response.send(oInformData);
      }
    }
  
   let fnCallAxios = function(sUrl) {
    axios({
      method: 'get',
      url: sUrl
    }).then(fnProcess);
  
  }
  fnCallAxios(startUrl);
  })

}

fnGetInformation('/films', "https://swapi.dev/api/films/");
fnGetInformation('/people', "https://swapi.dev/api/people/");
fnGetInformation('/planets', "https://swapi.dev/api/planets/");
fnGetInformation('/starships', "https://swapi.dev/api/starships/");


app.listen(3000)