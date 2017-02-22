function TwitObject(text,location) {
    this.text = text;
    this.name = "blank";
    this.screenName = "blank";
    this.location = location;
}

function parseTwitResponse(data){
  var i=0;
  var twitArray = [];
  for (i=0;i<data.statuses.length;i++){
      var tempTwit = new TwitObject(data.statuses[i].text,
        data.statuses[i].user.location);
       twitArray.push(tempTwit);
  }

  for(i = 0; i < twitArray.length; i++)
  {
    //console.log(twitArray[i].text);
  }
  return twitArray;
}
