/*!
 * SpreadSheetLoader
 *
 * @version 0.9
 * @author mach3
 * @require jQuery 1.7+
 */
(function($, undefined){

	/**
	 * SpreadSheetLoader
	 * @class Load Google spreadhsheet as data collection.
	 * @constructor
	 * @param String url Publicshed URL of the spreadsheet
	 */
	var SpreadSheetLoader = function(url){
		this.setUrl(url || "");
	};
	SpreadSheetLoader.prototype = {
		type : "SpreadSheetLoader",
		EVENT_READY : "ready",
		url : "",
		keys : [],
		data : [],
		/**
		 * Set URL
		 * @param String url
		 */
		setUrl : function(url){
			this.url = url.split("?")[0];
			return this;
		},
		/**
		 * Start loading process
		 */
		load : function(){
			$.ajax({
				url : this.url,
				dataType : "jsonp",
				data : { alt : "json" },
				success : $.proxy(this._onLoaded, this)
			});
			return this;
		},
		_onLoaded : function(data, status){
			var self = this;
			$.each(data.feed.entry, function(i, item){
				var m, r, c, t;
				m = item.id.$t.match(/\/R(\d+)C(\d+)$/);
				r = parseInt(m[1]) - 2;
				c = parseInt(m[2]) - 1;
				t = item.content.$t;
				if( r < 0 ){
					self.keys.push(t);
				} else if( c < self.keys.length  ){
					self.data[r] = self.data[r] || {};
					self.data[r][self.keys[c]] = t;
				}
			});
			this.trigger(this.EVENT_READY);
		},
		/**
		 * Wrapper for jQuery.fn.on
		 */
		on : function(){
			$.fn.on.apply($(this), arguments);
			return this;
		},
		/**
		 * Wrapper for jQuery.fn.trigger
		 */
		trigger : function(){
			$.fn.trigger.apply($(this), arguments);
			return this;
		},
		/**
		 * Get all the data
		 */
		getData : function(){
			return this.data;
		},
		/**
		 * Wrapper for jQuery.fn.each
		 */
		each : function(callback){
			$.each(this.data, callback);
			return this;
		},
		/**
		 * Get items match the condition
		 * @param Object cond Condition
		 * @return Array Result data set
		 */
		getItem : function(cond){
			var result = [];
			this.each(function(i, item){
				var m = true;
				$.each(cond, function(key, value){
					if(item[key] != value){
						m = false;
						return false;
					}
				});
				if( m ){
					result.push(item);
				}
			});
			return result;
		}
	};
	window.SpreadSheetLoader = SpreadSheetLoader;

})(jQuery);