
//Strategic Goal Charts
function drawGoalCharts() {
  var url = "https://dashboard.udot.utah.gov/resource/rqv9-ry2j.json?entity=Statewide";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    var dataIndex = data[0].safety;
    var indexLabel =["","Safety Index"];
    Chart.pluginService.register({
  		beforeDraw: function (chart) {
  			if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;
  				//Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
        	var fontStyle = centerConfig.fontStyle || 'Arial';
  				var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;
  				//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);
          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);
  				//Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;
          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
  			}
  		}
    });
		var config = {
			type: 'doughnut',
			data: {
				labels: indexLabel,
				datasets: [{
					data: [(Math.round((100-dataIndex)*10)/10),dataIndex],
					backgroundColor: [
					  "#5a87c5",
					  "#d58e61"
					]
				}]
			},
		options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "proxima-nova, sans-serif",
      legend:{display:false},
    	responsive: true,
      animation: {duration: 3000, animateScale: true,animateRotate: true,easing:'easeOutBack'},
			elements: {
				center: {
					text: dataIndex+'%',
          color: '#000000', // Default is #000000
          fontStyle: 'proxima-nova, sans-serif', // Default is Arial
          sidePadding: 20 // Defualt is 20 (as a percentage)
				}
			}
		}
	 };
  	var ctx = document.getElementById("zero-fatalities-doughut-chart").getContext("2d");
  	var myChart = new Chart(ctx, config);
    dataIndex = data[0].mobility;
    indexLabel =["","Mobility Index"];
    config = {
			type: 'doughnut',
			data: {
				labels: indexLabel,
				datasets: [{
					data: [(Math.round((100-dataIndex)*10)/10),dataIndex],
					backgroundColor: [
					  "#5a87c5",
					  "#d58e61"
					]
				}]
			},
		options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "proxima-nova, sans-serif",
      legend:{display:false},
    	responsive: true,
      animation: {duration: 3000, animateScale: true,animateRotate: true,easing:'easeOutBack'},
			elements: {
				center: {
					text: dataIndex+'%',
          color: '#000000', // Default is #000000
          fontStyle: 'proxima-nova, sans-serif', // Default is Arial
          sidePadding: 20 // Defualt is 20 (as a percentage)
				}
			}
		}
	 };
    var ctx = document.getElementById("optimize-mobility-doughut-chart").getContext("2d");
  	var myChart = new Chart(ctx, config);
    dataIndex = data[0].infrastructure;
    indexLabel =["","Infrastructure Index"];
    config = {
			type: 'doughnut',
			data: {
				labels: indexLabel,
				datasets: [{
					data: [(Math.round((100-dataIndex)*10)/10),dataIndex],
					backgroundColor: [
					  "#5a87c5",
					  "#d58e61"
					]
				}]
			},
		options: {
      defaultFontFamily: Chart.defaults.global.defaultFontFamily = "proxima-nova, sans-serif",
      legend:{display:false},
    	responsive: true,
      animation: {duration: 3000, animateScale: true,animateRotate: true,easing:'easeOutBack'},
			elements: {
				center: {
					text: dataIndex+'%',
          color: '#000000', // Default is #000000
          fontStyle: 'proxima-nova, sans-serif', // Default is Arial
          sidePadding: 20 // Defualt is 20 (as a percentage)
				}
			}
		}
	 };
    var ctx = document.getElementById("preserve-infrastructure-doughut-chart").getContext("2d");
  	var myChart = new Chart(ctx, config);
    //Fron here on down draw historical charts.
    url = "https://dashboard.udot.utah.gov/resource/b8iq-pg44.json?$select=year,avg(safety),avg(mobility),avg(infrastructure)&$group=year&$order=year";
    fetch(url).then(function(response){
      return response.json();
    }).then(function(j){
      var zfData = [];
      var omData = [];
      var piData = [];
      var years = [];
      for(var i = 0; i < j.length; i++){
          zfData.push(parseFloat(j[i]["avg_safety"]).toFixed(2));
          omData.push(parseFloat(j[i]["avg_mobility"]).toFixed(2));
          piData.push(parseFloat(j[i]["avg_infrastructure"]).toFixed(2));
          years.push(j[i]["year"]);
      }
      var zfLineChart = document.getElementById("zero-fatalities-line-chart");
      var omLineChart = document.getElementById("optimize-mobility-line-chart");
      var piLineChart = document.getElementById("preserve-infrastructure-line-chart");
      Chart.defaults.global.defaultFontFamily = "proxima-nova, sans-serif";
      Chart.defaults.global.defaultFontSize = 18;
      var linechartData = {
        labels: years,
        datasets: [{
          label: "Safety Index",
          data: zfData,
          borderColor: "#5a87c5"
        }]
      };
      var chartOptions = {
        responsive: true,
        animation: {duration: 3000, animateScale: true,animateRotate: true,easing:'easeOutBack'},
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80
          }
        }
      };
      new Chart(zfLineChart, {
        type: 'line',
        data: linechartData,
        options: chartOptions
      });
      //redefine data
      linechartData = {
        labels: years,
        datasets: [{
          label: "Mobility Index",
          data: omData,
          borderColor: "#5a87c5"
        }]
      };
      new Chart(omLineChart, {
        type: 'line',
        data: linechartData,
        options: chartOptions
      });
      //redefine data
      linechartData = {
        labels: years,
        datasets: [{
          label: "Infrastructure Index",
          data: piData,
          borderColor: "#5a87c5"
        }]
      };
      new Chart(piLineChart, {
        type: 'line',
        data: linechartData,
        options: chartOptions
      });
    }).catch(function(err){
      console.log("(*_*) if you see me there is with the second fetch..."+err);
    });
  }).catch(function(err){
    console.log("{*_*} if you see me there is problem..."+err);
  });
}
