$(document).ready(function(){

  var purpose = localStorage.getItem("purpose");
  var programme = localStorage.getItem("programme");
  var field = localStorage.getItem("field");
  var degree = localStorage.getItem("degree");
  var data = localStorage.getItem("data");
  var sortType = localStorage.getItem("sortType");
  var dataJA = JSON.parse(data);
  console.log(dataJA);
  var currencySelected = localStorage.getItem("currencySelected");
  var currencyRatio = localStorage.getItem("currencyRatio", currencyRatio);
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
  ajaxFunc(filters);
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
        window.location.href = './assistantshipUsingLoop.html';
      }
    })
  });
  
  for (var i=0; i<dataJA[1].length; i++ ) {
    var instituteName = dataJA[1][i].institute;
    console.log(instituteName);

    $(".allResults").append(" \n     <div class='resultOne' id='loop"+i+"'> \n       <div class='photo'> \n         <img src= '' class='instiPhoto' id='instiPhoto"+i+"'></img> \n   <div class='topicDetails'> \n  </div> \n   </div> \n\n       <div class='name'> \n         <p id='name'> <a href= ''></a> </p> \n         <p id='location'> </p> \n         <p id='available"+i+"'> </p> \n    <p id='details"+i+"'> </p> \n   </div> \n\n       <div class='feesAndOthers'> \n         <p id='durationLabel'>DURATION:</p> \n         <p id='durationValue'></p> \n   <p id='stipendLabel'>STIPEND:</p> \n         <p id='stipendValue'></p> \n   <p id='deadlineLabel'>DEADLINE:</p> \n         <p id='deadlineValue'></p> \n    </div> \n\n     </div> \n <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");

   
    $("#loop"+i+" #instiPhoto"+i).attr("src", dataJA[1][i].imageLocation);
    $("#loop"+i+" #name a").attr("href", dataJA[1][i].homeLink);
    $("#loop"+i+" #name a").text(dataJA[1][i].institute);
    $("#loop"+i+" #location").text(dataJA[1][i].location);

    var convertedFees = Math.round((dataJA[1][i].fees)/currencyRatio);
    $("#loop"+i+" #tuitionFeesValue").text(convertedFees);

    var allProfessors = dataJA[2].length;
    for (var j=0; j<allProfessors; j++) {
      console.log(dataJA[2][j].institute);
      if (dataJA[2][j].institute==instituteName){

        $("#loop"+i+" .topicDetails").append("<div class=\"topic\", id=\"topic"+j+"\">\n  <b>Topic: </b> \n  </div>");

        $("#loop"+i+" #available"+i).append("<button id='job"+j+"'> \n  </button>");
  
        $("#topic"+j).append(dataJA[2][j].area);
        $("#available"+i+ " #job"+j).text(dataJA[2][j].job);
        
      }
      else continue;
    }
    
  }

  var allProfessors = dataJA[2].length;
	for (var i=0; i<allProfessors; i++){
	  (function(i){
		var name = $("#job"+i).text();
	    $("#job"+i).hover(function(){
      $("#instiPhoto"+i).hide();
      $("#topic"+i).show();
	     },
      function(){
      $("#instiPhoto"+i).show();
      $("#topic"+i).hide();
	   });
	     
	  })(i);
	}
  
});