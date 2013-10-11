goog.provide('io.pedestal.app.render.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.object');
goog.require('domina.events');
goog.require('domina');
goog.require('io.pedestal.app.messages');
goog.require('io.pedestal.app.protocols');
io.pedestal.app.render.events.DomContentCoercible = {};
io.pedestal.app.render.events._coerce_to_dom_content = (function _coerce_to_dom_content(this$){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$events$DomContentCoercible$_coerce_to_dom_content$arity$1;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$events$DomContentCoercible$_coerce_to_dom_content$arity$1(this$);
} else
{var x__9515__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.events._coerce_to_dom_content[goog.typeOf(x__9515__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.events._coerce_to_dom_content["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomContentCoercible.-coerce-to-dom-content",this$);
}
}
})().call(null,this$);
}
});
(io.pedestal.app.render.events.DomContentCoercible["_"] = true);
(io.pedestal.app.render.events._coerce_to_dom_content["_"] = (function (this$){
if((function (){var G__12916 = this$;
if(G__12916)
{if(cljs.core.truth_((function (){var or__3943__auto__ = null;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return G__12916.domina$DomContent$;
}
})()))
{return true;
} else
{if((!G__12916.cljs$lang$protocol_mask$partition$))
{return cljs.core.type_satisfies_(domina.DomContent,G__12916);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_(domina.DomContent,G__12916);
}
})())
{return this$;
} else
{return null;
}
}));
(io.pedestal.app.render.events.DomContentCoercible["string"] = true);
(io.pedestal.app.render.events._coerce_to_dom_content["string"] = (function (this$){
return domina.by_id(this$);
}));
io.pedestal.app.render.events.value = (function value(dc){
return io.pedestal.app.render.events._coerce_to_dom_content(dc).value;
});
io.pedestal.app.render.events.set_value_BANG_ = (function set_value_BANG_(dc,x){
return io.pedestal.app.render.events._coerce_to_dom_content(dc).value = x;
});
io.pedestal.app.render.events.produce_messages = (function produce_messages(messages,e){
if(cljs.core.fn_QMARK_(messages))
{return (messages.cljs$core$IFn$_invoke$arity$1 ? messages.cljs$core$IFn$_invoke$arity$1(e) : messages.call(null,e));
} else
{return messages;
}
});
io.pedestal.app.render.events.send_transforms = (function() {
var send_transforms = null;
var send_transforms__2 = (function (input_queue,messages){
var seq__12921 = cljs.core.seq(messages);
var chunk__12922 = null;
var count__12923 = 0;
var i__12924 = 0;
while(true){
if((i__12924 < count__12923))
{var message = chunk__12922.cljs$core$IIndexed$_nth$arity$2(chunk__12922,i__12924);
io.pedestal.app.protocols.put_message(input_queue,message);
{
var G__12925 = seq__12921;
var G__12926 = chunk__12922;
var G__12927 = count__12923;
var G__12928 = (i__12924 + 1);
seq__12921 = G__12925;
chunk__12922 = G__12926;
count__12923 = G__12927;
i__12924 = G__12928;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq(seq__12921);
if(temp__4092__auto__)
{var seq__12921__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__12921__$1))
{var c__9646__auto__ = cljs.core.chunk_first(seq__12921__$1);
{
var G__12929 = cljs.core.chunk_rest(seq__12921__$1);
var G__12930 = c__9646__auto__;
var G__12931 = cljs.core.count(c__9646__auto__);
var G__12932 = 0;
seq__12921 = G__12929;
chunk__12922 = G__12930;
count__12923 = G__12931;
i__12924 = G__12932;
continue;
}
} else
{var message = cljs.core.first(seq__12921__$1);
io.pedestal.app.protocols.put_message(input_queue,message);
{
var G__12933 = cljs.core.next(seq__12921__$1);
var G__12934 = null;
var G__12935 = 0;
var G__12936 = 0;
seq__12921 = G__12933;
chunk__12922 = G__12934;
count__12923 = G__12935;
i__12924 = G__12936;
continue;
}
}
} else
{return null;
}
}
break;
}
});
var send_transforms__3 = (function (input_queue,transform_name,messages){
return send_transforms.cljs$core$IFn$_invoke$arity$2(input_queue,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(io.pedestal.app.messages.add_message_type,transform_name),messages));
});
var send_transforms__4 = (function (input_queue,transform_name,messages,input_map){
return send_transforms.cljs$core$IFn$_invoke$arity$2(input_queue,io.pedestal.app.messages.fill.cljs$core$IFn$_invoke$arity$3(transform_name,messages,input_map));
});
send_transforms = function(input_queue,transform_name,messages,input_map){
switch(arguments.length){
case 2:
return send_transforms__2.call(this,input_queue,transform_name);
case 3:
return send_transforms__3.call(this,input_queue,transform_name,messages);
case 4:
return send_transforms__4.call(this,input_queue,transform_name,messages,input_map);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
send_transforms.cljs$core$IFn$_invoke$arity$2 = send_transforms__2;
send_transforms.cljs$core$IFn$_invoke$arity$3 = send_transforms__3;
send_transforms.cljs$core$IFn$_invoke$arity$4 = send_transforms__4;
return send_transforms;
})()
;
io.pedestal.app.render.events.send_on = (function() {
var send_on = null;
var send_on__4 = (function (event_type,dc,input_queue,messages){
return domina.events.listen_BANG_.cljs$core$IFn$_invoke$arity$3(io.pedestal.app.render.events._coerce_to_dom_content(dc),event_type,(function (e){
domina.events.prevent_default(e);
return io.pedestal.app.render.events.send_transforms.cljs$core$IFn$_invoke$arity$2(input_queue,io.pedestal.app.render.events.produce_messages(messages,e));
}));
});
var send_on__5 = (function (event_type,dc,input_queue,transform_name,messages){
return send_on.cljs$core$IFn$_invoke$arity$4(event_type,dc,input_queue,(function (e){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(io.pedestal.app.messages.add_message_type,transform_name),io.pedestal.app.render.events.produce_messages(messages,e));
}));
});
send_on = function(event_type,dc,input_queue,transform_name,messages){
switch(arguments.length){
case 4:
return send_on__4.call(this,event_type,dc,input_queue,transform_name);
case 5:
return send_on__5.call(this,event_type,dc,input_queue,transform_name,messages);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
send_on.cljs$core$IFn$_invoke$arity$4 = send_on__4;
send_on.cljs$core$IFn$_invoke$arity$5 = send_on__5;
return send_on;
})()
;
/**
* @param {...*} var_args
*/
io.pedestal.app.render.events.send_on_click = (function() { 
var send_on_click__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(io.pedestal.app.render.events.send_on,"\uFDD0:click",args);
};
var send_on_click = function (var_args){
var args = null;
if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return send_on_click__delegate.call(this, args);
};
send_on_click.cljs$lang$maxFixedArity = 0;
send_on_click.cljs$lang$applyTo = (function (arglist__12937){
var args = cljs.core.seq(arglist__12937);
return send_on_click__delegate(args);
});
send_on_click.cljs$core$IFn$_invoke$arity$variadic = send_on_click__delegate;
return send_on_click;
})()
;
/**
* @param {...*} var_args
*/
io.pedestal.app.render.events.send_on_keyup = (function() { 
var send_on_keyup__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(io.pedestal.app.render.events.send_on,"\uFDD0:keyup",args);
};
var send_on_keyup = function (var_args){
var args = null;
if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return send_on_keyup__delegate.call(this, args);
};
send_on_keyup.cljs$lang$maxFixedArity = 0;
send_on_keyup.cljs$lang$applyTo = (function (arglist__12938){
var args = cljs.core.seq(arglist__12938);
return send_on_keyup__delegate(args);
});
send_on_keyup.cljs$core$IFn$_invoke$arity$variadic = send_on_keyup__delegate;
return send_on_keyup;
})()
;
io.pedestal.app.render.events.collect_inputs = (function collect_inputs(input_map){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (a,p__12941){
var vec__12942 = p__12941;
var dc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12942,0,null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12942,1,null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a,k,io.pedestal.app.render.events.value(dc));
}),cljs.core.PersistentArrayMap.EMPTY,input_map);
});
io.pedestal.app.render.events.collect_and_send = (function collect_and_send(event_type,dc,input_queue,transform_name,messages,input_map){
return io.pedestal.app.render.events.send_on.cljs$core$IFn$_invoke$arity$4(event_type,dc,input_queue,(function (_){
return io.pedestal.app.messages.fill.cljs$core$IFn$_invoke$arity$3(transform_name,messages,io.pedestal.app.render.events.collect_inputs(input_map));
}));
});
io.pedestal.app.render.events.remove_event = (function remove_event(event_type,dc){
return domina.events.unlisten_BANG_.cljs$core$IFn$_invoke$arity$2(io.pedestal.app.render.events._coerce_to_dom_content(dc),event_type);
});
io.pedestal.app.render.events.remove_click_event = (function remove_click_event(dc){
return io.pedestal.app.render.events.remove_event("\uFDD0:click",dc);
});
