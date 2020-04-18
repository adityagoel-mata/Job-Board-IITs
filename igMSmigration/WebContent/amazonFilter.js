$(document).ready(function(){

/////////////////////// Get the stored values of Programme, Field, Degree, SortType and Data //////////////////////////////////////
  
  var programme = localStorage.getItem("programme");
  var field = localStorage.getItem("field");
  var degree = localStorage.getItem("degree");
  var sortType = localStorage.getItem("sortType");
  var data = localStorage.getItem("data");

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

  degreeDropdownOptionsAppend(BSDegrees, "BS");
  degreeDropdownOptionsAppend(DesDegrees, "Des");
  degreeDropdownOptionsAppend(EnggDegrees, "Engg");
  degreeDropdownOptionsAppend(HSSDegrees, "HSS");
  degreeDropdownOptionsAppend(MgmtDegrees, "Mgmt");
  degreeDropdownOptionsAppend(CommonDegrees, "Common");

  function degreeDropdownOptionsAppend(degreeArray, className){
    for (var i=0; i<degreeArray.length; i++){
      $("#degree-dropdown").append("<option disabled = \"disabled\" class = " + className + " value = \"" + degreeArray[i]+ "\">"+degreeArray[i]+"</option>");
    }
  }


  /// When Program = All ==> Field = All and Degree = All(Disabled) ///////////////////////////  
  if (programme == "All") {
    $("#field-dropdown option").css("display", "block");
    $("#degree-dropdown option").css("display", "block");  
  }
  if (programme == "Basic Sciences") {
    $("#field-dropdown").find(".BS").attr('disabled', false);
    if (field == "All") {
      $("#degree-dropdown").find(".BS").css("display", "block");
      $("#degree-dropdown option[value=\"P.hD\"]").css("display", "block");
    }
  }
  if (programme == "Design") {
    $("#field-dropdown").find(".Des").attr('disabled', false);
    if (field == "All") {
      $("#degree-dropdown").find(".Des").css("display", "block");
      $("#degree-dropdown option[value=\"P.hD\"]").css("display", "block");
    }
  }
  if (programme == "Engineering") {
    $("#field-dropdown").find(".Engg").attr('disabled', false);
    $("#field-dropdown").find(".Other").attr('disabled', false);
    if (field == "All") { 
      $("#degree-dropdown").find(".Engg").css("display", "block");
      $("#degree-dropdown option[value=\"PGDIIT\"]").css("display", "block");
      $("#degree-dropdown option[value=\"P.hD\"]").css("display", "block");
    }
  }
  if (programme == "Humanities and Social Sciences") {
    $("#field-dropdown").find(".HSS").attr('disabled', false);
    if (field == "All") {
      $("#degree-dropdown").find(".HSS").css("display", "block");
      $("#degree-dropdown option[value=\"M.Sc + P.hD\"]").css("display", "block");
      $("#degree-dropdown option[value=\"M.Phil\"]").css("display", "block");
      $("#degree-dropdown option[value=\"P.hD\"]").css("display", "block");
    }
  }
  if (programme == "Management") {
    $("#field-dropdown").find(".Mgmt").attr('disabled', false);
    if (field == "All") {
      $("#degree-dropdown").find(".Mgmt").css("display", "block");
      $("#degree-dropdown option[value=\"P.hD\"]").css("display", "block");
    }
  }

  ////////////// When Program = B/D/E/H/M ==> Field = All and Degree = filtered (based on Programme) //////////////
  /* Case 1: Redirected from Header ==> var programme is already set and result request sent by header.js*/
  $("#programme-dropdown option:contains("+programme+")").attr('selected', true);
  $("#field-dropdown option:contains("+field+")").attr('selected', true);
  $("#degree-dropdown option[value=\""+degree+"\"]").attr('selected', true);
  
  /* Case 2: Redirected after change event on Pragramme filter and result request sent by amazonFilter.js*/
  $("#programme-dropdown").change(function(){
    var programme= $("#programme-dropdown option:selected").text();
    var field="All";
    var degree="All";
    sortType = defaultSortType;
    ajaxFunc(programme, field, degree, sortType);
  });
  

  ////////////// When Program = B/D/E/H/M and Field = Specified ==> Degree = filtered (based on field) /////////////
  /* Case 1: Redirected after change event on field filter when programme was earlier specified */
  $("#field-dropdown").change(function(){
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var degree = "All";
    sortType = defaultSortType;
    ajaxFunc(programme, field, degree, sortType);
  });

  var dataJA2 = JSON.parse(data);
  var allDegreeJA = dataJA2[2];
  var allAvailableDegree = [];
  for (var i=0; i<allDegreeJA.length; i++){
    var allDegreeJO = dataJA2[2][i];
    var allDegreeJOLength = Object.keys(allDegreeJO).length;
    for (var j=0; j<allDegreeJOLength; j++){
      var keyJO = Object.keys(allDegreeJO)[j];
      if (keyJO == "institute" || keyJO == "programme" || keyJO == "field" || keyJO == "deptWebsite" || keyJO == "ord") {
        continue;
      }
      else {
        if (!allAvailableDegree.includes(keyJO))
        allAvailableDegree.push(keyJO);
      }
    }
  }
  

  for (var i=0; i<allAvailableDegree.length; i++){
    var degreeValue = allAvailableDegree[i];
    $("#degree-dropdown option[value='"+degreeValue+"']").attr('disabled', false);
  }
  
  /// When Program = B/D/E/H/M and Field = Specified and Degree = Specified ==> Search Results.... /////////////////
  $("#degree-dropdown").change(function(){
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var degree = $("#degree-dropdown option:selected").text();
    sortType = defaultSortType;
    degree = encodeURIComponent(degree);
    ajaxFunc(programme, field, degree, sortType);
  });

  function ajaxFunc(programme, field, degree, sortType){
    $.ajax({
      type: 'GET',
      url: "http://localhost:8086/igMSmigration/SortServiceUsingLoop?programme=" + programme +"&field=" + field +"&sortType=" + sortType + "&degree=" + degree,
      success: function(data){
        localStorage.setItem("programme", programme);
        localStorage.setItem("field", field);
        localStorage.setItem("degree", decodeURIComponent(degree));
        localStorage.setItem("sortType", sortType);
        localStorage.setItem("data", JSON.stringify(data));
        window.location.href = './amazonUsingLoop.html';
      }
    });
  }

  


  

});