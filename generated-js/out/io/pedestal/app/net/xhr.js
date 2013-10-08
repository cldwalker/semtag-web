goog.provide('io.pedestal.app.net.xhr');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('goog.structs.Map');
goog.require('goog.net.XhrManager');
io.pedestal.app.net.xhr._STAR_xhr_manager_STAR_ = (new goog.net.XhrManager(null,null,null,6,(60 * 1000)));
io.pedestal.app.net.xhr.success_QMARK_ = (function success_QMARK_(p__12563){
var map__12565 = p__12563;
var map__12565__$1 = ((cljs.core.seq_QMARK_(map__12565))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12565):map__12565);
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12565__$1,"\uFDD0:status");
var or__3943__auto__ = (function (){var and__3941__auto__ = (status >= 200);
if(and__3941__auto__)
{return (status < 300);
} else
{return and__3941__auto__;
}
})();
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(status,304);
}
});
io.pedestal.app.net.xhr.redirect_QMARK_ = (function redirect_QMARK_(p__12566){
var map__12568 = p__12566;
var map__12568__$1 = ((cljs.core.seq_QMARK_(map__12568))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12568):map__12568);
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12568__$1,"\uFDD0:status");
return cljs.core.boolean$(cljs.core.PersistentHashSet.fromArray([301,null,302,null,303,null,307,null], true).call(null,status));
});
io.pedestal.app.net.xhr.error_QMARK_ = (function error_QMARK_(p__12569){
var map__12571 = p__12569;
var map__12571__$1 = ((cljs.core.seq_QMARK_(map__12571))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12571):map__12571);
var status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12571__$1,"\uFDD0:status");
return (status >= 400);
});
io.pedestal.app.net.xhr.headers__GT_map = (function headers__GT_map(xhr){
var headers = clojure.string.split_lines(clojure.string.trim(clojure.string.lower_case(xhr.getAllResponseHeaders())));
try{return cljs.core.into(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__12572_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__12572_SHARP_,/\s*:\s+/);
}),headers));
}catch (e12574){if((e12574 instanceof Error))
{var e = e12574;
return cljs.core.PersistentArrayMap.EMPTY;
} else
{if("\uFDD0:else")
{throw e12574;
} else
{return null;
}
}
}});
io.pedestal.app.net.xhr.handle_response = (function handle_response(on_success,on_error,id,e){
var xhr = e.currentTarget;
var response = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",id,"\uFDD0:body",xhr.getResponseText(),"\uFDD0:status",xhr.getStatus(),"\uFDD0:headers",io.pedestal.app.net.xhr.headers__GT_map(xhr),"\uFDD0:xhr",xhr], true);
var handler = (cljs.core.truth_(io.pedestal.app.net.xhr.success_QMARK_(response))?on_success:on_error);
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(response) : handler.call(null,response));
});
/**
* Asynchronously make a network request for the resource at uri. If
* provided via the `:on-success` and `:on-error` keyword arguments,
* the appropriate one of `on-success` or `on-error` will be called on
* completion. They will be passed a map containing the keys `:id`,
* `:body`, `:status`, and `:event`. The entry for `:event` contains an
* instance of the `goog.net.XhrManager.Event`.
* 
* Other allowable keyword arguments are `:request-method`, `:body`,
* `:headers`, `:priority`, and `:retries`. `:request-method` defaults
* to "GET" and `:retries` defaults to `0`.
* 
* `priority` defaults to 100. The lower the number the higher the
* priority.
* @param {...*} var_args
*/
io.pedestal.app.net.xhr.request = (function() { 
var request__delegate = function (id,uri,p__12575){
var map__12578 = p__12575;
var map__12578__$1 = ((cljs.core.seq_QMARK_(map__12578))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12578):map__12578);
var on_error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12578__$1,"\uFDD0:on-error");
var on_success = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12578__$1,"\uFDD0:on-success");
var retries = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12578__$1,"\uFDD0:retries",0);
var priority = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12578__$1,"\uFDD0:priority");
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12578__$1,"\uFDD0:headers");
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12578__$1,"\uFDD0:body");
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__12578__$1,"\uFDD0:request-method","GET");
if(cljs.core.truth_(on_success))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("on-success keyword argument is required"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Symbol(null,"on-success","on-success",314661838,null)], 0)))].join('')));
}
if(cljs.core.truth_(on_error))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("on-error keyword argument is required"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.Symbol(null,"on-error","on-error",-1235858861,null)], 0)))].join('')));
}
try{return io.pedestal.app.net.xhr._STAR_xhr_manager_STAR_.send(id,uri,request_method,body,(cljs.core.truth_(headers)?cljs.core.clj__GT_js(headers):null),priority,cljs.core.partial.cljs$core$IFn$_invoke$arity$4(io.pedestal.app.net.xhr.handle_response,on_success,on_error,id),retries);
}catch (e12579){if((e12579 instanceof Error))
{var e = e12579;
console.log(e);
return null;
} else
{if("\uFDD0:else")
{throw e12579;
} else
{return null;
}
}
}};
var request = function (id,uri,var_args){
var p__12575 = null;
if (arguments.length > 2) {
  p__12575 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return request__delegate.call(this, id, uri, p__12575);
};
request.cljs$lang$maxFixedArity = 2;
request.cljs$lang$applyTo = (function (arglist__12580){
var id = cljs.core.first(arglist__12580);
arglist__12580 = cljs.core.next(arglist__12580);
var uri = cljs.core.first(arglist__12580);
var p__12575 = cljs.core.rest(arglist__12580);
return request__delegate(id, uri, p__12575);
});
request.cljs$core$IFn$_invoke$arity$variadic = request__delegate;
return request;
})()
;
io.pedestal.app.net.xhr.url = (function url(path){
return [cljs.core.str(document.location.origin),cljs.core.str(path)].join('');
});