function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    // console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var filterSample = samples.filter(sampleObj => sampleObj.id == sample);
    var result1 = filterSample[0];
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filterMeta = data.metadata.filter(sample2 => sample2.id == sample);
    var result2 = filterMeta[0];

    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    d3.json("samples.json").then(function (data) {
      firstSample = data.samples[0];
      Object.entries(firstSample).forEach(([key, value]) => { console.log(key + ': ' + value); });
    });

    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    d3.json("samples.json").then(function (data) {
      firstMeta = data.metadata[0];
      Object.entries(firstMeta).forEach(([key, value]) => { console.log(key + ': ' + value); });
    });
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    d3.json("samples.json").then(function (data) {
      var dataInfo = data.samples;
      var filterInfo = dataInfo.filter(x => x.id.toString() === buildCharts)[0];
      console.log(filterInfo)
      var otu_ids = result1.otu_ids;
      var otu_labels = data.otu_labels;
      var sample_values = data.sample_values;
      // Deliverable 3: 3. Create a variable that holds the washing frequency.
      var washFreq = data.wfreq;

      // Deliverable 1: 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order 
      // so the otu_ids with the most bacteria are last. (Map, slice & reverse)
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  

      // Deliverable 1: 8. Create the trace for the bar chart. 
      var barData = [{
        x: sample_values,
        y: yticks,
        text: otu_labels,
        type: "bar",
        orientation: "h"
      }
    ];

      // Deliverable 1: 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: { title: sample_values },
        yaxis: { title: yticks }
      };

      // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);

      // Deliverable 2: 1. Create the trace for the bubble chart.
      var bubbleData = {
        type: 'scatter',
        mode: 'markers',
        x: result1.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        marker: {
          color: otu_ids
          // size: , 
          // colorscale: 
        }
      };

      var bubbleChart = [bubbleData]; 

      // Deliverable 2: 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title : "Bacteria Cultures Per Sample",
        xaxis : otu_ids,
        yaxis : sample_values,
        showlegend: true,
        height: 600,
        width: 600
      }
      // Deliverable 2: 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleChart, bubbleLayout);

      // Deliverable 3: 4. Create the trace for the gauge chart.
      var gaugeTrace = (
        mode = "gauge+number",
        value = [0, 10],
        domain = { 'x': [], 'y': [0, 10] },
        title = { 'text': "Belly Button Washing Frequency" }
      )

      // Deliverable 3: 5. Create the layout for the gauge chart.

      // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.

    });
  });
}  
