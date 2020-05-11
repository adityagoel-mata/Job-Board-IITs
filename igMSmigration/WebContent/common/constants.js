var allProgrammes=["Basic Sciences", "Design", "Engineering", "Humanities and Social Sciences", "Management"];
var classNames=["BS", "Des", "Engg", "HSS", "Mgmt"];

var BSFields=["Chemistry","Mathematics","Physics"];
var DesFields=["Animation","Industrial Design","Interaction Design","Mobility Vehicle Design","Visual Communication"];
var EnggFields=["Aerospace","BioScience","Chemical","Civil","Computer Science","Earth Sciences","Electrical","Energy","Environment","Material Sciences"];
var HSSFields=["Cognitive Sciences","Philosophy","Planning and Development","Society and Culture"];
var MgmtFields=["Business Administration"];
var OtherFields=["Other"];

var BSDegrees= ["M.Sc", "M.Sc+M.Tech", "M.Sc+P.hD" ];
var DesDegrees= ["M.Des"];
var EnggDegrees= ["M.Tech", "M.UDE", "MS-R", "M.Tech+P.hD"];
var HSSDegrees= ["M.A", "M.A+P.hD"];
var MgmtDegrees= ["M.B.A"];
var CommonDegrees= ["M.Phil", "PGDIIT", "P.hD"];

var currency=["INR", "CNY", "EUR", "GBP", "USD"];
var currencySymbol=["₹","¥","€","£","$"];

var defaultSortType = "NIRF Overall Ranking";
var defaultCurrencySelected = 'INR';
var defaultCurrencyRatio = 1;
var defaultMaxFee = 1000000;
/////////////////////////////////// API Key and sample URL's
var currencyAPIkey = "cef06c0647905298abfa511dd6d28d88";
// URL: http://www.api.currencylayer.com/live?access_key=cef06c0647905298abfa511dd6d28d88





function ajaxFunc(filters){
  var purpose = filters[0];
  var programme = filters[1];
  var field = filters[2];
  var degree = filters[3];
  var sortType = filters[4];
  var currencySelected = filters[5];
  var currencyRatio = filters[6];
  var maxFee = filters[7];
  
  $.ajax({
    type: 'GET',
    url: "http://localhost:8086/igMSmigration/SortServiceUsingLoop?purpose=" + purpose +"&programme=" + programme +"&field=" + field +"&sortType=" + sortType + "&degree=" + degree +"&maxFee=" + maxFee,
    success: function(data){
      localStorage.setItem("purpose", purpose);
      localStorage.setItem("programme", programme);
      localStorage.setItem("field", field);
      localStorage.setItem("degree", decodeURIComponent(degree));
      localStorage.setItem("sortType", sortType);
      localStorage.setItem("currencySelected", currencySelected);
      localStorage.setItem("currencyRatio", currencyRatio);
      localStorage.setItem("maxFee", maxFee);
      localStorage.setItem("data", JSON.stringify(data));

      if(purpose=="Admission"){
        window.location.href = '../admission/amazonUsingLoop.html';
      }
      else if(purpose=="Internship"){
        window.location.href = '../internship/internshipUsingLoop.html';
      }
      else if(purpose=="Assistantship"){
        window.location.href = '../assistantship/assistantshipUsingLoop.html';
      }
    }
  })
}


function ajaxFuncFilter(filters){
  var purpose = filters[0];
  var programme = filters[1];
  var field = filters[2];
  var degree = filters[3];
  var sortType = filters[4];
  var currencySelected = filters[5];
  var currencyRatio = filters[6];
  var maxFee = filters[7];
  
  $.ajax({
    type: 'GET',
    url: "http://localhost:8086/igMSmigration/SortServiceUsingLoop?purpose=" + purpose +"&programme=" + programme +"&field=" + field +"&sortType=" + sortType + "&degree=" + degree +"&maxFee=" + maxFee,
    success: function(data){
      localStorage.setItem("purpose", purpose);
      localStorage.setItem("programme", programme);
      localStorage.setItem("field", field);
      localStorage.setItem("degree", decodeURIComponent(degree));
      localStorage.setItem("sortType", sortType);
      localStorage.setItem("currencySelected", currencySelected);
      localStorage.setItem("currencyRatio", currencyRatio);
      localStorage.setItem("maxFee", maxFee);
      localStorage.setItem("data", JSON.stringify(data));

      if(purpose=="Admission"){
        $(".amazonSearchHTML").load('./../admission/amazonSearch.html');
      }
      else if(purpose=="Internship"){
        $(".internshipSearchHTML").load('./../internship/internshipSearch.html');
      }
      else if(purpose=="Assistantship"){
        $(".assistantshipSearchHTML").load('./../assistantship/assistantshipSearch.html');
      }
    }
  })
}