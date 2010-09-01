/***
 * Twitter JS v1.14.0 - support for new api endpoint
 * http://code.google.com/p/twitterjs/
 * Copyright (c) 2009 Remy Sharp / MIT License
 * Copyright (c) 2010 Erik Karulf / Public Domain
 */
 typeof renderTwitters!="function"&&function(){function u(a){var c;for(c in a.user)a["user_"+c]=a.user[c];a.time=r(a.created_at);return a}function v(a){s?a.call():t.push(a)}function n(){s=true;for(var a;a=t.shift();)a.call()}function r(a){function c(e){var f=e.getHours();e=e.getMinutes()+"";var i="AM";if(f==0)f=12;else if(f==12)i="PM";else if(f>12){f-=12;i="PM"}if(e.length==1)e="0"+e;return f+":"+e+" "+i}function g(e){e.toDateString().split(/ /);var f=w[e.getMonth()],i=e.getDate()+"",l=parseInt(i);
 e=e.getFullYear();var o=(new Date).getFullYear(),k="th";if(l%10==1&&i.substr(0,1)!="1")k="st";else if(l%10==2&&i.substr(0,1)!="1")k="nd";else if(l%10==3&&i.substr(0,1)!="1")k="rd";if(i.substr(0,1)=="0")i=i.substr(1);return f+" "+i+k+(o!=e?", "+e:"")}var b=a.split(" "),d=Date.parse(b[1]+" "+b[2]+", "+b[5]+" "+b[3]);b=new Date(d);var h=arguments.length>1?arguments[1]:new Date;d=parseInt((h.getTime()-d)/1E3);var j="";d+=h.getTimezoneOffset()*60;return j=d<5?"less than 5 seconds ago":d<30?"half a minute ago":
 d<60?"less than a minute ago":d<120?"1 minute ago":d<2700?parseInt(d/60).toString()+" minutes ago":d<10800?"about 1 hour ago":d<86400?"about "+parseInt(d/3600).toString()+" hours ago":d<172800?c(b)+" yesterday":c(b)+" "+g(b)}var p=function(){var a=navigator.userAgent.toLowerCase();return{webkit:/(webkit|khtml)/.test(a),opera:/opera/.test(a),msie:/msie/.test(a)&&!/opera/.test(a),mozilla:/mozilla/.test(a)&&!/(compatible|webkit)/.test(a)}}(),m=0,t=[],s=false,w=["Jan","Feb","Mar","Apr","May","Jun","Jul",
 "Aug","Sep","Oct","Nov","Dec"];window.ify=function(){return{link:function(a){return a.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?#\/.=]+[^:\.,\)\s*$]/ig,function(c){return'<a href="'+c+'">'+(c.length>25?c.substr(0,24)+"...":c)+"</a>"})},at:function(a){return a.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g,function(c,g,b){return g+'@<a href="http://twitter.com/'+b+'">'+b+"</a>"})},hash:function(a){return a.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g,function(c,g,b){return g+'#<a href="http://search.twitter.com/search?q=%23'+
 b+'">'+b+"</a>"})},clean:function(a){return this.hash(this.at(this.link(a)))}}}();window.renderTwitters=function(a,c){var g=document.getElementById(c.twitterTarget),b=null,d=document.createElement("ul"),h,j,e,f,i=a.length>c.count?c.count:a.length;for(f=0;f<i&&a[f];f++){b=u(a[f]);if(c.ignoreReplies&&a[f].text.substr(0,1)=="@")i++;else{h=document.createElement("li");if(c.template)h.innerHTML=c.template.replace(/%([a-z_\-\.]*)%/ig,function(o,k){var q=b[k]+""||"";if(k=="text"&&c.enableLinks)q=ify.clean(q);
 return q});else{j=document.createElement("span");j.className="twitterStatus";e=document.createElement("span");e.className="twitterTime";j.innerHTML=a[f].text;if(c.enableLinks==true)j.innerHTML=ify.clean(j.innerHTML);e.innerHTML=r(a[f].created_at);if(c.prefix){var l=document.createElement("span");l.className="twitterPrefix";l.innerHTML=c.prefix.replace(/%(.*?)%/g,function(o,k){return a[f].user[k]});h.appendChild(l);h.appendChild(document.createTextNode(" "))}h.appendChild(j);h.appendChild(document.createTextNode(" "));
 h.appendChild(e)}if(c.newwindow)h.innerHTML=h.innerHTML.replace(/<a href/gi,'<a target="_blank" href');d.appendChild(h)}}if(c.clearContents)for(;g.firstChild;)g.removeChild(g.firstChild);g.appendChild(d);typeof c.callback=="function"&&c.callback()};window.getTwitters=function(a,c,g,b){m++;if(typeof c=="object"){b=c;c=b.id;g=b.count}g||(g=1);if(b)b.count=g;else b={};if(!b.timeout&&typeof b.onTimeout=="function")b.timeout=10;if(typeof b.clearContents=="undefined")b.clearContents=true;if(typeof b.trimUser==
 "undefined")b.trimUser=false;if(typeof b.includeEntities=="undefined")b.includeEntities=false;g=b.ignoreReplies?200:g;if(b.withFriends)b.withFriends=false;b.twitterTarget=a;if(typeof b.enableLinks=="undefined")b.enableLinks=true;window["twitterCallback"+m]=function(d){b.timeout&&clearTimeout(window["twitterTimeout"+m]);renderTwitters(d,b)};v(function(d,h){return function(){if(document.getElementById(d.twitterTarget)){var j="http://api.twitter.com/1/statuses/"+(d.withFriends?"friends_timeline":"user_timeline")+
 ".json?screen_name="+c+"&callback=twitterCallback"+h+"&trim_user="+(d.trimUser?"t":"f")+"&include_entities="+(d.includeEntities?"t":"f")+"&count="+g+"&cb="+Math.random();if(d.timeout)window["twitterTimeout"+h]=setTimeout(function(){if(d.onTimeoutCancel)window["twitterCallback"+h]=function(){};d.onTimeout.call(document.getElementById(d.twitterTarget))},d.timeout*1E3);var e=document.createElement("script");e.setAttribute("src",j);document.getElementsByTagName("head")[0].appendChild(e)}}}(b,m))};(function(){if(document.addEventListener&&
 !p.webkit)document.addEventListener("DOMContentLoaded",n,false);else if(p.msie){document.write("<script id=__ie_init defer=true src=//:><\/script>");var a=document.getElementById("__ie_init");if(a)a.onreadystatechange=function(){if(this.readyState=="complete"){this.parentNode.removeChild(this);n.call()}};a=null}else if(p.webkit)var c=setInterval(function(){if(document.readyState=="loaded"||document.readyState=="complete"){clearInterval(c);c=null;n.call()}},10)})()}();