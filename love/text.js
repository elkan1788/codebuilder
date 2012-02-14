(function(e){e(function(){function l(a){var b={};if(window.getComputedStyle){var c=function(a,c){return c.toUpperCase()},a=window.getComputedStyle(a,null);if(a.length)for(var d=0,e=a.length;d<e;d++){var f=a[d],h=f.replace(/\-([a-z])/,c),f=a.getPropertyValue(f);b[h]=f}else for(f in a)"function"!==typeof a[f]&&"length"!==f&&(b[f]=a[f])}else for(f in a=a.currentStyle||a.style,a)b[f]=a[f];return b}function q(){var a=this,b=[function(c){var b=e.Deferred();c.animate({top:a._position.bottom,opacity:"hide"},
b.resolve);return b.promise()},function(a){var b=e.Deferred();a.fadeOut(1E3,b.resolve);return b.promise()}];return b[Math.floor(Math.random()*b.length)]}function m(a){var b=this,c="random"===this.options.effect?e.fn.textualizer.effects[i[Math.floor(Math.random()*i.length)]]:e.fn.textualizer.effects[this.options.effect],d=e.Deferred(),j=[];e.each(a.chars,function(a,d){if(!d.inserted){d.domNode.css({left:d.pos.left,top:d.pos.top});var g=e.Deferred();setTimeout(function(){c.call(b,d,g)},Math.random()*
r);j.push(g)}});e.when.apply(null,j).done(function(){d.resolve()});return d.promise()}var r=2E3;e.fn.textualizer=function(a,b){var c=arguments,d=function(a){var b=a.data("textualizer");if(!b){var d=[],g;1===c.length&&c[0]instanceof Array?d=c[0]:1===c.length&&"object"===typeof c[0]?g=c[0]:2===c.length&&(d=c[0],g=c[1]);0===d.length&&a.find("p").each(function(){d.push(e(this).text())});a.html("");b=new k(a,d,e.extend({},e.fn.textualizer.defaults,g));a.data("textualizer",b)}return b}(this);"string"===
typeof c[0]&&d[c[0]]&&d[c[0]].apply(d,Array.prototype.slice.call(c,1));return this};e.fn.textualizer.defaults={effect:"random",duration:2E3,rearrangeDuration:1E3};e.fn.textualizer.effects={none:function(a){this.container.append(a.domNode.show())},fadeIn:function(a,b){this.container.append(a.domNode.fadeIn(2E3,b.resolve));return b.promise()},slideLeft:function(a,b){a.domNode.appendTo(this.container).css({left:-1E3}).show().animate({left:a.pos.left},2E3,b.resolve);return b.promise()},slideTop:function(a,
b){a.domNode.appendTo(this.container).css({top:-1E3}).show().animate({top:a.pos.top},2E3,b.resolve);return b.promise()}};var i=[];e.each(e.fn.textualizer.effects,function(a){"none"!==a&&i.push(a)});var n=function(){this.str="";this.chars=[]};n.prototype={use:function(a){for(var b=0,c=this.chars.length;b<c;b++){var d=this.chars[b];if(d.ch===a&&!d.used)return d.used=!0,d}return null},reset:function(){e.each(this.chars,function(a,b){b.inserted=!1;b.used=!1})}};var s=function(){this.pos=this.domNode=
this.ch=null;this.visited=this.inserted=this.used=!1},k=function(a,b,c){this.options=c;c=a.clone().removeAttr("id").appendTo(document.body);c.css(l(a[0]));c.css({position:"absolute",top:"-1000px"});this.phantomContainer=e("<div />").css({position:"relative",visibility:"hidden"}).appendTo(c);a.css("overflow","hidden");this.elementHeight=a.height();this.container=e("<div />").css("position","relative").appendTo(a);this._previous=null;this._position={};this._position.bottom=a.height();this.blurbs=[];
b&&b instanceof Array&&this.data(b)};k.prototype={data:function(a){this.stop();this.list=a;this.blurbs=[]},start:function(){function a(c){b._pause||b._rotate(c).done(function(){setTimeout(function(){c===b.list.length-1&&(c=-1,e.each(b.blurbs,function(a,b){b.reset()}));c++;b._index=c;a(c)},b.options.duration)})}if(this.list&&0!==this.list.length){var b=this,c=this._index||0;this._pause=!1;a(c)}},stop:function(){this.pause();this._previous=null;this._index=0;this.container.empty();this.phantomContainer.empty()},
pause:function(){this._pause=!0},_rotate:function(a){var b=e.Deferred(),c=this.blurbs[a];if(!c){var d=[],j,f,h,c=new n;c.str=this.list[a];this.blurbs.push(c);for(a=0,j=c.str.length;a<j;a++)f=c.str.charAt(a),""===f?this.phantomContainer.append(" "):(h=new s,h.ch=f,h.domNode=e("<span/>").text(f),this.phantomContainer.append(h.domNode),d.push(h));var g=this.options.centered?(this.elementHeight-this.phantomContainer.height())/2:0;e.each(d,function(a,b){b.pos=b.domNode.position();b.domNode=b.domNode.clone();
b.pos.top+=g;b.domNode.css({left:b.pos.left,top:b.pos.top,position:"absolute"});c.chars.push(b)});this.phantomContainer.html("")}if(this._previous){var i=this,k=[],o=[],p=[],l=q.call(this);e.each(this._previous.chars,function(a,b){var d=c.use(b.ch);if(d)d.domNode=b.domNode,d.inserted=!0,k.push(d);else{var f=e.Deferred();o.push(f);l(b.domNode.delay(2E3*Math.random())).done(function(){b.domNode.remove();f.resolve()})}});e.when.apply(null,o).done(function(){setTimeout(function(){e.each(k,function(b,
a){var c=e.Deferred();a.domNode.animate({left:a.pos.left,top:a.pos.top},i.options.rearrangeDuration,c.resolve);p.push(c.promise())});e.when.apply(null,p).done(function(){setTimeout(function(){m.call(i,c).done(function(){b.resolve()})},500)})},1E3)})}else m.call(this,c).done(function(){b.resolve()});this._previous=c;return b.promise()},destroy:function(){this.container.parent().removeData("textualizer").end().remove();this.phantomContainer.remove()}}})})(jQuery);