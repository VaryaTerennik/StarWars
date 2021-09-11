let oRouter = new Router()
let sHash = window.location.hash;

if(!sHash) {
  sHash = "#actors";
}

let oModel = new Model();

let oActorsAjax = $.ajax ({
  url: "http://localhost:3000/people",
  success: function (oResponse) {
    let aActorsData = oResponse;
    oModel.actors = aActorsData.map((oActorData, index) => {
      return new Actor(oActorData, index);
    });
  }
});

let oStarshipsAjax = $.ajax ({
  url: "http://localhost:3000/starships",
  success: function (oResponse) {
    let aStarshipsData = oResponse;
    oModel.starships = aStarshipsData.map((oStarshipData, index) => {
      return new Starship(oStarshipData, index);
    });
  }
});

let oFilmsAjax = $.ajax ({
  url: "http://localhost:3000/films",
  success: function (oResponse) {
    let aFilmsData = oResponse;
    oModel.films = aFilmsData.map((oFilmData, index) => {
      return new Film(oFilmData, index);
    });
  }
});

Promise.all([oActorsAjax, oStarshipsAjax, oFilmsAjax]).then(() =>{
  oRouter.init(sHash);
})


window.onload = function () {

  fnHandlePress = function (event) {
    let oTableRow = event.currentTarget;
    let sId = oTableRow.getAttribute("id");
    let fnDefineRoute = function(sCurrentHash) {
      switch(sCurrentHash) {
      case "#actors":
        return "#actorDetail" + "/" + sId;
      case "#starships":
        return "#starshipDetail"+ "/" + sId;
        case "#films":
          return "#filmDetail" + "/" + sId;
      }
    }
    let sHash = window.location.hash;
    let sRoute = fnDefineRoute(sHash);
    oRouter.navigateTo(sRoute, true, sId);
    // let oSelectedActor = aActors.find(function(oActor) {
    //   return oActor.index == sId;
    // });
    // oSelectedActor.renderDetail();
  };

  fnReturnBack = function(event) {
    let sHash = window.location.hash;
    if(sHash.includes("/")) {
      let arrsHashString = sHash.split("/");
      sId = arrsHashString[1];
  }
    let fnNewDefineRoute = function(sPreviousHash) {
      switch(sPreviousHash) {
      case "#actorDetail" + "/" + sId:
        return "#actors";
      case "#starshipDetail"+ "/" + sId:
        return "#starships";
        case "#filmDetail" + "/" + sId:
          return "#films";
      }
    }
    let sRoute = fnNewDefineRoute(sHash);
    oRouter.navigateTo(sRoute, true);
  };

  fnHandlePressAnotherDetail = function (event) {
    let one = document.querySelector(".detail-actors-list-content");
    let two = document.querySelector(".detail-film-list-content");
    let three = document.querySelector(".detail-starships-list-content");
    let oTableRow = event.currentTarget;
    let infoHash;
   if(one !== null && one.contains(oTableRow)) {
    infoHash = oTableRow.closest(".detail-actors-list-content").className;
   } else if(two !== null && two.contains(oTableRow)) {
    infoHash = oTableRow.closest(".detail-film-list-content").className;
   } else if(three !== null && three.contains(oTableRow)) {
    infoHash = oTableRow.closest(".detail-starships-list-content").className;
   }
    console.log(infoHash);
    let sHash;
    if(infoHash.includes("actors")){
      sHash = "#actorDetail";
    } else if(infoHash.includes("film")) {
      sHash = "#filmDetail";
    } else if(infoHash.includes("starships")){
      sHash = "#starshipDetail";
    }
    let sId = oTableRow.getAttribute("id");
    let fnDefineRoute = function(sCurrentHash) {
      switch(sCurrentHash) {
      case "#actorDetail":
        return "#actorDetail" + "/" + sId;
      case "#starshipDetail":
        return "#starshipDetail"+ "/" + sId;
        case "#filmDetail":
          return "#filmDetail" + "/" + sId;
      }
    }
    let sRoute = fnDefineRoute(sHash);
    oRouter.navigateTo(sRoute, true, sId);
  };

};