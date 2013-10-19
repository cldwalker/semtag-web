goog.provide('semtag_web.simulated.services');
goog.require('cljs.core');
goog.require('semtag_web.services');
semtag_web.simulated.services.api_responses = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:tags",cljs.core.list("funny","awesome","boa","bom"),"\uFDD0:search",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:tags",cljs.core.list(cljs.core.PersistentVector.fromArray(["funny"], true)),"\uFDD0:things",cljs.core.PersistentVector.fromArray([cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","http://funnyordie.com","\uFDD0:desc","yop","\uFDD0:type","site","\uFDD0:tags",cljs.core.PersistentVector.fromArray(["funny"], true)], true)], true)], true),"\uFDD0:thing",cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:id","\uFDD0:id",17592186048349,"\uFDD0:value",17592186048349], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:type","\uFDD0:id",17592186048349,"\uFDD0:value","person"], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:name","\uFDD0:id",17592186048349,"\uFDD0:value","feynman"], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:url","\uFDD0:id",17592186048349,"\uFDD0:value",null], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:attribute","\uFDD0:tags","\uFDD0:id",17592186048349,"\uFDD0:value",cljs.core.List.EMPTY], true)], 0)),"\uFDD0:type",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:things",cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186047997,"\uFDD0:type","api","\uFDD0:url","https://developers.google.com/freebase/v1/getting-started","\uFDD0:tags",cljs.core.list("freebase")], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186047567,"\uFDD0:desc","used by faviki to return dbpedia tags for given link/text","\uFDD0:type","api","\uFDD0:url","http://www.zemanta.com/api/","\uFDD0:tags",cljs.core.list("faviki","semantic_web")], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186047994,"\uFDD0:type","api","\uFDD0:url","http://www.omdbapi.com/","\uFDD0:tags",cljs.core.list("json","movie")], true)], 0)),"\uFDD0:tags",cljs.core.list(cljs.core.PersistentVector.fromArray(["site","freebase"], true),cljs.core.PersistentVector.fromArray(["wapp","faviki"], true),cljs.core.PersistentVector.fromArray(["cs","semantic_web"], true),cljs.core.PersistentVector.fromArray(["std","json"], true),cljs.core.PersistentVector.fromArray(["tag","movie"], true))], true),"\uFDD0:types",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:results",cljs.core.list(cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url-percent","1.00","\uFDD0:name-percent","0.00","\uFDD0:count","3","\uFDD0:name","api"], true)),"\uFDD0:counts",cljs.core.PersistentArrayMap.fromArray(["\uFDD0:thing",3,"\uFDD0:name",2,"\uFDD0:url",2,"\uFDD0:tags",4], true)], true),"\uFDD0:tag-stats",cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray(["\uFDD0:desc","1 idea, 1 cjar","\uFDD0:count","2","\uFDD0:tag","cjar=lein-newnew"], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:desc","1 cjar, 1 obook, 5 plugin","\uFDD0:count","7","\uFDD0:tag","lib=jquery"], true)], 0)),"\uFDD0:all",cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186048331,"\uFDD0:desc","handy, programmatic and linkable access to HTTP specs, including an emacs plugin","\uFDD0:type","repo","\uFDD0:url","https://github.com/andreineculau/know-your-http-well","\uFDD0:created-at",(new Date(1378567898781)),"\uFDD0:tags",cljs.core.list("emacs","http")], true),cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",17592186048328,"\uFDD0:desc","nice, visual listing of designers by city and/or price range","\uFDD0:type","site","\uFDD0:url","http://sortfolio.com/","\uFDD0:created-at",(new Date(1378567665772)),"\uFDD0:tags",cljs.core.list("designer")], true)], 0))], true);
/**
* Given a message, simulate an effect
*/
semtag_web.simulated.services.send_message = (function (){var method_table__9703__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__9704__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__9705__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__9706__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__9707__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,"\uFDD0:hierarchy",cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn("send-message",(function (message,input_queue){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1((new cljs.core.Keyword("\uFDD0:value")).call(null,message));
}),"\uFDD0:default",hierarchy__9707__auto__,method_table__9703__auto__,prefer_table__9704__auto__,method_cache__9705__auto__,cached_hierarchy__9706__auto__));
})();
semtag_web.simulated.services.send_message.cljs$core$IMultiFn$_add_method$arity$3(semtag_web.simulated.services.send_message,"\uFDD0:default",(function (p__11605,input_queue){
var map__11606 = p__11605;
var map__11606__$1 = ((cljs.core.seq_QMARK_(map__11606))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__11606):map__11606);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11606__$1,"\uFDD0:value");
return semtag_web.services.put_value(cljs.core.PersistentVector.fromArray([cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.str(value),cljs.core.str("-results")].join(''))], true),input_queue,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(value).call(null,semtag_web.simulated.services.api_responses));
}));
semtag_web.simulated.services.send_message.cljs$core$IMultiFn$_add_method$arity$3(semtag_web.simulated.services.send_message,"\uFDD0:home",(function (message,input_queue){
return semtag_web.services.put_value(cljs.core.PersistentVector.fromArray(["\uFDD0:tags-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:tags")).call(null,semtag_web.simulated.services.api_responses));
}));
semtag_web.simulated.services.send_message.cljs$core$IMultiFn$_add_method$arity$3(semtag_web.simulated.services.send_message,"\uFDD0:search",(function (p__11607,input_queue){
var map__11608 = p__11607;
var map__11608__$1 = ((cljs.core.seq_QMARK_(map__11608))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__11608):map__11608);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11608__$1,"\uFDD0:params");
semtag_web.services.put_search_title(input_queue,params);
return semtag_web.services.put_value(cljs.core.PersistentVector.fromArray([semtag_web.services.search_id(params),"\uFDD0:search-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:search")).call(null,semtag_web.simulated.services.api_responses));
}));
semtag_web.simulated.services.send_message.cljs$core$IMultiFn$_add_method$arity$3(semtag_web.simulated.services.send_message,"\uFDD0:thing",(function (message,input_queue){
return semtag_web.services.put_value(cljs.core.PersistentVector.fromArray([semtag_web.services.thing_id(message),"\uFDD0:thing-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:thing")).call(null,semtag_web.simulated.services.api_responses));
}));
semtag_web.simulated.services.send_message.cljs$core$IMultiFn$_add_method$arity$3(semtag_web.simulated.services.send_message,"\uFDD0:type",(function (message,input_queue){
return semtag_web.services.put_value(cljs.core.PersistentVector.fromArray([semtag_web.services.type_id(message),"\uFDD0:type-results"], true),input_queue,(new cljs.core.Keyword("\uFDD0:type")).call(null,semtag_web.simulated.services.api_responses));
}));
semtag_web.simulated.services.services_fn = (function services_fn(message,input_queue){
return semtag_web.services.services_fn.cljs$core$IFn$_invoke$arity$3(message,input_queue,semtag_web.simulated.services.send_message);
});
