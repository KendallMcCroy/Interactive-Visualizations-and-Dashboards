function buildCharts(sample) {
  // Fetch the JSON data and console log it
d3.json("samples.json").then((data) => {

  var samples = data.samples;
  var sampledata = samples.filter(sampleObject => sampleObject.id == sample)
  console.log(sampledata[0]);
  
var results = sampledata[0]
var otu_id = results.otu_ids
var otu_labels = results.otu_labels
var sample_values = results.sample_values

  var bubblechart = [{ 
    x: otu_id,
    y: sample_values,
    mode:"markers",
    height: 500,
    color: "steelblue"
  }]

  var bubblelayout= [{
    margin:{t:0}



  }]

  Plotly.newPlot("bubble", bubblechart, bubblelayout)

});
}


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



