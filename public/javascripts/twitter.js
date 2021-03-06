var Twitter = React.createClass({

    getInitialState: function(){

        // This is called before our render function. The object that is
        // returned is assigned to this.state, so we can use it later.
        return {dataSent: 0, inputValue: "", mapData: []}
    },

    componentDidMount: function(){

        // componentDidMount is called by react when the component
        $.ajax({
            url: '/twitter-search',
            method: "GET",
            dataType: "json",
            data: {search: "node.js"},
            success: function(data)
            {
              this.setState({
                mapData: parseTwitResponse(data)
              });
              for(var i = 0; i < this.state.mapData.length; i++){
                //console.log(this.state.mapData[i].text);
              }
            }.bind(this)
        });

        //this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        //clearInterval(this.timer);
    },
    updateInputValue: function(evt) {
      this.setState({ inputValue: evt.target.value });
    },
    handleClick: function(){
      console.log("Search: " + this.state.inputValue);
      this.twitterSearch();
    },
    handleKeyPress: function(e){
      if (e.key === 'Enter') {
        console.log("Search: " + this.state.inputValue);
        this.twitterSearch();
        console.log("called function");
      }
    },
    twitterSearch: function(){
      console.log("Called function");
      $.ajax({
          url: '/twitter-search',
          method: "GET",
          dataType: "json",
          data: {search: this.state.inputValue},
          success: function(data)
          {
            this.setState({
              mapData: parseTwitResponse(data)
            });
            for(var i = 0; i < this.state.mapData.length; i++){
              //console.log(this.state.mapData[i].text);
            }
            this.forceUpdate();
          }.bind(this)
      });
    },
    mapUpdate: function(){

    },
    render: function() {
        //var elapsed = Math.round(this.state.elapsed / 100);
        // This will give a number with one digit after the decimal dot (xx.x):
        //var seconds = (elapsed / 10).toFixed(1);

        var seconds  = this.state.dataSent;

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.
        var buttonStyle = {
          backgroundColor: '#1da1f2',
          border: 2,
          borderColor: "#3b88c3",
          color: "#fff",
          boxShadow: "0 1px 0 #fff",
          height: 30,
          borderRadius: 2,
          cursor: "pointer"
        };

        var divStyle = {
          textAlign: "center"
        };

        var inputStyle = {
          width: "70%",
          height: 24,
          marginBottom: 30
        };

        return (
            <div style={divStyle} >
              <input style={inputStyle} value={this.state.inputValue} onChange={this.updateInputValue} onKeyPress={this.handleKeyPress} />
              <input style={buttonStyle} type="button" value="Search Twitter!" onClick={this.handleClick} />
              <UsMap data={this.state.mapData} />
            </div>
        );
    },
});


ReactDOM.render(
    <Twitter start={Date.now()} />,
    document.getElementById('root')
);
