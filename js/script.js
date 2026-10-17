const margin = {top: 80, right: 60, bottom: 60, left: 100};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

let allData = []
let mainVar = 'temp_avg', locationVar = 'lat'
let mainVar_str = "Average temperature (°F)", locationVar_str = "Latitiude (°N)"
let mainVar_min = -60, mainVar_max = 140, locationVar_min = 0, locationVar_max = 90
let date_min = 1, date_mid = 7, date_max = 265
let mainScale, latScale, longScale //latScale and longScale are determined by the map brush
const options = [{name: "temp_low", label: "Low temperature", description: "Low temperature (°F)", min: -60, max: 140}, {name: "temp_high", label: "High temperature", description: "High temperature (°F)", min: -60, max: 140}, {name: "temp_avg", label: "Average temperature", description: "Average temperature (°F)", min: -60, max: 140}, {name: "wind_avg", label: "Average wind speed", description: "Average wind speed (mph)", min: 0, max: 120}, {name: "gust_spd", label: "Gust speed", description: "Gust speed (mph)", min: 0, max: 200}, {name: "rain", label: "Rate of rainfall", description: "Rate of rainfall (in.)", min: 0, max: 30}, {name: "snow_rate", label: "Rate of snowfall", description: "Rate of snowfall (in.)", min: 0, max: 80}, {name: "snow_acc", label: "Depth of snowfall", description: "Depth of snowfall (in.)", min: 0, max: 300}]
const loc_options = [{name: "lat", label: "Latitude", description: "Latitude (°N)", min: 0, max: 90}, {name: "long", label: "Longitude", description: "Longitude (°E)", min: -180, max: 180}, {name: "height", label: "Altitude", description: "Altitude (m)", min: -50, max: 3550}]
const t = 1000; // 1000ms = 1 second
let datSlider, locSlider, timeSlider


function getMin(name) {
    switch (name) {
        case "long":
            return -180;
        case "height":
            return -50;
        case "temp_low":
        case "temp_high":
        case "temp_avg":
            return -60;
        default:
            return 0;
    }
}

function getMax(name) {
    switch(name) {
        case "lat":
            return 90;
        case "long":
            return 180;
        case "height":
            return 3550;
        case "temp_low":
        case "temp_high":
        case "temp_avg":
            return 140;
        case "wind_avg":
            return 120;
        case "gust_spd":
            return 200;
        case "rain":
            return 15;
        case "snow_rate":
            return 30;
        case "snow_acc":
            return 300;
        default:
            return 100;
    }
}

function getFullName(abbr) {
    switch (abbr) {
        case "AK":
            return "Alaska";
        case "AL":
            return "Alabama";
        case "AR":
            return "Arkansas";
        case "AZ":
            return "Arizona";
        case "CA":
            return "California";
        case "CO":
            return "Colorado";
        case "CT":
            return "Connecticut";
        case "DC":
            return "District of Columbia";
        case "DE":
            return "Delaware";
        case "FL":
            return "Florida";
        case "GA":
            return "Georgia";
        case "GU":
            return "Guam";
        case "HI":
            return "Hawaii";
        case "IA":
            return "Iowa";
        case "ID":
            return "Idaho";
        case "IL":
            return "Illinois";
        case "IN":
            return "Indiana";
        case "KS":
            return "Kansas";
        case "KY":
            return "Kentucky";
        case "LA":
            return "Louisiana";
        case "MA":
            return "Massachusetts";
        case "MD":
            return "Maryland";
        case "ME":
            return "Maine";
        case "MI":
            return "Michigan";
        case "MN":
            return "Minnesota";
        case "MO":
            return "Missouri";
        case "MP":
            return "Northern Mariana Islands";
        case "MS":
            return "Mississippi";
        case "MT":
            return "Montana";
        case "NC":
            return "North Carolina";
        case "ND":
            return "North Dakota";
        case "NE":
            return "Nebraska";
        case "NH":
            return "New Hampshire";
        case "NJ":
            return "New Jersey";
        case "NM":
            return "New Mexico";
        case "NV":
            return "Nevada";
        case "NY":
            return "New York";
        case "OH":
            return "Ohio";
        case "OK":
            return "Oklahoma";
        case "OR":
            return "Oregon";
        case "PA":
            return "Pennsylvania";
        case "PR":
            return "Puerto Rico";
        case "RI":
            return "Rhode Island";
        case "SC":
            return "South Carolina";
        case "SD":
            return "South Dakota";
        case "TN":
            return "Tennessee";
        case "TX":
            return "Texas";
        case "UT":
            return "Utah";
        case "VA":
            return "Virginia";
        case "VI":
            return "US Virgin Islands";
        case "VT":
            return "Vermont";
        case "WA":
            return "Washington";
        case "WI":
            return "Wisconsin";
        case "WV":
            return "West Virginia";
        case "WY":
            return "Wyoming";
        default:
            return "Unknown";
    }
}

function sliderFilter(main, location, data, min, max, min2, max2) {
    newData = data;
    switch(main) {
        case "temp_low":
            newData = data.filter(d => d.temp_low >= min && d.temp_low <= max);
            break;
        case "temp_high":
            newData = data.filter(d => d.temp_high >= min && d.temp_high <= max);
            break;
        case "temp_avg":
            newData = data.filter(d => d.temp_avg >= min && d.temp_avg <= max);
            break;
        case "wind_avg":
            newData = data.filter(d => d.wind_avg >= min && d.wind_avg <= max);
            break;
        case "gust_spd":
            newData = data.filter(d => d.gust_spd >= min && d.gust_spd <= max);
            break;
        case "rain":
            newData = data.filter(d => d.rain >= min && d.rain <= max);
            break;
        case "snow_rate":
            newData = data.filter(d => d.snow_rate >= min && d.snow_rate <= max);
            break;
        case "snow_acc":
            newData = data.filter(d => d.snow_acc >= min && d.snow_acc <= max);
            break;
        default:
            newData = data;
            break;
    }
    switch(location) {
        case "lat":
            newData = newData.filter(d => d.lat >= min2 && d.lat <= max2);
            break;
        case "long":
            newData = newData.filter(d => d.long >= min2 && d.long <= max2);
            break;
        case "height":
            newData = newData.filter(d => d.height >= min2 && d.height <= max2);
            break;
        default:
            break;
    }
    return newData.filter(d => d.date >= getDate(date_min) && d.date <= getDate(date_mid));
}

function getDate(days) {
    if (days <= 31) {
        return 20170100 + days;
    }
    if (days <= 59) {
        return 20170200 + days - 31;
    }
    if (days <= 90) {
        return 20170300 + days - 59;
    }
    if (days <= 120) {
        return 20170400 + days - 90;
    }
    if (days <= 151) {
        return 20170500 + days - 120;
    }
    if (days <= 181) {
        return 20170600 + days - 151;
    }
    if (days <= 212) {
        return 20170700 + days - 181;
    }
    if (days <= 243) {
        return 20170800 + days - 212;
    }
    if (days <= 273) {
        return 20170900 + days - 243;
    }
    if (days <= 304) {
        return 20171000 + days - 273;
    }
    if (days <= 334) {
        return 20171100 + days - 304;
    }
    return 20171200 + days - 334;
}

function getValue(d, name, text=false) {
    switch(name) {
        case "station":
            return d.station;
        case "state":
            return getFullName(d.state);
        case "lat":
            return d.lat;
        case "long":
            return d.long;
        case "height":
            return d.height;
        case "date":
            return d.date;
        case "temp_low":
            return d.temp_low;
        case "temp_high":
            return d.temp_high;
        case "temp_avg":
            return d.temp_avg;
        case "wind_avg":
            return d.wind_avg;
        case "gust_spd":
            if (!text)
            {
                return d.gust_spd;
            }
        case "gust_dir":
            if (d.gust_dir == 360) {
                return d.gust_spd + "<br/>Gust Direction (° From N): 0";
            }
            return d.gust_spd + "<br/>Gust Direction (° from N): " + d.gust_dir;
        case "rain":
            return d.rain;
        case "snow_rate":
            return d.snow_rate;
        case "snow_acc":
            return d.snow_acc;
        default:
            return "Unknown";
    }
}

function init(){
    d3.csv("data/weather.csv", d => {
        return {
            // Besides converting the types, we also simpilify the variable names here.
            station: d.station,
            state: d.state,
            lat: +d.latitude, // using + to convert to numbers; same below
            long: +d.longitude,
            height: +d.elevation,
            date: +d.date,
            temp_low: +d.TMIN,
            temp_high: +d.TMAX,
            temp_avg: +d.TAVG,
            wind_avg: +d.AWND,
            gust_spd: +d.WSF5,
            gust_dir: +d.WDF5,
            rain: +d.PRCP,
            snow_rate: +d.SNOW,
            snow_acc: +d.SNWD
        }
    })
    .then(data => {
        allData = data
        setupSelector()
        updateAxes()
        updateVis()

    })
    .catch(error => console.error('Error loading data:', error));

}

function updateSlider(){
    d3.selectAll('.slider-container').remove()
    datSlider = createD3RangeSlider(mainVar_min, mainVar_max, ".datSlider");
    locSlider = createD3RangeSlider(locationVar_min, locationVar_max, ".locSlider");
    timeSlider = createD3RangeSlider(date_min, date_max, ".timeSlider");
    d3.select(".datRange").text(mainVar_min + " - " + mainVar_max);
    d3.select(".locRange").text(locationVar_min + " - " + locationVar_max);
    d3.select(".timeRange").text(getDate(date_min) + " - " + getDate(date_mid));
    datSlider.onChange(function(newRange){
        d3.select(".datRange").text(newRange.begin + " - " + newRange.end);
        mainVar_min = newRange.begin;
        mainVar_max = newRange.end;
        updateVis();
    });
    locSlider.onChange(function(newRange){
        d3.select(".locRange").text(newRange.begin + " - " + newRange.end);
        locationVar_min = newRange.begin;
        locationVar_max = newRange.end;
        updateVis();
    })
    timeSlider.onChange(function(newRange){
        d3.select(".timeRange").text(getDate(newRange.begin) + " - " + getDate(newRange.end));
        date_min = newRange.begin;
        date_mid = newRange.end;
        updateVis();
    })
    datSlider.range(mainVar_min, mainVar_max);
    locSlider.range(locationVar_min, locationVar_max);
    timeSlider.range(date_min, date_mid);

}

function setupSelector(){
    // Handles UI changes (sliders, dropdowns)
    // Anytime the user tweaks something, this function reacts.
    // May need to call updateAxes() and updateVis() here when needed!

    d3.selectAll('.xVariable')
    // loop over each dropdown button
    .each(function() {
        d3.select(this).selectAll('myOptions')
        .data(loc_options)
        .enter()
        .append('option')
        .text(d => d.label) // The displayed text
        .attr("value",d => d.name) // The actual value used in the code
        .attr("class", d => d.name) // The identifier used in the code
        .attr("title", d => d.description) // The tooltip
    })
    .on("change", function (event) {
        // Placeholder: we’ll change xVar, yVar, or sizeVar here
        locationVar = d3.select(this).property("value");
        locationVar_str = d3.select(this).select("."+locationVar).property("title");
        locationVar_min = getMin(locationVar);
        locationVar_max = getMax(locationVar);
        d3.select('.xVariable').property('title', locationVar_str);
        updateAxes();
        updateVis();
    })

    d3.selectAll('.yVariable')
    // loop over each dropdown button
    .each(function() {
        d3.select(this).selectAll('myOptions')
        .data(options)
        .enter()
        .append('option')
        .text(d => d.label) // The displayed text
        .attr("value",d => d.name) // The actual value used in the code
        .attr("class", d => d.name) // The identifier used in the code
        .attr("title", d => d.description) // The tooltip
    })
    .on("change", function (event) {
        // Placeholder: we’ll change xVar, yVar, or sizeVar here
        mainVar = d3.select(this).property("value");
        mainVar_str = d3.select(this).select("."+mainVar).property("title");
        mainVar_min = getMin(mainVar);
        mainVar_max = getMax(mainVar);
        d3.select('.yVariable').property('title', mainVar_str);
        updateAxes();
        updateVis();
    })

    d3.select('.xVariable').property('value', locationVar)
    d3.select('.xVariable').property('title', locationVar_str)
    d3.select('.yVariable').property('value', mainVar)
    d3.select('.yVariable').property('title', mainVar_str)
}

function updateAxes(){
  svg.selectAll('.axis').remove()
  svg.selectAll('.labels').remove()
  // Draws the x-axis and y-axis
  xScale = d3.scaleLinear()
    .domain([locationVar_min, locationVar_max])
    .range([0, width])
    .nice();
  const xAxis = d3.axisBottom(xScale)
  xAxis.tickFormat(d3.format(".2s"))

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`) // Position at the bottom
      .call(xAxis);

  yScale = d3.scaleLinear()
    .domain([mainVar_min, mainVar_max])
    .range([height, 0])
    .nice();
  const yAxis = d3.axisLeft(yScale)
  yAxis.tickFormat(d3.format(".2s"))

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${width}),0`) // Position to the left
      .call(yAxis);

  // X-axis label
  svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 20)
      .attr("text-anchor", "middle")
      .text(locationVar_str) // Displays the current x-axis variable
      .attr('class', 'labels')

  // Y-axis label (rotated)
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 40)
      .attr("text-anchor", "middle")
      .text(mainVar_str) // Displays the current y-axis variable
      .attr('class', 'labels')

  updateSlider();
}

function updateVis(){
  // Filter data based on sliders
  let currentData = sliderFilter(mainVar, locationVar, allData, mainVar_min, mainVar_max, locationVar_min, locationVar_max)
  svg.selectAll('.points')
    .data(currentData)
    .join(
        // When we have new data points
        enter => {
            return enter
            .append('circle')
            .attr('class', 'points')
            .attr('cx', d => xScale(getValue(d, locationVar))) // Position on x-axis
            .attr('cy', d => yScale(getValue(d, mainVar))) // Position on y-axis
            // Apply continent colors
            .style('fill', "#000000")
            .style('opacity', .5) // Slight transparency for better visibility
            .on('mouseover', function (event, d) {
                d3.select('.tooltip')
                    // if you change opacity to hide it, you should also change opacity here
                    .style("display", 'block') // Make the tooltip visible
                    .html( // Change the html content of the <div> directly
                    `<strong>Station: ${d.station}</strong><br/>
                    State: ${getFullName(d.state)}<br/>
                    Latitude (°N): ${d.lat}<br/>
                    Longitude (°E): ${d.long}<br/>
                    Altitude (meters): ${d.height}<br/>
                    Date (YYYYMMDD): ${d.date}<br/>
                    ${mainVar_str}: ${getValue(d, mainVar, true)}`)
                    .style("left", (event.pageX + 20) + "px")
                    .style("top", (event.pageY - 28) + "px");
                 d3.select(this) // Refers to the hovered circle
                    .style('stroke', 'black')
                    .style('stroke-width', '4px');
            })
            .on("mouseout", function (event, d) {
                d3.select('.tooltip')
                    .style('display', 'none') // Hide tooltip when cursor leaves
                d3.select(this) // Refers to the hovered circle
                    .style('stroke', 'black')
                    .style('stroke-width', '0px');
            })
            .attr('r', 1)
        },
        // Update existing points when data changes
        update => {
            return update
            .attr('cx', d => xScale(getValue(d, locationVar)))
            .attr('cy', d => yScale(getValue(d, mainVar)))
        },
        // Remove points that no longer exist in the filtered data
        exit => {
            exit
            .attr('r', 0)
            .remove()
        }
    )
}

window.addEventListener('load', init);



const svg = d3.select('.vis')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    // Move the start to the right and down
    .attr('transform', `translate(${margin.left},${margin.top})`);
