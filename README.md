
# SpreadSheetLoader

Load published JSON of Google Spreadsheeet.

## This does

- Load JSON of Google Spreadsheet
- Parse the JSON to data collection
- Some getter methods are available

## Requires

- jQuery 1.7+

## How to use

### URL

You need to get the url from Google Spreadsheet you want to load, as below.

1. Open your spreadsheet
2. [File] > [Publish to the Web] > [Publish now]
3. Get a link to the published data as "cells" of "ATOM"

### Basic

	var url, loader;
	url = ""; // Set your url
	loader = new SpreadSheetLoader(url);
	loader.on("ready", function(){
		var data = this.getData();
		// do something
	});
	loader.load();

### Methods

getData() : Array
: Get all the data as array.

	// example
	var myData = loader.getData();

getItem( condition ) : Array
: Get items whitch match the condition passed as object.

	// example
	var myItems = loader.getItem({ type : "drink", price : 500 });

each(callback) : SpreadSheetLoader
: Wrapper of jQuery.fn.each

	// example
	loader.each(function(i, item){
		console.log(item);
	});

## Versions

- 0.9 release