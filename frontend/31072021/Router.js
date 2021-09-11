class Router {
    constructor() {
        this.sRoutes = ["#actors", "#actorDetail", "#straships", "#starshipDetail", "#films", "#filmDetail", "#planets", "#planetDetail"]
        this.CurrentHash = "";
        this.PreviousHash = "";
        this.History = [];
        this.DefaultHash = "actors";
        this.ButtonBackVisiblity = false;
    }

    init(sHash) {
        this.sCurrentHash = sHash;
        window.location.hash = sHash;
        this.navigateTo(sHash, false);
    }

    navigateTo(sRoute, bChangeHash, sId) {
        if(bChangeHash) {
            this.sPreviousHash = this.sCurrentHash;
            this.History.push(this.sPreviousHash);
            this.sCurrentHash = sRoute;
            window.location.hash = this.sCurrentHash;
        }
        if(sRoute.includes("/")) {
            let arrRouteString = sRoute.split("/");
            sId = arrRouteString[1];
        }
        switch(sRoute) {
            case "#actors":
                // 1. Получить данные
                Actor.renderTable(oModel.actors);
            break;
                // 2. Отрисовать
                // 3. Показать
            case "#actorDetail" + "/" + sId:
                let oSelectActor = oModel.actors.find(function(oActor,index){
                    return sId == index;
                });
                console.log(oSelectActor);
                if(!oSelectActor) {
                    $.ajax ({
                        url: "https://swapi.dev/api/people/" + sId,
                        success: function (oResponse) {
                            oSelectActor = new Actor(oResponse);
                            Promise.all([oSelectActor.getHomeworld(),oSelectActor.getStarShips(), oSelectActor.getFilms()]).then(function(){
                                oSelectActor.renderDetail();
                            });
                        }
                      });
                } else {
                Promise.all([oSelectActor.getHomeworld(),oSelectActor.getStarShips(), oSelectActor.getFilms()]).then(function(){
                        oSelectActor.renderDetail();
                    });
                }
            break; 
            case "#starships":
                Starship.renderTable(oModel.starships);
            break;
            case "#starshipDetail" + "/" + sId:
                let oSelectStarship = oModel.starships.find(function(oStarship,index){
                    return sId == index;
                });
                if (!oSelectStarship) {
                    $.ajax ({
                        url: "https://swapi.dev/api/starships/"+ sId,
                        success: function (oResponse) {
                            oSelectStarship = new Starship(oResponse);
                            Promise.all([oSelectStarship.getPilots(), oSelectStarship.getFilms()]).then(function(){
                                oSelectStarship.renderDetail()
                            });
                        }   
                      });
                } else { Promise.all([oSelectStarship.getPilots(), oSelectStarship.getFilms()]).then(function(){
                    oSelectStarship.renderDetail();
                    });
                }
            break; 
            case "#films":
                Film.renderTable(oModel.films);
            break;
            case "#filmDetail" + "/" + sId:
                let oSelectFilm = oModel.films.find(function(oFilm,index){
                    return sId == index;
                });
                if(!oSelectFilm) {
                    $.ajax ({
                        url: "https://swapi.dev/api/films/"+ sId,
                        success: function (oResponse) {
                           oSelectFilm = new Film(oResponse);
                           Promise.all([oSelectFilm.getCharacters(), oSelectFilm.getPlanets(), oSelectFilm.getStarShips()]).then(function(){
                            oSelectFilm.renderDetail();
                        });
                        }
                      });
                } else { Promise.all([oSelectFilm.getCharacters(), oSelectFilm.getPlanets(), oSelectFilm.getStarShips()]).then(function(){
                        oSelectFilm.renderDetail();
                    });
                }
            break; 

        }
    }
}