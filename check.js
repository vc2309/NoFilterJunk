var KEYWORDS=[];
chrome.webNavigation.onCompleted.addListener(function (tabId, changeInfo, tabs) //Page is loaded
{

   	// chrome.tabs.sendMessage(tabs[0].id, {action: "INJECT"}, function(response) {});
   chrome.storage.sync.get("KEYWORD_STORED", function(result)	//On page load, get all words which must be blocked
   {
	    if(result.KEYWORD_STORED!=undefined && result.variable!="")
	    { 
	    	
		    KEYWORDS=result.KEYWORD_STORED;
		    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
		    {chrome.tabs.sendMessage(tabs[0].id, {action: KEYWORDS}, function(response){}); //Sends the payload to main.js 
		    });
		    
   		}
   
   });

   if (changeInfo.status == 'complete') 
   {

	   	console.log("updated");   
      	if(KEYWORDS!=undefined && KEYWORDS!="")
      	{
      		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        	chrome.tabs.sendMessage(tabs[0].id, {action: KEYWORDS}, function(response) {});

      		});
   		}

   }
});

