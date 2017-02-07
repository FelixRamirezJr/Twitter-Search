var TimerExample = React.createClass({

    getInitialState: function(){

        // This is called before our render function. The object that is
        // returned is assigned to this.state, so we can use it later.
        return {dataSent: 0}
    },

    componentDidMount: function(){

        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:

        //this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        //clearInterval(this.timer);
    },

    render: function() {

        //var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        //var seconds = (elapsed / 10).toFixed(1);

        var seconds  = this.state.dataSent;

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
});


ReactDOM.render(
    <TimerExample start={Date.now()} />,
    document.getElementById('root')
);
