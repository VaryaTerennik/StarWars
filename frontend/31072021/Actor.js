class Actor {
  constructor(oData, index) {
    this.index = index;
    this.name = oData.name;
    this.height = oData.height;
    this.mass = oData.mass;
    this.hair_color = oData.hair_color;
    this.skin_color = oData.skin_color;
    this.eye_color = oData.eye_color;
    this.birth_year = oData.birth_year;
    this.gender = oData.gender;
    this.homeWorldUrl = oData.homeworld;
    this.homeWorldData = {};
    this.starshipsUrls = oData.starships;
    this.filmsUrls = oData.films;
    this.filmsData = [];
    this.starshipsData = [];
    this.arrActorBackground = [
  "https://i.pinimg.com/736x/a7/46/dd/a746ddb605398e2fa60a55235319a157.jpg", 
  "http://img0.reactor.cc/pics/post/C-3PO-SW-%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%B6%D0%B8-%D0%97%D0%B2%D0%B5%D0%B7%D0%B4%D0%BD%D1%8B%D0%B5-%D0%92%D0%BE%D0%B9%D0%BD%D1%8B-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-2681366.jpeg", 
  "https://fsa.zobj.net/crop.php?r=KUxDD938F-qhYGMvy6E7pNWyJwsVOygwad9WvwcwxWxsU7tqsLhgqldAJeG6--VFkgosO-A8R-t8XpWIEGHmnFw9v074keN5reDm6pX_IATP6IfyZZJQeu_GNty5vcyZOfHthzWwZTyFFDBz",
  "https://img0.etsystatic.com/000/0/5878739/il_fullxfull.193232648.jpg",
  "http://img1.reactor.cc/pics/post/%D0%97%D0%B2%D0%B5%D0%B7%D0%B4%D0%BD%D1%8B%D0%B5-%D0%92%D0%BE%D0%B9%D0%BD%D1%8B-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-SW-%D0%9F%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%B6%D0%B8-%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B5%D1%81%D1%81%D0%B0-%D0%9B%D0%B5%D1%8F-3835319.jpeg",
  "http://jc.centax.ru/images/stories/peoples/Young_owen.jpg",
  "https://i.pinimg.com/originals/2b/bb/71/2bbb712405c574c6ce78730e00464a8e.jpg",
  "https://news.toyark.com/wp-content/uploads/sites/4/2015/04/Sideshow-Star-Wars-Sixth-Scale-R5-D4-Teaser.jpg",
  "https://www.scifinow.co.uk/wp-content/uploads/2019/08/20180925232534_83.jpg",
  "https://wikiofnerds.com/wp-content/uploads/2021/06/2020_0124_obiwan.jpg"
];

     this.getHomeworld();
    // this.getFilms();
    // this.getStarShips();
  }
  setProperty(sProperty, sValue) {
    this[sProperty] = sValue;
  }
  getProperty(sProperty) {
    return this[sProperty];
  }
  getHomeworld() {
    return $.ajax({
      url: this.homeWorldUrl,
      async: false,
      success: (oResponse) => {
        this.homeWorldData = oResponse;
        // console.log(this.homeWorldData);
      }
    });
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
    return Promise.all(aPromises).then((aData) => {
      this.filmsData = aData;
      // console.log(this.filmsData);
    });
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
      // console.log(this.starshipsData);
    });
  }
  renderTableRow() {
    return `
      <tr id="${this.index}" class="actor-row" onclick="fnHandlePress(event)">
        <td>${this.name}</td>
        <td>${this.gender}</td>
        <td>${this.birth_year}</td>
        <td>${this.height}</td>
        <td>${this.mass}</td>
        <td>${this.homeWorldData.name}</td>
      </tr>
    `;
  }

  static renderDetailTableRow (aData) {
    return `
      <div class="detail-actors-list">
        <div class="detail-actors-list-head">
        <div class="detail-actors-list-head-cell">Name</div>
        <div class="detail-actors-list-head-cell">Gender</div>
        <div class="detail-actors-list-head-cell">Birth Year</div>
        <div class="detail-actors-list-head-cell">Height</div>
        <div class="detail-actors-list-head-cell">Mass</div>
        
        </div>
        <div class="detail-actors-list-content">
          ${aData.map(oData => {
            let arrUrlString = oData.url.split("/");
            let index = arrUrlString[arrUrlString.length-2];
            return `
              <div class="detail-table-row">
                <div id="${index}"class="detail-table-cell" onclick="fnHandlePressAnotherDetail(event)">${oData.name}</div>
                <div class="detail-table-cell">${oData.gender}</div>
                <div class="detail-table-cell">${oData.birth_year}</div>
                <div class="detail-table-cell">${oData.height}</div>
                <div class="detail-table-cell">${oData.mass}</div>
               
              </div>
          `;
          }).join("")}
        </div>
      </div>
    `;
  }

  renderDetail() {
    document.querySelector(".detail").innerHTML = "";
    let sTemplate = document.querySelector("#actor-detail").innerHTML;
    // Подставляем ниша значения в шаблон
    Object.keys(this).forEach((sKey) => {
      sTemplate = sTemplate.replace('$' + `{${sKey}}`, this[sKey]);
    });
    Object.keys(this.homeWorldData).forEach((sKey) => {
      sTemplate = sTemplate.replace('$' + `{homeworld.${sKey}}`, this.homeWorldData[sKey])
    });
    sTemplate = sTemplate.replace("${filmsList}", Film.renderDetailTableRow(this.filmsData));
    sTemplate = sTemplate.replace("${starshipsList}", Starship.renderDetailTableRow(this.starshipsData));
    document.querySelector(".detail").innerHTML += sTemplate;
    document.querySelector(".list").style.display = "none";
    document.querySelector("#film-detail").style.display = "none";
    document.querySelector("#starship-detail").style.display = "none";
    document.querySelector(".actor-detail").style.width = "100%";
    let newBack = this.arrActorBackground[this.index];
    // console.log(newBack);
    document.querySelector(".actor-detail").style.background ="url(" + newBack + ") center no-repeat black";
  }

  static renderTable(aActors) {
    let sHtml = `
    <div class="actors">
      <table border="1" cols="6" cellpadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
          </tr>
        </thead>
        <tbody>
          ${aActors.map(oActor => oActor.renderTableRow()).join("")}
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