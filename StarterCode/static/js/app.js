
//Readind in data and create horizonal dropdown
 

    d3.json("resources/samples.json").then((data) => {
        //examine data file
        console.log(data);

        var selection = d3.select("#selDataset")

        var sampleName = data.names
        sampleName.forEach((name) => {
            selection
            .append("option")
            .text(name)
            .property("value", name);
        });
    });
 //Creating functions to build demographics table and Charts

    function optionChanged(sampleValue) {
        //console.log(sampleValue);
        metadataTable(sampleValue);
        buildBar(sampleValue);
    }

//Creating mFunctionfor metadata demographics table 

    function metadataTable(samples) {
        d3.json("resources/samples.json").then((data) => {
            var meta = data.metadata;
            var sampleArray = meta.filter(dataObj => dataObj.id == samples);
            var callback = sampleArray[0];
            var PANEL = d3.select("#sample-metadata");
            PANEL.html("");
            var demoInf = Object.entries(callback)
            demoInf.forEach((item) => {
            PANEL.append("h6").text(item[0]+': '+item[1]);
        });
      });
    }

//Creating function for barchart data
    function buildBar(samples) {
        d3.json("resources/samples.json").then((data) => {
            var meta = data.metadata;
            var sampleArray = meta.filter(dataObj => dataObj.id == samples);
            var callbacks = sampleArray[0];
            var sampleValues = callbacks.sample_values;
            var sampleIDs = callbacks.otu_ids;
            var sampleLabels = callbacks.otu_labels;
        });
    };


        //build barchart

    function buildChart(samples) {
        var bar = d3.select("#bar");   
        bar.html("")
        var barchart = [{
            x: samples.slice(0,10).reverse(),
            y: samples.map(OTU => "OTU " + OTU).reverse(),
            text: samples.otu_labels.slice(0,10),
            type:"bar" ,
            orientation:"h"
        }];
     };

       //Layout for barchart
        var layout = {
            title: 'Top 10 Results Selected Test Subject',
            orientation:'h',
            xaxis:{title: 'Sample Value'},
            yaxis:{autotick:false, type:'Category', title: 'OTU ID'}
            }
            Plotly.newPlot("bar" , barchart);
        ;
       
       
       
        //BubbleChart
