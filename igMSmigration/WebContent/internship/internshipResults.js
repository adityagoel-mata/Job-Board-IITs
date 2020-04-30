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
    ajaxFunc(purpose, programme, field, degree, sortType);
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
        window.location.href = './internshipUsingLoop.html';
      }
    })
  });
  
  for (var i=0; i<dataJA[1].length; i++ ) {
    var instituteName = dataJA[1][i].institute;
    console.log(instituteName);

    $(".allResults").append(" \n     <div class='resultOne' id='loop"+i+"'> \n       <div class='photo'> \n         <img src= '' class='instiPhoto' id='instiPhoto"+i+"'></img> \n   <div class='profDetails'> \n  </div> \n   </div> \n\n       <div class='name'> \n         <p id='name'> <a href= ''></a> </p> \n         <p id='location'> </p> \n         <p id='available"+i+"'> </p> \n    <p id='details"+i+"'> </p> \n   </div> \n\n       <div class='feesAndOthers'> \n         <p id='durationLabel'>DURATION:</p> \n         <p id='durationValue'></p> \n   <p id='stipendLabel'>STIPEND:</p> \n         <p id='stipendValue'></p> \n   <p id='deadlineLabel'>DEADLINE:</p> \n         <p id='deadlineValue'></p> \n    </div> \n\n     </div> \n <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");

   
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

        $("#loop"+i+" .profDetails").append("<div class=\"researchInterests\", id=\"ri"+j+"\">\n  <b>Research Interests: </b> \n  <ul> \n </ul> \n  </div>");

        $("#loop"+i+" #available"+i).append("<button id='prog"+j+"'> \n  </button>");
  
        $("#loop"+i+" #details"+i).append("<button id='links"+j+"' class='links"+j+"'>\n <a id='homepage'>Homepage</a> \n  <a id='googleScholar'>G-Scholar</a> \n  </button>");

        $("#available"+i+ " #prog"+j).text(dataJA[2][j].professor);
        $(".details"+j+" #homepage").attr("href", dataJA[2][j].homepage);
        $(".details"+j+" #googleScholar").attr("href", dataJA[2][j].gScholar);
        
        var professorDetailsLength = Object.keys(dataJA[2][j]).length;
        for (var k=0; k<professorDetailsLength; k++){
          if (Object.keys(dataJA[2][j])[k].includes("interest")){
            var keyValue = Object.keys(dataJA[2][j])[k];
            var interestValue = dataJA[2][j][keyValue].trim();
            $("#ri"+j+" ul").append("<li>"+interestValue+"</li>");
          }
          else continue;
        }
      }
      else continue;
    }
    
    var resultsLength = $("#loop"+i+" #available"+i).children().length;
	  if (resultsLength<=3) {
	        $(".name #details"+i).css("margin-top","-60px");
	  }
	  else if (resultsLength>3 && resultsLength<=6 ) {
	        $(".name #details"+i).css("margin-top","-100px");
	  }
	  if (resultsLength>6 && resultsLength<=9) {
	        $(".name #details"+i).css("margin-top","-140px");
	  }

  }
  
  var allProfessors = dataJA[2].length;
	for (var i=0; i<allProfessors; i++){
	  (function(i){
		var name = $("#prog"+i).text();
	    $("#prog"+i).hover(function(){
	      $("#links"+i).css("opacity","1");
	      $("#prog"+i).text("");
         $("#instiPhoto"+i).hide();
//        $(".instiPhoto:has('#links"+i+"')").hide();

	      $("#ri"+i).show();
	     },
	     function(){
	     $("#links"+i).css("opacity","0");
	       $("#prog"+i).text(name);
          $("#instiPhoto"+i).show();
//        $(".instiPhoto:has('#links"+i+"')").show();

	       $("#ri"+i).hide();
	   });
	     
	    $("#links"+i).hover(function(){
	      $("#links"+i).css("opacity","1");
	        $("#prog"+i).text("");
           $("#instiPhoto"+i).hide();
//          $(".instiPhoto:has('#links"+i+"')").hide();

	        $("#ri"+i).show();
	       },
	       function(){
	       $("#links"+i).css("opacity","0");
	       $("#prog"+i).text(name);
          $("#instiPhoto"+i).show();
//        $(".instiPhoto:has('#links"+i+"')").show();
	       $("#ri"+i).hide();
	   });  
	  })(i);
	}

	function ajaxFunc(purpose, programme, field, degree, sortType){
	  $.ajax({
	    type: 'GET',
	    url: "http://localhost:8086/igMSmigration/SortServiceUsingLoop?purpose=" + purpose+ "&programme=" + programme +"&field=" + field +"&sortType=" + sortType + "&degree=" + degree,
	    success: function(data){
        localStorage.setItem("purpose", purpose);
	      localStorage.setItem("programme", programme);
	      localStorage.setItem("field", field);
	      localStorage.setItem("degree", decodeURIComponent(degree));
	      localStorage.setItem("sortType", sortType);
	      localStorage.setItem("data", JSON.stringify(data));
	      window.location.href = './internshipUsingLoop.html';
	    }
	  })
	}



	});