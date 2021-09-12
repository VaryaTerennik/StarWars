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

app.get('/people/:id', function (request, response) {
  let sId = request.params.id
  axios({
    method: 'get',
    url: `https://swapi.dev/api/people/${sId}`
  }).then((oResponse) => {
    let oPersonData = oResponse.data

    let fnGetInfo = (sUrl) => {
      return axios({
        method: 'get',
        url: sUrl
      })
    }

    let filmsData = oPersonData.films.map(fnGetInfo)
    let starshipsData = oPersonData.starships.map(fnGetInfo)
    let homePlanet = axios({
      method: 'get',
      url: oPersonData.homeworld
    })

    Promise.all([Promise.all(filmsData), Promise.all(starshipsData), homePlanet]).then((aData)=> {
      console.log(aData[2].data);
      oPersonData.homeworld = aData[2].data
      oPersonData.films = aData[0].map(el=>el.data)
      oPersonData.starships = aData[1].map(el=>el.data)
      response.send(oPersonData)
    })
    
  });
})

app.get('/starships/:id', function (request, response) {
  let sId = request.params.id
  axios({
    method: 'get',
    url: `https://swapi.dev/api/starships/${sId}`
  }).then((oResponse) => {
    let oStarshipData = oResponse.data

    let fnGetInfo = (sUrl) => {
      return axios({
        method: 'get',
        url: sUrl
      })
    }

    let filmsData = oStarshipData.films.map(fnGetInfo)

    Promise.all([Promise.all(filmsData)]).then((aData)=> {
      console.log(aData[0].data);
      oStarshipData.films = aData[0].map(el=>el.data)
      response.send(oStarshipData)
    })
    
  });
})

app.get('/films/:id', function (request, response) {
  let sId = request.params.id
  axios({
    method: 'get',
    url: `https://swapi.dev/api/films/${sId}`
  }).then((oResponse) => {
    let oFilmsData = oResponse.data

    let fnGetInfo = (sUrl) => {
      return axios({
        method: 'get',
        url: sUrl
      })
    }

    let charactersData = oFilmsData.characters.map(fnGetInfo)
    let planetsData = oFilmsData.planets.map(fnGetInfo)
    let starshipsData = oFilmsData.starships.map(fnGetInfo)

    Promise.all([Promise.all(planetsData), Promise.all(starshipsData), Promise.all(charactersData)]).then((aData)=> {
      console.log(aData[2].data);
      oFilmsData.planets = aData[0].map(el=>el.data)
      oFilmsData.starships = aData[0].map(el=>el.data)
      oFilmsData.characters = aData[1].map(el=>el.data)
      response.send(oFilmsData)
    })
    
  });
})


app.get('/films/:id', function (request, response) {
  let sId = request.params.id
  axios({
    method: 'get',
    url: `https://swapi.dev/api/films/${sId}`
  }).then((oResponse) => {
    let oFilmsData = oResponse.data

    let fnGetInfo = (sUrl) => {
      return axios({
        method: 'get',
        url: sUrl
      })
    }

    let charactersData = oFilmsData.characters.map(fnGetInfo)
    let planetsData = oFilmsData.planets.map(fnGetInfo)
    let starshipsData = oFilmsData.starships.map(fnGetInfo)

    Promise.all([Promise.all(planetsData), Promise.all(starshipsData), Promise.all(charactersData)]).then((aData)=> {
      console.log(aData[2].data);
      oFilmsData.planets = aData[0].map(el=>el.data)
      oFilmsData.starships = aData[0].map(el=>el.data)
      oFilmsData.characters = aData[1].map(el=>el.data)
      response.send(oFilmsData)
    })
    
  });
})
  
app.listen(3000)