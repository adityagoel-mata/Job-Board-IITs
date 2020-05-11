$(document).ready(function(){

  var purpose = localStorage.getItem("purpose");
  var programme = localStorage.getItem("programme");
  var field = localStorage.getItem("field");
  var degree = localStorage.getItem("degree", degree);
  var data = localStorage.getItem("data");
  var sortType = localStorage.getItem("sortType");
  var dataJA = JSON.parse(data);
  console.log(dataJA);
  var currencySelected = localStorage.getItem("currencySelected");
  var currencyRatio = localStorage.getItem("currencyRatio");
  var maxFee = localStorage.getItem("maxFee");


/////////////////////////////// Framing the HTML Static Objects //////////////////////////////////////////
  currencyDropdownOptionsAppend(currency);
  
  function currencyDropdownOptionsAppend(currencyArray){
    for (var i=0; i<currencyArray.length; i++){
      $("#currency-dropdown").append("<option value = \"" + currencyArray[i] + "\">"+currencyArray[i]+"</option>");
    }
  }

/////////////////////////////// Auto-display the sort and currency option selected ///////////////////////
  $("#sorting-option option:contains("+sortType+")").attr('selected', true);
  $("#currency-dropdown option[value=\""+currencySelected+"\"]").attr('selected', true);

////////////////////////////// sorting and currency Onchange Calls ////////////////////////////////////////
  $("#sorting-option").change(function(){
    sortType = $("#sorting-option option:selected").text();
    var filters = [purpose, programme, field, degree, sortType, currencySelected, currencyRatio, maxFee];  
    //ajaxFunc(filters);
    ajaxFuncFilter(filters);

  });

  $("#currency-dropdown").change(function(){
    var currencySelected = $("#currency-dropdown option:selected").text();
    var currency2 = "INR"
    var accessKey = "0f5f50b0d859cfb26cc5";
    var url1 = "https://free.currconv.com/api/v7/convert?q="+currencySelected+"_"+currency2+"&compact=ultra&apiKey="+accessKey;
    $.ajax({
      type: 'GET',
      url: url1,
      success: function(data){
        var conversionKey = Object.keys(data)[0];
        var currencyRatio = data[conversionKey];
        localStorage.setItem("currencySelected",currencySelected);
        localStorage.setItem("currencyRatio", currencyRatio);
        window.location.href = './amazonUsingLoop.html';
      }
    })
  });
  
  for (var i=0; i<dataJA[1].length; i++ ) {

    $(".allResults").append(" \n     <div class='resultOne' id='loop"+i+"'> \n       <div class='photo'> \n         <img src= '' class='instiPhoto'> \n       </div> \n\n       <div class='name'> \n         <p id='name'> <a href= ''></a> </p> \n         <p id='location'> </p> \n         <p id='available'> </p> \n       </div> \n\n       <div class='feesAndOthers'> \n         <p id='tuitionFeesLabel'>TUITION FEES:</p> \n               <p id='tuitionFeesValue'><span id='curSymbol'> </span> <span id='curValue'> </span></p> \n       </div> \n\n     </div> \n <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");

   
    $("#loop"+i+" img").attr("src", dataJA[1][i].imageLocation);
    $("#loop"+i+" #name a").attr("href",dataJA[1][i].homeLink);
    $("#loop"+i+" #name a").text(dataJA[1][i].institute);
    $("#loop"+i+" #location").text(dataJA[1][i].location);

    var convertedFees = Math.round((dataJA[1][i].fees)/currencyRatio);

    $("#loop"+i+" #curSymbol").text(curSymbol(currencySelected));
    $("#loop"+i+" #curValue").text(convertedFees);

    var allDetailsLength = Object.keys(dataJA[2][i]).length;
    
    for (var j=0; j<allDetailsLength; j++){
      var keyJA = Object.keys(dataJA[2][i])[j];
      if (keyJA == "institute" || keyJA == "programme" || keyJA == "field" || keyJA == "deptWebsite" || keyJA == "ord") {
        continue;
      }
      
      var valueJA = dataJA[2][i][keyJA];
      if (degree=="All"){    
        for (var k=0; k<valueJA.length; k++){
          $("#loop"+i+" #available").append("<button id='prog1'><span id='degree1'>"+keyJA+"</span> <span id='vBar'>|</span><span id='field1'>"+valueJA[k]+"</span></button>");
        }
      }
      else {    // case when degree!="All"
        if (degree==keyJA){
          for (var k=0; k<valueJA.length; k++){
            $("#loop"+i+" #available").append("<button id='prog1'><span id='degree1'>"+keyJA+"</span> <span id='vBar'>|</span><span id='field1'>"+valueJA[k]+"</span></button>");
          }
        }
        else continue;
      }
    }
}

function curSymbol(currencySelected){
  var curIndex = currency.indexOf(currencySelected);
  var symbol = currencySymbol[curIndex];
  return symbol;
}

});
