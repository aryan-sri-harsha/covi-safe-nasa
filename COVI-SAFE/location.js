
function capitalize(input) {  
    var words = input.split(' ');  
    var CapitalizedWords = [];  
    words.forEach(element => {  
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return CapitalizedWords.join(' ');  
} 
function getLocation(){
 
    jQuery.get("http://ipinfo.io",function(response){
        $("#city").val(response.city);
        $("#region").val(response.region);
	},"jsonp")

}
function getInfo(){
    if($("#region").val()===""){
        $("#status").text("Give a valid Region");
        $("#status").css("visibility","visible");
        return;
    }
    if($("#city").val()===""){
        $("#status").text("Give a valid City");
        $("#status").css("visibility","visible");
        return;
    }
    $.get('https://api.rootnet.in/covid19-in/stats/latest',(resp)=>{
        
        $("#region").val( capitalize($("#region").val()));
        var req = resp["data"]["regional"].find(st => st.loc === $("#region").val());        
        
        if(req===undefined || req===null) $("#status").text("Region not found");
        else if(req["confirmedCasesIndian"]==undefined) $("#status").text("Region not found");
        else if(req["confirmedCasesIndian"]>1000000) $("#status").text("You are in danger zone wear mask");
        else $("#status").text("You are safe");
        $("#status").css("visibility","visible");
    })
}