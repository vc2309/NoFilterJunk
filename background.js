var KEYWORDS=[];  //Global KEYWORD variable list
var DD_VALS=[];
var BLOCKED_HIDDEN=true;  //Global variable flag for empty KEYWORD list

var addWord = function(x)
{

    if(BLOCKED_HIDDEN)
    {
        BLOCKED_HIDDEN=false;  //Set flag to false : KEYWORD list isn't empty
        $("#NO_WORDS").hide();
    }
    DD_VALS.push(x);
    chrome.storage.sync.set({"DD_VALS": DD_VALS});
    $('#DROPDOWN_UL').append("<li>"+x+"</li>");
}

$(function(){

      chrome.storage.sync.get("KEYWORD_STORED", function(result)  //On page load, get all words which must be blocked
     {
      KEYWORDS = result.KEYWORD_STORED;
     });

      chrome.storage.sync.get("KEYWORD_STORED", function(result)  //On page load, get all words which must be blocked
     {
      console.log("getArr");
      KEYWORDS = result.KEYWORD_STORED;
     });
	

  //ON CLICKING SUBMIT BUTTON
    	$("#SUBMIT_BTN").click(function(){
    		var b;
        chrome.storage.sync.get("KEYWORD_STORED", function(result)  //On page load, get all words which must be blocked
       {
        console.log(result.KEYWORD_STORED);
        if(result.KEYWORD_STORED!=undefined)
        { 
          KEYWORDS=result.KEYWORD_STORED;
        }
        else
        {
          KEYWORDS=[];
        }

    	 console.log(KEYWORDS);
      	var x=$("#INPUT_FIELD").val();
        if (x==undefined || (x.trim()).length<2) //Validation test: make sure entered value is valid length
        {
            // alert("Please enter a valid value.");
            chrome.storage.sync.set({"KEYWORD_STORED": []});
        }

        else  //Valid input is entered
        {
              KEYWORDS.push(x); //Input word is added to KEYWORD list
              // addWord(x);   //Input word is added to Dropdown
              console.log("background.js");
              console.log(KEYWORDS);        
              chrome.storage.sync.set({"KEYWORD_STORED": KEYWORDS});  //Input word is stored
              chrome.storage.sync.set({"DD_VALS": DD_VALS});
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs){  //Send updated KEYWORD list to main.js
               chrome.tabs.sendMessage(tabs[0].id, {action: KEYWORDS}, function(response) {});  
              });
            }
       });

    });

//ON CLICKING BLOCKED WORDS BUTTON

    $('#BLOCKED_BTN').mousedown(function()
    {
        getArr();
        getDD();
  for(word in KEYWORDS)
  {
    if (DD_VALS.indexOf(KEYWORDS[word]) < 0)
      {  
         console.log(KEYWORDS[word]);
         addWord(KEYWORDS[word]);
      } 
    }
    });





});

var getArr = function(){
chrome.storage.sync.get("KEYWORD_STORED", function(result)  //On page load, get all words which must be blocked
   {
    console.log("getArr");
    KEYWORDS = result.KEYWORD_STORED;
   });
}

var getDD = function()
{
  chrome.storage.sync.get("DD_VALS", function(result)  //On page load, get all words which must be blocked
   {
    console.log("getDD");
    DD_VALS = result.DD_VALS;
   });
}

