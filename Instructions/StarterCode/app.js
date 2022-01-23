function buildCharts(sample) {
  // Fetch the JSON data and console log it
d3.json("samples.json").then((data) => {


  var samples = data.samples;
  var sampledata = samples.filter(sampleObject => sampleObject.id == sample)
  console.log(sampledata[0]);


  /////////////////////////////////////////////////////////////////////////////////////////
  // Bubble Chart
  ////////////////////////////////////////////////////////////////////////////////////////

var results = sampledata[0]
var otu_id = results.otu_ids
var otu_labels = results.otu_labels
var sample_values = results.sample_values

  var bubblechart = [{ 
    x: otu_id,
    y: sample_values,
    mode:"markers",
    marker: {

            color: otu_id,
            size: sample_values

    
    }

  }]

  var bubblelayout= {
    // margin:{t:0}
    xaxis: {title: "OTU ID"},
    yaxis: {title: 'Samples Values'},
    title: '<b>Bubble Chart displaying sample values of OTU IDs<b>',
    showlegend: false

  }

  Plotly.newPlot("bubble", bubblechart, bubblelayout)
  
  /////////////////////////////////////////////////////////////////////
  //barChart
  // otu_labels = otu_labels.slice(0, 10).reverse();
  ////////////////////////////////////////////////////////////////////
 
  var barChart = [{ 
    x: sample_values,
    y: otu_id.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels,
    type: "bar",
    orientation: "h"
  }];
  


  var barChartlayout= {
    // margin:{t:0}

    title: '<b>Top 10 OTUs found in selected Test Subject ID<b>',
    xaxis: { title: "Sample Value"},
    yaxis: { title: "OTU ID"},
    autosize: false, 
    width: 500,
    height:600
  }
  Plotly.newPlot("bar", barChart, barChartlayout)
});
}

///////////////////////////////////////////////////////////////////////////
//Function init
///////////////////////////////////////////////////////////////////////////

  function init() {
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names
    sampleNames.forEach((sample) => {
        selector
        .append("option")
        .text(sample)
        .property("value", sample) 

    })

  var firstsample = sampleNames[0]
    buildCharts(firstsample)

    })
  }


  
  init()


///////////////////////////////////////////////////////////////////////////////////////////////
// DEMOGRAPHIC INFO
//////////////////////////////////////////////////////////////////////////////////////////////

// demographic_data = data.metadata.filter(sample => sample.id === 940)[0];
// console.log(demographic_data)

// Object.entries(demographic_data).forEach(),
//       ([key, value]) => d3.select("#sample-metadata")


  // chart = BarChart("samples.json", {
  //   x: d => d.letter,
  //   y: d => d.frequency,
  //   xDomain: d3.groupSort(alphabet, ([d]) => -d.frequency, d => d.letter), // sort by descending frequency
  //   yFormat: "%",
  //   yLabel: "↑ Frequency",
  //   width,
  //   height: 500,
  //   color: "steelblue"
  // })



