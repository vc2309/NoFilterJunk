var id=0;
var set=0;
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function modify(elem){
 
    id=id+1;
    var hid_p="hid_p"+id;
    var hid_btn="hid_btn"+id;
    var hid_p_id="#"+hid_p;
    var hid_btn_id="#"+hid_btn;
    $('<p id="'+hid_p+'" style=color:yellow!important; background color:red!important; font-size:32px!important;>ALERT</p><button id="'+hid_btn+'" class="yo">Let me see</button>').insertBefore(elem);
    $('html').append('<script>$("'+hid_btn_id+'").click(function(){var tid=(this.id).substr(7,);var nid="#marked"+tid;var hid_p="#hid_p"+tid;var hid_btn="#hid_btn"+tid;obj=$(nid);if(obj.hasClass("marked")){obj.show(); $(hid_p).hide(); $(hid_btn).hide();}});</script>');
    
    $(elem).hide();
    $(elem).addClass("marked");
    $(elem).attr('id',"marked"+id);
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) 
{
  console.log(msg.action);
  console.log("LOOPING NOW");
  var KEYWORDS=msg.action;
      // setInterval(function(){
      for (t in KEYWORDS)
      {  
        // console.log(KEYWORDS[t]);
        var text=KEYWORDS[t];
            if(text.length>2){
                  var all=$(":contains('"+text+"')");
                  var list=["P","SPAN","LI"];
                  $.each(all,function(ind,val){
                    
                    if(($(val).children().length===0) || list.indexOf($(val).prop("tagName"))>-1 ){
                      if($(this).hasClass("marked")==false){
                      modify($(this));}
                    }
                  });
                }
      }
    // },1500);
   
});
