$(document).ready(function(){

  /////////////////////////////// Framing the HTML Static Objects /////////////////////////////////////

  programmeDropdownOptionsAppend(allProgrammes, classNames)

  function programmeDropdownOptionsAppend(programmeArray, classNameArray){
    for (var i=0; i<programmeArray.length; i++){
      $("#programme-dropdown").append("<option value = \"" + classNameArray[i] + "\">"+programmeArray[i]+"</option>");
    }
  }

  fieldDropdownOptionsAppend(BSFields, "BS");
  fieldDropdownOptionsAppend(DesFields, "Des");
  fieldDropdownOptionsAppend(EnggFields, "Engg");
  fieldDropdownOptionsAppend(HSSFields, "HSS");
  fieldDropdownOptionsAppend(MgmtFields, "Mgmt");
  fieldDropdownOptionsAppend(OtherFields, "Other");

  function fieldDropdownOptionsAppend(fieldArray, className){
    for (var i=0; i<fieldArray.length; i++){
      $("#field-dropdown").append("<option disabled = \"disabled\" class = " + className + " value = \"" + fieldArray[i]+ "\">"+fieldArray[i]+"</option>");
    }
  }

  $("#programme-dropdown").change(function(){
  var programme= $("#programme-dropdown option:selected").text();
  if (programme == "All") {
    $("#field-dropdown option").attr('disabled', true);
    $("#field-dropdown option[value=\"All\"]").attr('disabled', false);
  }
  if (programme == "Basic Sciences") {
    $("#field-dropdown option").attr('disabled', true);
    $("#field-dropdown option[value=\"All\"]").attr('disabled', false);
    $("#field-dropdown").find(".BS").attr('disabled', false);
  }
  if (programme == "Design") {
    $("#field-dropdown option").attr('disabled', true);
    $("#field-dropdown option[value=\"All\"]").attr('disabled', false);
    $("#field-dropdown").find(".Des").attr('disabled', false);
  }
  if (programme == "Engineering") {
    $("#field-dropdown option").attr('disabled', true);
    $("#field-dropdown option[value=\"All\"]").attr('disabled', false);
    $("#field-dropdown").find(".Engg").attr('disabled', false);
    $("#field-dropdown").find(".Other").attr('disabled', false);
  }
  if (programme == "Humanities and Social Sciences") {
    $("#field-dropdown option").attr('disabled', true);
    $("#field-dropdown option[value=\"All\"]").attr('disabled', false);
    $("#field-dropdown").find(".HSS").attr('disabled', false);
  }
  if (programme == "Management") {
    $("#field-dropdown option").attr('disabled', true);
    $("#field-dropdown option[value=\"All\"]").attr('disabled', false);
    $("#field-dropdown").find(".Mgmt").attr('disabled', false);
  }
  });

  $('#programme-button').click(function(){
    var purpose="admission";
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var degree = "All";
    sortType = defaultSortType;
    ajaxFunc(purpose, programme, field, degree, sortType);
  });

  $('#internship-button').click(function(){
    var purpose="internship";
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var degree = "All";
    sortType = defaultSortType;
    ajaxFunc(purpose, programme, field, degree, sortType);
  });

  
  
  
  
  function ajaxFunc(purpose, programme, field, degree, sortType){
    $.ajax({
      type: 'GET',
      url: "http://localhost:8086/igMSmigration/SortServiceUsingLoop?purpose="+ purpose + "&programme=" + programme +"&field=" + field +"&sortType=" + sortType + "&degree=" + degree,
      success: function(data){
        localStorage.setItem("purpose", purpose);
        localStorage.setItem("programme", programme);
        localStorage.setItem("field", field);
        localStorage.setItem("degree", decodeURIComponent(degree));
        localStorage.setItem("sortType", sortType);
        localStorage.setItem("data", JSON.stringify(data));
        var currencySelected = 'INR';
        var currencyRatio = 1;
        localStorage.setItem("currencySelected", currencySelected);
        localStorage.setItem("currencyRatio", currencyRatio);
        if(purpose=="admission"){
          window.location.href = './amazonUsingLoop.html';
        }
        else if(purpose=="internship"){
          window.location.href = './internshipUsingLoop.html';
        }
      }
    });
  }







  
  // fieldButtonAppend(BSFields, "BS-dropdown", "BS-field-button");
  // fieldButtonAppend(DesFields, "Des-dropdown", "Des-field-button");
  // fieldButtonAppend(EnggFields, "Engg-dropdown", "Engg-field-button");
  // fieldButtonAppend(HSSFields, "HSS-dropdown", "HSS-field-button");
  // fieldButtonAppend(MgmtFields, "Mgmt-dropdown", "Mgmt-field-button");
  
  // function fieldButtonAppend(fieldArray, dropdownButton, className){
  //   for (var i=0; i<fieldArray.length; i++){
  //     $("."+dropdownButton).append("<button class=\"" + className + "\" id=\"" + fieldArray[i] + "\">" + fieldArray[i] + "</button>");
  //   }  
  // }
  
  // /////////////////// When User selects specific programme from the header /////////////////////
  
  // /* Programme= B/D/E/H/M, field= All, Sort = nirf, degree = programme specific, Show only degree NAMES in result */
  
  // $("#BS").click(function(){getResultFromProgramme("Basic Sciences")});
  // $("#Des").click(function(){getResultFromProgramme("Design")});
  // $("#Engg").click(function(){getResultFromProgramme("Engineering")});
  // $("#HSS").click(function(){getResultFromProgramme("Humanities and Social Sciences")});
  // $("#Mgmt").click(function(){getResultFromProgramme("Management")});
  
  // /////////////////// When User selects specific field from the header /////////////////////////
  // /* Programme= B/D/E/H/M, field= Specified, Sort = nirf, degree = filed Specific, Show results having degree+field */
  
  // $(".BS-field-button").each(function(){
  //   $(this).click(function(){
  //     getResultFromField("Basic Sciences", this.id);
  //   });
  // });
  // $(".Des-field-button").each(function(){
  //   $(this).click(function(){
  //     getResultFromField("Design", this.id);
  //   });
  // });
  // $(".Engg-field-button").each(function(){
  //   $(this).click(function(){
  //     getResultFromField("Engineering", this.id);
  //   });
  // });
  // $(".HSS-field-button").each(function(){
  //   $(this).click(function(){
  //     getResultFromField("Humanities and Social Sciences", this.id);
  //   });
  // });
  // $(".Mgmt-field-button").each(function(){
  //   $(this).click(function(){
  //     getResultFromField("Management", this.id);
  //   });
  // });
  
  // function getResultFromField(programme, field){
  //   var programme = programme;
  //   var field = field;
  //   var degree = "All";
  //   var sortType = defaultSortType;
  //   ajaxFunc(programme, field, degree, sortType);
  // }
  
  // function getResultFromProgramme(programme){
  //     var programme = programme;
  //     var field = "All";
  //     var degree = "All";
  //     var sortType = defaultSortType;
  //     ajaxFunc(programme, field, degree, sortType);
  // }
  
  
  // function ajaxFunc(programme, field, degree, sortType){
  //   $.ajax({
  //     type: 'GET',
  //     url: "http://localhost:8086/igMSmigration/SortServiceUsingLoop?programme=" + programme +"&field=" + field +"&sortType=" + sortType + "&degree=" + degree,
  //     success: function(data){
  //       localStorage.setItem("programme", programme);
  //       localStorage.setItem("field", field);
  //       localStorage.setItem("degree", decodeURIComponent(degree));
  //       localStorage.setItem("sortType", sortType);
  //       localStorage.setItem("data", JSON.stringify(data));
  //       var currencySelected = 'INR';
  //       var currencyRatio = 1;
  //       localStorage.setItem("currencySelected", currencySelected);
  //       localStorage.setItem("currencyRatio", currencyRatio);
  //       window.location.href = './amazonUsingLoop.html';
  //     }
  //   })
  // }
  
  });