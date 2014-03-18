require([
  'domReady',
  'jquery',
  'nvd3',
  'underscore'
], function(domReady, $, nv, _) {
  'use strict';

  var revenusImposablesGroups = [
    [
      26000, 
      15600, 
      40000
    ], 
    [
      35000, 
      21000, 
      25000
    ], 
    [
      50000, 
      15000, 
      50000
    ], 
    [
      50000, 
      5000, 
      25000
    ]
  ];

  var irppDecalesGroups = [
    [
      1926.15966796875, 
      1926.15966796875, 
      415.6400146484375
    ], 
    [
      3839.199951171875, 
      3839.199951171875, 
      1296.1600341796875
    ], 
    [
      9389.2001953125, 
      9389.2001953125, 
      617.239990234375
    ], 
    [
      9389.2001953125, 
      9389.2001953125, 
      0.0
    ]
  ];

  var irppSourceGroups = [
    [
      1926.15966796875, 
      415.6400146484375, 
      5189.2001953125
    ], 
    [
      3839.199951171875, 
      1296.1600341796875, 
      1800.1600341796875
    ], 
    [
      9389.2001953125, 
      617.239990234375, 
      9389.2001953125
    ], 
    [
      9389.2001953125, 
      0.0, 
      2150.159912109375
    ]
  ];

  var tauxMoyensDecalesGroups = [
    [
      7.408306415264423, 
      12.347177358774038, 
      1.0391000366210938
    ], 
    [
      10.969142717633929, 
      18.28190452938988, 
      5.18464013671875
    ], 
    [
      18.778400390625, 
      62.594667968749995, 
      1.23447998046875
    ], 
    [
      18.778400390625, 
      187.78400390625, 
      0.0
    ]
  ];

  var tauxMoyensSourceGroups = [
    [
      7.408306415264423, 
      2.664359068259215, 
      12.97300048828125
    ], 
    [
      10.969142717633929, 
      6.172190638950893, 
      7.20064013671875
    ], 
    [
      18.778400390625, 
      4.114933268229167, 
      18.778400390625
    ], 
    [
      18.778400390625, 
      0.0, 
      8.6006396484375
    ]
  ];

  var values = _.flatten(_.map(revenusImposablesGroups[index], function(revenuImposable, revenuImposableIndex) {
    return [
        { 
          "label" : "Rev. Imp. " + (revenuImposableIndex + 1),
          "value" : revenuImposable
        } , 
        { 
          "label" : "IRPP N " + (revenuImposableIndex + 1) + " (" + tauxMoyensSourceGroups[index][revenuImposableIndex].toFixed(2) + " %)",
          "value" : irppSourceGroups[index][revenuImposableIndex]
        } , 
        { 
          "label" : "IRPP N-1 " + (revenuImposableIndex + 1) + " (" + tauxMoyensDecalesGroups[index][revenuImposableIndex].toFixed(2) + " %)",
          "value" : irppDecalesGroups[index][revenuImposableIndex]
        }
      ];
  }));

  console.log(values);
  var data = [
    {
      key: "",
      values: values
    }
  ];

  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.label })    //Specify the data accessors.
        .y(function(d) { return d.value })
        .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
        .tooltips(false)        //Don't show tooltips
        .showValues(true)       //...instead, show the bar value right on top of each bar.
        .transitionDuration(350)
        .color(['violet', 'violet', 'violet', 'green', 'green', 'violet', 'orange', 'orange', 'green'])
        ;

    d3.select('#chart')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });

});
