class Starship {
  constructor (oData, index) {
    this.index = index;
    this.name = oData.name;
    this.model = oData.model;
    this.manufacturer = oData.manufacturer;
    this.cost_in_credits = oData.cost_in_credits;
    this.length = oData.length;
    this.max_atmosphering_speed = oData.max_atmosphering_speed;
    this.crew = oData.crew;
    this.passengers = oData.passengers;
    this.cargo_capacity = oData.cargo_capacity;
    this.consumables = oData.consumables;
    this.hyperdrive_rating = oData.hyperdrive_rating;
    this.MGLT = oData.MGLT;
    this.starship_class = oData.starship_class;

    this.pilotsUrls = oData.pilots;
    this.pilotsData = [];
    this.filmsUrls = oData.films;
    this.filmsData = [];

    this.getFilms();
    this.getPilots();
  }

  getFilms() {
    let aPromises = this.filmsUrls.map(function(sUrl){
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
    Promise.all(aPromises).then((aData) => {
      this.filmsData = aData;
      // console.log(this.filmsData);
    });
  }

  getPilots() {
    let aPromises = this.pilotsUrls.map(function(sUrl){
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
    Promise.all(aPromises).then((aData) => {
      this.pilotsData = aData;
      // console.log(this.pilotsData);
    });
  }

  static renderDetailTableRow (aData) {
    return `
      <div class="detail-starships-list">
        <div class="detail-starships-list-head">
        <div class="detail-starships-list-head-cell">Name</div>
        <div class="detail-starships-list-head-cell">Model</div>
        <div class="detail-starships-list-head-cell">Manufacturer</div>
        <div class="detail-starships-list-head-cell">Starship class</div>
        <div class="detail-starships-list-head-cell">Max athmosphering speed</div>
        </div>
        <div class="detail-starships-list-content">
          ${aData.map(oData => {
            let arrUrlString = oData.url.split("/");
            let index = arrUrlString[arrUrlString.length-2];
            return `
              <div  id="${index}" class="detail-table-row" onclick="fnHandlePressAnotherDetail(event)">
                <div class="detail-table-cell">${oData.name}</div>
                <div class="detail-table-cell">${oData.model}</div>
                <div class="detail-table-cell">${oData.manufacturer}</div>
                <div class="detail-table-cell">${oData.starship_class}</div>
                <div class="detail-table-cell">${oData.max_atmosphering_speed}</div>
              </div>
          `;
          }).join("")}
        </div>
      </div>
    `;
  }

  renderDetail() {
    document.querySelector(".detail").innerHTML = "";
    let sTemplate = document.querySelector("#starship-detail").innerHTML;
    // Подставляем ниша значения в шаблон
    Object.keys(this).forEach((sKey) => {
      sTemplate = sTemplate.replace('$' + `{${sKey}}`, this[sKey]);
    });
    // Object.keys(this.homeWorldData).forEach((sKey) => {
    //   sTemplate = sTemplate.replace('$' + `{homeworld.${sKey}}`, this.homeWorldData[sKey])
    // });
    sTemplate = sTemplate.replace("${filmsList}", Film.renderDetailTableRow(this.filmsData));
    sTemplate = sTemplate.replace("${pilotsList}", Actor.renderDetailTableRow(this.pilotsData));
    document.querySelector(".detail").innerHTML += sTemplate;
    document.querySelector(".list").style.display = "none";
    document.querySelector("#actor-detail").style.display = "none";
    document.querySelector("#film-detail").style.display = "none";
    document.querySelector(".starship-detail").style.width = "100%";
    document.querySelector(".starship-detail").style.background ="black";
    // let newBack = this.arrActorBackground[this.index];
    // console.log(newBack);
    // document.querySelector(".actor-detail").style.background ="url(" + newBack + ") center no-repeat black";
  }


  renderTableRow() {
    return `
      <tr id="${this.index}" class="actor-row" onclick="fnHandlePress(event)">
        <td>${this.name}</td>
        <td>${this.model}</td>
        <td>${this.manufacturer}</td>
        <td>${this.cost_in_credits}</td>
        <td>${this.length}</td>
        <td>${this.passengers}</td>
        <td>${this.crew}</td>
      </tr>
    `;
  }

  static renderTable(aStarships) {
    let sHtml = `
    <div class="starships">
      <table border="1" cols="6" cellpadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost in credits</th>
            <th>Lengtht</th>
            <th>Passengers</th>
            <th>Crew</th>
          </tr>
        </thead>
        <tbody>
          ${aStarships.map(oStarship => oStarship.renderTableRow()).join("")}
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