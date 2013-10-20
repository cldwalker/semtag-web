goog.provide('io.pedestal.app.render.push');
goog.require('cljs.core');
goog.require('io.pedestal.app.queue');
goog.require('io.pedestal.app.util.log');
goog.require('io.pedestal.app.util.platform');
goog.require('io.pedestal.app.protocols');
io.pedestal.app.render.push.search_ops = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:node-create",cljs.core.PersistentHashSet.fromArray(["\uFDD0:*",null,"\uFDD0:node-*",null], true),"\uFDD0:node-destroy",cljs.core.PersistentHashSet.fromArray(["\uFDD0:*",null,"\uFDD0:node-*",null], true),"\uFDD0:value",cljs.core.PersistentHashSet.fromArray(["\uFDD0:*",null,"\uFDD0:value",null], true),"\uFDD0:attr",cljs.core.PersistentHashSet.fromArray(["\uFDD0:*",null,"\uFDD0:attr",null], true),"\uFDD0:transform-enable",cljs.core.PersistentHashSet.fromArray(["\uFDD0:*",null,"\uFDD0:transform-*",null], true),"\uFDD0:transform-disable",cljs.core.PersistentHashSet.fromArray(["\uFDD0:*",null,"\uFDD0:transform-*",null], true)], true);
io.pedestal.app.render.push.real_path = (function real_path(op,path){
return cljs.core.cons(op,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("\uFDD0:children"),path)),"\uFDD0:handler"));
});
io.pedestal.app.render.push.add_handler = (function add_handler(handlers,op,path,f){
return cljs.core.assoc_in(handlers,io.pedestal.app.render.push.real_path(op,path),f);
});
io.pedestal.app.render.push.add_handlers = (function() {
var add_handlers = null;
var add_handlers__1 = (function (hs){
return add_handlers.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,hs);
});
var add_handlers__2 = (function (m,hs){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__15089){
var vec__15090 = p__15089;
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15090,0,null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15090,1,null);
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15090,2,null);
return io.pedestal.app.render.push.add_handler(acc,op,path,f);
}),m,hs);
});
add_handlers = function(m,hs){
switch(arguments.length){
case 1:
return add_handlers__1.call(this,m);
case 2:
return add_handlers__2.call(this,m,hs);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
add_handlers.cljs$core$IFn$_invoke$arity$1 = add_handlers__1;
add_handlers.cljs$core$IFn$_invoke$arity$2 = add_handlers__2;
return add_handlers;
})()
;
io.pedestal.app.render.push.matching_keys = (function matching_keys(ks,p){
return cljs.core.filter((function (k){
var or__3943__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,p);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,"\uFDD0:*");
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{var or__3943__auto____$2 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,"\uFDD0:**");
if(or__3943__auto____$2)
{return or__3943__auto____$2;
} else
{if(cljs.core.contains_QMARK_(io.pedestal.app.render.push.search_ops,p))
{return cljs.core.contains_QMARK_((p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(io.pedestal.app.render.push.search_ops) : p.call(null,io.pedestal.app.render.push.search_ops)),k);
} else
{return null;
}
}
}
}
}),ks);
});
io.pedestal.app.render.push.sort_keys = (function sort_keys(ks){
var sorted_keys = cljs.core.remove((function (p1__15091_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__15091_SHARP_,"\uFDD0:**");
}),cljs.core.sort.cljs$core$IFn$_invoke$arity$1(ks));
return cljs.core.reverse((((cljs.core.count(ks) > cljs.core.count(sorted_keys)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sorted_keys,"\uFDD0:**"):sorted_keys));
});
io.pedestal.app.render.push.select_matches = (function select_matches(handlers,p){
var keys = io.pedestal.app.render.push.matching_keys(cljs.core.keys(handlers),p);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (k){
return cljs.core.PersistentVector.fromArray([k,cljs.core.get.cljs$core$IFn$_invoke$arity$2(handlers,k)], true);
}),io.pedestal.app.render.push.sort_keys(keys));
});
io.pedestal.app.render.push.find_handler_STAR_ = (function find_handler_STAR_(handlers,path){
if(cljs.core.empty_QMARK_(path))
{return (new cljs.core.Keyword("\uFDD0:handler")).call(null,handlers);
} else
{return cljs.core.some((function (p__15094){
var vec__15095 = p__15094;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15095,0,null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15095,1,null);
var temp__4090__auto__ = find_handler_STAR_(v,cljs.core.rest(path));
if(cljs.core.truth_(temp__4090__auto__))
{var handler = temp__4090__auto__;
return handler;
} else
{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,"\uFDD0:**"))
{return (new cljs.core.Keyword("\uFDD0:handler")).call(null,v);
} else
{return null;
}
}
}),io.pedestal.app.render.push.select_matches((new cljs.core.Keyword("\uFDD0:children")).call(null,handlers),cljs.core.first(path)));
}
});
io.pedestal.app.render.push.find_handler = (function find_handler(handlers,op,path){
return io.pedestal.app.render.push.find_handler_STAR_(cljs.core.PersistentArrayMap.fromArray(["\uFDD0:children",handlers], true),cljs.core.vec(cljs.core.cons(op,path)));
});
io.pedestal.app.render.push.DomMapper = {};
io.pedestal.app.render.push.get_id = (function get_id(this$,path){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$get_id$arity$2;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$get_id$arity$2(this$,path);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.get_id[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.get_id["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.get-id",this$);
}
}
})().call(null,this$,path);
}
});
io.pedestal.app.render.push.get_parent_id = (function get_parent_id(this$,path){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$get_parent_id$arity$2;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$get_parent_id$arity$2(this$,path);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.get_parent_id[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.get_parent_id["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.get-parent-id",this$);
}
}
})().call(null,this$,path);
}
});
io.pedestal.app.render.push.new_id_BANG_ = (function() {
var new_id_BANG_ = null;
var new_id_BANG___2 = (function (this$,path){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$2(this$,path);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.new_id_BANG_[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.new_id_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.new-id!",this$);
}
}
})().call(null,this$,path);
}
});
var new_id_BANG___3 = (function (this$,path,v){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$3;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$3(this$,path,v);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.new_id_BANG_[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.new_id_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.new-id!",this$);
}
}
})().call(null,this$,path,v);
}
});
new_id_BANG_ = function(this$,path,v){
switch(arguments.length){
case 2:
return new_id_BANG___2.call(this,this$,path);
case 3:
return new_id_BANG___3.call(this,this$,path,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
new_id_BANG_.cljs$core$IFn$_invoke$arity$2 = new_id_BANG___2;
new_id_BANG_.cljs$core$IFn$_invoke$arity$3 = new_id_BANG___3;
return new_id_BANG_;
})()
;
io.pedestal.app.render.push.delete_id_BANG_ = (function delete_id_BANG_(this$,path){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$delete_id_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$delete_id_BANG_$arity$2(this$,path);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.delete_id_BANG_[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.delete_id_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.delete-id!",this$);
}
}
})().call(null,this$,path);
}
});
io.pedestal.app.render.push.on_destroy_BANG_ = (function on_destroy_BANG_(this$,path,f){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$on_destroy_BANG_$arity$3;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$on_destroy_BANG_$arity$3(this$,path,f);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.on_destroy_BANG_[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.on_destroy_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.on-destroy!",this$);
}
}
})().call(null,this$,path,f);
}
});
io.pedestal.app.render.push.set_data_BANG_ = (function set_data_BANG_(this$,ks,d){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$set_data_BANG_$arity$3;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$set_data_BANG_$arity$3(this$,ks,d);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.set_data_BANG_[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.set_data_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.set-data!",this$);
}
}
})().call(null,this$,ks,d);
}
});
io.pedestal.app.render.push.drop_data_BANG_ = (function drop_data_BANG_(this$,ks){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$drop_data_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$drop_data_BANG_$arity$2(this$,ks);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.drop_data_BANG_[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.drop_data_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.drop-data!",this$);
}
}
})().call(null,this$,ks);
}
});
io.pedestal.app.render.push.get_data = (function get_data(this$,ks){
if((function (){var and__3941__auto__ = this$;
if(and__3941__auto__)
{return this$.io$pedestal$app$render$push$DomMapper$get_data$arity$2;
} else
{return and__3941__auto__;
}
})())
{return this$.io$pedestal$app$render$push$DomMapper$get_data$arity$2(this$,ks);
} else
{var x__9795__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3943__auto__ = (io.pedestal.app.render.push.get_data[goog.typeOf(x__9795__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (io.pedestal.app.render.push.get_data["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("DomMapper.get-data",this$);
}
}
})().call(null,this$,ks);
}
});
/**
* Given a node in the environment which is going to be deleted, run all on-destroy
* functions in the tree.
*/
io.pedestal.app.render.push.run_on_destroy_BANG_ = (function run_on_destroy_BANG_(env){
var nodes = cljs.core.tree_seq(cljs.core.constantly(true),(function (n){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15096_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(n,p1__15096_SHARP_);
}),cljs.core.remove(cljs.core.PersistentHashSet.fromArray(["\uFDD0:on-destroy",null,"\uFDD0:_data",null,"\uFDD0:id",null], true),cljs.core.keys(n)));
}),env);
var seq__15101 = cljs.core.seq(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$2("\uFDD0:on-destroy",nodes));
var chunk__15102 = null;
var count__15103 = 0;
var i__15104 = 0;
while(true){
if((i__15104 < count__15103))
{var f = chunk__15102.cljs$core$IIndexed$_nth$arity$2(chunk__15102,i__15104);
(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
{
var G__15105 = seq__15101;
var G__15106 = chunk__15102;
var G__15107 = count__15103;
var G__15108 = (i__15104 + 1);
seq__15101 = G__15105;
chunk__15102 = G__15106;
count__15103 = G__15107;
i__15104 = G__15108;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq(seq__15101);
if(temp__4092__auto__)
{var seq__15101__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15101__$1))
{var c__9926__auto__ = cljs.core.chunk_first(seq__15101__$1);
{
var G__15109 = cljs.core.chunk_rest(seq__15101__$1);
var G__15110 = c__9926__auto__;
var G__15111 = cljs.core.count(c__9926__auto__);
var G__15112 = 0;
seq__15101 = G__15109;
chunk__15102 = G__15110;
count__15103 = G__15111;
i__15104 = G__15112;
continue;
}
} else
{var f = cljs.core.first(seq__15101__$1);
(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
{
var G__15113 = cljs.core.next(seq__15101__$1);
var G__15114 = null;
var G__15115 = 0;
var G__15116 = 0;
seq__15101 = G__15113;
chunk__15102 = G__15114;
count__15103 = G__15115;
i__15104 = G__15116;
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
goog.provide('io.pedestal.app.render.push.DomRenderer');

/**
* @constructor
* @param {*} env
* @param {*} __meta
* @param {*} __extmap
* @param {*=} __meta 
* @param {*=} __extmap
*/
io.pedestal.app.render.push.DomRenderer = (function (env,__meta,__extmap){
this.env = env;
this.__meta = __meta;
this.__extmap = __extmap;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
if(arguments.length>1){
this.__meta = __meta;
this.__extmap = __extmap;
} else {
this.__meta=null;
this.__extmap=null;
}
})
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9749__auto__){
var self__ = this;
var h__9621__auto__ = self__.__hash;
if(!((h__9621__auto__ == null)))
{return h__9621__auto__;
} else
{var h__9621__auto____$1 = cljs.core.hash_imap(this__9749__auto__);
self__.__hash = h__9621__auto____$1;
return h__9621__auto____$1;
}
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9754__auto__,k__9755__auto__){
var self__ = this;
return this__9754__auto__.cljs$core$ILookup$_lookup$arity$3(this__9754__auto__,k__9755__auto__,null);
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9756__auto__,k15118,else__9757__auto__){
var self__ = this;
if((k15118 === "\uFDD0:env"))
{return self__.env;
} else
{if("\uFDD0:else")
{return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k15118,else__9757__auto__);
} else
{return null;
}
}
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9761__auto__,k__9762__auto__,G__15117){
var self__ = this;
var pred__15120 = cljs.core.identical_QMARK_;
var expr__15121 = k__9762__auto__;
if((pred__15120.cljs$core$IFn$_invoke$arity$2 ? pred__15120.cljs$core$IFn$_invoke$arity$2("\uFDD0:env",expr__15121) : pred__15120.call(null,"\uFDD0:env",expr__15121)))
{return (new io.pedestal.app.render.push.DomRenderer(G__15117,self__.__meta,self__.__extmap,null));
} else
{return (new io.pedestal.app.render.push.DomRenderer(self__.env,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9762__auto__,G__15117),null));
}
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9768__auto__,writer__9769__auto__,opts__9770__auto__){
var self__ = this;
var pr_pair__9771__auto__ = (function (keyval__9772__auto__){
return cljs.core.pr_sequential_writer(writer__9769__auto__,cljs.core.pr_writer,""," ","",opts__9770__auto__,keyval__9772__auto__);
});
return cljs.core.pr_sequential_writer(writer__9769__auto__,pr_pair__9771__auto__,"#io.pedestal.app.render.push.DomRenderer{",", ","}",opts__9770__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray([cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\uFDD0:env",self__.env], 0))], true),self__.__extmap));
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9759__auto__,entry__9760__auto__){
var self__ = this;
if(cljs.core.vector_QMARK_(entry__9760__auto__))
{return this__9759__auto__.cljs$core$IAssociative$_assoc$arity$3(this__9759__auto__,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9760__auto__,0),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9760__auto__,1));
} else
{return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9759__auto__,entry__9760__auto__);
}
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9766__auto__){
var self__ = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray([cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\uFDD0:env",self__.env], 0))], true),self__.__extmap));
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9758__auto__){
var self__ = this;
return (1 + cljs.core.count(self__.__extmap));
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9750__auto__,other__9751__auto__){
var self__ = this;
if(cljs.core.truth_((function (){var and__3941__auto__ = other__9751__auto__;
if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = (this__9750__auto__.constructor === other__9751__auto__.constructor);
if(and__3941__auto____$1)
{return cljs.core.equiv_map(this__9750__auto__,other__9751__auto__);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{return true;
} else
{return false;
}
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9753__auto__,G__15117){
var self__ = this;
return (new io.pedestal.app.render.push.DomRenderer(self__.env,G__15117,self__.__extmap,self__.__hash));
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9752__auto__){
var self__ = this;
return self__.__meta;
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$ = true;
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$get_id$arity$2 = (function (this$,path){
var self__ = this;
if(cljs.core.seq(path))
{return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.env),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,"\uFDD0:id"));
} else
{return (new cljs.core.Keyword("\uFDD0:id")).call(null,cljs.core.deref(self__.env));
}
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$get_parent_id$arity$2 = (function (this$,path){
var self__ = this;
if(cljs.core.seq(path))
{return this$.io$pedestal$app$render$push$DomMapper$get_id$arity$2(this$,cljs.core.vec(cljs.core.butlast(path)));
} else
{return null;
}
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$2 = (function (this$,path){
var self__ = this;
return this$.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$3(this$,path,cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$new_id_BANG_$arity$3 = (function (this$,path,v){
var self__ = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.env,cljs.core.assoc_in,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,"\uFDD0:id"),v);
return v;
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$delete_id_BANG_$arity$2 = (function (this$,path){
var self__ = this;
io.pedestal.app.render.push.run_on_destroy_BANG_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.env),path));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.env,cljs.core.assoc_in,path,null);
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$on_destroy_BANG_$arity$3 = (function (this$,path,f){
var self__ = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$5(self__.env,cljs.core.update_in,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path,"\uFDD0:on-destroy"),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),f);
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$set_data_BANG_$arity$3 = (function (this$,ks,d){
var self__ = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.env,cljs.core.assoc_in,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray(["\uFDD0:_data"], true),ks),d);
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$drop_data_BANG_$arity$2 = (function (this$,ks){
var self__ = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$5(self__.env,cljs.core.update_in,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray(["\uFDD0:_data"], true),cljs.core.butlast(ks)),cljs.core.dissoc,cljs.core.last(ks));
});
io.pedestal.app.render.push.DomRenderer.prototype.io$pedestal$app$render$push$DomMapper$get_data$arity$2 = (function (this$,ks){
var self__ = this;
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.env),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray(["\uFDD0:_data"], true),ks));
});
io.pedestal.app.render.push.DomRenderer.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9763__auto__,k__9764__auto__){
var self__ = this;
if(cljs.core.contains_QMARK_(cljs.core.PersistentHashSet.fromArray(["\uFDD0:env",null], true),k__9764__auto__))
{return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into(cljs.core.PersistentArrayMap.EMPTY,this__9763__auto__),self__.__meta),k__9764__auto__);
} else
{return (new io.pedestal.app.render.push.DomRenderer(self__.env,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9764__auto__)),null));
}
});
io.pedestal.app.render.push.DomRenderer.cljs$lang$type = true;
io.pedestal.app.render.push.DomRenderer.cljs$lang$ctorPrSeq = (function (this__9788__auto__){
return cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["io.pedestal.app.render.push/DomRenderer"], 0));
});
io.pedestal.app.render.push.DomRenderer.cljs$lang$ctorPrWriter = (function (this__9788__auto__,writer__9789__auto__){
return cljs.core._write(writer__9789__auto__,"io.pedestal.app.render.push/DomRenderer");
});
io.pedestal.app.render.push.__GT_DomRenderer = (function __GT_DomRenderer(env){
return (new io.pedestal.app.render.push.DomRenderer(env));
});
io.pedestal.app.render.push.map__GT_DomRenderer = (function map__GT_DomRenderer(G__15119){
return (new io.pedestal.app.render.push.DomRenderer((new cljs.core.Keyword("\uFDD0:env")).call(null,G__15119),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__15119,"\uFDD0:env")));
});
io.pedestal.app.render.push.renderer = (function() {
var renderer = null;
var renderer__2 = (function (root_id,handlers){
return renderer.cljs$core$IFn$_invoke$arity$3(root_id,handlers,cljs.core.identity);
});
var renderer__3 = (function (root_id,handlers,log_fn){
var handlers__$1 = ((cljs.core.vector_QMARK_(handlers))?io.pedestal.app.render.push.add_handlers.cljs$core$IFn$_invoke$arity$1(handlers):handlers);
var renderer__$1 = io.pedestal.app.render.push.__GT_DomRenderer(cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",root_id], true)));
return (function (deltas,input_queue){
(log_fn.cljs$core$IFn$_invoke$arity$1 ? log_fn.cljs$core$IFn$_invoke$arity$1(deltas) : log_fn.call(null,deltas));
var seq__15129 = cljs.core.seq(deltas);
var chunk__15130 = null;
var count__15131 = 0;
var i__15132 = 0;
while(true){
if((i__15132 < count__15131))
{var d = chunk__15130.cljs$core$IIndexed$_nth$arity$2(chunk__15130,i__15132);
var vec__15133_15135 = d;
var op_15136 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15133_15135,0,null);
var path_15137 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15133_15135,1,null);
var handler_15138 = io.pedestal.app.render.push.find_handler(handlers__$1,op_15136,path_15137);
if(cljs.core.truth_(handler_15138))
{(handler_15138.cljs$core$IFn$_invoke$arity$3 ? handler_15138.cljs$core$IFn$_invoke$arity$3(renderer__$1,d,input_queue) : handler_15138.call(null,renderer__$1,d,input_queue));
} else
{}
{
var G__15139 = seq__15129;
var G__15140 = chunk__15130;
var G__15141 = count__15131;
var G__15142 = (i__15132 + 1);
seq__15129 = G__15139;
chunk__15130 = G__15140;
count__15131 = G__15141;
i__15132 = G__15142;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq(seq__15129);
if(temp__4092__auto__)
{var seq__15129__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15129__$1))
{var c__9926__auto__ = cljs.core.chunk_first(seq__15129__$1);
{
var G__15143 = cljs.core.chunk_rest(seq__15129__$1);
var G__15144 = c__9926__auto__;
var G__15145 = cljs.core.count(c__9926__auto__);
var G__15146 = 0;
seq__15129 = G__15143;
chunk__15130 = G__15144;
count__15131 = G__15145;
i__15132 = G__15146;
continue;
}
} else
{var d = cljs.core.first(seq__15129__$1);
var vec__15134_15147 = d;
var op_15148 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15134_15147,0,null);
var path_15149 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15134_15147,1,null);
var handler_15150 = io.pedestal.app.render.push.find_handler(handlers__$1,op_15148,path_15149);
if(cljs.core.truth_(handler_15150))
{(handler_15150.cljs$core$IFn$_invoke$arity$3 ? handler_15150.cljs$core$IFn$_invoke$arity$3(renderer__$1,d,input_queue) : handler_15150.call(null,renderer__$1,d,input_queue));
} else
{}
{
var G__15151 = cljs.core.next(seq__15129__$1);
var G__15152 = null;
var G__15153 = 0;
var G__15154 = 0;
seq__15129 = G__15151;
chunk__15130 = G__15152;
count__15131 = G__15153;
i__15132 = G__15154;
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
});
renderer = function(root_id,handlers,log_fn){
switch(arguments.length){
case 2:
return renderer__2.call(this,root_id,handlers);
case 3:
return renderer__3.call(this,root_id,handlers,log_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
renderer.cljs$core$IFn$_invoke$arity$2 = renderer__2;
renderer.cljs$core$IFn$_invoke$arity$3 = renderer__3;
return renderer;
})()
;
/**
* Return a queue for processing rendering deltas. This queue will
* receive one delta at a time. For each delta placed on the queue, find
* and then apply a handler to that delta. If no handler is found, the
* delta will be removed from the queue and no other processing will
* take place.
*/
io.pedestal.app.render.push.push_render_queue = (function push_render_queue(root_id,handlers,input_queue){
var renderer = io.pedestal.app.render.push.__GT_DomRenderer(cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.fromArray(["\uFDD0:id",root_id], true)));
var handlers__$1 = ((cljs.core.vector_QMARK_(handlers))?io.pedestal.app.render.push.add_handlers.cljs$core$IFn$_invoke$arity$1(handlers):handlers);
var render_queue = io.pedestal.app.queue.queue("\uFDD0:render-queue");
var consume_render_queue = (function consume_render_queue(){
return io.pedestal.app.protocols.take_message(render_queue,(function (message){
var vec__15158_15159 = message;
var op_15160 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15158_15159,0,null);
var path_15161 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15158_15159,1,null);
var handler_15162 = io.pedestal.app.render.push.find_handler(handlers__$1,op_15160,path_15161);
if(cljs.core.truth_(handler_15162))
{(handler_15162.cljs$core$IFn$_invoke$arity$3 ? handler_15162.cljs$core$IFn$_invoke$arity$3(renderer,message,input_queue) : handler_15162.call(null,renderer,message,input_queue));
} else
{}
return consume_render_queue();
}));
});
(consume_render_queue.cljs$core$IFn$_invoke$arity$0 ? consume_render_queue.cljs$core$IFn$_invoke$arity$0() : consume_render_queue.call(null));
return render_queue;
});
