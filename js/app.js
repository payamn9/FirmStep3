/*Test Code by Payam Naghdi 2017

App.js for sorting data list*/


var req;

//Ajax request to server, try for all browsers
function ajaxfunction(){
    try{
        //Opera 8.0+, Firefox, Safari, Chrome
        req = new XMLHttpRequest();
    }
    catch(e){
        try{
            //Internet Explorer Bowsers (pun intended)
      req = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
            req = new ActiveXObject("Microsoft.XMLHTTP")
            }
            catch(e){
                alert("Phantom Browser!")
                return false;
            }
        }
    }
}

//Fetch Products and clear filters on page load
function fetchProductList(){
clearfilters();
ajaxfunction();   
req.open('GET', '/products.json');
req.onreadystatechange = function(){
    if(req.readyState === 4){
      if( req.status === 200){
        var productslist = JSON.parse(req.responseText);
        var phoneList = '<ul class="productslist">'; //Create list
        for(var i=0; i<productslist.length; i ++){
            phoneList += '<li id="' + productslist[i].id + '">';
            phoneList += '<a href="#" class="product-photo">';
            phoneList += '<img src=' + productslist[i].image.small + ' height="130" alt=' + productslist[i].name + '>';
            phoneList += '</a>';
            phoneList += '<h2><a href="#">' + productslist[i].name + '</a></h2>';
            phoneList += '<ul class="product-description">';
            phoneList += '<li><span>Manufacturer: </span>' + productslist[i].specs.manufacturer + '</li>';
            phoneList += '<li><span>Storage: </span>' + productslist[i].specs.storage + '</li>';
            phoneList += '<li><span>OS: </span>'+ productslist[i].specs.os +'</li>';
            phoneList += '<li><span>Camera: </span>'+ productslist[i].specs.camera +'</li>';
            phoneList += '<li><span>Description: </span>' + productslist[i].description + '</li>';
            phoneList += ' </ul>';
            phoneList += '<p class="product-price">' + productslist[i].price +'</p>';
            phoneList += '</li>';                   
        }     
        phoneList += '</ul>';
        phoneList += '<p class="no-results">No Search Results</p>'
        document.getElementById('phoneListed').innerHTML = phoneList;
        $(".no-results").hide();//Hide no search results text.
    }
    else {
        document.getElementById('phoneListed').innerHTML = 'no phonelist';
    }
  }
 };
req.send();
}

//clear filters
function clearfilters(){
    $(":checkbox:checked").removeAttr('checked');
}

//Filter logic
$(":checkbox").change(function() {
 
    //stores checkbox values
   var checkedValues = $(":checkbox:checked").map(function() {
        return this.value;
    }).get();

    //checks if boxes are checked show all if not
   if (checkedValues.length <= 0){    
    $(".productslist li").show();
    }
   else{
    $(".productslist li").hide(); //hide list
    $(".product-description li").show(); //show details of products
    $(".no-results").show(); //show no results if no products filtered
    //iterates through checked filters
    for (var i = 0; i < checkedValues.length; i++) {
     var active = [];  
     //checks if specs contains values of checkboxes show products that do
     $(".productslist ul li:contains('" + checkedValues[i] + "')").parent("ul").parent("li").show() && $(".no-results").hide();
     //pushes visible products into array and checks if they contain other filters if not hide them.
     active.push($(".productslist ul li:contains('" + checkedValues[i] + "')").parent("ul").parent("li"));
    
        if(active.length > 1){
            for (var j = 0; j < active.length; j++){
                if(active[j].contains(checkedValues[i])){
                    active[j].style.visibility = "visible";
                }
                    else {
                        active[j].style.visibility = "hidden";
                    }

                }
            }
        }
     }       
 });


/* Due to time constraints I did not have time to implement what I fully wanted: a stronger filter system based on the lists of each spec 
and test them against each other as follows :

var options = { valueNames: [ 'manufacturer', 'storage', 'os', 'camera' ] };
 var filterList = new List('filters', options);
   
 var updateList = function(){
   var values_manufacturer = $(".f_Manufacturer").val()
   var values_storage = $(".f_Storage").val()
   var values_os = $(".f_OS").val()
   var values_camera = $(".f_camera").val()

   filterList.filter(function(item) {
     return (_(values_manufacturer).contains(item.values().manufacturer) || !values_manufacturer) 
            && (_(values_storage).contains(item.values().storage) || !values_storage) && (_(values_storage).contains(item.values().storage) || !values_storage)
            && (_(values_os).contains(item.values().os) || !values_os) && (_(values_camera).contains(item.values().camera) || !values_camera)
   });
 }
 */



