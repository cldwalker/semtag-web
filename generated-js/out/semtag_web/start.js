goog.provide('semtag_web.start');
goog.require('cljs.core');
goog.require('io.pedestal.app');
goog.require('semtag_web.route');
goog.require('io.pedestal.app.protocols');
goog.require('io.pedestal.app.render');
goog.require('io.pedestal.app.render.push');
goog.require('semtag_web.history');
goog.require('clojure.string');
goog.require('semtag_web.services');
goog.require('semtag_web.rendering');
goog.require('io.pedestal.app.messages');
goog.require('goog.Uri');
goog.require('semtag_web.behavior');
semtag_web.start.put_message_on_page_load = (function put_message_on_page_load(app,screen,params){
if(cljs.core.truth_(cljs.core.re_find(/^search/,cljs.core.name(screen))))
{(io.pedestal.app.protocols.put_message.cljs$core$IFn$_invoke$arity$2 ? io.pedestal.app.protocols.put_message.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\uFDD0:input")).call(null,app),cljs.core.PersistentArrayMap.fromArray([io.pedestal.app.messages.type,"\uFDD0:map-value",io.pedestal.app.messages.topic,cljs.core.PersistentVector.fromArray(["\uFDD0:page"], true),"\uFDD0:value","\uFDD0:search-form"], true)) : io.pedestal.app.protocols.put_message.call(null,(new cljs.core.Keyword("\uFDD0:input")).call(null,app),cljs.core.PersistentArrayMap.fromArray([io.pedestal.app.messages.type,"\uFDD0:map-value",io.pedestal.app.messages.topic,cljs.core.PersistentVector.fromArray(["\uFDD0:page"], true),"\uFDD0:value","\uFDD0:search-form"], true)));
return (io.pedestal.app.protocols.put_message.cljs$core$IFn$_invoke$arity$2 ? io.pedestal.app.protocols.put_message.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\uFDD0:input")).call(null,app),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray([io.pedestal.app.messages.type,"\uFDD0:map-value",io.pedestal.app.messages.topic,cljs.core.PersistentVector.fromArray(["\uFDD0:search"], true)], true),params], 0))) : io.pedestal.app.protocols.put_message.call(null,(new cljs.core.Keyword("\uFDD0:input")).call(null,app),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray([io.pedestal.app.messages.type,"\uFDD0:map-value",io.pedestal.app.messages.topic,cljs.core.PersistentVector.fromArray(["\uFDD0:search"], true)], true),params], 0))));
} else
{return (io.pedestal.app.protocols.put_message.cljs$core$IFn$_invoke$arity$2 ? io.pedestal.app.protocols.put_message.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\uFDD0:input")).call(null,app),cljs.core.PersistentArrayMap.fromArray([io.pedestal.app.messages.type,"\uFDD0:map-value",io.pedestal.app.messages.topic,cljs.core.PersistentVector.fromArray(["\uFDD0:page"], true),"\uFDD0:value",cljs.core.name(screen),"\uFDD0:params",params], true)) : io.pedestal.app.protocols.put_message.call(null,(new cljs.core.Keyword("\uFDD0:input")).call(null,app),cljs.core.PersistentArrayMap.fromArray([io.pedestal.app.messages.type,"\uFDD0:map-value",io.pedestal.app.messages.topic,cljs.core.PersistentVector.fromArray(["\uFDD0:page"], true),"\uFDD0:value",cljs.core.name(screen),"\uFDD0:params",params], true)));
}
});
semtag_web.start.parse_params = (function parse_params(url){
var temp__4092__auto__ = cljs.core.re_find(/(?!.*\?).*/,url);
if(cljs.core.truth_(temp__4092__auto__))
{var params_string = temp__4092__auto__;
var vals = cljs.core.vec(cljs.core.flatten((function (){var pairs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(params_string,/\&/);
var pairs__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (pairs){
return (function (p1__10901_SHARP_){
var vec__10903 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__10901_SHARP_,/=/);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10903,0,null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10903,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k),v], true);
});})(pairs))
,pairs);
return pairs__$1;
})()));
var vals__$1 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,vals);
return vals__$1;
} else
{return null;
}
});
/**
* Updates behavior with possible dynamic focus
*/
semtag_web.start.update_behavior = (function update_behavior(behavior,screen){
var G__10905 = behavior;
var G__10905__$1 = ((true)?cljs.core.assoc_in(G__10905,cljs.core.PersistentVector.fromArray(["\uFDD0:focus","\uFDD0:default"], true),screen):G__10905);
var G__10905__$2 = (cljs.core.truth_(cljs.core.re_find(/^search/,cljs.core.name(screen)))?cljs.core.assoc_in(G__10905__$1,cljs.core.PersistentVector.fromArray(["\uFDD0:focus",screen], true),cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray(["\uFDD0:app-model","\uFDD0:search",screen], true),cljs.core.PersistentVector.fromArray(["\uFDD0:app-model","\uFDD0:search-form"], true),cljs.core.PersistentVector.fromArray(["\uFDD0:app-model","\uFDD0:navbar"], true)], true)):G__10905__$1);
var G__10905__$3 = (cljs.core.truth_(cljs.core.re_find(/^thing/,cljs.core.name(screen)))?cljs.core.assoc_in(G__10905__$2,cljs.core.PersistentVector.fromArray(["\uFDD0:focus",screen], true),cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray(["\uFDD0:app-model","\uFDD0:thing",screen], true),cljs.core.PersistentVector.fromArray(["\uFDD0:app-model","\uFDD0:navbar"], true)], true)):G__10905__$2);
return G__10905__$3;
});
semtag_web.start.create_app = (function create_app(render_config){
var params = semtag_web.start.parse_params(window.location.hash);
var screen = (function (){var or__3943__auto__ = semtag_web.route.url__GT_screen.cljs$core$IFn$_invoke$arity$2(window.location.hash,params);
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(semtag_web.behavior.app,cljs.core.PersistentVector.fromArray(["\uFDD0:focus","\uFDD0:default"], true));
}
})();
var app = (io.pedestal.app.build.cljs$core$IFn$_invoke$arity$1 ? io.pedestal.app.build.cljs$core$IFn$_invoke$arity$1(semtag_web.start.update_behavior(semtag_web.behavior.app,screen)) : io.pedestal.app.build.call(null,semtag_web.start.update_behavior(semtag_web.behavior.app,screen)));
var render_fn = (io.pedestal.app.render.push.renderer.cljs$core$IFn$_invoke$arity$3 ? io.pedestal.app.render.push.renderer.cljs$core$IFn$_invoke$arity$3("content",render_config,io.pedestal.app.render.log_fn) : io.pedestal.app.render.push.renderer.call(null,"content",render_config,io.pedestal.app.render.log_fn));
var app_model = (io.pedestal.app.render.consume_app_model.cljs$core$IFn$_invoke$arity$2 ? io.pedestal.app.render.consume_app_model.cljs$core$IFn$_invoke$arity$2(app,render_fn) : io.pedestal.app.render.consume_app_model.call(null,app,render_fn));
(io.pedestal.app.begin.cljs$core$IFn$_invoke$arity$1 ? io.pedestal.app.begin.cljs$core$IFn$_invoke$arity$1(app) : io.pedestal.app.begin.call(null,app));
semtag_web.start.put_message_on_page_load(app,screen,params);
return cljs.core.PersistentArrayMap.fromArray(["\uFDD0:app",app,"\uFDD0:app-model",app_model], true);
});
semtag_web.start.setup_effects = (function setup_effects(app,services_fn){
return (io.pedestal.app.consume_effects.cljs$core$IFn$_invoke$arity$2 ? io.pedestal.app.consume_effects.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\uFDD0:app")).call(null,app),services_fn) : io.pedestal.app.consume_effects.call(null,(new cljs.core.Keyword("\uFDD0:app")).call(null,app),services_fn));
});
semtag_web.start.param = (function param(name){
var uri = (new goog.Uri(document.location.toString()));
return uri.getParameterValue(name);
});
semtag_web.start.main = (function main(){
var G__10907 = semtag_web.start.create_app(semtag_web.rendering.render_config());
semtag_web.start.setup_effects(G__10907,semtag_web.services.services_fn);
return G__10907;
});
goog.exportSymbol('semtag_web.start.main', semtag_web.start.main);