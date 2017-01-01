
Demonstrate some of my experiments with MongoDB using 1 million data

-   My development machine:  
    -	Intel Core i7 2.90GHz  
    -	16 GB RAM  
    -	64 bit Window7

-   Tools used:  
    -	MongoDB 3.4  
    -	‘mongod’ command through windows command line  
    -	Robomongo  
    -	Node js script to create data files  
    -	‘mongoimport’ command to upload bulk data  

-   Generate data files:  
    -	‘mongoimport’ command supports data in JSON, CSV or TSV formats  
    -	Sample uses data files in JSON format  
    -	Sample uses basic details of a hospital patient as per the file ‘sampledata.json’  
    -	‘datagenerator.js’ is a node js script to generate data files. Run node command like ‘node datagenerator.js’  
    -	I was getting out of memory exception while trying to create more than hundred thousand records at a time. So create 1 million records by running the script 10 times after changing ‘iteration’ variable (0, 1, 2 to 9)  
    -	By default JSON.stringify will create JSON keys and values inside the quotes. This will create issues in MongoDB to create Date field  
    -	‘stringify-object’ module is using to create JSON keys and values without quotes. But this is time consuming. Taking around 20 seconds to create data file with hundred thousand records  
    -	Data files will create as bigdata0.json, bigdata1.json etc… according to the iteration variable  

-   Upload bulk data:  
    -	mongoimport -d local -c patients --jsonArray --file bigdata0.json --numInsertionWorkers 8  
    -	numInsertionWorkers is the number of parallel threads to speed up the operation  
    -	Around 4 seconds is taking to upload hundred thousand records with 8 threads  

-   Analyze performance of queries:  
    -	Always use explain("executionStats") along with query to analyze the performance statistics. Some important properties are executionTimeMillis, totalDocsExamined, executionStages.stage etc…  
    -   stage property indicates that whether the query is using index or not
    -	Create appropriate indexes (single or compound) according to query planner  
    -	MongoDB uses only one index for a query  
    -	Always delete unused indexes  
    -	Use ‘setProfilingLevel’ function to analyze the performance in production environment. Analyze ‘system.profile’ collection after the profiling level is set   
    -	All the find queries that I have used were performing very well after creating indexes  

-   Aggregation framework:  
	db.patients.aggregate([  
     { "$unwind": "$appointments" },  
     { "$group": {  
         "_id": {  
              "_id": "$location",  
              "reason": "$appointments.reason"  
         },  
         "count": { "$sum": 1 }  
     }}  
    ])  
    -	Above query will return total numbers of patients against location and reason for the hospital appointment  
    -	MongoDB has some limitation to use indexes along with some commands in aggregation framework. For example $group command. So always take care while using aggregation framework  
    -	The above query will take 12 seconds  



