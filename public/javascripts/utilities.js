function TwitObject(text,location) {
    this.text = text;
    this.name = "blank";
    this.screenName = "blank";
    this.location = location;
    this.map_friendly_state = "blank";
}

// Create a state hash to grab values.
function MapData(){
  this.us_state = {};
  this.lowVal = 0;
  this.highVal = 0;
}


function parseTwitResponse(data){
  var i=0;
  var mapData = new MapData();
  var currMax = 0;
  var currMin = 0;

  for (i=0;i<data.statuses.length;i++)
  {
      var tempTwit = new TwitObject(data.statuses[i].text,
                    mapFriendlyState(data.statuses[i].user.location));
      // State found adding to MapData
      if(tempTwit.location.localeCompare("blank") != 0)
      {
        if(mapData.us_state[tempTwit.location] != undefined)
        {
          mapData.us_state[tempTwit.location] += 1;
        }
        else
        {
          mapData.us_state[tempTwit.location] = 1;
        }
        // Find Max and Min Values
        console.log(tempTwit.location + ": " + mapData.us_state[tempTwit.location]);
      }
  }
  return mapData;
}

/* Check if a string matches a state and convert it to 'map' format
 * Will check for locations that are larger than two letters
 * Pre: String greater than 2
 * Post: If state is found return 'Map' formatted str.
*/
function mapFriendlyState(str){
  str = str.toLowerCase();

  if(str.indexOf("alabama") == 0){
    return "US-AL";
  }else if(str.indexOf("alaska") == 0){
    return "US-AK";
  }else if(str.indexOf("arizona") == 0){
    return "US-AZ";
  }else if(str.indexOf("california") == 0){
    return "US-CA";
  }else if(str.indexOf("colorado") == 0){
    return "US-CO";
  }else if(str.indexOf("conneticut") == 0){
    return "US-CT";
  }else if(str.indexOf("delaware") == 0){
    return "US-DE";
  }else if(str.indexOf("florida") == 0){
    return "US-FL";
  }else if(str.indexOf("georgia") == 0){
    return "US-GL";
  }else if(str.indexOf("hawaii") == 0){
    return "US-HI";
  }else if(str.indexOf("idaho") == 0){
    return "US-ID";
  }else if(str.indexOf("illinois") == 0){
    return "US-IL";
  }else if(str.indexOf("indiana") == 0){
    return "US-IN";
  }else if(str.indexOf("iowa") == 0){
    return "US-IA";
  }else if(str.indexOf("kansas") == 0){
    return "US-KS";
  }else if(str.indexOf("kentucky") == 0){
    return "US-KY";
  }else if(str.indexOf("louisiana") == 0){
    return "US-LA";
  }else if(str.indexOf("maine") == 0){
    return "US-ME";
  }else if(str.indexOf("maryland") == 0){
    return "US-MD";
  }else if(str.indexOf("massachusetts") == 0){
    return "US-MA";
  }else if(str.indexOf("minnesota") == 0){
    return "US-MN";
  }else if(str.indexOf("mississippi") == 0){
    return "US-MS";
  }else if(str.indexOf("missouri") == 0){
    return "US-MO";
  }else if(str.indexOf("montana") == 0){
    return "US-MT";
  }else if(str.indexOf("nevada") == 0){
    return "US-NV";
  }else if(str.indexOf("nebraska") == 0){
    return "US-NE";
  }else if(str.indexOf("new hampshire") == 0){
    return "US-NH";
  }else if(str.indexOf("new jersey") == 0){
    return "US-NJ";
  }else if(str.indexOf("new mexico") == 0){
    return "US-NM";
  }else if(str.indexOf("new york") == 0){
    return "US-NY";
  }else if(str.indexOf("north carolina") == 0){
    return "US-NC";
  }else if(str.indexOf("north dakota") == 0){
    return "US-ND";
  }else if(str.indexOf("ohio") == 0){
    return "US-OH";
  }else if(str.indexOf("oklahoma") == 0){
    return "US-OK";
  }else if(str.indexOf("oregon") == 0){
    return "US-OR";
  }else if(str.indexOf("pennsylvania") == 0){
    return "US-PA";
  }else if(str.indexOf("rhode island") == 0){
    return "US-RI";
  }else if(str.indexOf("south carolina") == 0){
    return "US-SC";
  }else if(str.indexOf("south dakota") == 0){
    return "US-SD";
  }else if(str.indexOf("tennessee") == 0){
    return "US-TN";
  }else if(str.indexOf("texas") == 0){
    return "US-TX";
  }else if(str.indexOf("utah") == 0){
    return "US-UT";
  }else if(str.indexOf("vermont") == 0){
    return "US-VT";
  }else if(str.indexOf("virgina") == 0){
    return "US-VA";
  }else if(str.indexOf("washington") == 0){
    return "US-WA";
  }else if(str.indexOf("west virgina") == 0){
    return "US-WV";
  }else if(str.indexOf("wisconsin") == 0){
    return "US-WI";
  }else if(str.indexOf("wyoming") == 0){
    return "US-WY";
  }else{
    return "blank";
  }

} // End of mapFriendStates

/* Creates array of hashes for the 'MAP'
 * Pre: mapData has data
 * Post: arrayOfHashes as the variable name implies
*/
function friendlyAreaFormat(mapData){
  console.log("called friendlyAreaFormat");
  var arrayOfHashes = [];
  if(mapData == undefined)
  {
    console.log("IT IS UNDEFINED");
    return false;
  }
  var hash = mapData.us_state;
  var min = 0;
  var max = 0;
  var i = 0;
  Object.keys(hash).forEach(function (key)
  {
      var value = hash[key];
      var tempVal = {"id": key, "value": value};
      console.log(key + ": " + value);
      arrayOfHashes.push(tempVal);

      if(i == 0){ max = value; min = value;}
      if( value > max ){
        max = value;
      }
      if(value < min){
        min = value;
      }
      i++;
  });
  var returnHash = {};
  returnHash["areas"] = arrayOfHashes;
  returnHash["max"] = max;
  returnHash["min"] = min;

  return returnHash;
}
