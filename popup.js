var url = "";

function getCurrentTabUrl() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    url = tab.url;
    console.log("Inner: " + url);
    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
  });
  return url;
}

window.onload = setEventListeners;

function setEventListeners(){
  document.getElementById("testButton").onclick = getUrl;
}

function getUrl(){
  //Create query to get active tab
  var query = { active: true, currentWindow: true };
  //Send query and call "callback" to write out result
  chrome.tabs.query(query,callback);
  //Callback function is called when query is finished and recieves current tab
  function callback(tabs){
    checkForCookiePopup(tabs[0].url);
  }
}


function checkForCookiePopup(url){
  if(String(url).indexOf("elkjop") != -1){
    document.write("Elkjop.no");
  }
}