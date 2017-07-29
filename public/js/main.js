$(document).ready(function() {
  /**
   * Jquery Adress typehead Plugin Config
   */

  var optionnalConfig = {
    // label : "Adresse complete", 
    street_number_input : {
      id : "numberaddress",
      // label : "Numero de la rue"
    },
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
    department_input : {
      id : "department",
      // label : "Departement"
    },
    region_input : {
      id : "region",
      // label : "Region"
    },
    country_input : {
      id : "country",
      // label : "Pays"
    }
  };
  $("input#typeaheadaddress").suggest(optionnalConfig);

  $('input[name="files"]').fileuploader({
    // Options will go here
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    limit: 5,
		changeInput: ' ',
		theme: 'thumbnails',
        enableApi: true,
		addMore: true,
		thumbnails: {
			box: '<div class="fileuploader-items">' +
                      '<ul class="fileuploader-items-list">' +
					      '<li class="fileuploader-thumbnails-input"><div class="fileuploader-thumbnails-input-inner">+</div></li>' +
                      '</ul>' +
                  '</div>',
			item: '<li class="fileuploader-item">' +
				       '<div class="fileuploader-item-inner">' +
                           '<div class="thumbnail-holder">${image}</div>' +
                           '<div class="actions-holder">' +
                               '<a class="fileuploader-action fileuploader-action-remove" title="Remove"><i class="remove"></i></a>' +
                           '</div>' +
                       	   '<div class="progress-holder">${progressBar}</div>' +
                       '</div>' +
                   '</li>',
			item2: '<li class="fileuploader-item">' +
				       '<div class="fileuploader-item-inner">' +
                           '<div class="thumbnail-holder">${image}</div>' +
                           '<div class="actions-holder">' +
                               '<a class="fileuploader-action fileuploader-action-remove" title="Remove"><i class="remove"></i></a>' +
                           '</div>' +
                       '</div>' +
                   '</li>',
			startImageRenderer: true,
			canvasImage: false,
			_selectors: {
				list: '.fileuploader-items-list',
				item: '.fileuploader-item',
				start: '.fileuploader-action-start',
				retry: '.fileuploader-action-retry',
				remove: '.fileuploader-action-remove'
			},
			onItemShow: function(item, listEl) {
				var plusInput = listEl.find('.fileuploader-thumbnails-input');
				
				plusInput.insertAfter(item.html);
				
				if(item.format == 'image') {
					item.html.find('.fileuploader-item-icon').hide();
				}
			}
		},
		afterRender: function(listEl, parentEl, newInputEl, inputEl) {
			var plusInput = listEl.find('.fileuploader-thumbnails-input'),
				api = $.fileuploader.getInstance(inputEl.get(0));
		
			plusInput.on('click', function() {
				api.open();
			});
		},    
});
});

