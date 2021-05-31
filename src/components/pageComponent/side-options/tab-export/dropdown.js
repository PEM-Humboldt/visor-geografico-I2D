import $ from "jquery";

// create dropdown with search
export function createDropdown(title,name,data){
    // create dropdown
    let existingDiv = $('#exportData');
    let dropdown = document.createElement('div');
    dropdown.id = 'dropdown'+title;
    dropdown.setAttribute('class','dropdown');
    existingDiv.append(dropdown)

    // create input search
    let inputSearch = document.createElement('input');
    inputSearch.id = 'buscar-input'+title;
    inputSearch.setAttribute('class', 'form-control search w-100 d-block dropdown-toggle');
    inputSearch.setAttribute('type', 'search');
    inputSearch.setAttribute('placeholder', 'Buscar '+name);
    inputSearch.setAttribute('autofocus', 'autofocus');
    inputSearch.setAttribute('data-toggle', 'dropdown');
    inputSearch.setAttribute('aria-haspopup', 'true');
    inputSearch.setAttribute('aria-expanded', 'false');
    dropdown.append(inputSearch)

    // create dropdown menu
    let dropdownMenu = document.createElement('div');
    dropdownMenu.id = "dropdown-menu"+title;
    dropdownMenu.setAttribute('class', 'dropdown-menu');
    dropdownMenu.setAttribute('aria-labelledby', 'dropdown_user');
    dropdown.append(dropdownMenu)

    // create menu items
    let menuItems = document.createElement('div');
    menuItems.id = "menuItems"+title;
    menuItems.setAttribute('class','menuItems');
    dropdownMenu.append(menuItems);

    // tooltip items
    let menuItemsTooltip = document.createElement('span');
    menuItemsTooltip.setAttribute('class','menuItemsTooltip');
    menuItemsTooltip.innerHTML ='Escoja un '+name;
    menuItems.append(menuItemsTooltip);

    // tooltip divider
    let tooltipDivider = document.createElement('div');
    tooltipDivider.setAttribute('class','dropdown-divider');
    menuItems.append(tooltipDivider);

    try{
      // console.log(data);
      // var features = data.getFeatures();
      // console.log(features);
      var lengthData = data.length;
      // console.log(data);console.log(data[0]);
      for (var i = 0; i < lengthData; i++) {
        // dropdown items
        let dropdownItems = document.createElement('input');
        dropdownItems.setAttribute('class','dropdown-item');
        dropdownItems.setAttribute('type', 'button');
        dropdownItems.setAttribute('value', data[i][2]);
        menuItems.append(dropdownItems);
      }
    }catch{
      let dropdownFail = document.createElement('div');
      dropdownFail.setAttribute('class','dropdown-header dropdown_empty');
      dropdownFail.setAttribute('style', 'display:none;');
      dropdownFail.innerHTML ='No hay ninguna coincidencia'
      menuItems.append(dropdownFail);
      // alert('No hay datos para mostrar')
    }

}


  // search on dropdown
  $('.dropdown').each(function(index, dropdown) {
    console.log('drop');
    //Find the input search box
    let search = $(dropdown).find('.search');
    //Find every item inside the dropdown
    let items = $(dropdown).find('.dropdown-item');
    //Capture the event when user types into the search box
    $(search).on('input', function() {
      filter($(search).val().trim().toLowerCase())
    });
    //For every word entered by the user, check if the symbol starts with that word
    //If it does show the symbol, else hide it
    function filter(word) {
      let length = items.length
      let collection = []
      let hidden = 0
      for (let i = 0; i < length; i++) {
        if (items[i].value.toString().toLowerCase().includes(word)) {
          $(items[i]).show()
        } else {
          $(items[i]).hide()
          hidden++
        }
      }
      //If all items are hidden, show the empty view
      if (hidden === length) {
        $(dropdown).find('.dropdown_empty').show();
      } else {
        $(dropdown).find('.dropdown_empty').hide();
      }
    }

    //If the user clicks on any item, set the title of the button as the text of the item
    $(dropdown).find('.dropdown-menu').find('.menuItems').on('click', '.dropdown-item', function() {
      $('#buscar-input'+title).val($(this)[0].value);
      // $(dropdown).find('.dropdown-toggle').text($(this)[0].value);
      $(dropdown).find('.dropdown-toggle').dropdown('toggle');
    })
  });
