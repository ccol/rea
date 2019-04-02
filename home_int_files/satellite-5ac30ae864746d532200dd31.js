/* General Settings - note: s_account variable is set in the page. */
if(!s_account) { var s_account="rea-live";}

// var s=s_gi(s_account);
//if (/perfmonitor/.test(window.location.search)) { var s=s_gi('rea-testing'); } // Remove perfomance monitoring requests from live reports.
//if (/GomezAgent/.test(navigator.userAgent)) { var s=s_gi('rea-internal'); }  //Send Gomez to rea-internal

if (/perfmonitor/.test(window.location.search)) { var s_account='rea-testing'; } // Remove perfomance monitoring requests from live reports.
if (/GomezAgent/.test(navigator.userAgent)) { var s_account='rea-internal'; }  //Send Gomez to rea-internal

/* Create s object - add appMeasurement object */
var s = new AppMeasurement(s_account);
s.account = s_account;
/* Visitor service integration */
s.visitor = Visitor.getInstance("341225BE55BBF7E17F000101@AdobeOrg");

s.debugTracking=false;
s.charSet = "UTF-8";
s.cookieDomainPeriods="3";
s.currencyCode="AUD";

/* Link Tracking Config */
s.useForcedLinkTracking = false;
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters="javascript:,tel:,mailto:,realestate.com.au,property.com.au,m.realestate.com.au";
s.linkLeaveQueryString=false;
s.linkTrackVars="None";
s.linkTrackEvents="None";

/* Timeparting config */
s._tpDST = {2017:'4/2,10/1',2018:'4/1,10/7',2019:'4/7,10/6'};

/*20140824: Setting My REA vars outside of s_doPlugins() to make the accesseble for Qualtrix survey code
  - Capture the My Rea Customer ID if set and store in eVar54
  ~ also capturing anon ID in eVar58 I.e regarless of whether they have logged in
  - we also try to set these vars in s_doPlugins() if they are not available on initial page load */
if(typeof LMI == "object" && typeof LMI.Data== "object" && typeof LMI.Data.state== "object" && typeof LMI.Data.state.visitorVO == "object") {
  if(typeof LMI.Data.state.visitorVO.uid != "undefined" && LMI.Data.state.visitorVO.loggedInVisitor == true) {
	 	 	 s.eVar54 = LMI.Data.state.visitorVO.uid;
	}
		   s.eVar58 = LMI.Data.state.visitorVO.uid;
}
	 /*If My REA Anon ID is not set then check the RUI object*/
	
if(!s.eVar58) {
	if(typeof RUI == "object" && typeof RUI.Cid == "object" && typeof RUI.Cid.getCid == "function") {
				s.eVar58 = RUI.Cid.getCid();
	 }
}
		
/************************** CONFIG SECTION **************************/
/* Numeric array maps props to eVars - note: prop is array slot and eVar is slot value. */
var OmniVarMapping=new Array(false,"1","2","3","4","5","6","7","8","9","10","11","12","14","15",false,"17","18","19","20",false,"21","22","23","24","26","30",false,"28","29","31","32","33","34","35","36","37","38",false,"39","40","41","42","43","44","45","46","47","48","49","50");
/* Click tracking middleman, to move s.props to eVars */
function omnitureclick(a,b,c){

	// Add	 event if prop36 (user action) = "click project ad spot on project profile page"
	if (s.prop36 && s.linkTrackEvents.indexOf('event77') == -1 && s.linkTrackVars.indexOf('prop36') != -1) {
		if (s.prop36 == "click project ad spot on project profile page") {
			s.events="event77";
			s.linkTrackEvents = "event77";
			s.linkTrackVars = s.linkTrackVars + ",events";
		}
	}

	var varlist = s.linkTrackVars.split(",");
	var extravars = "";
	for (var x=0; x < varlist.length; x++)
	{
	  var vartotest = varlist[x].replace(/prop/g,'');
		if(/prop/.test(varlist[x]) == true && OmniVarMapping[vartotest]!=false){
			var activeeVar = "eVar" + OmniVarMapping[vartotest];
			extravars=extravars +"," + activeeVar;
			eval('s.eVar' + OmniVarMapping[vartotest] + ' = s.prop' + vartotest);
		}
		if(varlist[x] == 'channel') {s.eVar16=s.channel; extravars=extravars +",eVar16";}
		if(varlist[x] == 'eVar28') {s.prop28=s.eVar28; extravars=extravars +",prop28";}
		if(varlist[x] == 'prop53') {s.eVar53=s.prop53; extravars=extravars +",eVar53";}
	}
		
	s.linkTrackVars=s.linkTrackVars + extravars;
	s.tl(a,b,c);
	
	function waitforimage(msecs) {
		var start = new Date().getTime();
		var cur = start
		while(cur - start < msecs)
		{
			cur = new Date().getTime();
		}
	}
	if(a != true) {
		waitforimage(300);
	}
	
	//clear the custom vars
	s.events="";
	s.linkTrackEvents = "None";
	s.linkTrackVars = "None";
}
/* Click tracking middleman, to move s.props to eVars */
function omnitureclick_nodelay(a,b,c){

	// Add	 event if prop36 (user action) = "click project ad spot on project profile page"
	if (s.prop36 && s.linkTrackEvents.indexOf('event77') == -1 && s.linkTrackVars.indexOf('prop36') != -1) {
		if (s.prop36 == "click project ad spot on project profile page") {
			s.events="event77";
			s.linkTrackEvents = "event77";
			s.linkTrackVars = s.linkTrackVars + ",events";
		}
	}

	var varlist = s.linkTrackVars.split(",");
	var extravars = "";
	for (var x=0; x < varlist.length; x++)
	{
	  var vartotest = varlist[x].replace(/prop/g,'');
		if(/prop/.test(varlist[x]) == true && OmniVarMapping[vartotest]!=false){
			var activeeVar = "eVar" + OmniVarMapping[vartotest];
			extravars=extravars +"," + activeeVar;
			eval('s.eVar' + OmniVarMapping[vartotest] + ' = s.prop' + vartotest);
		}
		if(varlist[x] == 'channel') {s.eVar16=s.channel; extravars=extravars +",eVar16";}
		if(varlist[x] == 'eVar28') {s.prop28=s.eVar28; extravars=extravars +",prop28";}
		if(varlist[x] == 'prop53') {s.eVar53=s.prop53; extravars=extravars +",eVar53";}
	}
		
	s.linkTrackVars=s.linkTrackVars + extravars;
	s.tl(a,b,c);
	
	//s.manageVars("clearVars");
	s.clearVars();
}
function omniturepageload(data) {
	//TODO - loop through data object to set variables dynamically - used for win new leads initially.
	if(typeof s  != 'object') { var s = s_gi('rea-live'); }
	if(data && data.pageName) { s.pageName = data.pageName; }
	if(data && data.channel) { s.channel = s.eVar16 = data.channel; }
	if(data && data.server) { s.server = data.server; }
	if(data && data.h1) { s.h1 = data.h1; }
	if(data && data.prop11) { s.prop11 = s.eVar11 = data.prop11; }
	if(data && data.prop12) { s.prop12 = s.eVar12 = data.prop12; }
	if(data && data.prop14) { s.prop14 = s.eVar15 = data.prop14; }
	if(data && data.prop18) { s.prop18 = s.eVar19 = data.prop18; }
	if(data && data.prop24) { s.prop24 = s.eVar24 = data.prop24; }
	if(data && data.prop57) { s.prop57 = s.eVar57 = data.prop57; }
	if(data && data.eVar27) {  s.eVar27 = data.eVar27; }
	if(data && data.events) {  s.events = data.events; }
	
	//set event91 to count a submit lead event
	s.events = s.events + ',event91:' + serial_evt_rnd;
	if(s.pageName == 'rea:buy:leads:rea-form-submit') {
		s.eVar57 = s.prop57 = 'rea branded';
	}
	if(s.pageName == 'rea:buy:leads:agency-form-submit') {
		s.eVar57 = s.prop57 = 'agency branded'; 
	}
  s.t();
		
	//s.manageVars("clearVars");
	s.clearVars();
}

/*Function: Takes a JSON array:- currently used to track calculator enagement
	-action -> 'load calculator' | 'recalculate'
	-location -> text value
	-name -> text
	-details -> amount | rate
*/
function omnitureTrack(data) {
			
	var action = '';
	var name = '';
	var location = '';
	var details = '';
	var channel = '';
	var campaign_id = '';
	var device = '';
	//action
	if(typeof data  == 'object') {
		//action
		if(typeof data.action == 'string') {
			action = data.action;
		}
		//calculator name
		if(typeof data.name == 'string') {
			name = data.name;
		}
		//location
		if(typeof data.location == 'string') {
			location = data.location;
		}
		if(typeof data.channel == 'string') {
			channel = data.channel;
		}
		if(typeof data.campaign_id == 'string') {
			campaign_id = data.campaign_id;
		}
		if(typeof data.device == 'string') {
			device = data.device;
		}
		
		//details
		if(typeof data.details == 'object') {
			//loop through details object
			for (var key in data.details) {
  				if (data.details.hasOwnProperty(key)) {
    				details = details + key + ":" + data.details[key] + ';';
  				}
			}
		}
	}
	//ANZ Calc mapping
	if(name == 'anzcalculator') {
		var anzspecific = '';
		if(action == 'open_calculator') {
			anzspecific = 'mortgage-calculator:ad-sponsor-launched';

		} else if(action == 'callnow') {
			anzspecific = 'mortgage-calculator:ad-sponsor-call-to-action-tapped';
		} else {
			anzspecific = 'mortgage-calculator:' + action;
		}
		s.prop36 = s.eVar37 = anzspecific;

	} else {
		s.prop36 = s.eVar37 = name + ':' + action + ':' + location + ':' + details;
	}
	//Set pageName if action = UserSelectedSummaryView OR WidgetOpened
	if(action == 'WidgetOpened' || action == 'UserSelectedSummaryView') {
		s.pageName = s.prop24 +':'+ name + ':' + action;
		s.events='event12';
		s.t();

	} else if(action == 'WidgetSurvey') {
		var question = '';
		var answer = '';
		if(typeof data.details == 'object' && typeof data.details.question == 'string') {
			question = data.details.question;
		}
		if(typeof data.details == 'object' && typeof data.details.answer == 'string') {
			answer = data.details.answer;
		}
		s.prop36 = s.prop37 = name + ':' + action + ':' + location + ':' + question + ':' + answer;
		s.tl(true,'o','OmnitureTrack:' + name);	
	} else if(action == 'pageview') {
		//Monster/Premium Ad
		if(name == 'monster ad' || name == 'premiumad') {
			var page = '';
			if(typeof data.page == 'string') {
				page = data.page;
			}
			s.prop24 = 'rea';
			s.channel = 'buy';
			if(channel == '') {channel = 'buy';}
			s.pageName = 'rea:'+ channel + ':premium ad:' + campaign_id + ':' + page;
			s.t();
		}
		//feature ad
		if(name == 'featuredad') {
			var page = '';
			if(typeof data.page == 'string') {
				page = data.page;
			}
			s.prop24 = 'rea';
			s.channel = channel;
			s.pageName = 'rea:' + channel + ':feature ad:' + campaign_id + ':' + page;
			s.t();
		}
	} else {
						
		s.linkTrackVars='prop36,eVar37';
		//s.linkTrackEvents='';
		if(device == 'ios') {
			s.timestamp=Math.round((new Date()).getTime()/1000);
			s.sa('rea-live-mobapp');
		} 
		s.tl(true,'o','OmnitureTrack:' + name);	
		//s.manageVars("clearVars");
		s.clearVars();
	}
}



/*create a random number that can be used in event serialisation*/
var serial_evt_rnd = Math.floor(Math.random()*10000001);

/* Truncate long variable values */
function constrain(str,n){ 
	if(str.length > n){
		var s = str.substr(0, n);
		var words = s.split(','); 
		words[words.length-1] = '';
		str = words.join(',');
	}
	return str;
}

/* Combine all the different search refinement options of a search into one value */
function combineSearchRefinements(){
  var temp = '';
  if(s.eVar5) {temp += ',PropertyType'}
  if(s.eVar3) {temp+= ',PriceBand'}
  if(s.eVar4) {temp += ',Bedrooms'}
  if(s.eVar34) {temp += ',MinCarSpaces'}
  if(s.eVar41) {temp += ',MinLand'}
  if(s.eVar42) {temp += ',Bathrooms'}
  if(s.eVar33) {temp += ',Keywords'}

  if(s.eVar44){
    if(s.eVar44.match('smoking-yes|searchpremier-yes')) {temp += ',Miscellaneous'}
    if(s.eVar44.match('new-construction|established-property')) {temp += ',NewOrEstablished'}
    if(s.eVar44.match('indoor-')) {temp += ',IndoorFeatures'}
    if(s.eVar44.match('outdoor-')) {temp += ',OutdoorFeatures'}
    if(s.eVar44.match('eco-')) {temp += ',EcoFriendly'}
    if(s.eVar44.match('pets-yes')) {temp += ',PetsAllowed'}
    if(s.eVar44.match('furnished-yes')) {temp += ',Furnished'}
    if(s.eVar44.match('excludecontract-yes')) {temp += ',ExcludeContract'}
    if(s.eVar44.match('rent-avilable-yes')) {temp += ',AvailableDate'}
  }
  return temp;
}

/* Helper Functions 
 ~~ s.prop1: Set referrer type
*/
(function (root, factory) {
    root.REA = root.REA || {};
    root.REA.browserUtils = factory();
} (this, function () {

    return {
        getHref: function () {
            return window.location.href;
        },

        getReferrer: function () {
            return document.referrer;
        },

        getPathName: function () {
            return window.location.pathname;
        },

        getCookie: function (cookieName) {
            if (document.cookie.length > 0) {
                var cookieStartIndex = document.cookie.indexOf(cookieName + "=");
                if (cookieStartIndex !== -1) {
                    var cookieValueStartIndex = cookieStartIndex + cookieName.length + 1;
                    var cookieEndIndex = document.cookie.indexOf(";", cookieValueStartIndex);
                    if (cookieEndIndex === -1) {
                        cookieEndIndex = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(cookieValueStartIndex, cookieEndIndex));
                }
            }
            return "";
        },

        setCookie: function (cookieName, cookieValue) {
        	var path = 'path=/';
            document.cookie = cookieName + '=' + escape(cookieValue) + ';' + path; 
        }
    };
}));


(function (root, factory) {

    root.REA = root.REA || {};
    root.REA.omniture = factory(root.REA.browserUtils);

} (this, function (browserUtils) {

    'use strict';

    var session_cookie = '_stc';
    var rsf = 'rsf';
    var referrer_lookup_table = {
      'google.': 'SEO',
      'search.yahoo.': 'SEO',
      'aol.': 'SEO',
      'ask.com': 'SEO',
      'bing.': 'SEO',
      'live.com': 'SEO',
      't-online.': 'SEO',
      'search.msn': 'SEO',
      'excite.': 'SEO',
      'sensis.com.au': 'SEO',
      'athome.': 'atHome Network',
      'atoffice.': 'atHome Network',
      'athomelorraine.': 'atHome Network',
      'athomealsace.': 'atHome Network',
      'homesolution.': 'atHome Network',
      'realestate.com.au': 'REA Group Network',
      'realcommercial.com.au': 'REA Group Network',
      'property.com.au': 'REA Group Network',
      'realholidays.com.au': 'REA Group Network',
      'propertyfinder.com': 'REA Group Network',
      'hotproperty.co.uk': 'REA Group Network',
      'homeguru.com.au': 'REA Group Network',
      'ozhomevalue.com.au': 'REA Group Network',
      'allrealestate.co.nz': 'REA Group Network',
      'realcommercial.co.nz': 'REA Group Network',
      'ukpropertyshop.co.uk': 'REA Group Network',
      'casa.it': 'REA Group Network',
      'squarefoot.com.hk': 'REA Group Network',
      'allglobalproperties.com': 'REA Group Network',
      'rea-group.com': 'REA Group Network'
    };
  
    referrer_lookup_table.getReferrer = function (referrer) {
      if (referrer === '') {
        return 'typedBookmarked';
      }
      for (var key in referrer_lookup_table) {
        if (referrer.indexOf(key) !== -1) {
          return this[key];
        }
      }
      return 'Other';
    };
  
    function getProp1Value() {

    	var s_kwcid = getProp1FromQueryString('s_kwcid');
    	if (s_kwcid) {
    		var prop1 = 'google';
    		browserUtils.setCookie(session_cookie, prop1);
        	return prop1;
      	}
    	var prop1  = getProp1FromCookie();
      	if (prop1) {
        	return prop1;
      	}
  
      	prop1 = getProp1FromQueryString(rsf);
      	if (prop1 !== '') {
        	return prop1;
      	}
  
      return getProp1FromReferrer();
    }
  
    function getProp1FromCookie() {
      return browserUtils.getCookie(session_cookie);
    }
  
    function setProp1CookieIfRequired() {
      if (browserUtils.getCookie(session_cookie)) {
        return;
      }
      browserUtils.setCookie(session_cookie, getProp1Value());
    }
  
    function getProp1FromQueryString(key) {
      var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
      var qs = regex.exec(browserUtils.getHref());
      return qs !== null ? qs[1] : '';
    }
  
    function getProp1FromReferrer() {
      return referrer_lookup_table.getReferrer(parseReferrer());
    }
  
    function parseReferrer() {
      var regex = new RegExp('^https?://([^/]+)');
      var matches = regex.exec(browserUtils.getReferrer());
      return matches !== null ? matches[1] : '';
    }
  
    return {
      getProp1Value: getProp1Value,
      setProp1CookieIfRequired: setProp1CookieIfRequired,
      utils: browserUtils
    };

}));

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	
	
    s.server=window.location.host;
  
    s.eVar72=s.prop72=REA.browserUtils.getCookie('reauid'); 
  
    /* Set External Campaign Variable */
    if(!s.campaign) s.campaign=s.Util.getQueryParam('rsfdetail');
	if(!s.campaign) s.campaign=s.Util.getQueryParam('rsf');

    /* Set Traffic Source Detailed Variable */
	if(!s.prop30) s.prop30=s.Util.getQueryParam('rsfdetail');
	
/* Set a 'unique' s.purchaseID every time the purchase event is set - This is to stop SiteCat trying to de-dupe when it shouldn't */
if (s.events) {
	if(s.events.indexOf('purchase') != -1) {
		s.purchaseID=new Date().getTime().toString().substring(4) + Math.floor(Math.random()*10000).toString();
	}
}

    /* Set Internal Promotion Variable */
	if(!s.eVar13) s.eVar13=s.Util.getQueryParam('pid');
	if(!s.eVar13) s.eVar13=s.Util.getQueryParam('cid');

    /* Split s.prop8 which includes postcodes into two vars */
	if (typeof s.prop8!="undefined") {
		var prop8_temp = '';
		var prop19_temp = '';
		var prop8_array=s.prop8.split(",");
		for(i = 0; i < prop8_array.length; i++){
			var prop8_pipesplit = prop8_array[i].split("|");
			if(prop8_pipesplit.length == 2) {
				if(prop8_temp == ""){
					prop8_temp = prop8_pipesplit[0];
					prop19_temp = prop8_pipesplit[1];
				} else {
					prop8_temp = prop8_temp +','+ prop8_pipesplit[0];
					prop19_temp = prop19_temp +','+ prop8_pipesplit[1];
				}
			}
		}
		if (prop8_temp != ""){
			s.prop8=prop8_temp;
			s.prop19=prop19_temp;
		}
	}
  /* Set prop1 - referrer type */
	if(typeof REA == 'object') {
		s.prop1 = REA.omniture.getProp1Value().replace(/["]+/g, '');
		REA.omniture.setProp1CookieIfRequired();
	}
	   
	/* Yahoo Alliance v2 */
	function omniAlliance_host(partner) {
		if (typeof s.prop1=="undefined") {	// if s.prop1 doesn't exist...
			if (document.cookie.length>0) { 
				c_start=document.cookie.indexOf("_stc=");  // if _stc= cookie does exist.
				if (c_start!=-1) { 
					c_start=c_start + 5; 
					c_end=document.cookie.indexOf(";",c_start); 
					if (c_end==-1) c_end=document.cookie.length; 
					s.prop1=unescape(document.cookie.substring(c_start,c_end));	// write the value of _stc into s.prop1
				} else {																						//else
						var partnerReg = new RegExp(partner); 
						if (partnerReg.test(s.server) == true || partnerReg.test(document.referrer) == true) {  // if host or referrer contains Partner string
							document.cookie="_stc=" + partner + ";path=/;domain=realestate.com.au";		// write partner code to _stc= cookie
							s.prop1=partner;
						}	
				}
			}
		}
	}
	omniAlliance_host('yahoo');

    /* New & Repeat Visitors */
	s.prop29=s.getNewRepeat();
	s.eVar29=s.prop29;

    /* Time Parting */
    /* Legacy method
  var gmtHours = -tDate.getTimezoneOffset()/60;
	s.prop21=s.getTimeParting('h',gmtHours,tDate.getFullYear()); // Set hour
	s.prop22=s.getTimeParting('d',gmtHours,tDate.getFullYear()); // Set day
	s.prop23=s.getTimeParting('w',gmtHours,tDate.getFullYear()); // Set weekday
	s.eVar21=s.prop21;
	s.eVar22=s.prop22;
	s.eVar23=s.prop23;
	*/

	/* Time Parting */
	s.prop21 = s.eVar21 = s.getTimeParting('s','+10');

	/* Turn Listing type events into eVars */
	if ((/event20/.test(s.events) || /event45/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="standard"; } //Standard
	if (/event21/.test(s.events) == true) {	s.prop28="eas"; 	//HyC
		if(/event21/.test(s.linkTrackEvents)) {s.linkTrackVars=s.linkTrackVars + ",prop28,eVar28";} // HYC is a custom link. add s.prop28 to link record.
	}
	if ((/event22/.test(s.events) || /event43/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="feature"; } //Feature
	if ((/event36/.test(s.events) || /event42/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="premiere"; } //Premiere
	if ((/event38/.test(s.events) || /event44/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="platinum"; } //Platinum
	if ((/event73/.test(s.events) || /event74/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="mid tier"; } //Mid Tier
	if ((/event84/.test(s.events) || /event84/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="project profiles - classic"; } //Project Profiles - Classic
	if ((/event85/.test(s.events) || /event85/.test(s.events) == true) && !s.eVar28 && !s.prop28) { s.prop28="project profiles - signature"; } //Project Profiles - Signature
	
	/* Concatenate State and Location */
	if(s.prop16&&s.prop8) s.prop37 = s.prop16 + " - " + s.prop8;
	if(!s.prop16&&s.prop8) s.prop37 = " - " +s.prop8;
	if(s.prop16&&!s.prop8) s.prop37 = s.prop16;
	
	/* Push all vars to lowercase, then copy values into to eVars */
	for (i=1;i<=50;i++) {	
		if (eval("typeof s.prop" + i +"!= \"undefined\"")) {
			eval("s.prop" + i + "=constrain(s.prop" + i + ".toLowerCase(),'255');");
			if(OmniVarMapping[i] != false && eval("s.prop" + i +"!=s.eVar" + OmniVarMapping[i])) {
				eval("s.eVar" + OmniVarMapping[i] + "= s.prop" + i);
			}
		}
	}
	if (s.pageName) {s.pageName=constrain(s.pageName.toLowerCase(),'255');}
	if (s.hier1) {s.hier1=constrain(s.hier1.toLowerCase(),'255');}
	if (s.eVar13) {s.eVar13=constrain(s.eVar13.toLowerCase(),'255');}
	if (s.eVar25) {s.eVar25=constrain(s.eVar25.toLowerCase(),'255');}
	if (s.eVar27) {s.eVar27=constrain(s.eVar27.toLowerCase(),'255');}
	if (s.eVar28) {s.eVar28=constrain(s.eVar28.toLowerCase(),'255'); s.prop28=s.eVar28;}
	if (s.channel) { s.channel=constrain(s.channel.toLowerCase(),'255'); if(s.channel&&!s.eVar16) s.eVar16=s.channel;}
	
	/*Copy additional props to evars (not modifying the OmnVarMapping*/
	if (typeof s.prop53!="undefined") {s.eVar53 = s.prop53;}
	
	/*Fix to unset property ID when firing event1 from the Find an Agent form*/
	 if ((/event1/.test(s.events) || /event1,/.test(s.events)) && s.eVar19 == 'agent email sent') {
	 	 s.eVar15 = 'unset';
	 	
	 }
	 /*Capture the My Rea Customer ID if set and store in eVar54
	   ~ also capturing anon ID in eVar58 I.e regarless of whether they have logged in*/
	 if(typeof LMI == "object" && typeof LMI.Data== "object" && typeof LMI.Data.state== "object" && typeof LMI.Data.state.visitorVO == "object") {
	 	 if(typeof LMI.Data.state.visitorVO.uid != "undefined" && LMI.Data.state.visitorVO.loggedInVisitor == true) {
	 	 	 s.eVar54 = LMI.Data.state.visitorVO.uid;
		 }
		   s.eVar58 = LMI.Data.state.visitorVO.uid;
	 }
	 /*If My REA Anon ID is not set then check the RUI object*/
	
		if(!s.eVar58) {
			if(typeof RUI == "object" && typeof RUI.Cid == "object" && typeof RUI.Cid.getCid == "function") {
						s.eVar58 = RUI.Cid.getCid();
			 }
		}
	 
	/*Search Center triggers*/
	/* No longer exists
	if(s.Util.getQueryParam('s_kwcid'))
    s.pageURL=s.manageQueryParam('s_kwcid',1,1); // swap and encode for SearchCenter
	s.clickThruQuality('s_kwcid','event55','event56');
	*/
	
	/*Capture the email message ID for email targettted campaigns*/
	if(s.Util.getQueryParam('cpmessageid')) {
		s.eVar66=s.Util.getQueryParam('cpmessageid');
	}
	/*Test & Target Integration: enable this funciton based specific conversion points*/
	/*if(typeof mboxLoadSCPlugin == 'function') { 
		mboxLoadSCPlugin(s);
	}*/
  
  /* DTM debug variable */
  s.prop71 = s.eVar71 = "DTM-AppMeasurement2.4.0";
  
  /* Custom page name to allow most recent allocation against custom events */
  s.eVar73 = "D=pageName";
  
  /* allow for new "/news/" pageNames and channel 
  if ((document.location.href.match(/www.realestate.com.au\/news\//) != null) && (!s.pageName)) {
    s.pageName = "rea" + document.location.pathname;
    s.pageName = s.pageName.replace(new RegExp(/\//g),":");	// replace / with :
    s.pageName = s.pageName.replace(new RegExp(/\-/g)," ");	// replace - with space
    s.channel = "newscom";
  } */
  
/* allow for new "/news/" and "/lifestyle/" pageNames and channel */
  if ((document.location.href.match(/www.realestate.com.au\/news\//)||document.location.href.match(/www.realestate.com.au\/lifestyle\//) != null) && (!s.pageName)) {
    s.pageName = "rea" + document.location.pathname;
    s.pageName = s.pageName.replace(new RegExp(/\//g),":");	// replace / with :
    s.pageName = s.pageName.replace(new RegExp(/\-/g)," ");	// replace - with space
    s.channel = "newscom";
  }
  
  /* Combine all the different search refinements of a search, then store the value in eVar76 */
  var combinedSearchRefinements = combineSearchRefinements();
  if ( combinedSearchRefinements ) {
    s.eVar76 = combinedSearchRefinements;
    s.list2 = s.eVar76;
  } 
  
  /* Clear legacy s_fid cookie for Chrome */
  if (typeof _satellite!= "undefined")
  {
    console.log('Has s_fid?: ' ,_satellite.readCookie('s_fid'));
    document.cookie = 's_fid=' + ";expires=Thu, 01 Jan 1970 00:00:01 GMT ;domain=.realestate.com.au;path=/";
    console.log('Has s_fid?: ', _satellite.readCookie('s_fid'));
  }
  
  /* workaround to change event35 from counter to numeric counter*/
  if (s.events == "event35")
  {
  	s.events = "event35=1";
  }
  
}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getNewRepeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");

/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");

/*
 * Plugin: clickThruQuality v1.0 - [one line description of plugin]
 */
s.clickThruQuality =new Function("scp","tcth_ev","cp_ev","cff_ev","cf_th",""
+"var s=this;if(s.p_fo('clickThruQuality')==1){var ev=s.events?s.even"
+"ts+',':'';if(s.Util.getQueryParam&&s.Util.getQueryParam(scp)){s.events=ev+tct"
+"h_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
+",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;}}else {s.c"
+"_w('cf',1,0);}}else {if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev"
+"+cp_ev;}}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");


/* 
 * Begin: Support deprecated manageVars
 */
s.manageVars = function(a) {
  if (a === "clearVars") {
    s.clearVars();
  }
};
/* End: Support deprecated manageVars */

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "reagroup";
s.trackingServerSecure="smetrics.realestate.com.au";
s.trackingServer="metrics.realestate.com.au";



/* 
============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.4.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.4.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();




