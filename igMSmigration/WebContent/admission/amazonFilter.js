$(document).ready(function(){

  /////////////////////// Get the stored values of Programme, Field, Degree, SortType and Data /////////////////////
    
    var purpose = localStorage.getItem("purpose");
    var programme = localStorage.getItem("programme");
    var field = localStorage.getItem("field");
    var degree = localStorage.getItem("degree");
    var sortType = localStorage.getItem("sortType");
    var data = localStorage.getItem("data");
    var dataJA2 = JSON.parse(data);
    var currencySelected = localStorage.getItem("currencySelected");
    var currencyRatio = localStorage.getItem("currencyRatio");
    var maxFee = localStorage.getItem("maxFee");
    var allAvailableDegree = localStorage.getItem("allAvailableDegree");

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
  
    $("#max").html("(Max: "+maxFee+")");
    $("#fees-range").slider({
      range: true,  
      min: 500000,
      max: 1000000,
      step: 100000,
      values: [500000, maxFee],
      
      slide: function(event, ui) {
        $("#max").html("(Max: "+ui.values[1]+")");
        if (ui.values[0]>500000) return false;
      },
      stop: function(event, ui) {
        var purpose= $("#purpose-dropdown option:selected").text();
        var programme= $("#programme-dropdown option:selected").text();
        var field= $("#field-dropdown option:selected").text();
        var degree = $("#degree-dropdown option:selected").text();
        degree = encodeURIComponent(degree);
        var maxFee = ui.values[1];
        localStorage.setItem("maxFee", maxFee);
        var filters = [purpose, programme, field, degree, sortType, currencySelected, currencyRatio, maxFee];
        ajaxFunc(filters);
    
      }
    });
      
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
    $("#purpose-dropdown option:contains("+purpose+")").attr('selected', true);
    $("#programme-dropdown option:contains("+programme+")").attr('selected', true);
    $("#field-dropdown option:contains("+field+")").attr('selected', true);
    $("#degree-dropdown option[value=\""+degree+"\"]").attr('selected', true);
        
    $("#purpose-dropdown").change(function(){
      var purpose= $("#purpose-dropdown option:selected").text();
      var programme= $("#programme-dropdown option:selected").text();
      var field= $("#field-dropdown option:selected").text();
      var filters = [purpose, programme, field, "All", sortType, currencySelected, currencyRatio, maxFee];
      ajaxFunc(filters);
    });
    
    /* Case 2: Redirected after change event on Pragramme filter and result request sent by amazonFilter.js*/
    $("#programme-dropdown").change(function(){
      var purpose= $("#purpose-dropdown option:selected").text();
      var programme= $("#programme-dropdown option:selected").text();
      var filters = [purpose, programme, "All", "All", sortType, currencySelected, currencyRatio, maxFee];
      ajaxFunc(filters);
    });
    
  
    ////////////// When Program = B/D/E/H/M and Field = Specified ==> Degree = filtered (based on field) ///////////
    /* Case 1: Redirected after change event on field filter when programme was earlier specified */
    $("#field-dropdown").change(function(){
      var purpose= $("#purpose-dropdown option:selected").text();
      var programme= $("#programme-dropdown option:selected").text();
      var field= $("#field-dropdown option:selected").text();
      var filters = [purpose, programme, field, "All", sortType, currencySelected, currencyRatio, maxFee];
      ajaxFunc(filters);
    });
  

    if (degree=="All") {
      var allDegreeJA = dataJA2[2];
      var allAvailableDegree = [];
      for (var i=0; i<allDegreeJA.length; i++){
        var allDegreeJO = dataJA2[2][i];
        var allDegreeJOLength = Object.keys(allDegreeJO).length;
        for (var j=0; j<allDegreeJOLength; j++){
          var keyJO = Object.keys(allDegreeJO)[j];
          if (keyJO == "institute" || keyJO == "programme" || keyJO == "field" || keyJO == "deptWebsite" || keyJO ==  "ord") {
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
      localStorage.setItem("allAvailableDegree",allAvailableDegree);
  
    }

    if (degree!="All"){
      var allAvailableDegreeArray = allAvailableDegree.split(',');
      for (var i=0; i<allAvailableDegreeArray.length; i++){
        var degreeValue = allAvailableDegreeArray[i];
        $("#degree-dropdown option[value='"+degreeValue+"']").attr('disabled', false);
      }
    }
  
    
    /// When Program = B/D/E/H/M and Field = Specified and Degree = Specified ==> Search Results.... ///////////////
    $("#degree-dropdown").change(function(){
      var purpose= $("#purpose-dropdown option:selected").text();
      var programme= $("#programme-dropdown option:selected").text();
      var field= $("#field-dropdown option:selected").text();
      var degree = $("#degree-dropdown option:selected").text();
      degree = encodeURIComponent(degree);
      var filters = [purpose, programme, field, degree, sortType, currencySelected, currencyRatio, maxFee];
      ajaxFunc(filters);
    });
  







  });