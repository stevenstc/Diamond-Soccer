import React, { Component } from "react";
import cons from "../../cons"
var BigNumber = require('bignumber.js');
BigNumber.config({ ROUNDING_MODE: 3 });

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventario: [],
      itemsYoutube: [],
      balance: "Loading...",
      balanceDCSC: "Loading...",
      balanceUSDT: "Loading...",
      balanceUSDTPOOL: "Loading...",
      balanceGAME: "Loading...",
      priceDCSC: "Loading...",
      email: "Loading...",
      username: "Loading...",
      register: false,
      pais: "country not selected",
      timeWitdrwal: "Loading...",
      botonwit: true,
      paises:[
        "please select a country",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Brazzaville)",
        "Congo",
        "Costa Rica",
        "Cote d'Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor (Timor Timur)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia, The",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea, North",
        "Korea, South",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepa",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia and Montenegro",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
      imagenLink: "assets/avatares/0.png",
      balanceExchange: "loading...",
      minCSC: 0.01,
      maxCSC: 1000,
      payTime: Date.now()+1,
      latesMaches: [],
      coinsdiaria: 0
    }

    this.balance = this.balance.bind(this);
    this.balanceInMarket = this.balanceInMarket.bind(this);
    this.balanceInGame = this.balanceInGame.bind(this);
    this.inventario = this.inventario.bind(this);
    this.inventarioV2 = this.inventarioV2.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.update = this.update.bind(this);
    this.verLates = this.verLates.bind(this);

    this.buyCoins = this.buyCoins.bind(this);
    this.buyCoins2 = this.buyCoins2.bind(this);


  }

  async componentDidMount() {

    this.update();
    
    setInterval(async() => {
      this.update();
    },15*1000);
    
  }

  async update() {
    this.verLates();
    this.balanceInGame();
    this.balance();
    this.balanceInMarket();
    this.inventario();
    this.inventarioV2();

  }

  async balance() {
    var balance = await this.props.wallet.contractToken.methods
    .balanceOf(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    balance = new BigNumber(balance).shiftedBy(-18).toNumber();
    balance = balance.toFixed(3);

    var balanceDCSC = await this.props.wallet.contractToken2.methods
    .balanceOf(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    balanceDCSC = new BigNumber(balanceDCSC).shiftedBy(-18).decimalPlaces(3).toNumber();
  
    var balanceDCSCExchange = await this.props.wallet.contractToken2.methods
    .balanceOf(this.props.wallet.contractExchange._address)
    .call({ from: this.props.currentAccount });

    balanceDCSCExchange = new BigNumber(balanceDCSCExchange).shiftedBy(-18).decimalPlaces(3).toNumber();

    var balanceUSDT = await this.props.wallet.contractToken3.methods
    .balanceOf(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    balanceUSDT = new BigNumber(balanceUSDT).shiftedBy(-18).decimalPlaces(3).toNumber();

    var balanceUSDTPOOL = await this.props.wallet.contractToken3.methods
    .balanceOf(this.props.wallet.contractToken2._address)
    .call({ from: this.props.currentAccount });

    var balanceUSDTPOOL2 = balanceUSDTPOOL;

    balanceUSDTPOOL = new BigNumber(balanceUSDTPOOL).shiftedBy(-18).decimalPlaces(6).toString(10);

    var balanceDCSCPOOL = await this.props.wallet.contractToken2.methods
    .totalSupply()
    .call({ from: this.props.currentAccount });

    var balanceDCSCPOOL2 = balanceDCSCPOOL

    balanceDCSCPOOL = new BigNumber(balanceDCSCPOOL).shiftedBy(-18).decimalPlaces(6).toString(10);

    var priceDCSC = new BigNumber( balanceUSDTPOOL2/balanceDCSCPOOL2).decimalPlaces(6).toString(10);


    var balanceOldDCSC = await this.props.wallet.contractDCSC.methods
      .balanceOf(this.props.currentAccount)
      .call({ from: this.props.currentAccount })
    balanceOldDCSC = new BigNumber(balanceOldDCSC).shiftedBy(-18).decimalPlaces(6).toString(10);
    


    this.setState({
      balance: balance,
      balanceDCSC: balanceDCSC,
      balanceOldDCSC: balanceOldDCSC,
      balanceUSDT: balanceUSDT,
      balanceUSDTPOOL: balanceUSDTPOOL,
      balanceDCSCPOOL: balanceDCSCPOOL,
      priceDCSC: priceDCSC,
      balanceDCSCExchange: (balanceDCSCExchange*priceDCSC).toFixed(3)
    });
  }

  async updateEmail() {
    var email = "example@gmail.com";
    email = await window.prompt("enter your email", "example@gmail.com");

    var disponible = await fetch(cons.API+"api/v1/email/disponible/?email="+email);
    disponible = await disponible.text();

    if( disponible === "false" ){
      alert("email not available");
      return;
    }

    if(window.confirm("is correct?: "+email)){
 
      this.setState({
        email: email
      })
      
      var datos = {};
      
      datos.email = email;
        
      disponible = await fetch(cons.API+"api/v1/email/disponible/?email="+datos.email);
      disponible = await disponible.text();

      if( disponible === "false" ){
        alert("email not available please select a different one");
        return;
      }else{
        var resultado = await fetch(cons.API+"api/v1/user/update/info/"+this.props.currentAccount,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cons.SCKDTT}`
          },
          body: JSON.stringify(datos) 
        });
        
        if(await resultado.text() === "true"){
          alert("Updated game data")
        }else{
          alert("failed to write game data")
        }
      }

      this.update();

      alert("email Updated");

    }

    this.update();
    
  }

  async balanceInMarket() {
    var investor = await this.props.wallet.contractExchange.methods
    .investors(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    var time = await this.props.wallet.contractExchange.methods
    .TIME_CLAIM()
    .call({ from: this.props.currentAccount });

    var min = await this.props.wallet.contractExchange.methods
    .MIN_DCSC()
    .call({ from: this.props.currentAccount });

    min = new BigNumber(min).shiftedBy(-18).toNumber();

    var max = await this.props.wallet.contractExchange.methods
    .MAX_DCSC()
    .call({ from: this.props.currentAccount });

    max = new BigNumber(max).shiftedBy(-18).toNumber();

    time = parseInt(time)*1000;
    investor.payAt = parseInt(investor.payAt)*1000;

    var balance = new BigNumber(investor.balance).shiftedBy(-18).toString(10);

    var resultado = await fetch(cons.API+"api/v1/consultar/csc/cuenta/"+this.props.wallet.contractExchange._address)
    resultado = parseFloat(await resultado.text()).toFixed(2);

    this.setState({

      minCSC: min,
      maxCSC: max,
      balanceMarket: balance,
      balanceExchange: resultado,
      payday: new Date(parseInt(investor.payAt)+parseInt(time)).toString(),
      payTime: investor.payAt+time
    });
  }

  async balanceInGame(){

    var balance = 0;
    var balanceCSC = 0;
    var username = "Please register";
    var emailGame = "email game not set";
    var pais =  "country not selected";
    var timeWitdrwal = "Loading...";
    var imagenLink = "assets/avatares/0.png";

    var register = await fetch(cons.API+"api/v1/user/exist/"+this.props.currentAccount)
    .then(async(result)=>await result.text())
    .catch(()=>{return "false";})

    var coinsdiaria = await fetch(cons.API2+'api/v1/coinsdiaria/')
    coinsdiaria = await coinsdiaria.text();

    if(register === "true"){

      username = await fetch(cons.API+"api/v1/user/username/"+this.props.currentAccount);
      username = await username.text();

      imagenLink = await fetch(cons.API2+"api/v1/imagen/user/?username="+username);
      imagenLink = await imagenLink.text();

      imagenLink= "assets/avatares/"+imagenLink+".png"

      pais = await fetch(cons.API+"api/v1/user/pais/"+this.props.currentAccount);
      pais = await pais.text();

      balance = await fetch(cons.API2+"api/v1/coins/"+this.props.currentAccount)
      balance = await balance.text();

      balanceCSC = await fetch(cons.API2+"api/v1/coinscsc/"+this.props.currentAccount)
      balanceCSC = await balanceCSC.text();

      emailGame = await fetch(cons.API+"api/v1/user/email/"+this.props.currentAccount+"?tokenemail=nuevo123");
      emailGame = await emailGame.text();

      timeWitdrwal = await fetch(cons.API+"api/v1/time/coinsalmarket/"+this.props.currentAccount);
      timeWitdrwal = await timeWitdrwal.text();

    }

    if(username === ""){
      username = "Please register"
      register = false;
    }

    if(emailGame === "false" || emailGame === ""){
      emailGame = "email game not set";
    }

    if(pais === "false" || pais === "" ){
      pais = "country not selected";
    }

    this.setState({
      balanceGAME: balance,
      balanceCSC: balanceCSC,
      username: username,
      register: register,
      emailGame: emailGame,
      pais: pais,
      timeWitdrwal: new Date(parseInt(timeWitdrwal)).toString(),
      imagenLink: imagenLink,
      coinsdiaria: parseFloat(coinsdiaria).toFixed(2)
    });
  }

  async buyCoins2(amount){

    var aprovado = await this.props.wallet.contractToken3.methods
      .allowance(this.props.currentAccount, this.props.wallet.contractToken2._address)
      .call({ from: this.props.currentAccount });

    aprovado = new BigNumber(aprovado).shiftedBy(-18).decimalPlaces(2).toNumber();

    var balance = await this.props.wallet.contractToken3.methods
    .balanceOf(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    balance = new BigNumber(balance).shiftedBy(-18).toNumber();

    var compra = new BigNumber(amount).shiftedBy(18).toString(10);
    amount = new BigNumber(amount).toNumber();

    if(aprovado <= 0){

      alert("insuficient aproved balance")
      await this.props.wallet.contractToken3.methods
      .approve(this.props.wallet.contractToken2._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      .send({ from: this.props.currentAccount });

    }

    if (balance>=amount) {

      this.props.wallet.contractToken2.methods.buyToken(compra).send({ from: this.props.currentAccount })
      .then(()=>{
        alert("coins buyed");
      })
      .catch(()=>{
        alert("transaction fail");
      })
      
      
    }else{
      alert("insuficient founds")
    }

    this.update();

    
  }

  async buyCoins(amount){

    if(true){

      var aprovado = await this.props.wallet.contractToken.methods
        .allowance(this.props.currentAccount, this.props.wallet.contractExchange._address)
        .call({ from: this.props.currentAccount });

      aprovado = new BigNumber(aprovado).shiftedBy(-18).decimalPlaces(2).toNumber();

      var balance = await this.props.wallet.contractToken.methods
      .balanceOf(this.props.currentAccount)
      .call({ from: this.props.currentAccount });

      balance = new BigNumber(balance).shiftedBy(-18).decimalPlaces(2).toNumber();

      var compra = amount+"000000000000000000";
      amount = new BigNumber(amount).decimalPlaces(2).toNumber();

      if(aprovado > 0){

        if (balance>=amount) {

          var result = await this.props.wallet.contractExchange.methods
          .buyCoins(compra)
          .send({ from: this.props.currentAccount });
    
          if(result){
            alert("coins buyed");
          }
          
        }else{
          alert("insuficient founds")
        }

      }else{
        alert("insuficient aproved balance")
        await this.props.wallet.contractToken.methods
        .approve(this.props.wallet.contractExchange._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
        .send({ from: this.props.currentAccount });

      }

    }else{
      alert("this function is not available")
    }

    this.update();

    
  }

  async inventario() {

    var result = await this.props.wallet.contractInventario.methods
    .verInventario(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    var nombres_items = await this.props.wallet.contractInventario.methods
    .verItemsMarket()
    .call({ from: this.props.currentAccount });


    if(result.length > 0){

      var inventario = []

      for (let index = 0; index < result.length; index++) {

        var ventaTeam = (<></>);
        if(result[index]<=10){
          ventaTeam = (
            <button className="btn btn-danger" onClick={async()=>{

              var aprovado = await this.props.wallet.contractToken2.methods
              .allowance(this.props.currentAccount, this.props.wallet.contractInventario._address)
              .call({ from: this.props.currentAccount });

              aprovado = new BigNumber(aprovado).shiftedBy(-18).toNumber();

              if(aprovado <= 0){

                alert("insuficient aproved balance of DCSC")
                await this.props.wallet.contractToken2.methods
                .approve(this.props.wallet.contractInventario._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
                .send({ from: this.props.currentAccount });

              }

              var price = prompt("you must have 1 DCSC in your Metamask wallet for fees, set price in DCSC",20)
              price = new BigNumber(price).shiftedBy(18).toString(10);

              await this.props.wallet.contractInventario.methods
              .SellItemFromMarket( index,this.props.wallet.contractToken2._address, price)
              .send({ from: this.props.currentAccount })

              this.update();
              }}>Sell item</button>
          );
        }

          inventario[index] = (

            <div className="col-md-3 p-1" key={`itemsTeam-${index}`}>
              <img className="pb-4" src={"assets/img/" + nombres_items[0][result[index]] + ".png"} width="100%" alt={"team-"+nombres_items[0][result[index]]} />
              {ventaTeam}
            </div>

          )
      }

    }else{

      var largoInventario = await this.props.wallet.contractMarket.methods
      .largoInventario(this.props.currentAccount)
      .call({ from: this.props.currentAccount });

      var migrado = await this.props.wallet.contractInventario.methods
      .migrado(this.props.currentAccount)
      .call({ from: this.props.currentAccount });

      if(largoInventario > 0 && !migrado){

        var old_inventario = [];

        for (let index = 0; index < largoInventario; index++) {
          const temp = await this.props.wallet.contractMarket.methods
          .inventario(this.props.currentAccount,index)
          .call({ from: this.props.currentAccount });

          if(nombres_items[0].indexOf(temp.nombre) !== -1){
            old_inventario[index] = nombres_items[0].indexOf(temp.nombre);  

          }

        }

        inventario = (
          <><button className="btn btn-warning" onClick={async()=>{
            if(old_inventario.length > 0){
              await this.props.wallet.contractInventario.methods
              .migrar(old_inventario)
              .send({ from: this.props.currentAccount });

            }else{
              alert("try again latter");
            }
            this.update();
            
        }}>Migrate teams to V2</button>
          </>
        )
      }
     
    }

    this.setState({
      inventario: inventario
    })
  }

  async inventarioV2() {

    var result = await this.props.wallet.contractInventario.methods
    .verMarket(this.props.currentAccount)
    .call({ from: this.props.currentAccount });

    var nombres_items = await this.props.wallet.contractInventario.methods
    .verItemsMarket()
    .call({ from: this.props.currentAccount });

    var inventario = []

    for (let index = 0; index < result[0].length; index++) {

        var token = "CSC";

          if(result[2][index] === "0x7Ca78Da43388374E0BA3C46510eAd7473a1101d4"){
            token = "DCSC"
          }

        inventario[index] = (

          <div className="col-md-3 p-1" key={`itemsTeam-${index}`}>
            <img className="pb-4" src={"assets/img/" + nombres_items[0][result[0][index]] + ".png"} width="100%" alt={"team-"+nombres_items[0][result[0][index]]} />
            <p>Price: {new BigNumber(result[1][index]).shiftedBy(-18).toString(10)} {token}</p>
            <button className="btn btn-warning" onClick={async()=>{
              
              await this.props.wallet.contractInventario.methods
              .buyItemFromMarket(this.props.currentAccount, index)
              .send({ from: this.props.currentAccount });

              this.update();
            }}>Back to inventory</button>
          </div>

        )
    }

    this.setState({
      inventarioV2: inventario
    })
  }

  async verLates(){

    var latesMaches = [];

    var result = await fetch(cons.API2+'api/v1/sesion/consultar/latesmaches?long=10',
    {method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {return json;})
    .catch(error =>{console.log(error);return [];})

    //console.log(result)

    

    for (let index = 0; index < result.length; index++) {

      var imagen1 = await fetch(cons.API2+'api/v1/imagen/user?username='+result[index].u1,
      {method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {return json;})
      .catch(error =>{console.log(error);return 0;})

      result[index].imagen1 = imagen1;

      var imagen2 = await fetch(cons.API2+'api/v1/imagen/user?username='+result[index].u2,
      {method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {return json;})
      .catch(error =>{console.log(error);return 0;})

      result[index].imagen2 = imagen2;

      if(result[index].tipo === "LEAGUE"){
        result[index].csc = "LEAGUE"
      }else{
        result[index].csc = result[index].csc+" USD"
      }

      if(result[index].goles1 === result[index].goles2){
        result[index].result1 = "Draw"
        result[index].color1 = "secondary"

        result[index].result2 = "Draw"
        result[index].color2 = "secondary"

      }

      if(result[index].goles1 > result[index].goles2){
        

        if(result[index].goles1 >= 99){
          result[index].goles1 = "X"
          result[index].goles2 = "X"

          result[index].result1 = "Default"
          result[index].color1 = "info"

          result[index].result2 = "Desertion"
          result[index].color2 = "warning"
        }else{
          result[index].result1 = "Winner"
          result[index].color1 = "success"

          result[index].result2 = "Loser"
          result[index].color2 = "danger"
        }
        

      }

      if(result[index].goles2 > result[index].goles1){
        

        if(result[index].goles2 >= 99){
          result[index].goles1 = "X"
          result[index].goles2 = "X"

          result[index].result1 = "Desertion"
          result[index].color1 = "warning"

          result[index].result2 = "Default"
          result[index].color2 = "info"
        }else{
          result[index].result1 = "Loser"
          result[index].color1 = "danger"

          result[index].result2 = "Winner"
          result[index].color2 = "success"
        }

      }

      if(result[index].ganador === "finalizado por tiempo"){
        
        result[index].goles1 = "X"
        result[index].goles2 = "X"

        result[index].result1 = "AFK-TIME"
        result[index].color1 = "dark"

        result[index].result2 = "AFK-TIME"
        result[index].color2 = "dark"
      
      }

      var today = new Date(result[index].fin);

      result[index].fin = today.getMonth()+1+"/"+today.getDate()+" - "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()

      latesMaches[index] = (
      
      <div className="row bg-white align-items-center ml-0 mr-0 py-0 " key={`itemsmatches-${index}`}>
            <div className="col-md-3 col-lg-3 mb-4 mb-lg-0">

              <div className="text-center text-lg-left">
                <div className="d-block d-lg-flex align-items-center">
                  <div className="image image-small text-center mb-3 mb-lg-0 mr-lg-3">
                    <img src={"assets/avatares/"+result[index].imagen1+".png"} alt={"imagen "+result[index].u1} className="img-fluid" title={result[index].soporte1}/>
                  </div>
                  <div className="text">
                    <h3 className="h5 mb-0 text-black">{result[index].u1}</h3>
                    <span className="text-uppercase text-black small country">{result[index].csc} #{result[index].identificador}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-6 col-lg-6 text-center mb-4 mb-lg-0">
              <div className="d-inline-block">
                <div className={"bg-"+result[index].color1+" py-2 px-4 mb-2 text-white d-inline-block rounded"}><span className="h5">{result[index].result1}</span></div>
              </div>
              <div className="d-inline-block" title={result[index].soporteAlterno}>
                <div className="bg-black py-2 px-4 mb-2 text-white d-inline-block rounded"><span className="h5">{result[index].goles1 +":"+result[index].goles2}</span></div>
              </div>
              <div className="d-inline-block">
                <div className={"bg-"+result[index].color2+" py-2 px-4 mb-2 text-white d-inline-block rounded"}><span className="h5">{result[index].result2}</span></div>
              </div>
              <br></br>{result[index].fin}
            </div>

            <div className="col-md-3 col-lg-3 text-center text-lg-right">
              <div className="">
                <div className="d-block d-lg-flex align-items-center">
                  <div className="image image-small ml-lg-3 mb-3 mb-lg-0 order-2">
                    <img src={"assets/avatares/"+result[index].imagen2+".png"} alt={"imagen "+result[index].u2} className="img-fluid" title={result[index].soporte2}/>
                  </div>
                  <div className="text order-1 w-100">
                    <h3 className="h5 mb-0 text-black">{result[index].u2} </h3>
                    <span className="text-uppercase small text-black country">{result[index].csc} #{result[index].identificador}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-12 text-center text-lg-right">
              <hr></hr>
            </div>
            
          </div>

      );
    }


    this.setState({
      latesMaches: latesMaches
    })

  }

  render() {

    var syncEmail = (<>
              <button
                className="btn btn-info"
                onClick={async() => {

                  var datos = {};
                  
                  if( this.state.email === "" || this.state.email === "Please update your email"|| this.state.email === "Loading..." || this.state.email === "loading...") {
                    alert("please try again")
                    return;
                  }else{
                    datos.email = this.state.email;
                  }

                  if(true){
                    
                    var resultado = await fetch(cons.API+"api/v1/user/update/info/"+this.props.currentAccount,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cons.SCKDTT}`
                      },
                      body: JSON.stringify(datos)
                    })
                    
                    if(await resultado.text() === "true"){
                      alert("Email Updated")
                    }else{
                      alert("failed")
                    }
                  }
                  this.setState({
                    emailGame: this.state.email
                  })

                  this.update();
                }}
              >
                <i className="fas fa-sync"></i> sync email to game
              </button>
              <br />
    </>)

    if(this.state.emailGame !== "email game not set"){
      syncEmail = (<></>);
    }

    var botonReg = (<>
    {syncEmail}

      <input type="password" id="password2" placeholder="*******" ></input>
              <button
                className="btn btn-info"
                
                onClick={async() => {

                  var datos = {};
                  var tx = {};
                  tx.status = false;
                  var code = document.getElementById("password2").value;//await prompt("Set your password",parseInt((Math.random())*100000000))//parseInt((Math.random())*100000000);
                  datos.password = code;

                  if(datos.password.length < 8){
                    alert("minimum 8 characters")
                    return;
                  }

                  if(true){

                    tx = await this.props.wallet.web3.eth.sendTransaction({
                      from: this.props.currentAccount,
                      to: cons.WALLETPAY,
                      value: 20000+"0000000000"
                    })

                  }

                  if(tx.status){
                    
                    var resultado = await fetch(cons.API+"api/v1/user/update/info/"+this.props.currentAccount,
                    {
                      method: 'POST', 
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cons.SCKDTT}`
                      },
                      body: JSON.stringify(datos) 
                    })

                    resultado = await resultado.text();
                    
                    if(resultado === "true"){

                      datos = {};
                      var emailGame = await fetch(cons.API+"api/v1/user/email/"+this.props.currentAccount+"?tokenemail=nuevo123");
                      emailGame = await emailGame.text();

                      if(emailGame === "false"){
                        alert("wrong email");
                        return;
                      }else{
                        datos.destino = emailGame+"";
                        datos.code = code+"";

                      fetch(cons.API+"api/v1/sendmail",
                      {
                        method: 'POST', 
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${cons.SCKDTT}`
                        },
                        body: JSON.stringify(datos) 
                      }).then(()=>{
                        alert("PIN sended to "+ emailGame)
                      }).catch(()=>{
                        alert("fail send pin")
                      })
                      }
                      

                    }else{
                      alert("failed")
                    }
                  }

                  this.update()
                }}
              >
                Set new password
              </button>
    </>);

    if(!this.state.register){

      var options = [];

      for (let index = 1; index < this.state.paises.length; index++) {
        options[index] = (<option value={this.state.paises[index]} key={"opt"+index}>{this.state.paises[index]}</option>);

      }

    botonReg = (<>

    <input type="text" id="user" placeholder="Username"/> <br/>
    <input type="password" id="password" placeholder="*********"/> <br/>
    <input type="email" id="email" placeholder="example@dominio.com"/> <br/>

    <select name="country" id="country">
      <option value="null" defaultValue>{this.state.paises[0]}</option>
      {options}
    </select>
    <br />
    <button
        className="btn btn-info"
        onClick={async() => {

          var datos = {};
          var tx = {};
          tx.status = false;

          datos.username = document.getElementById("user").value;

          alert(datos.username)
          var disponible = await fetch(cons.API+"api/v1/username/disponible/?username="+datos.username);
          disponible = await disponible.text();

          if( disponible === "false"){
            alert("username not available");
            return;
          }
          
          datos.password = document.getElementById("password").value;
          
            if(datos.password.length < 8){
              alert("Please enter a password with a minimum length of 8 characters.")
              return;
            }

            if(document.getElementById("country").value === "null"){
              alert("Please select a country");
              return;
            }
            datos.pais = document.getElementById("country").value;

            if( this.state.email === "" || this.state.email === "Please update your email" || this.state.email === "Loading..." || this.state.email === "loading...") {
              datos.email = document.getElementById("email").value;
              disponible = await fetch(cons.API+"api/v1/email/disponible/?email="+datos.email);
              disponible = await disponible.text();
              if( disponible === "false" ){
                alert("email not available");
                return;
              } 
            }else{
              datos.email = this.state.email;
            }
            
            datos.imagen = "0";
            
            tx = await this.props.wallet.web3.eth.sendTransaction({
              from: this.props.currentAccount,
              to: cons.WALLETPAY,
              value: 300000+"0000000000"
            }) 
            

          if(tx.status){
            
            var resultado = await fetch(cons.API+"api/v1/user/update/info/"+this.props.currentAccount,
            {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cons.SCKDTT}`
              },
              body: JSON.stringify(datos) 
            })

            resultado = await resultado.text();

            if(resultado === "true"){
              alert("Updated record")
            }else{
              alert("failed")
            }
          }

          this.update()
        }}
      >
        Register
      </button>

      </>
      
      );

    }


    return (
      <>

        

        <div className="container mt-3 mb-3">
          <div className="row text-center">
            <div className="col-lg-6 col-md-6 ">
              <h2>Wallet conected</h2>
              <p>{this.props.currentAccount}</p>
              <p>
              <button
                className="btn btn-info"
                onClick={() => {

                  window.ethereum.request({
                  method: 'wallet_watchAsset',
                  params: {
                    type: 'ERC20',
                    options: {
                      address: this.props.wallet.contractToken2._address,
                      symbol: 'DSGC',
                      decimals: 18,
                      image: 'https://diamondsoccer.tk/assets/img/DCSC.png',
                    },
                  },
                })
                  .then((success) => {
                    if (success) {
                      console.log('DSGC successfully added to wallet!')
                    } else {
                      throw new Error('Something went wrong.')
                    }
                  })
                  .catch(console.error)}
                }>
                Add DCSC token to metamask
              </button>
              </p>
              <button
                className="btn btn-success"
                onClick={() => this.update()}
              >
               <i className="fas fa-sync"></i> Refresh web page
              </button>
            </div>

            <div className="col-lg-6 col-md-6">

            <h2>GAME data</h2>

            <img
                src={this.state.imagenLink}
                className="meta-gray"
                width="100"
                height="100" 
                alt={"user "+this.state.username}
               
                />

                <br></br>

            <span id="username" onClick={async() => {

              var datos = {};
              var tx = {};
              tx.status = false;

              datos.username = await prompt("please set a NEW username for the game:")
                var disponible = await fetch(cons.API+"api/v1/username/disponible/?username="+datos.username);
                disponible = await disponible.text();

                if( disponible === "false"){
                  alert("username not available");
                  return;
                }else{
                  tx = await this.props.wallet.web3.eth.sendTransaction({
                    from: this.props.currentAccount,
                    to: cons.WALLETPAY,
                    value: 80000+"0000000000"
                  }) 
                }

              if(tx.status){
                
                var resultado = await fetch(cons.API+"api/v1/user/update/info/"+this.props.currentAccount,
                {
                  method: 'POST', 
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cons.SCKDTT}`
                  },
                  body: JSON.stringify(datos)
                })
                
                if(await resultado.text() === "true"){
                  alert("username Updated")
                }else{
                  alert("failed")
                }
              }
              this.setState({
                username: this.state.email
              })

              this.update();
              }} style={{cursor:"pointer"}}> 
              Username: {this.state.username}</span> | {this.state.pais} <br />
               {this.state.emailGame}
              <br /><br />
              {botonReg}
              
            </div>

          </div>

          <hr></hr>

          <div className="row text-center">

            <div className="col-md-12">
              <h3>
                <b>Liquidity for withdrawals: {this.state.balanceDCSCExchange} USD </b>
              </h3>
              <h4>aviable for daily misions: {this.state.coinsdiaria} USD</h4>
              <hr></hr>

            </div>

            <div className="col-lg-4 col-md-12 mt-2" id="buydcsc">
            <img
                src="assets/img/logo-cuadrado-dcsc.png"
                className="meta-gray"
                height="100" 
                alt="markert info"/>

            <h3>MY ACCOUNT</h3>
            
              <span>
                USDT: {this.state.balanceUSDT}
                <br /><br />
                DCSC: {this.state.balanceOldDCSC}
              </span>
              <br/><br/>
              
              <button
                className="btn btn-success"
                onClick={async() => 
                { 
                  
                  var cantidad = await prompt("Enter the amount of USDT to buy");

                  if(parseFloat(cantidad.replace(",",".")) > 0 ){
                    await this.buyCoins2(cantidad);
                  }else{
                    alert("ingrese un monto mayor a 0 USDT");
                  }

                  this.update();

                }}
              >
                Buy DSGC {" -> "}
              </button>
              <br/><br/>
              <button
                className="btn btn btn-warning"
                onClick={async() => {

                  if(true){
                    var cantidadDCSC = await this.props.wallet.contractDCSC.methods
                    .balanceOf(this.props.currentAccount)
                    .call({ from: this.props.currentAccount });
  
                    if(cantidadDCSC>0){
  
                      await this.props.wallet.contractDCSC.methods.sellToken(cantidadDCSC).send({from: this.props.currentAccount});
                      alert("Change is done")
                 
                
                    }else{
                      alert("You don't have DCSC for change.")
                    }

                  }else{
                    alert("this function not available")
                  }

                  this.update()
                }}
              >
                {" "}
                SELL DCSC {" ->"} USDT 
              </button>
              
              <hr></hr>
            </div>

            <div className="col-lg-4 col-md-12  mt-2">
            
              <a href="https://bscscan.com/token/0x456D75D8cE68Aff9e746b77B1AEC0b052cD29e57">
                <img src="assets/img/logo-cuadrado-dcsc.png"
                className="meta-gray"
                height="100" 
                alt="markert info"/>
              </a>

              <h3>POOL</h3>
              <span >
                DSGC: {this.state.balanceDCSC} <br></br> (${parseFloat(this.state.balanceDCSC*this.state.priceDCSC).toFixed(2)} USDT)
              </span>
              <br/><br/>
              <button
                className="btn btn-primary"
                onClick={async() => 
                { 

                  var cantidad = await prompt("Enter the amount of DSGC to withdraw to your wallet",this.state.balanceDCSC);

                  if( parseFloat(cantidad) > 0 && cantidad <= this.state.balanceDCSC){

                    var result = await this.props.wallet.contractToken2.methods
                    .sellToken(new BigNumber(cantidad).shiftedBy(18).toString(10))
                    .send({ from: this.props.currentAccount });

                    alert("Your transaction is done hash: "+result.transactionHash);

                  }else{
                    alert("Please enter a more that 0");
                  }

                  this.update();

                }}
              >
                {" <- "}Sell DSGC
              </button>
              <br/><br/>
              <button
                className="btn btn-success"
                onClick={async() => {

                  if(true){
                    var cantidadEquipos = await this.props.wallet.contractInventario.methods
                    .largoInventario(this.props.currentAccount)
                    .call({ from: this.props.currentAccount });
  
                    if(cantidadEquipos>0){
  
                    var tx = {};
                    tx.status = false;

                    var aprovado = await this.props.wallet.contractToken2.methods
                    .allowance(this.props.currentAccount, this.props.wallet.contractExchange._address)
                    .call({ from: this.props.currentAccount });

                    aprovado = new BigNumber(aprovado).shiftedBy(-18).toNumber(10);

                    if(aprovado <= 0){

                      alert("insuficient aproved balance of DCSC, please approve the next transacction")
                      await this.props.wallet.contractToken2.methods
                      .approve(this.props.wallet.contractExchange._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
                      .send({ from: this.props.currentAccount });
                    }

                    var investor = await this.props.wallet.contractExchange.methods.investors(this.props.currentAccount).call({from: this.props.currentAccount});
                    investor.balance = new BigNumber(investor.balance);
                  
                    var cantidad = 0;

                    if(investor.balance.shiftedBy(-18).toNumber() > 0.001){
                      if(window.confirm("Send pending balance "+(investor.balance.shiftedBy(-18).decimalPlaces(6).toString(10))+" DSGC?")){
                        cantidad = investor.balance;
                      }else{
                        cantidad = new BigNumber(await prompt("Enter the amount of coins to send in GAME",this.state.balanceDCSC)).shiftedBy(18);
                        var compraMonedas = await this.props.wallet.contractExchange.methods.buyCoins(cantidad.toString(10)).send({from: this.props.currentAccount});
                        if(!compraMonedas.status){alert("BlockChain failure");return};
                        cantidad = cantidad.plus(investor.balance);

                      }
                    }else{
                      cantidad = new BigNumber(await prompt("Enter the amount of coins to send in GAME",this.state.balanceDCSC)).shiftedBy(18);
                      compraMonedas = await this.props.wallet.contractExchange.methods.buyCoins(cantidad.toString(10)).send({from: this.props.currentAccount});
                      if(!compraMonedas.status){alert("BlockChain failure");return};
                    }

                    if(cantidad.toNumber() === 0 || isNaN(cantidad.toNumber()) ){alert("enter valid number");return;}
                    
                    var gasLimit = await this.props.wallet.contractExchange.methods.gastarCoinsfrom(cantidad.toString(10),  this.props.currentAccount).estimateGas({from: cons.WALLETPAY});
                    
                    gasLimit = gasLimit*cons.FACTOR_GAS;

                    var usuario = await this.props.wallet.contractExchange.methods.investors(this.props.currentAccount).call({from: this.props.currentAccount});
                    var balance = new BigNumber(usuario.balance).shiftedBy(-18).toNumber();
                    console.log(cantidad.shiftedBy(-18).toNumber())
                    if(balance-parseInt(cantidad.shiftedBy(-18).toNumber()) >= 0 && gasLimit > 0){
                      var transResult = await this.props.wallet.web3.eth.sendTransaction({
                        from: this.props.currentAccount,
                        to: cons.WALLETPAY,
                        value: gasLimit+"0000000000"
                      })

                      if(transResult.status ){
                        var resultado = await fetch(cons.API+"api/v1/coinsaljuego/"+this.props.currentAccount,
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${cons.SCKDTT}`
                          },
                          body: JSON.stringify({data: cons.encryptString(JSON.stringify({ coins: cantidad.shiftedBy(-18).decimalPlaces(6).toNumber(), precio: this.state.priceDCSC, time: Date.now()}))})
                        })
                        
                        if(await resultado.text() === "true"){
                          alert(cantidad.shiftedBy(-18).toNumber()*this.state.priceDCSC+" USD send to GAME")
                        }else{
                          alert("send failed, for api")
                        }
  
                      }else{
                        alert("transaction failed or declined")
                      }
  
                      
                    }else{
                      alert("Failed, insuficient founds please wait")
                    }
  
                    }else{
                      alert("First buy a Team for send founds to game and play")
                    }

                  }else{
                    alert("this function not available")
                  }

                  this.update()
                }}
              >
                {" "}
                Send DSGC To Game {" ->"}
              </button>
              <hr></hr>
              

            </div>


            <div className="col-lg-4 col-md-12  mt-2">
            <img
                src="assets/img/logo-cuadrado-dcsc.png"
                className="meta-gray"
                width="100"
                height="100" 
                alt="markert info"/>

            <h3>IN GAME</h3>
              <span>
                USD: {this.state.balanceGAME} <br></br>
                (~{(this.state.balanceGAME/this.state.priceDCSC).toFixed(2)} DSGC)
              </span>
                <br></br>
              Cool down: {this.state.payday}
             
              <br/><br/>
              <button
                className="btn btn-primary"
                onClick={async() => {

                  var enPartida = await fetch(cons.API2+"api/v1/sesion/usuarioenpartida/?usuario="+this.props.currentAccount)

                  enPartida = await enPartida.text();

                  if(enPartida === "no"){

                    if(Date.now() > this.state.payTime){

                      if(this.state.botonwit){
                        this.setState({
                          botonwit: false
                        })

                        var tx = {};
                        tx.status = false;

                        var investor = await this.props.wallet.contractExchange.methods.investors(this.props.currentAccount).call({from: this.props.currentAccount});
                        investor.balance = new BigNumber(investor.balance).shiftedBy(-18).toNumber();
                        var cantidad = 0;

                        if(investor.balance > 0.001){
                          if(window.confirm("withdraw only pending balance "+(investor.balance*this.state.priceDCSC)+" USD?")){

                            investor = await this.props.wallet.contractExchange.methods.investors(this.props.currentAccount).call({from: this.props.currentAccount});
                            
                            var venderMonedas = await this.props.wallet.contractExchange.methods.sellCoins(investor.balance).send({from: this.props.currentAccount});
                            if(venderMonedas.status){
                              alert(investor.balance+" DSGC deposited");
                            }else{
                              alert(investor.balance+" DSGC deposit ERROR 2");
                            }
                            return;
                          }else{
                            cantidad = await prompt("Enter the amount of USD to withdraw","5");
    
                          }
                        }else{
                          cantidad = await prompt("Enter the amount of USD to withdraw","5");
                        }

                        cantidad = parseFloat(cantidad);

                        if(cantidad === 0 || isNaN(cantidad) ){
                          alert("enter valid number")
                          return;
                        }

                          if( this.state.balanceGAME-cantidad >= 0 && cantidad >= this.state.minCSC && cantidad <= this.state.maxCSC){
    
                            await this.setState({
                              balanceInGame: this.state.balanceGAME-cantidad
                            })
                          
                            var gasLimit = await this.props.wallet.contractExchange.methods.asignarCoinsTo(new BigNumber(cantidad/this.state.priceDCSC).shiftedBy(18).toString(10),  this.props.currentAccount).estimateGas({from: cons.WALLETPAY});
                            
                            gasLimit = gasLimit*cons.FACTOR_GAS;
    
                              tx = await this.props.wallet.web3.eth.sendTransaction({
                                from: this.props.currentAccount,
                                to: cons.WALLETPAY,
                                value: gasLimit+"0000000000"
                              })
    

                              var enPartida2 = await fetch(cons.API2+"api/v1/sesion/usuarioenpartida/?usuario="+this.props.currentAccount)

                              enPartida2 = await enPartida2.text();

                              if(enPartida2 === "no"){
                              
                                if( tx.status ){

                                  var precioDCSC = this.state.priceDCSC;

                                  var resultado = await fetch(cons.API+"api/v1/coinsalmarket/"+this.props.currentAccount,
                                  {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': `Bearer ${cons.SCKDTT}`
                                    },
                                    body: JSON.stringify({data: cons.encryptString(JSON.stringify({coins: cantidad, precio:precioDCSC, time: Date.now()}))})
                                  })
      
                                  resultado = await resultado.text();
            
                                  if(resultado === "true"){

                                    investor = await this.props.wallet.contractExchange.methods.investors(this.props.currentAccount).call({from: this.props.currentAccount});
                                    investor.balance = new BigNumber(investor.balance).shiftedBy(-18).toNumber();

                                    venderMonedas = await this.props.wallet.contractExchange.methods.sellCoins(new BigNumber(investor.balance).shiftedBy(18).toString(10)).send({from: this.props.currentAccount});
                                    if(venderMonedas.status){
                                      alert(investor.balance+" DSGC deposited");
                                    }else{
                                      alert(investor.balance+" DSGC deposit ERROR 3");
                                    }
                                    
                                  }else{
                                    alert("Filed from: API-error")
                                  }
                                }else{
                                  alert("transacction Error")
                                }
                              }else{
                                alert("Please disconect form GAME to Whitdraw")
                              }
    
                            this.update()
                          }else{
                            
                              if (this.state.balanceGAME-cantidad < 0) {
                                alert("Insufficient funds USD")
                              }else{
                                if(cantidad < this.state.minCSC ){
                                  alert("Please enter a value greater than "+this.state.minCSC+" USD")
                                }
                                if(cantidad > this.state.maxCSC){
                                  alert("Please enter a value less than "+this.state.maxCSC+" USD")
                                }
                              }
                            
                            
                          }
                          
                          
                        this.setState({
                          botonwit: true
                        })
                      }else{
                        alert("Loading... please wait")
                      }
                    }else{
                      alert("It's not time to claim, try again in 24 hours")
                    }

                  }else{
                    alert("Please disconect form GAME or wait tomorrow to Whitdraw")
                  }


                }}
              >
                
                {" <-"} Withdraw {" "}
              </button>
              <br></br>
              <span >
                Pending DSGC: {this.state.balanceMarket}
              </span>
            <hr></hr>
              

            </div>

            <div className="col-lg-12 col-md-12 text-center">
              <hr></hr>
            </div>

          </div>

          <div className="row text-center">

            <div className="col-md-12">
              <h3>
                <b>POOL: {this.state.balanceUSDTPOOL} USDT / {this.state.balanceDCSCPOOL} DSGC</b><br></br>
                <b>1 DSGC = {this.state.priceDCSC} USDT</b>
              </h3>

            </div>
           
            <div className="col-lg-12 col-md-12 text-center">
              <hr></hr>
            </div>

          </div>

          
          
          <div style={{ marginTop: "30px" }} className="row text-center">
            <div className="col-md-12">
              <h3>Inventory</h3>{" "}
              
            </div>
          </div>

          <div className="row text-center" id="inventory">
            {this.state.inventario}
          </div>

          <div className="col-lg-12 col-md-12 text-center">
              <hr></hr>
            </div>

          <div style={{ marginTop: "30px" }} className="row text-center">
            <div className="col-md-12">
              <h3>Items for sell</h3>
              <h3>link: <a id="id_elemento" href={document.location.origin+"?market-v2="+this.props.currentAccount}>{document.location.origin+"?market-v2="+this.props.currentAccount}</a></h3>
              <button className="btn btn-info" onClick={()=>{
                 var aux = document.createElement("input");
                 aux.setAttribute("value", document.getElementById("id_elemento").innerHTML);
                 document.body.appendChild(aux);
                 aux.select();
                 document.execCommand("copy");
                 document.body.removeChild(aux);
                 alert("Copied!")
              }}> Copy </button>
              
            </div>
          </div>

          <div className="row text-center" id="inventory">
            {this.state.inventarioV2}
          </div>

        </div>

        <div className="site-blocks-vs site-section bg-light">
          <div className="container">

            <div className="row">
              <div className="col-md-12">

                <h2 className="h6 text-uppercase text-black font-weight-bold mb-3">Latest Matches</h2>
                <div className="site-block-tab">
                  <div className="tab-content" >
                    <div className="tab-pane fade show active">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          {this.state.latesMaches}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}
