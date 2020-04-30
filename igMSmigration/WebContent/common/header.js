$(document).ready(function(){

  /////////////////////////////// Framing the HTML Static Objects /////////////////////////////////////
  
  fieldButtonAppend(BSFields, "BS-dropdown", "BS-field-button");
  fieldButtonAppend(DesFields, "Des-dropdown", "Des-field-button");
  fieldButtonAppend(EnggFields, "Engg-dropdown", "Engg-field-button");
  fieldButtonAppend(HSSFields, "HSS-dropdown", "HSS-field-button");
  fieldButtonAppend(MgmtFields, "Mgmt-dropdown", "Mgmt-field-button");
  
  function fieldButtonAppend(fieldArray, dropdownButton, className){  
    for (var i=0; i<fieldArray.length; i++){
      $("."+dropdownButton).append("<button class=\"" + className + "\" id=\"" + fieldArray[i] + "\">" + fieldArray[i] + "</button>");
    }  
  }
  
  /////////////////// When User selects specific programme from the header /////////////////////
  
  /* Programme= B/D/E/H/M, field= All, Sort = nirf, degree = programme specific, Show only degree NAMES in result */
  
  for (var i=0; i<allProgrammes.length; i++) {
    (function(i){
      $("#"+classNames[i]).click(function(){
        getResultFromProgramme(allProgrammes[i]);
      });
    })(i);
  }
  
  function getResultFromProgramme(programme){
    var currencySelected = 'INR';
    var currencyRatio = 1;
    var filters = ["Admission", programme, "All", "All", defaultSortType, defaultCurrencySelected, defaultCurrencyRatio, defaultMaxFee];
    ajaxFunc(filters);
  }
  
  /////////////////// When User selects specific field from the header /////////////////////////
  /* Programme= B/D/E/H/M, field= Specified, Sort = nirf, degree = filed Specific, Show results having degree+field */
  
  for (var i=0; i<allProgrammes.length; i++) {
    (function(i){
      $("."+classNames[i]+"-field-button").each(function(){
        $(this).click(function(){
          getResultFromField(allProgrammes[i], this.id);
        });
      });
    })(i);
  }
  
  function getResultFromField(programme, field){
    var currencySelected = 'INR';
    var currencyRatio = 1;
    var filters = ["Admission", programme, field, "All", defaultSortType, defaultCurrencySelected, defaultCurrencyRatio, defaultMaxFee];
    ajaxFunc(filters);
  }
  

});