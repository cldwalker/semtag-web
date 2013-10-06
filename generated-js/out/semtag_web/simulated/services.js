goog.provide('semtag_web.simulated.services');
goog.require('cljs.core');
goog.require('semtag_web.services');
semtag_web.simulated.services.api_responses = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:tags",cljs.core.list("funny","awesome","boa","bom"),"\uFDD0:search",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:tags",cljs.core.list(cljs.core.PersistentVector.fromArray(["funny"], true)),"\uFDD0:things",cljs.core.PersistentVector.fromArray([cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","http://funnyordie.com","\uFDD0:desc","yop","\uFDD0:type","site","\uFDD0:tags",cljs.core.PersistentVector.fromArray(["funny"], true)], true)], true)], true),"\uFDD0:thing",cljs.core.list.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:id","\uFDD0:id",17592186048349,"\uFDD0:value",17592186048349], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:type","\uFDD0:id",17592186048349,"\uFDD0:value","person"], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:name","\uFDD0:id",17592186048349,"\uFDD0:value","feynman"], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:url","\uFDD0:id",17592186048349,"\uFDD0:value",null], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:tags","\uFDD0:id",17592186048349,"\uFDD0:value",cljs.core.List.EMPTY], true)),"\uFDD0:types",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:results",cljs.core.list(cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url-percent","1.00","\uFDD0:name-percent","0.00","\uFDD0:count","3","\uFDD0:name","api"], true)),"\uFDD0:counts",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:thing",3,"\uFDD0:name",2,"\uFDD0:url",2,"\uFDD0:tags",4], true)], true),"\uFDD0:tag-stats",cljs.core.list.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:desc","1 idea, 1 cjar","\uFDD0:count","2","\uFDD0:tag","cjar=lein-newnew"], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:desc","1 cjar, 1 obook, 5 plugin","\uFDD0:count","7","\uFDD0:tag","lib=jquery"], true)),"\uFDD0:all",cljs.core.list.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186048331,"\uFDD0:desc","handy, programmatic and linkable access to HTTP specs, including an emacs plugin","\uFDD0:type","repo","\uFDD0:url","https://github.com/andreineculau/know-your-http-well","\uFDD0:created-at",(new Date(1378567898781)),"\uFDD0:tags",cljs.core.list("emacs","http")], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186048328,"\uFDD0:desc","nice, visual listing of designers by city and/or price range","\uFDD0:type","site","\uFDD0:url","http://sortfolio.com/","\uFDD0:created-at",(new Date(1378567665772)),"\uFDD0:tags",cljs.core.list("designer")], true))], true);
/**
* Given a message, simulate an effect
*/
semtag_web.simulated.services.send_message = (function (){var method_table__9697__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__9698__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__9699__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__9700__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__9701__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,"\uFDD0:hierarchy",cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn("send-message",(function (message,input_queue){
return cljs.core.keyword.call(null,(new cljs.core.Keyword("\uFDD0:value")).call(null,message));
}),"\uFDD0:default",hierarchy__9701__auto__,method_table__9697__auto__,prefer_table__9698__auto__,method_cache__9699__auto__,cached_hierarchy__9700__auto__));
})();
cljs.core._add_method.call(null,semtag_web.simulated.services.send_message,"\uFDD0:default",(function (p__11567,input_queue){
var map__11568 = p__11567;
var map__11568__$1 = ((cljs.core.seq_QMARK_.call(null,map__11568))?cljs.core.apply.call(null,cljs.core.hash_map,map__11568):map__11568);
var value = cljs.core.get.call(null,map__11568__$1,"\uFDD0:value");
return semtag_web.services.put_value.call(null,cljs.core.PersistentVector.fromArray([cljs.core.keyword.call(null,[cljs.core.str(value),cljs.core.str("-results")].join(''))], true),input_queue,cljs.core.keyword.call(null,value).call(null,semtag_web.simulated.services.api_responses));
}));
cljs.core._add_method.call(null,semtag_web.simulated.services.send_message,"\uFDD0:home",(function (message,input_queue){
return semtag_web.services.put_value.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0:tags-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:tags")).call(null,semtag_web.simulated.services.api_responses));
}));
cljs.core._add_method.call(null,semtag_web.simulated.services.send_message,"\uFDD0:search",(function (message,input_queue){
semtag_web.services.put_search_title.call(null,input_queue,message);
return semtag_web.services.put_value.call(null,cljs.core.PersistentVector.fromArray([semtag_web.services.search_id.call(null,message),"\uFDD0:search-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:search")).call(null,semtag_web.simulated.services.api_responses));
}));
cljs.core._add_method.call(null,semtag_web.simulated.services.send_message,"\uFDD0:thing",(function (message,input_queue){
return semtag_web.services.put_value.call(null,cljs.core.PersistentVector.fromArray([semtag_web.services.thing_id.call(null,message),"\uFDD0:thing-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:thing")).call(null,semtag_web.simulated.services.api_responses));
}));
semtag_web.simulated.services.services_fn = (function services_fn(message,input_queue){
return semtag_web.services.services_fn.call(null,message,input_queue,semtag_web.simulated.services.send_message);
});
