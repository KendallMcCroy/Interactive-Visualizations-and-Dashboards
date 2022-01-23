///////////////////////////////////////////////////////////////////////////////////////////////
// DEMOGRAPHIC INFO
//////////////////////////////////////////////////////////////////////////////////////////////
function buildMetaData(sample) {
  d3.json("samples.json").then((data) => {
    metadata = data.metadata;

    // Filter the data for the objest with the desired sample number
    var resultsArray = metadata.filter(sampleObject => sampleObject.id == sample);
    var results = resultsArray[0];
    
  });

}


function buildCharts(sample) {
  // Fetch the JSON data and console log it
  d3.json("samples.json").then((data) => {


    var samples = data.samples;
    var sampledata = samples.filter(sampleObject => sampleObject.id == sample);
    console.log(sampledata[0]);


    var results = sampledata[0]
    var otu_id = results.otu_ids
    var otu_labels = results.otu_labels
    var sample_values = results.sample_values

    /////////////////////////////////////////////////////////////////////////////////////////
    // Bubble Chart
    ////////////////////////////////////////////////////////////////////////////////////////

    var bubblechart = [{
      x: otu_id,
      y: sample_values,
      mode: "markers",
      marker: {

        color: otu_id,
        size: sample_values

      }

    }]

    var bubblelayout = {
      margin: { l: 100, r: 100, t: 100, b: 100 },
      xaxis: { title: "OTU ID" },
      yaxis: { title: 'Samples Values' },
      hovermode: "closest",
      title: '<b>Bubble Chart displaying sample values of OTU IDs<b>',
      showlegend: false

    }

    Plotly.newPlot("bubble", bubblechart, bubblelayout)

    /////////////////////////////////////////////////////////////////////
    //barChart
    // var otu_labels = otu_labels.slice(0, 10).reverse();
    ////////////////////////////////////////////////////////////////////

    var barChart = [{
      x: sample_values.slice(0, 10).reverse(),
      y: otu_id.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      text: otu_labels,
      type: "bar",
      orientation: "h"
    }];


    var barChartlayout = {
      title: '<b>Top 10 OTUs found in selected Test Subject ID<b>',
      xaxis: { title: "Sample Value" },
      yaxis: { title: "OTU ID" },
      autosize: false,
      margin: { t: 30 }
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

    var firstsample = sampleNames[0];
    buildCharts(firstsample);
    buildMetaData(firstsample);

  })
}

function optionChanged(secondsample) {
  buildCharts(secondsample);
  buildMetaData(secondsample);


}

init()
