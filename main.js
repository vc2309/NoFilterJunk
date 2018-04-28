var id=0;
var set=0;
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

var modify = function(elem,hashID){
    var classID = hashID;
    id=id+1;
    var hid_p="hid_p"+id;
    var hid_btn="hid_btn"+id;
    var hid_p_id="#"+hid_p;
    var hid_btn_id="#"+hid_btn;
    var elemClass = "marked"+classID;
    $('<p class="'+classID+'" id="'+hid_p+'" style=color:yellow!important; background color:red!important; font-size:32px!important;>ALERT</p><button class="'+classID+'"  id="'+hid_btn+'" class="yo">Let me see</button>').insertBefore(elem);
    $('html').append('<script>$("'+hid_btn_id+'").click(function(){var tid=(this.id).substr(7,);var nid="#marked"+tid;var hid_p="#hid_p"+tid;var hid_btn="#hid_btn"+tid;obj=$(nid);if(obj.hasClass("'+elemClass+'")){obj.show(); $(hid_p).hide(); $(hid_btn).hide();}});</script>');
    
    $(elem).hide();
    $(elem).addClass(elemClass);
    $(elem).attr('id',"marked"+id);
}

var revertMod = function(classID)
{
    var refClass = '.'+classID;
    $(refClass).remove();
    // var tid=(this.id).substr(7,);
    
    var elemClass = ".marked"+classID;
    objects=$(elemClass);
    console.log(objects);
    for(var obj=0; obj<objects.length; obj++)
    {
      // console.log(obj);
      $(objects[obj]).show();
    }
    

}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) 
{

  if (msg.action=="REMOVE") {
    revertMod(msg.classID);
  }
  else
  {
      console.log(msg.action);
        console.log("LOOPING NOW");
        var KEYWORDS=msg.action;
            // setInterval(function(){
            for (t in KEYWORDS)
            {  
              
              var text=KEYWORDS[t];
                  if(text.length>2)
                  {
                    var all=$(":contains('"+text+"')");
                    var list=["P","SPAN","LI"];
                    $.each(all,function(ind,val){
                      
                    if(($(val).children().length===0) || list.indexOf($(val).prop("tagName"))>-1 )
                    {
                      if($(this).hasClass("marked")==false)
                      {
                        modify($(this),idHash(text));}
                      }
                    });
                  }
            }
          // },1500);
    }
   
});

var unHash = function(ID)
{
  var hashID='';
  var temp='';
  for (char in ID)
  {
    if(ID[char]!='_')
    {
      temp=temp+ID[char];
    }
    else
    {
      hashID=hashID+String.fromCharCode(parseInt(temp));
      temp='';
    }
  }
  return hashID;
}

var idHash = function(ID)
{
  var hashID='';
  for (char in ID)
  {
    hashID=hashID+String(ID.charCodeAt(char))+'_';
  }
  return hashID;
}
