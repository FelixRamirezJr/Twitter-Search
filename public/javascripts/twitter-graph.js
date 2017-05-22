var UsMap = React.createClass({

  getInitialState: function(){
    return {mapData: [], mapData: undefined}
  },

  componentDidMount: function(){
    this.setState({ map: true, mapData: this.props.data });
    this.createMap();
    $(".amcharts-main-div").animate({
        height: '500px'
    }, {
        duration: 1500  // 2 seconds
    });
  },

  handleChange: function(){
    console.log('change!!');
  },
  componentDidUpdate: function(prevProp,prevState){
    //console.log(this.props.data);
    if(this.state.mapData == undefined || this.state.mapData.length <= 0)
    {
      this.state.mapData = this.props.data;
    }
    if(JSON.stringify(prevState.mapData) != JSON.stringify(this.props.data) )
    {
      console.log('Different Now Update Map!');
      this.setState({ mapData: this.props.state });
      $('#chartdiv').html('');

      this.createMap();
      $(".amcharts-main-div").animate({
          height: '500px'
      }, {
          duration: 1500  // 2 seconds
      });
    }
  },
  createMap: function(){
    var areasHash = friendlyAreaFormat(this.state.mapData);
    console.log(this.state.mapData);
    console.log(areasHash);
    var map = AmCharts.makeChart( "chartdiv", {
      "type": "map",
      "theme": "light",
      "colorSteps": 10,

      "dataProvider": {
        "map": "usaLow",
        "areas": areasHash["areas"]
      },

      "areasSettings": {
        "autoZoom": true
      },

      "valueLegend": {
        "right": 10,
        "minValue": areasHash["min"],
        "maxValue": areasHash["max"]
      },

      "export": {
        "enabled": true
      }

    } );
  },

  render() {
    return <div id="chartdiv"> </div>;
  },

});
