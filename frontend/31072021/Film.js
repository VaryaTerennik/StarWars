class Film {
  constructor (oData, index) {
    this.index = index;
    this.title = oData.title;
    this.episode_id = oData.episode_id;
    this.director = oData.director;
    this.producer = oData.producer;
    this.release_date = oData.release_date;

    
    this.charactersUrls = oData.characters;
    this.planetsUrls = oData.planets; 
    this.starshipsUrls = oData.starships;
    this.charactersData = [];
    this.planetsData = []; 
    this.starshipsData = [];

    this.getCharacters();
    this.getPlanets();
    this.getStarShips();
  }

  getStarShips() {
    let aPromises = this.starshipsUrls.map(function(sUrl){
      let oPromise = new Promise((resolve, reject) => {
        $.ajax({
          url: sUrl,
          success: (oResponse) => {
            resolve(oResponse);
          },
          error: (oError) => {
            reject(oError);
          }
        });
      });

      return oPromise;
    });
    return Promise.all(aPromises).then((aData) => {
      this.starshipsData = aData;
      
    });
  }


  getCharacters() {
    let aPromises = this.charactersUrls.map(function(sUrl){
      let oPromise = new Promise((resolve, reject) => {
        $.ajax({
          url: sUrl,
          success: (oResponse) => {
            resolve(oResponse);
          },
          error: (oError) => {
            reject(oError);
          }
        });
      });

      return oPromise;
    });
    return Promise.all(aPromises).then((aData) => {
      this.charactersData = aData;
      
    });
  }
  
  getPlanets() {
    let aPromises = this.planetsUrls.map(function(sUrl){
      let oPromise = new Promise((resolve, reject) => {
        $.ajax({
          url: sUrl,
          success: (oResponse) => {
            resolve(oResponse);
          },
          error: (oError) => {
            reject(oError);
          }
        });
      });

      return oPromise;
    });
    return Promise.all(aPromises).then((aData) => {
      this.planetsData = aData;
    });
  }

  renderDetail() {
    document.querySelector(".detail").innerHTML = "";
    let sTemplate = document.querySelector("#film-detail").innerHTML;
    // Подставляем ниша значения в шаблон
    Object.keys(this).forEach((sKey) => {
      sTemplate = sTemplate.replace('$' + `{${sKey}}`, this[sKey]);
    });
    sTemplate = sTemplate.replace("${charactersList}", Actor.renderDetailTableRow(this.charactersData));
    // sTemplate = sTemplate.replace("${planetsList}", Planet.renderDetailTableRow(this.planetsData));
    sTemplate = sTemplate.replace("${starshipsList}", Starship.renderDetailTableRow(this.starshipsData));
    document.querySelector(".detail").innerHTML += sTemplate;
    document.querySelector(".list").style.display = "none";
    document.querySelector("#actor-detail").style.display = "none";
    document.querySelector("#starship-detail").style.display = "none";
    document.querySelector(".film-detail").style.width = "100%";
    document.querySelector(".film-detail").style.background ="black";
  }


  static renderDetailTableRow (aData) {
    return `
      <div class="detail-films-list">
        <div class="detail-film-list-head">
        <div class="detail-film-list-head-cell">Title</div>
        <div class="detail-film-list-head-cell">Episode ID</div>
        <div class="detail-film-list-head-cell">Director</div>
        <div class="detail-film-list-head-cell">Producer</div>
        <div class="detail-film-list-head-cell">Release date</div>
        </div>
        <div class="detail-film-list-content">
          ${aData.map(oData => {
            let arrUrlString = oData.url.split("/");
            let index = arrUrlString[arrUrlString.length-2];
            return `
              <div class="detail-table-row">
              <div id="${index}" class="detail-table-cell" onclick="fnHandlePressAnotherDetail(event)">${oData.title}</div>
                <div class="detail-table-cell">${oData.episode_id}</div>
                <div class="detail-table-cell">${oData.director}</div>
                <div class="detail-table-cell">${oData.producer}</div>
                <div class="detail-table-cell">${oData.release_date}</div>
              </div>
          `;
          }).join("")}
        </div>
      </div>
    `;
  }

  renderTableRow() {
    return `
      <tr id="${this.index}" class="actor-row" onclick="fnHandlePress(event)">
        <td>${this.title}</td>
        <td>${this.episode_id}</td>
        <td>${this.director}</td>
        <td>${this.producer}</td>
        <td>${this.release_date}</td>
      </tr>
    `;
  }

  static renderTable(aFilms) {
    let sHtml = `
    <div class="films">
      <table border="1" cols="6" cellpadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Episide ID</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release date</th>
          </tr>
        </thead>
        <tbody>
          ${aFilms.map(oFilm => oFilm.renderTableRow()).join("")}
        </tbody>
      </table>
    </div>
  `;
  document.querySelector(".list").innerHTML = sHtml;
  document.querySelector(".list").style.display = "block";
  document.querySelector("#film-detail").style.display = "none";
  document.querySelector("#starship-detail").style.display = "none";
  document.querySelector("#actor-detail").style.display = "none";
  document.querySelector(".detail").style.width = "none";
  }
}