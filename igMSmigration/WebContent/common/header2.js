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
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var filters = ["Admission", programme, field, "All", defaultSortType, defaultCurrencySelected, defaultCurrencyRatio, defaultMaxFee];
    ajaxFunc(filters);
  });

  $('#internship-button').click(function(){
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var filters = ["Internship", programme, field, "All", defaultSortType, defaultCurrencySelected, defaultCurrencyRatio, defaultMaxFee];
    ajaxFunc(filters);
  });

  $('#assistantship-button').click(function(){
    var programme= $("#programme-dropdown option:selected").text();
    var field= $("#field-dropdown option:selected").text();
    var filters = ["Assistantship", programme, field, "All", defaultSortType, defaultCurrencySelected, defaultCurrencyRatio, defaultMaxFee];
    ajaxFunc(filters);
  });
  

});