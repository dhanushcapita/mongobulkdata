var fs = require('fs');
var path = require('path');
var stringifyObject = require("stringify-object");

var locations = ['bedford', 'birmingham', 'cambridge','derby', 'sussex', 'hampshire', 'hertfordshire', 'kent', 'lambeth', 'leeds', 'manchester', 'nottingham', 'oxford','plymouth','slough'];
var reasons = ['flu', 'allergy', 'depression','cancer','digestion', 'migraine','cholesterol','pregnancy','asthma','metal'];
var types = ['male', 'female'];
var hospitals = ['hospital1', 'hospital2', 'hospital3','hospital4','hospital5'];
var dates = [{$date:"2010-01-10T00:00:00Z"},{$date:"2010-02-10T00:00:00Z"},{$date:"2010-03-10T00:00:00Z"},{$date:"2010-04-10T00:00:00Z"},{$date:"2010-05-10T00:00:00Z"},{$date:"2010-06-10T00:00:00Z"},{$date:"2011-07-10T00:00:00Z"},{$date:"2011-08-10T00:00:00Z"},{$date:"2011-09-10T00:00:00Z"},{$date:"2011-10-10T00:00:00Z"},{$date:"2011-11-10T00:00:00Z"},{$date:"2011-12-10T00:00:00Z"}];
var name = 'patient_';

var datacollection = [];
var startTime = new Date();

var iteration = 9;
var count = 100000;

var startIndex = iteration * count;
var endIndex = startIndex + count; 
for (var i = startIndex; i < endIndex; i++) {
    console.log('Item number ' + i)
	var item = {
		id: i,
		name: name + i,
        location:  locations[Math.floor(Math.random() * locations.length)],
        type: types[Math.floor(Math.random() * types.length)],
		appointments:[
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            },
            {
                date: dates[Math.floor(Math.random() * dates.length)],
                reason: reasons[Math.floor(Math.random() * reasons.length)],
                hospital: hospitals[Math.floor(Math.random() * hospitals.length)]
            }
        ]
	};
	datacollection.push(item);
}

var filePath = path.join(__dirname, 'bigdata' + iteration + '.json');
console.log('Writing to ' + filePath);

var jsondata = stringifyObject(datacollection, {
    singleQuotes: false
});

fs.writeFile(filePath, jsondata, function (err) {
	if (err) throw err;
});
console.log('Completed ' + filePath);

var endTime = new Date();
console.log('Time taken ' + parseInt((endTime - startTime)/1000) + ' seconds');

