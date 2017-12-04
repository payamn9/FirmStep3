# FirmStep3

Due to time constraints I did not have time to implement what I fully wanted: a stronger filter system based on the lists of each spec 
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
 
 Otherwise all is functional 

 Regards
 Payam