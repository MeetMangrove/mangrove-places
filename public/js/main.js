$(document).ready(function() {
  /**
   * Jquery Adress typehead Plugin Config
   */

  var optionnalConfig = {
    label : "Adresse complete", 
    // street_number_input : {
    //   id : "numberaddress",
    //   label : "Numero de la rue"
    // },
    street_name_input : {
      id : "streetaddress",
      // label : "Nom de la rue"
    },
    zip_input : {
      id : "zip",
      // label : "Code postal"
    },
    town_input : {
      id : "city",
      // label : "Ville"
    },
    // department_input : {
    //   id : "department",
    //   label : "Departement"
    // },
    // region_input : {
    //   id : "region",
    //   label : "Region"
    // },
    country_input : {
      id : "country",
      label : "Pays"
    }
  };
  $("input#typeaheadaddress").suggest(optionnalConfig);
});

