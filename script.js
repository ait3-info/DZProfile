//<![CDATA[
// DZProfile
// Plugin: SelectNav.js ~ url: https://github.com/lukaszfiszer/selectnav.js
window.selectnav=function(){"use strict";var e=function(e,t){function c(e){var t;if(!e)e=window.event;if(e.target)t=e.target;else if(e.srcElement)t=e.srcElement;if(t.nodeType===3)t=t.parentNode;if(t.value)window.location.href=t.value}function h(e){var t=e.nodeName.toLowerCase();return t==="ul"||t==="ol"}function p(e){for(var t=1;document.getElementById("selectnav"+t);t++);return e?"selectnav"+t:"selectnav"+(t-1)}function d(e){a++;var t=e.children.length,n="",l="",c=a-1;if(!t){return}if(c){while(c--){l+=o}l+=" "}for(var v=0;v<t;v++){var m=e.children[v].children[0];if(typeof m!=="undefined"){var g=m.innerText||m.textContent;var y="";if(r){y=m.className.search(r)!==-1||m.parentNode.className.search(r)!==-1?f:""}if(i&&!y){y=m.href===document.URL?f:""}n+='<option value="'+m.href+'" '+y+">"+l+g+"</option>";if(s){var b=e.children[v].children[1];if(b&&h(b)){n+=d(b)}}}}if(a===1&&u){n='<option value="">'+u+"</option>"+n}if(a===1){n='<select class="selectnav" id="'+p(true)+'">'+n+"</select>"}a--;return n}e=document.getElementById(e);if(!e){return}if(!h(e)){return}if(!("insertAdjacentHTML"in window.document.documentElement)){return}document.documentElement.className+=" js";var n=t||{},r=n.activeclass||"active",i=typeof n.autoselect==="boolean"?n.autoselect:true,s=typeof n.nested==="boolean"?n.nested:true,o=n.indent||"-",u=n.label||"Menu",a=0,f=" selected ";e.insertAdjacentHTML("afterend",d(e));var l=document.getElementById(p());if(l.addEventListener){l.addEventListener("change",c)}if(l.attachEvent){l.attachEvent("onchange",c)}return l};return function(t,n){e(t,n)}}();
// Plugin: jQuery owl Slider v2.2 
;(function($,window,document,undefined){function Owl(element,options){this.settings=null;this.options=$.extend({},Owl.Defaults,options);this.$element=$(element);this._handlers={};this._plugins={};this._supress={};this._current=null;this._speed=null;this._coordinates=[];this._breakpoint=null;this._width=null;this._items=[];this._clones=[];this._mergers=[];this._widths=[];this._invalidated={};this._pipe=[];this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null};this._states={current:{},tags:{'initializing':['busy'],'animating':['busy'],'dragging':['interacting']}};$.each(['onResize','onThrottledResize'],$.proxy(function(i,handler){this._handlers[handler]=$.proxy(this[handler],this);},this));$.each(Owl.Plugins,$.proxy(function(key,plugin){this._plugins[key.charAt(0).toLowerCase()+key.slice(1)]=new plugin(this);},this));$.each(Owl.Workers,$.proxy(function(priority,worker){this._pipe.push({'filter':worker.filter,'run':$.proxy(worker.run,this)});},this));this.setup();this.initialize();}
Owl.Defaults={items:3,loop:false,center:false,rewind:false,mouseDrag:true,touchDrag:true,pullDrag:true,freeDrag:false,margin:0,stagePadding:0,merge:false,mergeFit:true,autoWidth:false,startPosition:0,rtl:false,smartSpeed:250,fluidSpeed:false,dragEndSpeed:false,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:window,fallbackEasing:'swing',info:false,nestedItemSelector:false,itemElement:'div',stageElement:'div',refreshClass:'owl-refresh',loadedClass:'owl-loaded',loadingClass:'owl-loading',rtlClass:'owl-rtl',responsiveClass:'owl-responsive',dragClass:'owl-drag',itemClass:'owl-item',stageClass:'owl-stage',stageOuterClass:'owl-stage-outer',grabClass:'owl-grab'};Owl.Width={Default:'default',Inner:'inner',Outer:'outer'};Owl.Type={Event:'event',State:'state'};Owl.Plugins={};Owl.Workers=[{filter:['width','settings'],run:function(){this._width=this.$element.width();}},{filter:['width','items','settings'],run:function(cache){cache.current=this._items&&this._items[this.relative(this._current)];}},{filter:['items','settings'],run:function(){this.$stage.children('.cloned').remove();}},{filter:['width','items','settings'],run:function(cache){var margin=this.settings.margin||'',grid=!this.settings.autoWidth,rtl=this.settings.rtl,css={'width':'auto','margin-left':rtl?margin:'','margin-right':rtl?'':margin};!grid&&this.$stage.children().css(css);cache.css=css;}},{filter:['width','items','settings'],run:function(cache){var width=(this.width()/ this.settings.items).toFixed(3)-this.settings.margin,merge=null,iterator=this._items.length,grid=!this.settings.autoWidth,widths=[];cache.items={merge:false,width:width};while(iterator--){merge=this._mergers[iterator];merge=this.settings.mergeFit&&Math.min(merge,this.settings.items)||merge;cache.items.merge=merge>1||cache.items.merge;widths[iterator]=!grid?this._items[iterator].width():width*merge;}
this._widths=widths;}},{filter:['items','settings'],run:function(){var clones=[],items=this._items,settings=this.settings,view=Math.max(settings.items*2,4),size=Math.ceil(items.length / 2)*2,repeat=settings.loop&&items.length?settings.rewind?view:Math.max(view,size):0,append='',prepend='';repeat /=2;while(repeat--){clones.push(this.normalize(clones.length / 2,true));append=append+items[clones[clones.length-1]][0].outerHTML;clones.push(this.normalize(items.length-1-(clones.length-1)/ 2,true));prepend=items[clones[clones.length-1]][0].outerHTML+prepend;}
this._clones=clones;$(append).addClass('cloned').appendTo(this.$stage);$(prepend).addClass('cloned').prependTo(this.$stage);}},{filter:['width','items','settings'],run:function(){var rtl=this.settings.rtl?1:-1,size=this._clones.length+this._items.length,iterator=-1,previous=0,current=0,coordinates=[];while(++iterator<size){previous=coordinates[iterator-1]||0;current=this._widths[this.relative(iterator)]+this.settings.margin;coordinates.push(previous+current*rtl);}
this._coordinates=coordinates;}},{filter:['width','items','settings'],run:function(){var padding=this.settings.stagePadding,coordinates=this._coordinates,css={'width':Math.ceil(Math.abs(coordinates[coordinates.length-1]))+padding*2,'padding-left':padding||'','padding-right':padding||''};this.$stage.css(css);}},{filter:['width','items','settings'],run:function(cache){var iterator=this._coordinates.length,grid=!this.settings.autoWidth,items=this.$stage.children();if(grid&&cache.items.merge){while(iterator--){cache.css.width=this._widths[this.relative(iterator)];items.eq(iterator).css(cache.css);}}else if(grid){cache.css.width=cache.items.width;items.css(cache.css);}}},{filter:['items'],run:function(){this._coordinates.length<1&&this.$stage.removeAttr('style');}},{filter:['width','items','settings'],run:function(cache){cache.current=cache.current?this.$stage.children().index(cache.current):0;cache.current=Math.max(this.minimum(),Math.min(this.maximum(),cache.current));this.reset(cache.current);}},{filter:['position'],run:function(){this.animate(this.coordinates(this._current));}},{filter:['width','position','items','settings'],run:function(){var rtl=this.settings.rtl?1:-1,padding=this.settings.stagePadding*2,begin=this.coordinates(this.current())+padding,end=begin+this.width()*rtl,inner,outer,matches=[],i,n;for(i=0,n=this._coordinates.length;i<n;i++){inner=this._coordinates[i-1]||0;outer=Math.abs(this._coordinates[i])+padding*rtl;if((this.op(inner,'<=',begin)&&(this.op(inner,'>',end)))||(this.op(outer,'<',begin)&&this.op(outer,'>',end))){matches.push(i);}}
this.$stage.children('.active').removeClass('active');this.$stage.children(':eq('+matches.join('), :eq(')+')').addClass('active');if(this.settings.center){this.$stage.children('.center').removeClass('center');this.$stage.children().eq(this.current()).addClass('center');}}}];Owl.prototype.initialize=function(){this.enter('initializing');this.trigger('initialize');this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl);if(this.settings.autoWidth&&!this.is('pre-loading')){var imgs,nestedSelector,width;imgs=this.$element.find('img');nestedSelector=this.settings.nestedItemSelector?'.'+this.settings.nestedItemSelector:undefined;width=this.$element.children(nestedSelector).width();if(imgs.length&&width<=0){this.preloadAutoWidthImages(imgs);}}
this.$element.addClass(this.options.loadingClass);this.$stage=$('<'+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>');this.$element.append(this.$stage.parent());this.replace(this.$element.children().not(this.$stage.parent()));if(this.$element.is(':visible')){this.refresh();}else{this.invalidate('width');}
this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);this.registerEventHandlers();this.leave('initializing');this.trigger('initialized');};Owl.prototype.setup=function(){var viewport=this.viewport(),overwrites=this.options.responsive,match=-1,settings=null;if(!overwrites){settings=$.extend({},this.options);}else{$.each(overwrites,function(breakpoint){if(breakpoint<=viewport&&breakpoint>match){match=Number(breakpoint);}});settings=$.extend({},this.options,overwrites[match]);if(typeof settings.stagePadding==='function'){settings.stagePadding=settings.stagePadding();}
delete settings.responsive;if(settings.responsiveClass){this.$element.attr('class',this.$element.attr('class').replace(new RegExp('('+this.options.responsiveClass+'-)\\S+\\s','g'),'$1'+match));}}
this.trigger('change',{property:{name:'settings',value:settings}});this._breakpoint=match;this.settings=settings;this.invalidate('settings');this.trigger('changed',{property:{name:'settings',value:this.settings}});};Owl.prototype.optionsLogic=function(){if(this.settings.autoWidth){this.settings.stagePadding=false;this.settings.merge=false;}};Owl.prototype.prepare=function(item){var event=this.trigger('prepare',{content:item});if(!event.data){event.data=$('<'+this.settings.itemElement+'/>').addClass(this.options.itemClass).append(item)}
this.trigger('prepared',{content:event.data});return event.data;};Owl.prototype.update=function(){var i=0,n=this._pipe.length,filter=$.proxy(function(p){return this[p]},this._invalidated),cache={};while(i<n){if(this._invalidated.all||$.grep(this._pipe[i].filter,filter).length>0){this._pipe[i].run(cache);}
i++;}
this._invalidated={};!this.is('valid')&&this.enter('valid');};Owl.prototype.width=function(dimension){dimension=dimension||Owl.Width.Default;switch(dimension){case Owl.Width.Inner:case Owl.Width.Outer:return this._width;default:return this._width-this.settings.stagePadding*2+this.settings.margin;}};Owl.prototype.refresh=function(){this.enter('refreshing');this.trigger('refresh');this.setup();this.optionsLogic();this.$element.addClass(this.options.refreshClass);this.update();this.$element.removeClass(this.options.refreshClass);this.leave('refreshing');this.trigger('refreshed');};Owl.prototype.onThrottledResize=function(){window.clearTimeout(this.resizeTimer);this.resizeTimer=window.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate);};Owl.prototype.onResize=function(){if(!this._items.length){return false;}
if(this._width===this.$element.width()){return false;}
if(!this.$element.is(':visible')){return false;}
this.enter('resizing');if(this.trigger('resize').isDefaultPrevented()){this.leave('resizing');return false;}
this.invalidate('width');this.refresh();this.leave('resizing');this.trigger('resized');};Owl.prototype.registerEventHandlers=function(){if($.support.transition){this.$stage.on($.support.transition.end+'.owl.core',$.proxy(this.onTransitionEnd,this));}
if(this.settings.responsive!==false){this.on(window,'resize',this._handlers.onThrottledResize);}
if(this.settings.mouseDrag){this.$element.addClass(this.options.dragClass);this.$stage.on('mousedown.owl.core',$.proxy(this.onDragStart,this));this.$stage.on('dragstart.owl.core selectstart.owl.core',function(){return false});}
if(this.settings.touchDrag){this.$stage.on('touchstart.owl.core',$.proxy(this.onDragStart,this));this.$stage.on('touchcancel.owl.core',$.proxy(this.onDragEnd,this));}};Owl.prototype.onDragStart=function(event){var stage=null;if(event.which===3){return;}
if($.support.transform){stage=this.$stage.css('transform').replace(/.*\(|\)| /g,'').split(',');stage={x:stage[stage.length===16?12:4],y:stage[stage.length===16?13:5]};}else{stage=this.$stage.position();stage={x:this.settings.rtl?stage.left+this.$stage.width()-this.width()+this.settings.margin:stage.left,y:stage.top};}
if(this.is('animating')){$.support.transform?this.animate(stage.x):this.$stage.stop()
this.invalidate('position');}
this.$element.toggleClass(this.options.grabClass,event.type==='mousedown');this.speed(0);this._drag.time=new Date().getTime();this._drag.target=$(event.target);this._drag.stage.start=stage;this._drag.stage.current=stage;this._drag.pointer=this.pointer(event);$(document).on('mouseup.owl.core touchend.owl.core',$.proxy(this.onDragEnd,this));$(document).one('mousemove.owl.core touchmove.owl.core',$.proxy(function(event){var delta=this.difference(this._drag.pointer,this.pointer(event));$(document).on('mousemove.owl.core touchmove.owl.core',$.proxy(this.onDragMove,this));if(Math.abs(delta.x)<Math.abs(delta.y)&&this.is('valid')){return;}
event.preventDefault();this.enter('dragging');this.trigger('drag');},this));};Owl.prototype.onDragMove=function(event){var minimum=null,maximum=null,pull=null,delta=this.difference(this._drag.pointer,this.pointer(event)),stage=this.difference(this._drag.stage.start,delta);if(!this.is('dragging')){return;}
event.preventDefault();if(this.settings.loop){minimum=this.coordinates(this.minimum());maximum=this.coordinates(this.maximum()+1)-minimum;stage.x=(((stage.x-minimum)%maximum+maximum)%maximum)+minimum;}else{minimum=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum());maximum=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum());pull=this.settings.pullDrag?-1*delta.x / 5:0;stage.x=Math.max(Math.min(stage.x,minimum+pull),maximum+pull);}
this._drag.stage.current=stage;this.animate(stage.x);};Owl.prototype.onDragEnd=function(event){var delta=this.difference(this._drag.pointer,this.pointer(event)),stage=this._drag.stage.current,direction=delta.x>0^this.settings.rtl?'left':'right';$(document).off('.owl.core');this.$element.removeClass(this.options.grabClass);if(delta.x!==0&&this.is('dragging')||!this.is('valid')){this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed);this.current(this.closest(stage.x,delta.x!==0?direction:this._drag.direction));this.invalidate('position');this.update();this._drag.direction=direction;if(Math.abs(delta.x)>3||new Date().getTime()-this._drag.time>300){this._drag.target.one('click.owl.core',function(){return false;});}}
if(!this.is('dragging')){return;}
this.leave('dragging');this.trigger('dragged');};Owl.prototype.closest=function(coordinate,direction){var position=-1,pull=30,width=this.width(),coordinates=this.coordinates();if(!this.settings.freeDrag){$.each(coordinates,$.proxy(function(index,value){if(direction==='left'&&coordinate>value-pull&&coordinate<value+pull){position=index;}else if(direction==='right'&&coordinate>value-width-pull&&coordinate<value-width+pull){position=index+1;}else if(this.op(coordinate,'<',value)&&this.op(coordinate,'>',coordinates[index+1]||value-width)){position=direction==='left'?index+1:index;}
return position===-1;},this));}
if(!this.settings.loop){if(this.op(coordinate,'>',coordinates[this.minimum()])){position=coordinate=this.minimum();}else if(this.op(coordinate,'<',coordinates[this.maximum()])){position=coordinate=this.maximum();}}
return position;};Owl.prototype.animate=function(coordinate){var animate=this.speed()>0;this.is('animating')&&this.onTransitionEnd();if(animate){this.enter('animating');this.trigger('translate');}
if($.support.transform3d&&$.support.transition){this.$stage.css({transform:'translate3d('+coordinate+'px,0px,0px)',transition:(this.speed()/ 1000)+'s'});}else if(animate){this.$stage.animate({left:coordinate+'px'},this.speed(),this.settings.fallbackEasing,$.proxy(this.onTransitionEnd,this));}else{this.$stage.css({left:coordinate+'px'});}};Owl.prototype.is=function(state){return this._states.current[state]&&this._states.current[state]>0;};Owl.prototype.current=function(position){if(position===undefined){return this._current;}
if(this._items.length===0){return undefined;}
position=this.normalize(position);if(this._current!==position){var event=this.trigger('change',{property:{name:'position',value:position}});if(event.data!==undefined){position=this.normalize(event.data);}
this._current=position;this.invalidate('position');this.trigger('changed',{property:{name:'position',value:this._current}});}
return this._current;};Owl.prototype.invalidate=function(part){if($.type(part)==='string'){this._invalidated[part]=true;this.is('valid')&&this.leave('valid');}
return $.map(this._invalidated,function(v,i){return i});};Owl.prototype.reset=function(position){position=this.normalize(position);if(position===undefined){return;}
this._speed=0;this._current=position;this.suppress(['translate','translated']);this.animate(this.coordinates(position));this.release(['translate','translated']);};Owl.prototype.normalize=function(position,relative){var n=this._items.length,m=relative?0:this._clones.length;if(!this.isNumeric(position)||n<1){position=undefined;}else if(position<0||position>=n+m){position=((position-m / 2)%n+n)%n+m / 2;}
return position;};Owl.prototype.relative=function(position){position-=this._clones.length / 2;return this.normalize(position,true);};Owl.prototype.maximum=function(relative){var settings=this.settings,maximum=this._coordinates.length,iterator,reciprocalItemsWidth,elementWidth;if(settings.loop){maximum=this._clones.length / 2+this._items.length-1;}else if(settings.autoWidth||settings.merge){iterator=this._items.length;reciprocalItemsWidth=this._items[--iterator].width();elementWidth=this.$element.width();while(iterator--){reciprocalItemsWidth+=this._items[iterator].width()+this.settings.margin;if(reciprocalItemsWidth>elementWidth){break;}}
maximum=iterator+1;}else if(settings.center){maximum=this._items.length-1;}else{maximum=this._items.length-settings.items;}
if(relative){maximum-=this._clones.length / 2;}
return Math.max(maximum,0);};Owl.prototype.minimum=function(relative){return relative?0:this._clones.length / 2;};Owl.prototype.items=function(position){if(position===undefined){return this._items.slice();}
position=this.normalize(position,true);return this._items[position];};Owl.prototype.mergers=function(position){if(position===undefined){return this._mergers.slice();}
position=this.normalize(position,true);return this._mergers[position];};Owl.prototype.clones=function(position){var odd=this._clones.length / 2,even=odd+this._items.length,map=function(index){return index%2===0?even+index / 2:odd-(index+1)/ 2};if(position===undefined){return $.map(this._clones,function(v,i){return map(i)});}
return $.map(this._clones,function(v,i){return v===position?map(i):null});};Owl.prototype.speed=function(speed){if(speed!==undefined){this._speed=speed;}
return this._speed;};Owl.prototype.coordinates=function(position){var multiplier=1,newPosition=position-1,coordinate;if(position===undefined){return $.map(this._coordinates,$.proxy(function(coordinate,index){return this.coordinates(index);},this));}
if(this.settings.center){if(this.settings.rtl){multiplier=-1;newPosition=position+1;}
coordinate=this._coordinates[position];coordinate+=(this.width()-coordinate+(this._coordinates[newPosition]||0))/ 2*multiplier;}else{coordinate=this._coordinates[newPosition]||0;}
coordinate=Math.ceil(coordinate);return coordinate;};Owl.prototype.duration=function(from,to,factor){if(factor===0){return 0;}
return Math.min(Math.max(Math.abs(to-from),1),6)*Math.abs((factor||this.settings.smartSpeed));};Owl.prototype.to=function(position,speed){var current=this.current(),revert=null,distance=position-this.relative(current),direction=(distance>0)-(distance<0),items=this._items.length,minimum=this.minimum(),maximum=this.maximum();if(this.settings.loop){if(!this.settings.rewind&&Math.abs(distance)>items / 2){distance+=direction*-1*items;}
position=current+distance;revert=((position-minimum)%items+items)%items+minimum;if(revert!==position&&revert-distance<=maximum&&revert-distance>0){current=revert-distance;position=revert;this.reset(current);}}else if(this.settings.rewind){maximum+=1;position=(position%maximum+maximum)%maximum;}else{position=Math.max(minimum,Math.min(maximum,position));}
this.speed(this.duration(current,position,speed));this.current(position);if(this.$element.is(':visible')){this.update();}};Owl.prototype.next=function(speed){speed=speed||false;this.to(this.relative(this.current())+1,speed);};Owl.prototype.prev=function(speed){speed=speed||false;this.to(this.relative(this.current())-1,speed);};Owl.prototype.onTransitionEnd=function(event){if(event!==undefined){event.stopPropagation();if((event.target||event.srcElement||event.originalTarget)!==this.$stage.get(0)){return false;}}
this.leave('animating');this.trigger('translated');};Owl.prototype.viewport=function(){var width;if(this.options.responsiveBaseElement!==window){width=$(this.options.responsiveBaseElement).width();}else if(window.innerWidth){width=window.innerWidth;}else if(document.documentElement&&document.documentElement.clientWidth){width=document.documentElement.clientWidth;}else{console.warn('Can not detect viewport width.');}
return width;};Owl.prototype.replace=function(content){this.$stage.empty();this._items=[];if(content){content=(content instanceof jQuery)?content:$(content);}
if(this.settings.nestedItemSelector){content=content.find('.'+this.settings.nestedItemSelector);}
content.filter(function(){return this.nodeType===1;}).each($.proxy(function(index,item){item=this.prepare(item);this.$stage.append(item);this._items.push(item);this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge')*1||1);},this));this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0);this.invalidate('items');};Owl.prototype.add=function(content,position){var current=this.relative(this._current);position=position===undefined?this._items.length:this.normalize(position,true);content=content instanceof jQuery?content:$(content);this.trigger('add',{content:content,position:position});content=this.prepare(content);if(this._items.length===0||position===this._items.length){this._items.length===0&&this.$stage.append(content);this._items.length!==0&&this._items[position-1].after(content);this._items.push(content);this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge')*1||1);}else{this._items[position].before(content);this._items.splice(position,0,content);this._mergers.splice(position,0,content.find('[data-merge]').addBack('[data-merge]').attr('data-merge')*1||1);}
this._items[current]&&this.reset(this._items[current].index());this.invalidate('items');this.trigger('added',{content:content,position:position});};Owl.prototype.remove=function(position){position=this.normalize(position,true);if(position===undefined){return;}
this.trigger('remove',{content:this._items[position],position:position});this._items[position].remove();this._items.splice(position,1);this._mergers.splice(position,1);this.invalidate('items');this.trigger('removed',{content:null,position:position});};Owl.prototype.preloadAutoWidthImages=function(images){images.each($.proxy(function(i,element){this.enter('pre-loading');element=$(element);$(new Image()).one('load',$.proxy(function(e){element.attr('src',e.target.src);element.css('opacity',1);this.leave('pre-loading');!this.is('pre-loading')&&!this.is('initializing')&&this.refresh();},this)).attr('src',element.attr('src')||element.attr('data-src')||element.attr('data-src-retina'));},this));};Owl.prototype.destroy=function(){this.$element.off('.owl.core');this.$stage.off('.owl.core');$(document).off('.owl.core');if(this.settings.responsive!==false){window.clearTimeout(this.resizeTimer);this.off(window,'resize',this._handlers.onThrottledResize);}
for(var i in this._plugins){this._plugins[i].destroy();}
this.$stage.children('.cloned').remove();this.$stage.unwrap();this.$stage.children().contents().unwrap();this.$stage.children().unwrap();this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr('class',this.$element.attr('class').replace(new RegExp(this.options.responsiveClass+'-\\S+\\s','g'),'')).removeData('owl.carousel');};Owl.prototype.op=function(a,o,b){var rtl=this.settings.rtl;switch(o){case'<':return rtl?a>b:a<b;case'>':return rtl?a<b:a>b;case'>=':return rtl?a<=b:a>=b;case'<=':return rtl?a>=b:a<=b;default:break;}};Owl.prototype.on=function(element,event,listener,capture){if(element.addEventListener){element.addEventListener(event,listener,capture);}else if(element.attachEvent){element.attachEvent('on'+event,listener);}};Owl.prototype.off=function(element,event,listener,capture){if(element.removeEventListener){element.removeEventListener(event,listener,capture);}else if(element.detachEvent){element.detachEvent('on'+event,listener);}};Owl.prototype.trigger=function(name,data,namespace,state,enter){var status={item:{count:this._items.length,index:this.current()}},handler=$.camelCase($.grep(['on',name,namespace],function(v){return v}).join('-').toLowerCase()),event=$.Event([name,'owl',namespace||'carousel'].join('.').toLowerCase(),$.extend({relatedTarget:this},status,data));if(!this._supress[name]){$.each(this._plugins,function(name,plugin){if(plugin.onTrigger){plugin.onTrigger(event);}});this.register({type:Owl.Type.Event,name:name});this.$element.trigger(event);if(this.settings&&typeof this.settings[handler]==='function'){this.settings[handler].call(this,event);}}
return event;};Owl.prototype.enter=function(name){$.each([name].concat(this._states.tags[name]||[]),$.proxy(function(i,name){if(this._states.current[name]===undefined){this._states.current[name]=0;}
this._states.current[name]++;},this));};Owl.prototype.leave=function(name){$.each([name].concat(this._states.tags[name]||[]),$.proxy(function(i,name){this._states.current[name]--;},this));};Owl.prototype.register=function(object){if(object.type===Owl.Type.Event){if(!$.event.special[object.name]){$.event.special[object.name]={};}
if(!$.event.special[object.name].owl){var _default=$.event.special[object.name]._default;$.event.special[object.name]._default=function(e){if(_default&&_default.apply&&(!e.namespace||e.namespace.indexOf('owl')===-1)){return _default.apply(this,arguments);}
return e.namespace&&e.namespace.indexOf('owl')>-1;};$.event.special[object.name].owl=true;}}else if(object.type===Owl.Type.State){if(!this._states.tags[object.name]){this._states.tags[object.name]=object.tags;}else{this._states.tags[object.name]=this._states.tags[object.name].concat(object.tags);}
this._states.tags[object.name]=$.grep(this._states.tags[object.name],$.proxy(function(tag,i){return $.inArray(tag,this._states.tags[object.name])===i;},this));}};Owl.prototype.suppress=function(events){$.each(events,$.proxy(function(index,event){this._supress[event]=true;},this));};Owl.prototype.release=function(events){$.each(events,$.proxy(function(index,event){delete this._supress[event];},this));};Owl.prototype.pointer=function(event){var result={x:null,y:null};event=event.originalEvent||event||window.event;event=event.touches&&event.touches.length?event.touches[0]:event.changedTouches&&event.changedTouches.length?event.changedTouches[0]:event;if(event.pageX){result.x=event.pageX;result.y=event.pageY;}else{result.x=event.clientX;result.y=event.clientY;}
return result;};Owl.prototype.isNumeric=function(number){return!isNaN(parseFloat(number));};Owl.prototype.difference=function(first,second){return{x:first.x-second.x,y:first.y-second.y};};$.fn.owlCarousel=function(option){var args=Array.prototype.slice.call(arguments,1);return this.each(function(){var $this=$(this),data=$this.data('owl.carousel');if(!data){data=new Owl(this,typeof option=='object'&&option);$this.data('owl.carousel',data);$.each(['next','prev','to','destroy','refresh','replace','add','remove'],function(i,event){data.register({type:Owl.Type.Event,name:event});data.$element.on(event+'.owl.carousel.core',$.proxy(function(e){if(e.namespace&&e.relatedTarget!==this){this.suppress([event]);data[event].apply(this,[].slice.call(arguments,1));this.release([event]);}},data));});}
if(typeof option=='string'&&option.charAt(0)!=='_'){data[option].apply(data,args);}});};$.fn.owlCarousel.Constructor=Owl;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var AutoRefresh=function(carousel){this._core=carousel;this._interval=null;this._visible=null;this._handlers={'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoRefresh){this.watch();}},this)};this._core.options=$.extend({},AutoRefresh.Defaults,this._core.options);this._core.$element.on(this._handlers);};AutoRefresh.Defaults={autoRefresh:true,autoRefreshInterval:500};AutoRefresh.prototype.watch=function(){if(this._interval){return;}
this._visible=this._core.$element.is(':visible');this._interval=window.setInterval($.proxy(this.refresh,this),this._core.settings.autoRefreshInterval);};AutoRefresh.prototype.refresh=function(){if(this._core.$element.is(':visible')===this._visible){return;}
this._visible=!this._visible;this._core.$element.toggleClass('owl-hidden',!this._visible);this._visible&&(this._core.invalidate('width')&&this._core.refresh());};AutoRefresh.prototype.destroy=function(){var handler,property;window.clearInterval(this._interval);for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.AutoRefresh=AutoRefresh;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Lazy=function(carousel){this._core=carousel;this._loaded=[];this._handlers={'initialized.owl.carousel change.owl.carousel resized.owl.carousel':$.proxy(function(e){if(!e.namespace){return;}
if(!this._core.settings||!this._core.settings.lazyLoad){return;}
if((e.property&&e.property.name=='position')||e.type=='initialized'){var settings=this._core.settings,n=(settings.center&&Math.ceil(settings.items / 2)||settings.items),i=((settings.center&&n*-1)||0),position=(e.property&&e.property.value!==undefined?e.property.value:this._core.current())+i,clones=this._core.clones().length,load=$.proxy(function(i,v){this.load(v)},this);while(i++<n){this.load(clones / 2+this._core.relative(position));clones&&$.each(this._core.clones(this._core.relative(position)),load);position++;}}},this)};this._core.options=$.extend({},Lazy.Defaults,this._core.options);this._core.$element.on(this._handlers);};Lazy.Defaults={lazyLoad:false};Lazy.prototype.load=function(position){var $item=this._core.$stage.children().eq(position),$elements=$item&&$item.find('.owl-lazy');if(!$elements||$.inArray($item.get(0),this._loaded)>-1){return;}
$elements.each($.proxy(function(index,element){var $element=$(element),image,url=(window.devicePixelRatio>1&&$element.attr('data-src-retina'))||$element.attr('data-src');this._core.trigger('load',{element:$element,url:url},'lazy');if($element.is('img')){$element.one('load.owl.lazy',$.proxy(function(){$element.css('opacity',1);this._core.trigger('loaded',{element:$element,url:url},'lazy');},this)).attr('src',url);}else{image=new Image();image.onload=$.proxy(function(){$element.css({'background-image':'url("'+url+'")','opacity':'1'});this._core.trigger('loaded',{element:$element,url:url},'lazy');},this);image.src=url;}},this));this._loaded.push($item.get(0));};Lazy.prototype.destroy=function(){var handler,property;for(handler in this.handlers){this._core.$element.off(handler,this.handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Lazy=Lazy;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var AutoHeight=function(carousel){this._core=carousel;this._handlers={'initialized.owl.carousel refreshed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoHeight){this.update();}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoHeight&&e.property.name=='position'){this.update();}},this),'loaded.owl.lazy':$.proxy(function(e){if(e.namespace&&this._core.settings.autoHeight&&e.element.closest('.'+this._core.settings.itemClass).index()===this._core.current()){this.update();}},this)};this._core.options=$.extend({},AutoHeight.Defaults,this._core.options);this._core.$element.on(this._handlers);};AutoHeight.Defaults={autoHeight:false,autoHeightClass:'owl-height'};AutoHeight.prototype.update=function(){var start=this._core._current,end=start+this._core.settings.items,visible=this._core.$stage.children().toArray().slice(start,end),heights=[],maxheight=0;$.each(visible,function(index,item){heights.push($(item).height());});maxheight=Math.max.apply(null,heights);this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass);};AutoHeight.prototype.destroy=function(){var handler,property;for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.AutoHeight=AutoHeight;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Video=function(carousel){this._core=carousel;this._videos={};this._playing=null;this._handlers={'initialized.owl.carousel':$.proxy(function(e){if(e.namespace){this._core.register({type:'state',name:'playing',tags:['interacting']});}},this),'resize.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.video&&this.isInFullScreen()){e.preventDefault();}},this),'refreshed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.is('resizing')){this._core.$stage.find('.cloned .owl-video-frame').remove();}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name==='position'&&this._playing){this.stop();}},this),'prepared.owl.carousel':$.proxy(function(e){if(!e.namespace){return;}
var $element=$(e.content).find('.owl-video');if($element.length){$element.css('display','none');this.fetch($element,$(e.content));}},this)};this._core.options=$.extend({},Video.Defaults,this._core.options);this._core.$element.on(this._handlers);this._core.$element.on('click.owl.video','.owl-video-play-icon',$.proxy(function(e){this.play(e);},this));};Video.Defaults={video:false,videoHeight:false,videoWidth:false};Video.prototype.fetch=function(target,item){var type=(function(){if(target.attr('data-vimeo-id')){return'vimeo';}else if(target.attr('data-vzaar-id')){return'vzaar'}else{return'youtube';}})(),id=target.attr('data-vimeo-id')||target.attr('data-youtube-id')||target.attr('data-vzaar-id'),width=target.attr('data-width')||this._core.settings.videoWidth,height=target.attr('data-height')||this._core.settings.videoHeight,url=target.attr('href');if(url){id=url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);if(id[3].indexOf('youtu')>-1){type='youtube';}else if(id[3].indexOf('vimeo')>-1){type='vimeo';}else if(id[3].indexOf('vzaar')>-1){type='vzaar';}else{throw new Error('Video URL not supported.');}
id=id[6];}else{throw new Error('Missing video URL.');}
this._videos[url]={type:type,id:id,width:width,height:height};item.attr('data-video',url);this.thumbnail(target,this._videos[url]);};Video.prototype.thumbnail=function(target,video){var tnLink,icon,path,dimensions=video.width&&video.height?'style="width:'+video.width+'px;height:'+video.height+'px;"':'',customTn=target.find('img'),srcType='src',lazyClass='',settings=this._core.settings,create=function(path){icon='<div class="owl-video-play-icon"></div>';if(settings.lazyLoad){tnLink='<div class="owl-video-tn '+lazyClass+'" '+srcType+'="'+path+'"></div>';}else{tnLink='<div class="owl-video-tn" style="opacity:1;background-image:url('+path+')"></div>';}
target.after(tnLink);target.after(icon);};target.wrap('<div class="owl-video-wrapper"'+dimensions+'></div>');if(this._core.settings.lazyLoad){srcType='data-src';lazyClass='owl-lazy';}
if(customTn.length){create(customTn.attr(srcType));customTn.remove();return false;}
if(video.type==='youtube'){path="//img.youtube.com/vi/"+video.id+"/hqdefault.jpg";create(path);}else if(video.type==='vimeo'){$.ajax({type:'GET',url:'//vimeo.com/api/v2/video/'+video.id+'.json',jsonp:'callback',dataType:'jsonp',success:function(data){path=data[0].thumbnail_large;create(path);}});}else if(video.type==='vzaar'){$.ajax({type:'GET',url:'//vzaar.com/api/videos/'+video.id+'.json',jsonp:'callback',dataType:'jsonp',success:function(data){path=data.framegrab_url;create(path);}});}};Video.prototype.stop=function(){this._core.trigger('stop',null,'video');this._playing.find('.owl-video-frame').remove();this._playing.removeClass('owl-video-playing');this._playing=null;this._core.leave('playing');this._core.trigger('stopped',null,'video');};Video.prototype.play=function(event){var target=$(event.target),item=target.closest('.'+this._core.settings.itemClass),video=this._videos[item.attr('data-video')],width=video.width||'100%',height=video.height||this._core.$stage.height(),html;if(this._playing){return;}
this._core.enter('playing');this._core.trigger('play',null,'video');item=this._core.items(this._core.relative(item.index()));this._core.reset(item.index());if(video.type==='youtube'){html='<iframe width="'+width+'" height="'+height+'" src="//www.youtube.com/embed/'+
video.id+'?autoplay=1&rel=0&v='+video.id+'" frameborder="0" allowfullscreen></iframe>';}else if(video.type==='vimeo'){html='<iframe src="//player.vimeo.com/video/'+video.id+'?autoplay=1" width="'+width+'" height="'+height+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';}else if(video.type==='vzaar'){html='<iframe frameborder="0"'+'height="'+height+'"'+'width="'+width+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen '+'src="//view.vzaar.com/'+video.id+'/player?autoplay=true"></iframe>';}
$('<div class="owl-video-frame">'+html+'</div>').insertAfter(item.find('.owl-video'));this._playing=item.addClass('owl-video-playing');};Video.prototype.isInFullScreen=function(){var element=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;return element&&$(element).parent().hasClass('owl-video-frame');};Video.prototype.destroy=function(){var handler,property;this._core.$element.off('click.owl.video');for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Video=Video;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Animate=function(scope){this.core=scope;this.core.options=$.extend({},Animate.Defaults,this.core.options);this.swapping=true;this.previous=undefined;this.next=undefined;this.handlers={'change.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name=='position'){this.previous=this.core.current();this.next=e.property.value;}},this),'drag.owl.carousel dragged.owl.carousel translated.owl.carousel':$.proxy(function(e){if(e.namespace){this.swapping=e.type=='translated';}},this),'translate.owl.carousel':$.proxy(function(e){if(e.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)){this.swap();}},this)};this.core.$element.on(this.handlers);};Animate.Defaults={animateOut:false,animateIn:false};Animate.prototype.swap=function(){if(this.core.settings.items!==1){return;}
if(!$.support.animation||!$.support.transition){return;}
this.core.speed(0);var left,clear=$.proxy(this.clear,this),previous=this.core.$stage.children().eq(this.previous),next=this.core.$stage.children().eq(this.next),incoming=this.core.settings.animateIn,outgoing=this.core.settings.animateOut;if(this.core.current()===this.previous){return;}
if(outgoing){left=this.core.coordinates(this.previous)-this.core.coordinates(this.next);previous.one($.support.animation.end,clear).css({'left':left+'px'}).addClass('animated owl-animated-out').addClass(outgoing);}
if(incoming){next.one($.support.animation.end,clear).addClass('animated owl-animated-in').addClass(incoming);}};Animate.prototype.clear=function(e){$(e.target).css({'left':''}).removeClass('animated owl-animated-out owl-animated-in').removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);this.core.onTransitionEnd();};Animate.prototype.destroy=function(){var handler,property;for(handler in this.handlers){this.core.$element.off(handler,this.handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Animate=Animate;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var Autoplay=function(carousel){this._core=carousel;this._timeout=null;this._paused=false;this._handlers={'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name==='settings'){if(this._core.settings.autoplay){this.play();}else{this.stop();}}else if(e.namespace&&e.property.name==='position'){if(this._core.settings.autoplay){this._setAutoPlayInterval();}}},this),'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.autoplay){this.play();}},this),'play.owl.autoplay':$.proxy(function(e,t,s){if(e.namespace){this.play(t,s);}},this),'stop.owl.autoplay':$.proxy(function(e){if(e.namespace){this.stop();}},this),'mouseover.owl.autoplay':$.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is('rotating')){this.pause();}},this),'mouseleave.owl.autoplay':$.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is('rotating')){this.play();}},this),'touchstart.owl.core':$.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is('rotating')){this.pause();}},this),'touchend.owl.core':$.proxy(function(){if(this._core.settings.autoplayHoverPause){this.play();}},this)};this._core.$element.on(this._handlers);this._core.options=$.extend({},Autoplay.Defaults,this._core.options);};Autoplay.Defaults={autoplay:false,autoplayTimeout:5000,autoplayHoverPause:false,autoplaySpeed:false};Autoplay.prototype.play=function(timeout,speed){this._paused=false;if(this._core.is('rotating')){return;}
this._core.enter('rotating');this._setAutoPlayInterval();};Autoplay.prototype._getNextTimeout=function(timeout,speed){if(this._timeout){window.clearTimeout(this._timeout);}
return window.setTimeout($.proxy(function(){if(this._paused||this._core.is('busy')||this._core.is('interacting')||document.hidden){return;}
this._core.next(speed||this._core.settings.autoplaySpeed);},this),timeout||this._core.settings.autoplayTimeout);};Autoplay.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout();};Autoplay.prototype.stop=function(){if(!this._core.is('rotating')){return;}
window.clearTimeout(this._timeout);this._core.leave('rotating');};Autoplay.prototype.pause=function(){if(!this._core.is('rotating')){return;}
this._paused=true;};Autoplay.prototype.destroy=function(){var handler,property;this.stop();for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.autoplay=Autoplay;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){'use strict';var Navigation=function(carousel){this._core=carousel;this._initialized=false;this._pages=[];this._controls={};this._templates=[];this.$element=this._core.$element;this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to};this._handlers={'prepared.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.dotsData){this._templates.push('<div class="'+this._core.settings.dotClass+'">'+
$(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot')+'</div>');}},this),'added.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.dotsData){this._templates.splice(e.position,0,this._templates.pop());}},this),'remove.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.dotsData){this._templates.splice(e.position,1);}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name=='position'){this.draw();}},this),'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&!this._initialized){this._core.trigger('initialize',null,'navigation');this.initialize();this.update();this.draw();this._initialized=true;this._core.trigger('initialized',null,'navigation');}},this),'refreshed.owl.carousel':$.proxy(function(e){if(e.namespace&&this._initialized){this._core.trigger('refresh',null,'navigation');this.update();this.draw();this._core.trigger('refreshed',null,'navigation');}},this)};this._core.options=$.extend({},Navigation.Defaults,this._core.options);this.$element.on(this._handlers);};Navigation.Defaults={nav:false,navText:['prev','next'],navSpeed:false,navElement:'div',navContainer:false,navContainerClass:'owl-nav',navClass:['owl-prev','owl-next'],slideBy:1,dotClass:'owl-dot',dotsClass:'owl-dots',dots:true,dotsEach:false,dotsData:false,dotsSpeed:false,dotsContainer:false};Navigation.prototype.initialize=function(){var override,settings=this._core.settings;this._controls.$relative=(settings.navContainer?$(settings.navContainer):$('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');this._controls.$previous=$('<'+settings.navElement+'>').addClass(settings.navClass[0]).html(settings.navText[0]).prependTo(this._controls.$relative).on('click',$.proxy(function(e){this.prev(settings.navSpeed);},this));this._controls.$next=$('<'+settings.navElement+'>').addClass(settings.navClass[1]).html(settings.navText[1]).appendTo(this._controls.$relative).on('click',$.proxy(function(e){this.next(settings.navSpeed);},this));if(!settings.dotsData){this._templates=[$('<div>').addClass(settings.dotClass).append($('<span>')).prop('outerHTML')];}
this._controls.$absolute=(settings.dotsContainer?$(settings.dotsContainer):$('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');this._controls.$absolute.on('click','div',$.proxy(function(e){var index=$(e.target).parent().is(this._controls.$absolute)?$(e.target).index():$(e.target).parent().index();e.preventDefault();this.to(index,settings.dotsSpeed);},this));for(override in this._overrides){this._core[override]=$.proxy(this[override],this);}};Navigation.prototype.destroy=function(){var handler,control,property,override;for(handler in this._handlers){this.$element.off(handler,this._handlers[handler]);}
for(control in this._controls){this._controls[control].remove();}
for(override in this.overides){this._core[override]=this._overrides[override];}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};Navigation.prototype.update=function(){var i,j,k,lower=this._core.clones().length / 2,upper=lower+this._core.items().length,maximum=this._core.maximum(true),settings=this._core.settings,size=settings.center||settings.autoWidth||settings.dotsData?1:settings.dotsEach||settings.items;if(settings.slideBy!=='page'){settings.slideBy=Math.min(settings.slideBy,settings.items);}
if(settings.dots||settings.slideBy=='page'){this._pages=[];for(i=lower,j=0,k=0;i<upper;i++){if(j>=size||j===0){this._pages.push({start:Math.min(maximum,i-lower),end:i-lower+size-1});if(Math.min(maximum,i-lower)===maximum){break;}
j=0,++k;}
j+=this._core.mergers(this._core.relative(i));}}};Navigation.prototype.draw=function(){var difference,settings=this._core.settings,disabled=this._core.items().length<=settings.items,index=this._core.relative(this._core.current()),loop=settings.loop||settings.rewind;this._controls.$relative.toggleClass('disabled',!settings.nav||disabled);if(settings.nav){this._controls.$previous.toggleClass('disabled',!loop&&index<=this._core.minimum(true));this._controls.$next.toggleClass('disabled',!loop&&index>=this._core.maximum(true));}
this._controls.$absolute.toggleClass('disabled',!settings.dots||disabled);if(settings.dots){difference=this._pages.length-this._controls.$absolute.children().length;if(settings.dotsData&&difference!==0){this._controls.$absolute.html(this._templates.join(''));}else if(difference>0){this._controls.$absolute.append(new Array(difference+1).join(this._templates[0]));}else if(difference<0){this._controls.$absolute.children().slice(difference).remove();}
this._controls.$absolute.find('.active').removeClass('active');this._controls.$absolute.children().eq($.inArray(this.current(),this._pages)).addClass('active');}};Navigation.prototype.onTrigger=function(event){var settings=this._core.settings;event.page={index:$.inArray(this.current(),this._pages),count:this._pages.length,size:settings&&(settings.center||settings.autoWidth||settings.dotsData?1:settings.dotsEach||settings.items)};};Navigation.prototype.current=function(){var current=this._core.relative(this._core.current());return $.grep(this._pages,$.proxy(function(page,index){return page.start<=current&&page.end>=current;},this)).pop();};Navigation.prototype.getPosition=function(successor){var position,length,settings=this._core.settings;if(settings.slideBy=='page'){position=$.inArray(this.current(),this._pages);length=this._pages.length;successor?++position:--position;position=this._pages[((position%length)+length)%length].start;}else{position=this._core.relative(this._core.current());length=this._core.items().length;successor?position+=settings.slideBy:position-=settings.slideBy;}
return position;};Navigation.prototype.next=function(speed){$.proxy(this._overrides.to,this._core)(this.getPosition(true),speed);};Navigation.prototype.prev=function(speed){$.proxy(this._overrides.to,this._core)(this.getPosition(false),speed);};Navigation.prototype.to=function(position,speed,standard){var length;if(!standard&&this._pages.length){length=this._pages.length;$.proxy(this._overrides.to,this._core)(this._pages[((position%length)+length)%length].start,speed);}else{$.proxy(this._overrides.to,this._core)(position,speed);}};$.fn.owlCarousel.Constructor.Plugins.Navigation=Navigation;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){'use strict';var Hash=function(carousel){this._core=carousel;this._hashes={};this.$element=this._core.$element;this._handlers={'initialized.owl.carousel':$.proxy(function(e){if(e.namespace&&this._core.settings.startPosition==='URLHash'){$(window).trigger('hashchange.owl.navigation');}},this),'prepared.owl.carousel':$.proxy(function(e){if(e.namespace){var hash=$(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');if(!hash){return;}
this._hashes[hash]=e.content;}},this),'changed.owl.carousel':$.proxy(function(e){if(e.namespace&&e.property.name==='position'){var current=this._core.items(this._core.relative(this._core.current())),hash=$.map(this._hashes,function(item,hash){return item===current?hash:null;}).join();if(!hash||window.location.hash.slice(1)===hash){return;}
window.location.hash=hash;}},this)};this._core.options=$.extend({},Hash.Defaults,this._core.options);this.$element.on(this._handlers);$(window).on('hashchange.owl.navigation',$.proxy(function(e){var hash=window.location.hash.substring(1),items=this._core.$stage.children(),position=this._hashes[hash]&&items.index(this._hashes[hash]);if(position===undefined||position===this._core.current()){return;}
this._core.to(this._core.relative(position),false,true);},this));};Hash.Defaults={URLhashListener:false};Hash.prototype.destroy=function(){var handler,property;$(window).off('hashchange.owl.navigation');for(handler in this._handlers){this._core.$element.off(handler,this._handlers[handler]);}
for(property in Object.getOwnPropertyNames(this)){typeof this[property]!='function'&&(this[property]=null);}};$.fn.owlCarousel.Constructor.Plugins.Hash=Hash;})(window.Zepto||window.jQuery,window,document);;(function($,window,document,undefined){var style=$('<support>').get(0).style,prefixes='Webkit Moz O ms'.split(' '),events={transition:{end:{WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd',transition:'transitionend'}},animation:{end:{WebkitAnimation:'webkitAnimationEnd',MozAnimation:'animationend',OAnimation:'oAnimationEnd',animation:'animationend'}}},tests={csstransforms:function(){return!!test('transform');},csstransforms3d:function(){return!!test('perspective');},csstransitions:function(){return!!test('transition');},cssanimations:function(){return!!test('animation');}};function test(property,prefixed){var result=false,upper=property.charAt(0).toUpperCase()+property.slice(1);$.each((property+' '+prefixes.join(upper+' ')+upper).split(' '),function(i,property){if(style[property]!==undefined){result=prefixed?property:true;return false;}});return result;}
function prefixed(property){return test(property,true);}
if(tests.csstransitions()){$.support.transition=new String(prefixed('transition'))
$.support.transition.end=events.transition.end[$.support.transition];}
if(tests.cssanimations()){$.support.animation=new String(prefixed('animation'))
$.support.animation.end=events.animation.end[$.support.animation];}
if(tests.csstransforms()){$.support.transform=new String(prefixed('transform'));$.support.transform3d=tests.csstransforms3d();}})(window.Zepto||window.jQuery,window,document);
/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),n=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-a))<=o?r[r.length-1]=s.add(e):r.push(e),n=a}),r},n=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=n(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=i,r._parseOptions=n,r._apply=function(e,o){var s=n(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var a={
display:i};a[s.property]="",e.css(a),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,n-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,a){if(a&&"resize"===a.type){var n=t(window).width();if(n===e)return;e=n;
}i?-1===o&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});

  $(window).load(function() {
    $('.owl-carousel').owlCarousel({
    animateOut: 'zoomOutRight',
    animateIn: 'zoomInLeft',
    items:1,
 autoplay:true,
    autoplayTimeout:5000,
    stagePadding:0,
      nav:true,
      loop:true,
      navText:["", ""]
});
    });
document.addEventListener("DOMContentLoaded",e=>{"dark"===(localStorage.getItem("mode")||"dark")?document.querySelector("body").classList.add("dark"):document.querySelector("body").classList.remove("dark")});
var _0x67da=["\x24\x28\x32\x44\x29\x2E\x33\x68\x28\x49\x28\x24\x29\x7B\x36\x20\x6B\x3D\x2D\x31\x2C\x6F\x3D\x22\x22\x2C\x70\x3D\x22\x22\x3B\x24\x28\x22\x23\x31\x64\x22\x29\x2E\x31\x63\x28\x22\x46\x22\x29\x2E\x31\x63\x28\x22\x47\x22\x29\x2E\x31\x66\x28\x49\x28\x29\x7B\x54\x28\x36\x20\x4B\x3D\x24\x28\x4C\x29\x2E\x4B\x28\x29\x2C\x55\x3D\x24\x28\x4C\x29\x2E\x31\x63\x28\x22\x61\x22\x29\x2E\x48\x28\x22\x4D\x22\x29\x2C\x78\x3D\x30\x2C\x7A\x3D\x30\x3B\x7A\x3C\x4B\x2E\x31\x62\x26\x26\x28\x78\x3D\x4B\x2E\x31\x61\x28\x22\x32\x72\x22\x2C\x78\x29\x2C\x2D\x31\x21\x3D\x78\x29\x3B\x7A\x2B\x2B\x29\x78\x2B\x2B\x3B\x39\x28\x31\x35\x3D\x7A\x2C\x31\x35\x3E\x6B\x26\x26\x28\x6F\x2B\x3D\x22\x3C\x46\x3E\x22\x2C\x70\x2B\x3D\x22\x3C\x46\x3E\x22\x29\x2C\x31\x35\x3C\x6B\x29\x7B\x31\x4C\x3D\x6B\x2D\x31\x35\x3B\x54\x28\x36\x20\x7A\x3D\x30\x3B\x7A\x3C\x31\x4C\x3B\x7A\x2B\x2B\x29\x6F\x2B\x3D\x22\x3C\x2F\x46\x3E\x3C\x2F\x47\x3E\x22\x2C\x70\x2B\x3D\x22\x3C\x2F\x46\x3E\x3C\x2F\x47\x3E\x22\x7D\x4B\x3D\x4B\x2E\x41\x28\x2F\x32\x72\x2F\x33\x39\x2C\x22\x22\x29\x2C\x6F\x2B\x3D\x22\x3C\x47\x3E\x3C\x61\x20\x4D\x3D\x27\x22\x2B\x55\x2B\x22\x27\x3E\x22\x2B\x4B\x2B\x22\x3C\x2F\x61\x3E\x22\x2C\x70\x2B\x3D\x22\x3C\x47\x3E\x3C\x61\x20\x4D\x3D\x27\x22\x2B\x55\x2B\x22\x27\x3E\x22\x3B\x54\x28\x36\x20\x7A\x3D\x30\x3B\x7A\x3C\x31\x35\x3B\x7A\x2B\x2B\x29\x70\x2B\x3D\x22\x22\x3B\x70\x2B\x3D\x4B\x2B\x22\x3C\x2F\x61\x3E\x22\x2C\x6B\x3D\x31\x35\x7D\x29\x3B\x54\x28\x36\x20\x78\x3D\x30\x3B\x6B\x3E\x3D\x78\x3B\x78\x2B\x2B\x29\x6F\x2B\x3D\x22\x3C\x2F\x46\x3E\x22\x2C\x70\x2B\x3D\x22\x3C\x2F\x46\x3E\x22\x2C\x30\x21\x3D\x78\x26\x26\x28\x6F\x2B\x3D\x22\x3C\x2F\x47\x3E\x22\x2C\x70\x2B\x3D\x22\x3C\x2F\x47\x3E\x22\x29\x3B\x24\x28\x22\x23\x31\x64\x20\x2E\x32\x6F\x22\x29\x2E\x31\x39\x28\x70\x29\x2C\x24\x28\x22\x23\x31\x64\x20\x3E\x20\x2E\x32\x6F\x20\x3E\x20\x46\x22\x29\x2E\x48\x28\x22\x31\x77\x22\x2C\x22\x32\x70\x22\x29\x2C\x32\x6B\x28\x27\x32\x70\x27\x29\x2C\x24\x28\x22\x23\x31\x64\x20\x46\x20\x3E\x20\x47\x20\x3E\x20\x46\x22\x29\x2E\x31\x67\x28\x22\x47\x22\x29\x2E\x33\x35\x28\x22\x31\x67\x22\x29\x2C\x24\x28\x22\x23\x31\x64\x20\x2E\x31\x68\x22\x29\x2E\x48\x28\x22\x31\x6B\x22\x2C\x22\x32\x78\x3A\x31\x76\x21\x57\x3B\x22\x29\x7D\x29\x3B\x24\x28\x49\x28\x29\x7B\x32\x6B\x28\x27\x33\x30\x27\x29\x3B\x24\x28\x27\x2E\x33\x32\x20\x2E\x31\x41\x2D\x31\x55\x2D\x31\x4D\x2C\x20\x2E\x33\x34\x20\x2E\x31\x41\x2D\x31\x55\x2D\x31\x4D\x27\x29\x2E\x33\x33\x28\x29\x3B\x24\x28\x22\x2E\x31\x41\x2D\x33\x64\x20\x32\x22\x29\x2E\x31\x67\x28\x22\x61\x22\x29\x2E\x33\x6B\x28\x22\x32\x36\x22\x2C\x22\x30\x20\x33\x6D\x21\x57\x22\x29\x7D\x29\x3B\x24\x28\x27\x2E\x4E\x2D\x52\x2D\x31\x72\x20\x2E\x31\x6E\x20\x2E\x31\x68\x2D\x31\x33\x20\x6E\x2E\x32\x37\x27\x29\x2E\x31\x66\x28\x49\x28\x29\x7B\x36\x20\x62\x3D\x24\x28\x4C\x29\x2E\x48\x28\x22\x31\x65\x2D\x31\x73\x22\x29\x3B\x24\x2E\x32\x34\x28\x7B\x55\x3A\x22\x2F\x32\x33\x2F\x31\x5A\x2F\x50\x3F\x31\x48\x3D\x32\x30\x2D\x32\x31\x2D\x32\x32\x26\x32\x38\x2D\x32\x39\x3D\x22\x2B\x62\x2C\x32\x67\x3A\x27\x32\x68\x27\x2C\x32\x69\x3A\x22\x32\x66\x22\x2C\x32\x65\x3A\x49\x28\x65\x29\x7B\x36\x20\x75\x3D\x22\x22\x3B\x36\x20\x68\x3D\x27\x3C\x6E\x20\x42\x3D\x22\x4E\x2D\x52\x22\x20\x31\x77\x3D\x22\x4E\x2D\x33\x6E\x22\x3E\x3C\x46\x20\x42\x3D\x22\x33\x65\x2D\x33\x67\x22\x3E\x27\x3B\x54\x28\x36\x20\x69\x3D\x30\x3B\x69\x3C\x65\x2E\x43\x2E\x6D\x2E\x31\x62\x3B\x69\x2B\x2B\x29\x7B\x54\x28\x36\x20\x6A\x3D\x30\x3B\x6A\x3C\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x32\x2E\x31\x62\x3B\x6A\x2B\x2B\x29\x7B\x39\x28\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x32\x5B\x6A\x5D\x2E\x31\x78\x3D\x3D\x22\x32\x62\x22\x29\x7B\x75\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x32\x5B\x6A\x5D\x2E\x4D\x3B\x32\x63\x7D\x7D\x36\x20\x67\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x75\x2E\x24\x74\x3B\x36\x20\x73\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x59\x5B\x30\x5D\x2E\x32\x64\x3B\x36\x20\x79\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x32\x6A\x5B\x30\x5D\x2E\x31\x54\x2E\x24\x74\x3B\x36\x20\x64\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x4A\x2E\x24\x74\x2C\x74\x3D\x64\x2E\x31\x31\x28\x30\x2C\x34\x29\x2C\x77\x3D\x64\x2E\x31\x31\x28\x35\x2C\x37\x29\x2C\x66\x3D\x64\x2E\x31\x31\x28\x38\x2C\x31\x30\x29\x2C\x72\x3D\x31\x4B\x5B\x31\x58\x28\x77\x2C\x31\x30\x29\x5D\x2B\x27\x20\x27\x2B\x66\x2B\x27\x2C\x20\x27\x2B\x74\x3B\x36\x20\x63\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x33\x2E\x24\x74\x3B\x36\x20\x24\x63\x3D\x24\x28\x27\x3C\x6E\x3E\x27\x29\x2E\x31\x39\x28\x63\x29\x3B\x39\x28\x63\x2E\x31\x61\x28\x22\x2F\x2F\x31\x6D\x2E\x31\x56\x2E\x31\x69\x2F\x31\x57\x2F\x22\x29\x3E\x2D\x31\x29\x7B\x36\x20\x70\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x53\x24\x31\x52\x2E\x55\x2E\x41\x28\x27\x2F\x50\x2E\x6C\x27\x2C\x27\x2F\x53\x2E\x6C\x27\x29\x3B\x36\x20\x6B\x3D\x70\x7D\x44\x20\x39\x28\x63\x2E\x31\x61\x28\x22\x3C\x32\x22\x29\x3E\x2D\x31\x29\x7B\x36\x20\x71\x3D\x24\x63\x2E\x31\x63\x28\x27\x32\x3A\x31\x4E\x27\x29\x2E\x48\x28\x27\x31\x37\x27\x29\x2E\x41\x28\x27\x56\x2D\x63\x27\x2C\x27\x58\x27\x29\x3B\x36\x20\x6B\x3D\x71\x7D\x44\x7B\x36\x20\x6B\x3D\x31\x4F\x7D\x68\x2B\x3D\x27\x3C\x47\x3E\x3C\x6E\x20\x42\x3D\x22\x51\x2D\x31\x50\x22\x3E\x3C\x61\x20\x42\x3D\x22\x51\x2D\x31\x79\x2D\x31\x71\x22\x20\x4D\x3D\x22\x27\x2B\x75\x2B\x27\x22\x3E\x3C\x32\x20\x31\x48\x3D\x22\x27\x2B\x67\x2B\x27\x22\x20\x31\x37\x3D\x22\x27\x2B\x6B\x2B\x27\x22\x2F\x3E\x3C\x4F\x20\x42\x3D\x22\x32\x42\x2D\x32\x41\x22\x2F\x3E\x3C\x2F\x61\x3E\x3C\x6E\x20\x42\x3D\x22\x4E\x2D\x52\x2D\x31\x70\x22\x3E\x3C\x6E\x20\x42\x3D\x22\x4E\x2D\x52\x2D\x31\x70\x2D\x32\x46\x22\x3E\x3C\x6E\x20\x42\x3D\x22\x4E\x2D\x52\x2D\x31\x70\x2D\x33\x6C\x22\x3E\x3C\x31\x6F\x20\x42\x3D\x22\x51\x2D\x31\x71\x2D\x6D\x22\x3E\x3C\x61\x20\x4D\x3D\x22\x27\x2B\x75\x2B\x27\x22\x3E\x27\x2B\x67\x2B\x27\x3C\x2F\x61\x3E\x3C\x2F\x31\x6F\x3E\x3C\x4F\x20\x42\x3D\x22\x32\x71\x2D\x32\x7A\x2D\x51\x22\x3E\x27\x2B\x79\x2B\x27\x3C\x2F\x4F\x3E\x3C\x69\x20\x42\x3D\x22\x32\x35\x20\x32\x35\x2D\x32\x48\x22\x20\x32\x4D\x2D\x32\x56\x3D\x22\x32\x57\x22\x20\x31\x6B\x3D\x22\x32\x6E\x2D\x31\x7A\x3A\x20\x32\x52\x3B\x32\x36\x3A\x20\x30\x20\x32\x4F\x3B\x31\x51\x3A\x23\x32\x54\x3B\x22\x3E\x3C\x2F\x69\x3E\x3C\x4F\x20\x42\x3D\x22\x51\x2D\x32\x6C\x22\x3E\x27\x2B\x72\x2B\x27\x3C\x2F\x4F\x3E\x3C\x2F\x6E\x3E\x3C\x2F\x6E\x3E\x3C\x2F\x6E\x3E\x3C\x2F\x6E\x3E\x3C\x2F\x47\x3E\x27\x7D\x68\x2B\x3D\x27\x3C\x2F\x46\x3E\x3C\x2F\x6E\x3E\x27\x3B\x24\x28\x27\x2E\x4E\x2D\x52\x2D\x31\x72\x20\x2E\x31\x6E\x20\x2E\x31\x68\x2D\x31\x33\x20\x6E\x2E\x32\x37\x27\x29\x2E\x31\x66\x28\x49\x28\x29\x7B\x36\x20\x4B\x3D\x24\x28\x4C\x29\x2E\x48\x28\x22\x31\x65\x2D\x31\x73\x22\x29\x3B\x39\x28\x4B\x3D\x3D\x62\x29\x7B\x24\x28\x4C\x29\x2E\x31\x67\x28\x29\x2E\x31\x39\x28\x68\x29\x7D\x7D\x29\x7D\x7D\x29\x7D\x29\x3B\x24\x28\x27\x2E\x4E\x2D\x52\x2D\x31\x72\x20\x2E\x31\x6E\x20\x2E\x31\x68\x2D\x31\x33\x20\x6E\x2E\x32\x77\x27\x29\x2E\x31\x66\x28\x49\x28\x29\x7B\x36\x20\x76\x3D\x24\x28\x4C\x29\x2E\x48\x28\x22\x31\x65\x2D\x32\x75\x22\x29\x2C\x62\x3D\x24\x28\x4C\x29\x2E\x48\x28\x22\x31\x65\x2D\x31\x73\x22\x29\x3B\x24\x2E\x32\x34\x28\x7B\x55\x3A\x22\x2F\x32\x33\x2F\x31\x5A\x2F\x50\x2F\x2D\x2F\x22\x2B\x76\x2B\x22\x3F\x31\x48\x3D\x32\x30\x2D\x32\x31\x2D\x32\x32\x26\x32\x38\x2D\x32\x39\x3D\x22\x2B\x62\x2C\x32\x67\x3A\x27\x32\x68\x27\x2C\x32\x69\x3A\x22\x32\x66\x22\x2C\x32\x65\x3A\x49\x28\x65\x29\x7B\x36\x20\x75\x3D\x22\x22\x3B\x36\x20\x68\x3D\x27\x3C\x6E\x20\x42\x3D\x22\x4E\x2D\x52\x22\x3E\x3C\x46\x20\x42\x3D\x22\x32\x61\x22\x20\x31\x77\x3D\x22\x32\x61\x22\x3E\x27\x3B\x54\x28\x36\x20\x69\x3D\x30\x3B\x69\x3C\x65\x2E\x43\x2E\x6D\x2E\x31\x62\x3B\x69\x2B\x2B\x29\x7B\x54\x28\x36\x20\x6A\x3D\x30\x3B\x6A\x3C\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x32\x2E\x31\x62\x3B\x6A\x2B\x2B\x29\x7B\x39\x28\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x32\x5B\x6A\x5D\x2E\x31\x78\x3D\x3D\x22\x32\x62\x22\x29\x7B\x75\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x32\x5B\x6A\x5D\x2E\x4D\x3B\x32\x63\x7D\x7D\x36\x20\x67\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x75\x2E\x24\x74\x3B\x36\x20\x73\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x59\x5B\x30\x5D\x2E\x32\x64\x3B\x36\x20\x79\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x32\x6A\x5B\x30\x5D\x2E\x31\x54\x2E\x24\x74\x3B\x36\x20\x64\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x4A\x2E\x24\x74\x2C\x74\x3D\x64\x2E\x31\x31\x28\x30\x2C\x34\x29\x2C\x77\x3D\x64\x2E\x31\x31\x28\x35\x2C\x37\x29\x2C\x66\x3D\x64\x2E\x31\x31\x28\x38\x2C\x31\x30\x29\x2C\x72\x3D\x31\x4B\x5B\x31\x58\x28\x77\x2C\x31\x30\x29\x5D\x2B\x27\x20\x27\x2B\x66\x2B\x27\x2C\x20\x27\x2B\x74\x3B\x36\x20\x63\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x33\x2E\x24\x74\x3B\x36\x20\x24\x63\x3D\x24\x28\x27\x3C\x6E\x3E\x27\x29\x2E\x31\x39\x28\x63\x29\x3B\x39\x28\x63\x2E\x31\x61\x28\x22\x2F\x2F\x31\x6D\x2E\x31\x56\x2E\x31\x69\x2F\x31\x57\x2F\x22\x29\x3E\x2D\x31\x29\x7B\x36\x20\x70\x3D\x65\x2E\x43\x2E\x6D\x5B\x69\x5D\x2E\x31\x53\x24\x31\x52\x2E\x55\x2E\x41\x28\x27\x2F\x50\x2E\x6C\x27\x2C\x27\x2F\x53\x2E\x6C\x27\x29\x3B\x36\x20\x6B\x3D\x70\x7D\x44\x20\x39\x28\x63\x2E\x31\x61\x28\x22\x3C\x32\x22\x29\x3E\x2D\x31\x29\x7B\x36\x20\x71\x3D\x24\x63\x2E\x31\x63\x28\x27\x32\x3A\x31\x4E\x27\x29\x2E\x48\x28\x27\x31\x37\x27\x29\x2E\x41\x28\x27\x56\x2D\x63\x27\x2C\x27\x58\x27\x29\x3B\x36\x20\x6B\x3D\x71\x7D\x44\x7B\x36\x20\x6B\x3D\x31\x4F\x7D\x68\x2B\x3D\x27\x3C\x47\x3E\x3C\x6E\x20\x42\x3D\x22\x51\x2D\x31\x50\x22\x3E\x3C\x61\x20\x42\x3D\x22\x51\x2D\x31\x79\x2D\x31\x71\x22\x20\x4D\x3D\x22\x27\x2B\x75\x2B\x27\x22\x20\x31\x6B\x3D\x22\x32\x43\x3A\x55\x28\x27\x2B\x6B\x2B\x27\x29\x20\x31\x73\x2D\x33\x6A\x20\x32\x45\x20\x32\x45\x3B\x32\x43\x2D\x31\x7A\x3A\x20\x33\x37\x22\x3E\x3C\x4F\x20\x42\x3D\x22\x32\x42\x2D\x32\x41\x22\x2F\x3E\x3C\x2F\x61\x3E\x3C\x6E\x20\x42\x3D\x22\x4E\x2D\x52\x2D\x31\x70\x22\x3E\x3C\x31\x6F\x20\x42\x3D\x22\x51\x2D\x31\x71\x2D\x6D\x22\x3E\x3C\x61\x20\x4D\x3D\x22\x27\x2B\x75\x2B\x27\x22\x3E\x27\x2B\x67\x2B\x27\x3C\x2F\x61\x3E\x3C\x2F\x31\x6F\x3E\x3C\x4F\x20\x42\x3D\x22\x32\x71\x2D\x32\x7A\x2D\x51\x22\x3E\x27\x2B\x79\x2B\x27\x3C\x2F\x4F\x3E\x3C\x4F\x20\x42\x3D\x22\x51\x2D\x32\x6C\x22\x3E\x27\x2B\x72\x2B\x27\x3C\x2F\x4F\x3E\x3C\x2F\x6E\x3E\x3C\x2F\x6E\x3E\x3C\x2F\x47\x3E\x27\x7D\x68\x2B\x3D\x27\x3C\x2F\x46\x3E\x3C\x2F\x6E\x3E\x27\x3B\x24\x28\x22\x2E\x4E\x2D\x52\x2D\x31\x72\x20\x2E\x31\x6E\x20\x2E\x31\x68\x2D\x31\x33\x20\x6E\x2E\x32\x77\x22\x29\x2E\x31\x66\x28\x49\x28\x29\x7B\x36\x20\x4B\x3D\x24\x28\x4C\x29\x2E\x48\x28\x22\x31\x65\x2D\x32\x75\x22\x29\x3B\x39\x28\x4B\x3D\x3D\x76\x29\x7B\x24\x28\x4C\x29\x2E\x31\x67\x28\x29\x2E\x31\x39\x28\x68\x29\x7D\x7D\x29\x7D\x7D\x29\x7D\x29\x3B\x24\x28\x22\x2E\x31\x76\x2D\x32\x73\x20\x2E\x31\x79\x20\x32\x22\x29\x2E\x48\x28\x22\x31\x37\x22\x2C\x49\x28\x24\x4C\x2C\x32\x29\x7B\x39\x28\x32\x2E\x4A\x28\x22\x31\x36\x2E\x6C\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x31\x36\x2E\x6C\x22\x2C\x22\x2F\x53\x2E\x6C\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x50\x2E\x6C\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x50\x2E\x6C\x22\x2C\x22\x2F\x53\x2E\x6C\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x56\x2D\x63\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x56\x2D\x63\x22\x2C\x22\x2F\x58\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x59\x2D\x31\x34\x2D\x70\x2D\x5A\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x59\x2D\x31\x34\x2D\x70\x2D\x5A\x22\x2C\x22\x2F\x58\x22\x29\x7D\x44\x7B\x45\x20\x32\x2E\x41\x28\x22\x31\x6A\x3A\x2F\x2F\x33\x2E\x31\x47\x2E\x31\x46\x2E\x31\x69\x2F\x2D\x31\x74\x2F\x31\x45\x2F\x31\x43\x2F\x31\x49\x2F\x58\x2D\x72\x2F\x31\x42\x2E\x31\x44\x22\x29\x7D\x7D\x29\x3B\x24\x28\x22\x2E\x32\x4C\x20\x46\x20\x47\x20\x32\x22\x29\x2E\x48\x28\x22\x31\x37\x22\x2C\x49\x28\x24\x4C\x2C\x32\x29\x7B\x39\x28\x32\x2E\x4A\x28\x22\x31\x36\x2E\x6C\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x31\x36\x2E\x6C\x22\x2C\x22\x2F\x53\x2E\x6C\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x50\x2E\x6C\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x50\x2E\x6C\x22\x2C\x22\x2F\x53\x2E\x6C\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x56\x2D\x63\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x56\x2D\x63\x22\x2C\x22\x2F\x31\x38\x2D\x63\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x59\x2D\x31\x34\x2D\x70\x2D\x5A\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x59\x2D\x31\x34\x2D\x70\x2D\x5A\x22\x2C\x22\x2F\x31\x38\x2D\x63\x22\x29\x7D\x44\x7B\x45\x20\x32\x2E\x41\x28\x22\x31\x6A\x3A\x2F\x2F\x33\x2E\x31\x47\x2E\x31\x46\x2E\x31\x69\x2F\x2D\x31\x74\x2F\x31\x45\x2F\x31\x43\x2F\x31\x49\x2F\x58\x2D\x72\x2F\x31\x42\x2E\x31\x44\x22\x29\x7D\x7D\x29\x3B\x24\x28\x22\x2E\x32\x49\x20\x2E\x32\x47\x2D\x32\x73\x2D\x32\x58\x20\x32\x22\x29\x2E\x48\x28\x22\x31\x37\x22\x2C\x49\x28\x24\x4C\x2C\x32\x29\x7B\x39\x28\x32\x2E\x4A\x28\x22\x31\x36\x2E\x6C\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x31\x36\x2E\x6C\x22\x2C\x22\x2F\x53\x2E\x6C\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x50\x2E\x6C\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x50\x2E\x6C\x22\x2C\x22\x2F\x53\x2E\x6C\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x32\x79\x2D\x63\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x32\x79\x2D\x63\x22\x2C\x22\x2F\x31\x38\x2D\x63\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x56\x2D\x63\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x56\x2D\x63\x22\x2C\x22\x2F\x31\x38\x2D\x63\x22\x29\x7D\x44\x20\x39\x28\x32\x2E\x4A\x28\x22\x59\x2D\x31\x34\x2D\x70\x2D\x5A\x22\x29\x29\x7B\x45\x20\x32\x2E\x41\x28\x22\x2F\x59\x2D\x31\x34\x2D\x70\x2D\x5A\x22\x2C\x22\x2F\x31\x38\x2D\x63\x22\x29\x7D\x44\x7B\x45\x20\x32\x2E\x41\x28\x22\x31\x6A\x3A\x2F\x2F\x33\x2E\x31\x47\x2E\x31\x46\x2E\x31\x69\x2F\x2D\x31\x74\x2F\x31\x45\x2F\x31\x43\x2F\x31\x49\x2F\x58\x2D\x72\x2F\x31\x42\x2E\x31\x44\x22\x29\x7D\x7D\x29\x3B\x32\x6D\x2E\x32\x4B\x3D\x49\x28\x29\x7B\x36\x20\x65\x3D\x32\x44\x2E\x32\x51\x28\x22\x32\x50\x22\x29\x3B\x39\x28\x65\x3D\x3D\x32\x53\x29\x7B\x32\x6D\x2E\x32\x55\x2E\x4D\x3D\x22\x31\x6A\x3A\x2F\x2F\x31\x6D\x2E\x32\x76\x2E\x32\x74\x22\x7D\x65\x2E\x31\x6C\x28\x22\x4D\x22\x2C\x22\x31\x6A\x3A\x2F\x2F\x31\x6D\x2E\x32\x76\x2E\x32\x74\x22\x29\x3B\x65\x2E\x31\x6C\x28\x22\x31\x78\x22\x2C\x22\x32\x4A\x22\x29\x3B\x65\x2E\x31\x6C\x28\x22\x31\x75\x22\x2C\x22\x33\x66\x20\x32\x59\x22\x29\x3B\x65\x2E\x31\x6C\x28\x22\x31\x6B\x22\x2C\x22\x32\x78\x3A\x20\x33\x63\x2D\x31\x76\x21\x57\x3B\x20\x32\x6E\x2D\x31\x7A\x3A\x20\x33\x36\x21\x57\x3B\x20\x31\x51\x3A\x20\x23\x33\x38\x21\x57\x3B\x20\x33\x61\x3A\x20\x33\x62\x21\x57\x3B\x20\x32\x5A\x3A\x20\x31\x21\x57\x3B\x22\x29\x3B\x65\x2E\x33\x69\x3D\x22\x32\x4E\x20\x33\x31\x22\x7D","\x7C","\x73\x70\x6C\x69\x74","\x7C\x7C\x69\x6D\x67\x7C\x7C\x7C\x7C\x76\x61\x72\x7C\x7C\x7C\x69\x66\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x6A\x70\x67\x7C\x65\x6E\x74\x72\x79\x7C\x64\x69\x76\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x7C\x72\x65\x70\x6C\x61\x63\x65\x7C\x63\x6C\x61\x73\x73\x7C\x66\x65\x65\x64\x7C\x65\x6C\x73\x65\x7C\x72\x65\x74\x75\x72\x6E\x7C\x75\x6C\x7C\x6C\x69\x7C\x61\x74\x74\x72\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x6D\x61\x74\x63\x68\x7C\x74\x65\x78\x74\x7C\x74\x68\x69\x73\x7C\x68\x72\x65\x66\x7C\x73\x6F\x72\x61\x7C\x73\x70\x61\x6E\x7C\x64\x65\x66\x61\x75\x6C\x74\x7C\x74\x79\x7C\x73\x6C\x69\x64\x65\x7C\x6D\x71\x64\x65\x66\x61\x75\x6C\x74\x7C\x66\x6F\x72\x7C\x75\x72\x6C\x7C\x73\x37\x32\x7C\x69\x6D\x70\x6F\x72\x74\x61\x6E\x74\x7C\x73\x31\x36\x30\x30\x7C\x77\x37\x32\x7C\x6E\x75\x7C\x7C\x73\x75\x62\x73\x74\x72\x69\x6E\x67\x7C\x6C\x69\x6E\x6B\x7C\x63\x6F\x6E\x74\x65\x6E\x74\x7C\x68\x37\x32\x7C\x6C\x65\x76\x65\x6C\x7C\x68\x71\x64\x65\x66\x61\x75\x6C\x74\x7C\x73\x72\x63\x7C\x73\x31\x30\x30\x7C\x68\x74\x6D\x6C\x7C\x69\x6E\x64\x65\x78\x4F\x66\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x66\x69\x6E\x64\x7C\x6D\x65\x6E\x75\x7C\x64\x61\x74\x61\x7C\x65\x61\x63\x68\x7C\x70\x61\x72\x65\x6E\x74\x7C\x77\x69\x64\x67\x65\x74\x7C\x63\x6F\x6D\x7C\x68\x74\x74\x70\x7C\x73\x74\x79\x6C\x65\x7C\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65\x7C\x77\x77\x77\x7C\x48\x54\x4D\x4C\x7C\x68\x33\x7C\x63\x6F\x6E\x7C\x62\x6F\x6E\x6F\x73\x7C\x73\x68\x6F\x77\x7C\x6E\x6F\x7C\x59\x77\x38\x42\x49\x75\x76\x77\x6F\x53\x51\x7C\x74\x69\x74\x6C\x65\x7C\x62\x6C\x6F\x63\x6B\x7C\x69\x64\x7C\x72\x65\x6C\x7C\x74\x68\x75\x6D\x62\x7C\x73\x69\x7A\x65\x7C\x70\x6F\x73\x74\x7C\x6E\x74\x68\x7C\x41\x41\x41\x41\x41\x41\x41\x41\x43\x34\x63\x7C\x70\x6E\x67\x7C\x56\x73\x6A\x6B\x43\x49\x4D\x6F\x6C\x74\x49\x7C\x62\x6C\x6F\x67\x73\x70\x6F\x74\x7C\x62\x70\x7C\x61\x6C\x74\x7C\x73\x35\x35\x50\x57\x36\x78\x45\x4B\x6E\x30\x7C\x70\x75\x62\x6C\x69\x73\x68\x65\x64\x7C\x6D\x6F\x6E\x74\x68\x5F\x66\x6F\x72\x6D\x61\x74\x7C\x6F\x66\x66\x73\x65\x74\x7C\x69\x74\x65\x6D\x7C\x66\x69\x72\x73\x74\x7C\x6E\x6F\x5F\x69\x6D\x61\x67\x65\x7C\x77\x6F\x77\x7C\x63\x6F\x6C\x6F\x72\x7C\x74\x68\x75\x6D\x62\x6E\x61\x69\x6C\x7C\x6D\x65\x64\x69\x61\x7C\x6E\x61\x6D\x65\x7C\x67\x72\x69\x64\x7C\x79\x6F\x75\x74\x75\x62\x65\x7C\x65\x6D\x62\x65\x64\x7C\x70\x61\x72\x73\x65\x49\x6E\x74\x7C\x63\x61\x74\x65\x67\x6F\x72\x79\x7C\x70\x6F\x73\x74\x73\x7C\x6A\x73\x6F\x6E\x7C\x69\x6E\x7C\x73\x63\x72\x69\x70\x74\x7C\x66\x65\x65\x64\x73\x7C\x61\x6A\x61\x78\x7C\x66\x61\x7C\x6D\x61\x72\x67\x69\x6E\x7C\x6C\x61\x74\x65\x73\x74\x70\x6F\x73\x74\x73\x7C\x6D\x61\x78\x7C\x72\x65\x73\x75\x6C\x74\x73\x7C\x72\x73\x6C\x69\x64\x65\x73\x32\x7C\x61\x6C\x74\x65\x72\x6E\x61\x74\x65\x7C\x62\x72\x65\x61\x6B\x7C\x74\x65\x72\x6D\x7C\x73\x75\x63\x63\x65\x73\x73\x7C\x6A\x73\x6F\x6E\x70\x7C\x74\x79\x70\x65\x7C\x67\x65\x74\x7C\x64\x61\x74\x61\x54\x79\x70\x65\x7C\x61\x75\x74\x68\x6F\x72\x7C\x73\x65\x6C\x65\x63\x74\x6E\x61\x76\x7C\x74\x69\x6D\x65\x7C\x77\x69\x6E\x64\x6F\x77\x7C\x66\x6F\x6E\x74\x7C\x4C\x69\x6E\x6B\x4C\x69\x73\x74\x7C\x6E\x61\x76\x31\x7C\x79\x61\x72\x64\x7C\x5F\x7C\x69\x6D\x61\x67\x65\x7C\x74\x6F\x70\x7C\x6C\x61\x62\x65\x6C\x7C\x64\x7A\x70\x72\x6F\x66\x69\x6C\x65\x7C\x74\x61\x67\x70\x6F\x73\x74\x7C\x64\x69\x73\x70\x6C\x61\x79\x7C\x73\x33\x35\x7C\x61\x75\x74\x68\x7C\x6C\x61\x79\x7C\x74\x79\x69\x6D\x67\x7C\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x7C\x64\x6F\x63\x75\x6D\x65\x6E\x74\x7C\x63\x65\x6E\x74\x65\x72\x7C\x74\x61\x62\x7C\x61\x76\x61\x74\x61\x72\x7C\x63\x6C\x6F\x73\x65\x7C\x63\x6F\x6D\x6D\x65\x6E\x74\x73\x7C\x64\x6F\x66\x6F\x6C\x6C\x6F\x77\x7C\x6F\x6E\x6C\x6F\x61\x64\x7C\x50\x6F\x70\x75\x6C\x61\x72\x50\x6F\x73\x74\x73\x7C\x61\x72\x69\x61\x7C\x44\x5A\x7C\x35\x70\x78\x7C\x6D\x79\x63\x6F\x6E\x74\x65\x6E\x74\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64\x7C\x38\x70\x78\x7C\x6E\x75\x6C\x6C\x7C\x61\x66\x61\x66\x61\x66\x7C\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x7C\x68\x69\x64\x64\x65\x6E\x7C\x74\x72\x75\x65\x7C\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72\x7C\x54\x65\x6D\x70\x6C\x61\x74\x65\x73\x7C\x6F\x70\x61\x63\x69\x74\x79\x7C\x6E\x61\x76\x7C\x50\x72\x6F\x66\x69\x6C\x65\x7C\x69\x6E\x64\x65\x78\x7C\x6D\x61\x74\x63\x68\x48\x65\x69\x67\x68\x74\x7C\x61\x72\x63\x68\x69\x76\x65\x7C\x61\x64\x64\x43\x6C\x61\x73\x73\x7C\x69\x6E\x68\x65\x72\x69\x74\x7C\x63\x6F\x76\x65\x72\x7C\x66\x66\x66\x7C\x67\x69\x7C\x76\x69\x73\x69\x62\x69\x6C\x69\x74\x79\x7C\x76\x69\x73\x69\x62\x6C\x65\x7C\x69\x6E\x6C\x69\x6E\x65\x7C\x62\x6F\x64\x79\x7C\x6F\x77\x6C\x7C\x42\x6C\x6F\x67\x67\x65\x72\x7C\x63\x61\x72\x6F\x75\x73\x65\x6C\x7C\x72\x65\x61\x64\x79\x7C\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C\x7C\x72\x65\x70\x65\x61\x74\x7C\x63\x73\x73\x7C\x63\x65\x6C\x6C\x7C\x61\x75\x74\x6F\x7C\x63\x61\x72\x75","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x72\x65\x70\x6C\x61\x63\x65","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function(_0xb949x1,_0xb949x2,_0xb949x3,_0xb949x4,_0xb949x5,_0xb949x6){_0xb949x5= function(_0xb949x3){return (_0xb949x3< _0xb949x2?_0x67da[4]:_0xb949x5(parseInt(_0xb949x3/ _0xb949x2)))+ ((_0xb949x3= _0xb949x3% _0xb949x2)> 35?String[_0x67da[5]](_0xb949x3+ 29):_0xb949x3.toString(36))};if(!_0x67da[4][_0x67da[6]](/^/,String)){while(_0xb949x3--){_0xb949x6[_0xb949x5(_0xb949x3)]= _0xb949x4[_0xb949x3]|| _0xb949x5(_0xb949x3)};_0xb949x4= [function(_0xb949x5){return _0xb949x6[_0xb949x5]}];_0xb949x5= function(){return _0x67da[7]};_0xb949x3= 1};while(_0xb949x3--){if(_0xb949x4[_0xb949x3]){_0xb949x1= _0xb949x1[_0x67da[6]]( new RegExp(_0x67da[8]+ _0xb949x5(_0xb949x3)+ _0x67da[8],_0x67da[9]),_0xb949x4[_0xb949x3])}};return _0xb949x1}(_0x67da[0],62,210,_0x67da[3][_0x67da[2]](_0x67da[1]),0,{}));
// Pages
(function($) {
    'use strict';
    Date.now = Date.now || function() {
        return +new Date()
    };
    $.ias = function(g) {
        var h = $.extend({}, $.ias.defaults, g);
        var i = new $.ias.util();
        var j = new $.ias.paging(h.scrollContainer);
        var k = (h.history ? new $.ias.history() : false);
        var l = this;

        function init() {
            var d;
            j.onChangePage(function(a, b, c) {
                if (k) {
                    k.setPage(a, c)
                }
                h.onPageChange.call(this, a, c, b)
            });
            reset();
            if (k && k.havePage()) {
                stop_scroll();
                d = k.getPage();
                i.forceScrollTop(function() {
                    var a;
                    if (d > 1) {
                        paginateToPage(d);
                        a = get_scroll_threshold(true);
                        $('html, body').scrollTop(a)
                    } else {
                        reset()
                    }
                })
            }
            return l
        }
        init();

        function reset() {
            hide_pagination();
            h.scrollContainer.scroll(scroll_handler)
        }

        function scroll_handler() {
            var a, scrThreshold;
            a = i.getCurrentScrollOffset(h.scrollContainer);
            scrThreshold = get_scroll_threshold();
            if (a >= scrThreshold) {
                if (get_current_page() >= h.triggerPageThreshold) {
                    stop_scroll();
                    show_trigger(function() {
                        paginate(a)
                    })
                } else {
                    paginate(a)
                }
            }
        }

        function stop_scroll() {
            h.scrollContainer.unbind('scroll', scroll_handler)
        }

        function hide_pagination() {
            $(h.pagination).hide()
        }

        function get_scroll_threshold(a) {
            var b, threshold;
            b = $(h.container).find(h.item).last();
            if (b.size() === 0) {
                return 0
            }
            threshold = b.offset().top + b.height();
            if (!a) {
                threshold += h.thresholdMargin
            }
            return threshold
        }

        function paginate(d, e) {
            var f;
            f = $(h.next).attr('href');
            if (!f) {
                if (h.noneleft) {
                    $(h.container).find(h.item).last().after(h.noneleft)
                }
                return stop_scroll()
            }
            if (h.beforePageChange && $.isFunction(h.beforePageChange)) {
                if (h.beforePageChange(d, f) === false) {
                    return
                }
            }
            j.pushPages(d, f);
            stop_scroll();
            show_loader();
            loadItems(f, function(a, b) {
                var c = h.onLoadItems.call(this, b),
                    curLastItem;
                if (c !== false) {
                    $(b).hide();
                    curLastItem = $(h.container).find(h.item).last();
                    curLastItem.after(b);
                    $(b).fadeIn()
                }
                f = $(h.next, a).attr('href');
                $(h.pagination).replaceWith($(h.pagination, a));
                remove_loader();
                hide_pagination();
                if (f) {
                    reset()
                } else {
                    stop_scroll()
                }
                h.onRenderComplete.call(this, b);
                if (e) {
                    e.call(this)
                }
            })
        }

        function loadItems(b, c, d) {
            var e = [],
                container, startTime = Date.now(),
                diffTime, self;
            d = d || h.loaderDelay;
            $.get(b, null, function(a) {
                container = $(h.container, a).eq(0);
                if (0 === container.length) {
                    container = $(a).filter(h.container).eq(0)
                }
                if (container) {
                    container.find(h.item).each(function() {
                        e.push(this)
                    })
                }
                if (c) {
                    self = this;
                    diffTime = Date.now() - startTime;
                    if (diffTime < d) {
                        setTimeout(function() {
                            c.call(self, a, e)
                        }, d - diffTime)
                    } else {
                        c.call(self, a, e)
                    }
                }
            }, 'html')
        }

        function paginateToPage(a) {
            var b = get_scroll_threshold(true);
            if (b > 0) {
                paginate(b, function() {
                    stop_scroll();
                    if ((j.getCurPageNum(b) + 1) < a) {
                        paginateToPage(a);
                        $('html,body').animate({
                            'scrollTop': b
                        }, 400, 'swing')
                    } else {
                        $('html,body').animate({
                            'scrollTop': b
                        }, 1000, 'swing');
                        reset()
                    }
                })
            }
        }

        function get_current_page() {
            var a = i.getCurrentScrollOffset(h.scrollContainer);
            return j.getCurPageNum(a)
        }

        function get_loader() {
            var a = $('.ias_loader');
            if (a.size() === 0) {
              a = $('<div class="ias_loader" style="text-align:center;">' + h.loader + '</div>');
                a.hide()
            }
            return a
        }

        function show_loader() {
            var a = get_loader(),
                el;
            if (h.customLoaderProc !== false) {
                h.customLoaderProc(a)
            } else {
                el = $(h.container).find(h.item).last();
                el.after(a);
                a.fadeIn()
            }
        }

        function remove_loader() {
            var a = get_loader();
            a.remove()
        }

        function get_trigger(a) {
            var b = $('.ias_trigger');
            if (b.size() === 0) {
                b = $('<div class="ias_trigger"><a href="#">' + h.trigger + '</a></div>');
                b.hide()
            }
            $('a', b).off('click').on('click', function() {
                remove_trigger();
                a.call();
                return false
            });
            return b
        }

        function show_trigger(a) {
            var b = get_trigger(a),
                el;
            el = $(h.container).find(h.item).last();
            el.after(b);
            b.fadeIn()
        }

        function remove_trigger() {
            var a = get_trigger();
            a.remove()
        }
    };
    $.ias.defaults = {
        container: '.blog-posts',
        scrollContainer: $(window),
        item: '.post-grid',
        pagination: '#blog-pager',
        next: '#blog-pager-older-link a',
        loader: '<img src="http://2.bp.blogspot.com/-OppefDeiUDA/UVwLAL_B_mI/AAAAAAAAPO4/y8T9CPORHq4/s1600/loadersz.gif" class="loader-page"/>',
        loaderDelay: 600,
        triggerPageThreshold: 1,
        trigger: 'See More',
        thresholdMargin: -500,
        history: true,
        onPageChange: function() {},
        beforePageChange: function() {},
        onLoadItems: function() {},
        onRenderComplete: function() {},
        customLoaderProc: false
    };
    $.ias.util = function() {
        var c = false;
        var d = false;
        var e = this;

        function init() {
            $(window).load(function() {
                c = true
            })
        }
        init();
        this.forceScrollTop = function(a) {
            $('html,body').scrollTop(0);
            if (!d) {
                if (!c) {
                    setTimeout(function() {
                        e.forceScrollTop(a)
                    }, 1)
                } else {
                    a.call();
                    d = true
                }
            }
        };
        this.getCurrentScrollOffset = function(a) {
            var b, wndHeight;
            if (a.get(0) === window) {
                b = a.scrollTop()
            } else {
                b = a.offset().top
            }
            wndHeight = a.height();
            return b + wndHeight
        }
    };
    $.ias.paging = function() {
        var c = [
            [0, document.location.toString()]
        ];
        var d = function() {};
        var e = 1;
        var f = new $.ias.util();

        function init() {
            $(window).scroll(scroll_handler)
        }
        init();

        function scroll_handler() {
            var a, curPageNum, curPagebreak, scrOffset, urlPage;
            a = f.getCurrentScrollOffset($(window));
            curPageNum = getCurPageNum(a);
            curPagebreak = getCurPagebreak(a);
            if (e !== curPageNum) {
                scrOffset = curPagebreak[0];
                urlPage = curPagebreak[1];
                d.call({}, curPageNum, scrOffset, urlPage)
            }
            e = curPageNum
        }

        function getCurPageNum(a) {
            for (var i = (c.length - 1); i > 0; i--) {
                if (a > c[i][0]) {
                    return i + 1
                }
            }
            return 1
        }
        this.getCurPageNum = function(a) {
            a = a || f.getCurrentScrollOffset($(window));
            return getCurPageNum(a)
        };

        function getCurPagebreak(a) {
            for (var i = (c.length - 1); i >= 0; i--) {
                if (a > c[i][0]) {
                    return c[i]
                }
            }
            return null
        }
        this.onChangePage = function(a) {
            d = a
        };
        this.pushPages = function(a, b) {
            c.push([a, b])
        }
    };
    $.ias.history = function() {
        var e = false;
        var f = false;

        function init() {
            f = !!(window.history && history.pushState && history.replaceState);
            f = false
        }
        init();
        this.setPage = function(a, b) {
            this.updateState({
                page: a
            }, '', b)
        };
        this.havePage = function() {
            return (this.getState() !== false)
        };
        this.getPage = function() {
            var a;
            if (this.havePage()) {
                a = this.getState();
                return a.page
            }
            return 1
        };
        this.getState = function() {
            var a, stateObj, pageNum;
            if (f) {
                stateObj = history.state;
                if (stateObj && stateObj.ias) {
                    return stateObj.ias
                }
            } else {
                a = (window.location.hash.substring(0, 7) === '#/page/');
                if (a) {
                    pageNum = parseInt(window.location.hash.replace('#/page/', ''), 10);
                    return {
                        page: pageNum
                    }
                }
            }
            return false
        };
        this.updateState = function(a, b, c) {
            if (e) {
                this.replaceState(a, b, c)
            } else {
                this.pushState(a, b, c)
            }
        };
        this.pushState = function(a, b, c) {
            var d;
            if (f) {
                history.pushState({
                    ias: a
                }, b, c)
            } else {
                d = (a.page > 0 ? '#/page/' + a.page : '');
                window.location.hash = d
            }
            e = true
        };
        this.replaceState = function(a, b, c) {
            if (f) {
                history.replaceState({
                    ias: a
                }, b, c)
            } else {
                this.pushState(a, b, c)
            }
        }
    }
})(jQuery);
//]]>

