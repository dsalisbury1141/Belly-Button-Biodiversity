
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

    function optionChanged(ID) {
        //console.log(sampleValue);
        metadataTable(ID);
        buildBar(ID);
    }

//Creating mFunctionfor metadata demographics table 

    function metadataTable(ID) {
        d3.json("resources/samples.json").then((data) => {
            var meta = data.metadata;
            var sampleArray = meta.filter(dataObj => dataObj.id == ID);
            var callback = sampleArray[0];
            var PANEL = d3.select("#sample-metadata");
            PANEL.html("");
            var demographics = Object.entries(callback)
            demographics.forEach((item) => {
            PANEL.append("h6").text(item[0]+': '+item[1]);
        });
      });
    }
        // Create function Barchart data
    function buildBar(ID) {
        d3.json("resources/samples.json").then((data) => {
            var meta = data.metadata;
            var sampleArray = meta.filter(dataObj => dataObj.id == ID);
            var callbacks = sampleArray[0];
            var sampleValues = callbacks.sample_values;
            var sampleIDs = callbacks.otu_ids;
            var sampleLabels = callbacks.otu_labels;

        //build barchart
        var BAR = d3.select("#bar");
        BAR.html("");
        var barChart = [{
            x: sampleValues.slice(0,10).reverse(),
            y: sampleIDs.map(OTU => "OTU " + OTU).reverse(),
            text: sampleLabels.otu_labels.slice(0,10),
            type:"bar" ,
            orientation:"h"
        }];
        Plotly.newPlot("bar" , barChart);
    });
        //Begin Layout
        
        var layout = {
            title: 'Top 10 Results Selected Test Subject',
            orientation:'h',
            xaxis:{title: 'Sample Value'},
            yaxis:{autotick:false, type:'Category', title: 'OTU ID'}
            }
         
        ;
    }
