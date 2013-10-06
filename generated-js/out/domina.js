goog.provide('domina');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('goog.style');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_13465 = cljs.core.PersistentVector.fromArray([1,"<select multiple='multiple'>","</select>"], true);
var table_section_wrapper_13466 = cljs.core.PersistentVector.fromArray([1,"<table>","</table>"], true);
var cell_wrapper_13467 = cljs.core.PersistentVector.fromArray([3,"<table><tbody><tr>","</tr></tbody></table>"], true);
domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["col","\uFDD0:default","tfoot","caption","optgroup","legend","area","td","thead","th","option","tbody","tr","colgroup"],[cljs.core.PersistentVector.fromArray([2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], true),cljs.core.PersistentVector.fromArray([0,"",""], true),table_section_wrapper_13466,table_section_wrapper_13466,opt_wrapper_13465,cljs.core.PersistentVector.fromArray([1,"<fieldset>","</fieldset>"], true),cljs.core.PersistentVector.fromArray([1,"<map>","</map>"], true),cell_wrapper_13467,table_section_wrapper_13466,cell_wrapper_13467,opt_wrapper_13465,table_section_wrapper_13466,cljs.core.PersistentVector.fromArray([2,"<table><tbody>","</tbody></table>"], true),table_section_wrapper_13466]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){
var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));
var tbody = (((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,tag_name,"table");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?(function (){var and__3941__auto__ = div.firstChild;
if(cljs.core.truth_(and__3941__auto__))
{return div.firstChild.childNodes;
} else
{return and__3941__auto__;
}
})():(((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,start_wrap,"<table>");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?divchildNodes:cljs.core.PersistentVector.EMPTY));
var seq__13472 = cljs.core.seq.call(null,tbody);
var chunk__13473 = null;
var count__13474 = 0;
var i__13475 = 0;
while(true){
if((i__13475 < count__13474))
{var child = cljs.core._nth.call(null,chunk__13473,i__13475);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__13476 = seq__13472;
var G__13477 = chunk__13473;
var G__13478 = count__13474;
var G__13479 = (i__13475 + 1);
seq__13472 = G__13476;
chunk__13473 = G__13477;
count__13474 = G__13478;
i__13475 = G__13479;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__13472);
if(temp__4092__auto__)
{var seq__13472__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13472__$1))
{var c__9640__auto__ = cljs.core.chunk_first.call(null,seq__13472__$1);
{
var G__13480 = cljs.core.chunk_rest.call(null,seq__13472__$1);
var G__13481 = c__9640__auto__;
var G__13482 = cljs.core.count.call(null,c__9640__auto__);
var G__13483 = 0;
seq__13472 = G__13480;
chunk__13473 = G__13481;
count__13474 = G__13482;
i__13475 = G__13483;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__13472__$1);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__13484 = cljs.core.next.call(null,seq__13472__$1);
var G__13485 = null;
var G__13486 = 0;
var G__13487 = 0;
seq__13472 = G__13484;
chunk__13473 = G__13485;
count__13474 = G__13486;
i__13475 = G__13487;
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
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){
return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){
var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();
var vec__13489 = cljs.core.get.call(null,domina.wrap_map,tag_name,(new cljs.core.Keyword("\uFDD0:default")).call(null,domina.wrap_map));
var depth = cljs.core.nth.call(null,vec__13489,0,null);
var start_wrap = cljs.core.nth.call(null,vec__13489,1,null);
var end_wrap = cljs.core.nth.call(null,vec__13489,2,null);
var div = (function (){var wrapper = (function (){var div = document.createElement("div");
div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();
var level = depth;
while(true){
if((level > 0))
{{
var G__13490 = wrapper.lastChild;
var G__13491 = (level - 1);
wrapper = G__13490;
level = G__13491;
continue;
}
} else
{return wrapper;
}
break;
}
})();
if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3941__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);
if(and__3941__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3941__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){
if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = {};
domina.nodes = (function nodes(content){
if((function (){var and__3941__auto__ = content;
if(and__3941__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3941__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__9509__auto__ = (((content == null))?null:content);
return (function (){var or__3943__auto__ = (domina.nodes[goog.typeOf(x__9509__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.nodes["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){
if((function (){var and__3941__auto__ = nodeseq;
if(and__3941__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3941__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__9509__auto__ = (((nodeseq == null))?null:nodeseq);
return (function (){var or__3943__auto__ = (domina.single_node[goog.typeOf(x__9509__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.single_node["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){
if(cljs.core.truth_((function (){var and__3941__auto__ = domina._STAR_debug_STAR_;
if(cljs.core.truth_(and__3941__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3941__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log_debug__delegate.call(this, mesg);
};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__13492){
var mesg = cljs.core.seq(arglist__13492);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){
if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log__delegate.call(this, mesg);
};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__13493){
var mesg = cljs.core.seq(arglist__13493);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){
return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){
if((void 0 === domina.t13497))
{goog.provide('domina.t13497');

/**
* @constructor
*/
domina.t13497 = (function (class_name,by_class,meta13498){
this.class_name = class_name;
this.by_class = by_class;
this.meta13498 = meta13498;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
domina.t13497.cljs$lang$type = true;
domina.t13497.cljs$lang$ctorStr = "domina/t13497";
domina.t13497.cljs$lang$ctorPrWriter = (function (this__9450__auto__,writer__9451__auto__,opt__9452__auto__){
return cljs.core._write.call(null,writer__9451__auto__,"domina/t13497");
});
domina.t13497.prototype.domina$DomContent$ = true;
domina.t13497.prototype.domina$DomContent$nodes$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t13497.prototype.domina$DomContent$single_node$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t13497.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13499){
var self__ = this;
return self__.meta13498;
});
domina.t13497.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13499,meta13498__$1){
var self__ = this;
return (new domina.t13497(self__.class_name,self__.by_class,meta13498__$1));
});
domina.__GT_t13497 = (function __GT_t13497(class_name__$1,by_class__$1,meta13498){
return (new domina.t13497(class_name__$1,by_class__$1,meta13498));
});
} else
{}
return (new domina.t13497(class_name,by_class,null));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){
return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){
return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;
if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return common_ancestor__delegate.call(this, contents);
};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__13500){
var contents = cljs.core.seq(arglist__13500);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){
return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){
return cljs.core.map.call(null,(function (p1__13501_SHARP_){
return p1__13501_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){
domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){
domina.apply_with_cloning.call(null,(function (p1__13502_SHARP_,p2__13503_SHARP_){
return goog.dom.insertChildAt(p1__13502_SHARP_,p2__13503_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){
domina.insert_BANG_.call(null,parent_content,child_content,0);
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__13505_SHARP_,p2__13504_SHARP_){
return goog.dom.insertSiblingBefore(p2__13504_SHARP_,p1__13505_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__13507_SHARP_,p2__13506_SHARP_){
return goog.dom.insertSiblingAfter(p2__13506_SHARP_,p1__13507_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){
domina.apply_with_cloning.call(null,(function (p1__13509_SHARP_,p2__13508_SHARP_){
return goog.dom.replaceNode(p2__13508_SHARP_,p1__13509_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){
return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){
return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){
cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){
var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));
if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){
return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){
var seq__13514_13518 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13515_13519 = null;
var count__13516_13520 = 0;
var i__13517_13521 = 0;
while(true){
if((i__13517_13521 < count__13516_13520))
{var n_13522 = cljs.core._nth.call(null,chunk__13515_13519,i__13517_13521);
goog.style.setStyle(n_13522,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__13523 = seq__13514_13518;
var G__13524 = chunk__13515_13519;
var G__13525 = count__13516_13520;
var G__13526 = (i__13517_13521 + 1);
seq__13514_13518 = G__13523;
chunk__13515_13519 = G__13524;
count__13516_13520 = G__13525;
i__13517_13521 = G__13526;
continue;
}
} else
{var temp__4092__auto___13527 = cljs.core.seq.call(null,seq__13514_13518);
if(temp__4092__auto___13527)
{var seq__13514_13528__$1 = temp__4092__auto___13527;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13514_13528__$1))
{var c__9640__auto___13529 = cljs.core.chunk_first.call(null,seq__13514_13528__$1);
{
var G__13530 = cljs.core.chunk_rest.call(null,seq__13514_13528__$1);
var G__13531 = c__9640__auto___13529;
var G__13532 = cljs.core.count.call(null,c__9640__auto___13529);
var G__13533 = 0;
seq__13514_13518 = G__13530;
chunk__13515_13519 = G__13531;
count__13516_13520 = G__13532;
i__13517_13521 = G__13533;
continue;
}
} else
{var n_13534 = cljs.core.first.call(null,seq__13514_13528__$1);
goog.style.setStyle(n_13534,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__13535 = cljs.core.next.call(null,seq__13514_13528__$1);
var G__13536 = null;
var G__13537 = 0;
var G__13538 = 0;
seq__13514_13518 = G__13535;
chunk__13515_13519 = G__13536;
count__13516_13520 = G__13537;
i__13517_13521 = G__13538;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_style_BANG___delegate.call(this, content, name, value);
};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__13539){
var content = cljs.core.first(arglist__13539);
arglist__13539 = cljs.core.next(arglist__13539);
var name = cljs.core.first(arglist__13539);
var value = cljs.core.rest(arglist__13539);
return set_style_BANG___delegate(content, name, value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){
var seq__13544_13548 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13545_13549 = null;
var count__13546_13550 = 0;
var i__13547_13551 = 0;
while(true){
if((i__13547_13551 < count__13546_13550))
{var n_13552 = cljs.core._nth.call(null,chunk__13545_13549,i__13547_13551);
n_13552.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__13553 = seq__13544_13548;
var G__13554 = chunk__13545_13549;
var G__13555 = count__13546_13550;
var G__13556 = (i__13547_13551 + 1);
seq__13544_13548 = G__13553;
chunk__13545_13549 = G__13554;
count__13546_13550 = G__13555;
i__13547_13551 = G__13556;
continue;
}
} else
{var temp__4092__auto___13557 = cljs.core.seq.call(null,seq__13544_13548);
if(temp__4092__auto___13557)
{var seq__13544_13558__$1 = temp__4092__auto___13557;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13544_13558__$1))
{var c__9640__auto___13559 = cljs.core.chunk_first.call(null,seq__13544_13558__$1);
{
var G__13560 = cljs.core.chunk_rest.call(null,seq__13544_13558__$1);
var G__13561 = c__9640__auto___13559;
var G__13562 = cljs.core.count.call(null,c__9640__auto___13559);
var G__13563 = 0;
seq__13544_13548 = G__13560;
chunk__13545_13549 = G__13561;
count__13546_13550 = G__13562;
i__13547_13551 = G__13563;
continue;
}
} else
{var n_13564 = cljs.core.first.call(null,seq__13544_13558__$1);
n_13564.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__13565 = cljs.core.next.call(null,seq__13544_13558__$1);
var G__13566 = null;
var G__13567 = 0;
var G__13568 = 0;
seq__13544_13548 = G__13565;
chunk__13545_13549 = G__13566;
count__13546_13550 = G__13567;
i__13547_13551 = G__13568;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_attr_BANG___delegate.call(this, content, name, value);
};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__13569){
var content = cljs.core.first(arglist__13569);
arglist__13569 = cljs.core.next(arglist__13569);
var name = cljs.core.first(arglist__13569);
var value = cljs.core.rest(arglist__13569);
return set_attr_BANG___delegate(content, name, value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){
var seq__13574_13578 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13575_13579 = null;
var count__13576_13580 = 0;
var i__13577_13581 = 0;
while(true){
if((i__13577_13581 < count__13576_13580))
{var n_13582 = cljs.core._nth.call(null,chunk__13575_13579,i__13577_13581);
n_13582.removeAttribute(cljs.core.name.call(null,name));
{
var G__13583 = seq__13574_13578;
var G__13584 = chunk__13575_13579;
var G__13585 = count__13576_13580;
var G__13586 = (i__13577_13581 + 1);
seq__13574_13578 = G__13583;
chunk__13575_13579 = G__13584;
count__13576_13580 = G__13585;
i__13577_13581 = G__13586;
continue;
}
} else
{var temp__4092__auto___13587 = cljs.core.seq.call(null,seq__13574_13578);
if(temp__4092__auto___13587)
{var seq__13574_13588__$1 = temp__4092__auto___13587;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13574_13588__$1))
{var c__9640__auto___13589 = cljs.core.chunk_first.call(null,seq__13574_13588__$1);
{
var G__13590 = cljs.core.chunk_rest.call(null,seq__13574_13588__$1);
var G__13591 = c__9640__auto___13589;
var G__13592 = cljs.core.count.call(null,c__9640__auto___13589);
var G__13593 = 0;
seq__13574_13578 = G__13590;
chunk__13575_13579 = G__13591;
count__13576_13580 = G__13592;
i__13577_13581 = G__13593;
continue;
}
} else
{var n_13594 = cljs.core.first.call(null,seq__13574_13588__$1);
n_13594.removeAttribute(cljs.core.name.call(null,name));
{
var G__13595 = cljs.core.next.call(null,seq__13574_13588__$1);
var G__13596 = null;
var G__13597 = 0;
var G__13598 = 0;
seq__13574_13578 = G__13595;
chunk__13575_13579 = G__13596;
count__13576_13580 = G__13597;
i__13577_13581 = G__13598;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){
return cljs.core.reduce.call(null,(function (acc,pair){
var vec__13600 = pair.split(/\s*:\s*/);
var k = cljs.core.nth.call(null,vec__13600,0,null);
var v = cljs.core.nth.call(null,vec__13600,1,null);
if(cljs.core.truth_((function (){var and__3941__auto__ = k;
if(cljs.core.truth_(and__3941__auto__))
{return v;
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){
var style = domina.attr.call(null,content,"style");
if(cljs.core.string_QMARK_.call(null,style))
{return domina.parse_style_attributes.call(null,style);
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{return null;
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){
var node = domina.single_node.call(null,content);
var attrs__$1 = node.attributes;
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__13601_SHARP_){
var attr = attrs__$1.item(p1__13601_SHARP_);
var value = attr.nodeValue;
if((function (){var and__3941__auto__ = cljs.core.not_EQ_.call(null,null,value);
if(and__3941__auto__)
{return cljs.core.not_EQ_.call(null,"",value);
} else
{return and__3941__auto__;
}
})())
{return cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){
var seq__13608_13614 = cljs.core.seq.call(null,styles);
var chunk__13609_13615 = null;
var count__13610_13616 = 0;
var i__13611_13617 = 0;
while(true){
if((i__13611_13617 < count__13610_13616))
{var vec__13612_13618 = cljs.core._nth.call(null,chunk__13609_13615,i__13611_13617);
var name_13619 = cljs.core.nth.call(null,vec__13612_13618,0,null);
var value_13620 = cljs.core.nth.call(null,vec__13612_13618,1,null);
domina.set_style_BANG_.call(null,content,name_13619,value_13620);
{
var G__13621 = seq__13608_13614;
var G__13622 = chunk__13609_13615;
var G__13623 = count__13610_13616;
var G__13624 = (i__13611_13617 + 1);
seq__13608_13614 = G__13621;
chunk__13609_13615 = G__13622;
count__13610_13616 = G__13623;
i__13611_13617 = G__13624;
continue;
}
} else
{var temp__4092__auto___13625 = cljs.core.seq.call(null,seq__13608_13614);
if(temp__4092__auto___13625)
{var seq__13608_13626__$1 = temp__4092__auto___13625;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13608_13626__$1))
{var c__9640__auto___13627 = cljs.core.chunk_first.call(null,seq__13608_13626__$1);
{
var G__13628 = cljs.core.chunk_rest.call(null,seq__13608_13626__$1);
var G__13629 = c__9640__auto___13627;
var G__13630 = cljs.core.count.call(null,c__9640__auto___13627);
var G__13631 = 0;
seq__13608_13614 = G__13628;
chunk__13609_13615 = G__13629;
count__13610_13616 = G__13630;
i__13611_13617 = G__13631;
continue;
}
} else
{var vec__13613_13632 = cljs.core.first.call(null,seq__13608_13626__$1);
var name_13633 = cljs.core.nth.call(null,vec__13613_13632,0,null);
var value_13634 = cljs.core.nth.call(null,vec__13613_13632,1,null);
domina.set_style_BANG_.call(null,content,name_13633,value_13634);
{
var G__13635 = cljs.core.next.call(null,seq__13608_13626__$1);
var G__13636 = null;
var G__13637 = 0;
var G__13638 = 0;
seq__13608_13614 = G__13635;
chunk__13609_13615 = G__13636;
count__13610_13616 = G__13637;
i__13611_13617 = G__13638;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified CSS styles fpr each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){
var seq__13645_13651 = cljs.core.seq.call(null,attrs);
var chunk__13646_13652 = null;
var count__13647_13653 = 0;
var i__13648_13654 = 0;
while(true){
if((i__13648_13654 < count__13647_13653))
{var vec__13649_13655 = cljs.core._nth.call(null,chunk__13646_13652,i__13648_13654);
var name_13656 = cljs.core.nth.call(null,vec__13649_13655,0,null);
var value_13657 = cljs.core.nth.call(null,vec__13649_13655,1,null);
domina.set_attr_BANG_.call(null,content,name_13656,value_13657);
{
var G__13658 = seq__13645_13651;
var G__13659 = chunk__13646_13652;
var G__13660 = count__13647_13653;
var G__13661 = (i__13648_13654 + 1);
seq__13645_13651 = G__13658;
chunk__13646_13652 = G__13659;
count__13647_13653 = G__13660;
i__13648_13654 = G__13661;
continue;
}
} else
{var temp__4092__auto___13662 = cljs.core.seq.call(null,seq__13645_13651);
if(temp__4092__auto___13662)
{var seq__13645_13663__$1 = temp__4092__auto___13662;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13645_13663__$1))
{var c__9640__auto___13664 = cljs.core.chunk_first.call(null,seq__13645_13663__$1);
{
var G__13665 = cljs.core.chunk_rest.call(null,seq__13645_13663__$1);
var G__13666 = c__9640__auto___13664;
var G__13667 = cljs.core.count.call(null,c__9640__auto___13664);
var G__13668 = 0;
seq__13645_13651 = G__13665;
chunk__13646_13652 = G__13666;
count__13647_13653 = G__13667;
i__13648_13654 = G__13668;
continue;
}
} else
{var vec__13650_13669 = cljs.core.first.call(null,seq__13645_13663__$1);
var name_13670 = cljs.core.nth.call(null,vec__13650_13669,0,null);
var value_13671 = cljs.core.nth.call(null,vec__13650_13669,1,null);
domina.set_attr_BANG_.call(null,content,name_13670,value_13671);
{
var G__13672 = cljs.core.next.call(null,seq__13645_13663__$1);
var G__13673 = null;
var G__13674 = 0;
var G__13675 = 0;
seq__13645_13651 = G__13672;
chunk__13646_13652 = G__13673;
count__13647_13653 = G__13674;
i__13648_13654 = G__13675;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){
return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){
var seq__13680_13684 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13681_13685 = null;
var count__13682_13686 = 0;
var i__13683_13687 = 0;
while(true){
if((i__13683_13687 < count__13682_13686))
{var node_13688 = cljs.core._nth.call(null,chunk__13681_13685,i__13683_13687);
goog.dom.classes.add(node_13688,class$);
{
var G__13689 = seq__13680_13684;
var G__13690 = chunk__13681_13685;
var G__13691 = count__13682_13686;
var G__13692 = (i__13683_13687 + 1);
seq__13680_13684 = G__13689;
chunk__13681_13685 = G__13690;
count__13682_13686 = G__13691;
i__13683_13687 = G__13692;
continue;
}
} else
{var temp__4092__auto___13693 = cljs.core.seq.call(null,seq__13680_13684);
if(temp__4092__auto___13693)
{var seq__13680_13694__$1 = temp__4092__auto___13693;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13680_13694__$1))
{var c__9640__auto___13695 = cljs.core.chunk_first.call(null,seq__13680_13694__$1);
{
var G__13696 = cljs.core.chunk_rest.call(null,seq__13680_13694__$1);
var G__13697 = c__9640__auto___13695;
var G__13698 = cljs.core.count.call(null,c__9640__auto___13695);
var G__13699 = 0;
seq__13680_13684 = G__13696;
chunk__13681_13685 = G__13697;
count__13682_13686 = G__13698;
i__13683_13687 = G__13699;
continue;
}
} else
{var node_13700 = cljs.core.first.call(null,seq__13680_13694__$1);
goog.dom.classes.add(node_13700,class$);
{
var G__13701 = cljs.core.next.call(null,seq__13680_13694__$1);
var G__13702 = null;
var G__13703 = 0;
var G__13704 = 0;
seq__13680_13684 = G__13701;
chunk__13681_13685 = G__13702;
count__13682_13686 = G__13703;
i__13683_13687 = G__13704;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){
var seq__13709_13713 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13710_13714 = null;
var count__13711_13715 = 0;
var i__13712_13716 = 0;
while(true){
if((i__13712_13716 < count__13711_13715))
{var node_13717 = cljs.core._nth.call(null,chunk__13710_13714,i__13712_13716);
goog.dom.classes.remove(node_13717,class$);
{
var G__13718 = seq__13709_13713;
var G__13719 = chunk__13710_13714;
var G__13720 = count__13711_13715;
var G__13721 = (i__13712_13716 + 1);
seq__13709_13713 = G__13718;
chunk__13710_13714 = G__13719;
count__13711_13715 = G__13720;
i__13712_13716 = G__13721;
continue;
}
} else
{var temp__4092__auto___13722 = cljs.core.seq.call(null,seq__13709_13713);
if(temp__4092__auto___13722)
{var seq__13709_13723__$1 = temp__4092__auto___13722;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13709_13723__$1))
{var c__9640__auto___13724 = cljs.core.chunk_first.call(null,seq__13709_13723__$1);
{
var G__13725 = cljs.core.chunk_rest.call(null,seq__13709_13723__$1);
var G__13726 = c__9640__auto___13724;
var G__13727 = cljs.core.count.call(null,c__9640__auto___13724);
var G__13728 = 0;
seq__13709_13713 = G__13725;
chunk__13710_13714 = G__13726;
count__13711_13715 = G__13727;
i__13712_13716 = G__13728;
continue;
}
} else
{var node_13729 = cljs.core.first.call(null,seq__13709_13723__$1);
goog.dom.classes.remove(node_13729,class$);
{
var G__13730 = cljs.core.next.call(null,seq__13709_13723__$1);
var G__13731 = null;
var G__13732 = 0;
var G__13733 = 0;
seq__13709_13713 = G__13730;
chunk__13710_13714 = G__13731;
count__13711_13715 = G__13732;
i__13712_13716 = G__13733;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){
return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){
var classes_13742__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);
var seq__13738_13743 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13739_13744 = null;
var count__13740_13745 = 0;
var i__13741_13746 = 0;
while(true){
if((i__13741_13746 < count__13740_13745))
{var node_13747 = cljs.core._nth.call(null,chunk__13739_13744,i__13741_13746);
goog.dom.classes.set(node_13747,classes_13742__$1);
{
var G__13748 = seq__13738_13743;
var G__13749 = chunk__13739_13744;
var G__13750 = count__13740_13745;
var G__13751 = (i__13741_13746 + 1);
seq__13738_13743 = G__13748;
chunk__13739_13744 = G__13749;
count__13740_13745 = G__13750;
i__13741_13746 = G__13751;
continue;
}
} else
{var temp__4092__auto___13752 = cljs.core.seq.call(null,seq__13738_13743);
if(temp__4092__auto___13752)
{var seq__13738_13753__$1 = temp__4092__auto___13752;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13738_13753__$1))
{var c__9640__auto___13754 = cljs.core.chunk_first.call(null,seq__13738_13753__$1);
{
var G__13755 = cljs.core.chunk_rest.call(null,seq__13738_13753__$1);
var G__13756 = c__9640__auto___13754;
var G__13757 = cljs.core.count.call(null,c__9640__auto___13754);
var G__13758 = 0;
seq__13738_13743 = G__13755;
chunk__13739_13744 = G__13756;
count__13740_13745 = G__13757;
i__13741_13746 = G__13758;
continue;
}
} else
{var node_13759 = cljs.core.first.call(null,seq__13738_13753__$1);
goog.dom.classes.set(node_13759,classes_13742__$1);
{
var G__13760 = cljs.core.next.call(null,seq__13738_13753__$1);
var G__13761 = null;
var G__13762 = 0;
var G__13763 = 0;
seq__13738_13743 = G__13760;
chunk__13739_13744 = G__13761;
count__13740_13745 = G__13762;
i__13741_13746 = G__13763;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){
return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){
var seq__13768_13772 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13769_13773 = null;
var count__13770_13774 = 0;
var i__13771_13775 = 0;
while(true){
if((i__13771_13775 < count__13770_13774))
{var node_13776 = cljs.core._nth.call(null,chunk__13769_13773,i__13771_13775);
goog.dom.setTextContent(node_13776,value);
{
var G__13777 = seq__13768_13772;
var G__13778 = chunk__13769_13773;
var G__13779 = count__13770_13774;
var G__13780 = (i__13771_13775 + 1);
seq__13768_13772 = G__13777;
chunk__13769_13773 = G__13778;
count__13770_13774 = G__13779;
i__13771_13775 = G__13780;
continue;
}
} else
{var temp__4092__auto___13781 = cljs.core.seq.call(null,seq__13768_13772);
if(temp__4092__auto___13781)
{var seq__13768_13782__$1 = temp__4092__auto___13781;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13768_13782__$1))
{var c__9640__auto___13783 = cljs.core.chunk_first.call(null,seq__13768_13782__$1);
{
var G__13784 = cljs.core.chunk_rest.call(null,seq__13768_13782__$1);
var G__13785 = c__9640__auto___13783;
var G__13786 = cljs.core.count.call(null,c__9640__auto___13783);
var G__13787 = 0;
seq__13768_13772 = G__13784;
chunk__13769_13773 = G__13785;
count__13770_13774 = G__13786;
i__13771_13775 = G__13787;
continue;
}
} else
{var node_13788 = cljs.core.first.call(null,seq__13768_13782__$1);
goog.dom.setTextContent(node_13788,value);
{
var G__13789 = cljs.core.next.call(null,seq__13768_13782__$1);
var G__13790 = null;
var G__13791 = 0;
var G__13792 = 0;
seq__13768_13772 = G__13789;
chunk__13769_13773 = G__13790;
count__13770_13774 = G__13791;
i__13771_13775 = G__13792;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){
return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){
var seq__13797_13801 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13798_13802 = null;
var count__13799_13803 = 0;
var i__13800_13804 = 0;
while(true){
if((i__13800_13804 < count__13799_13803))
{var node_13805 = cljs.core._nth.call(null,chunk__13798_13802,i__13800_13804);
goog.dom.forms.setValue(node_13805,value);
{
var G__13806 = seq__13797_13801;
var G__13807 = chunk__13798_13802;
var G__13808 = count__13799_13803;
var G__13809 = (i__13800_13804 + 1);
seq__13797_13801 = G__13806;
chunk__13798_13802 = G__13807;
count__13799_13803 = G__13808;
i__13800_13804 = G__13809;
continue;
}
} else
{var temp__4092__auto___13810 = cljs.core.seq.call(null,seq__13797_13801);
if(temp__4092__auto___13810)
{var seq__13797_13811__$1 = temp__4092__auto___13810;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13797_13811__$1))
{var c__9640__auto___13812 = cljs.core.chunk_first.call(null,seq__13797_13811__$1);
{
var G__13813 = cljs.core.chunk_rest.call(null,seq__13797_13811__$1);
var G__13814 = c__9640__auto___13812;
var G__13815 = cljs.core.count.call(null,c__9640__auto___13812);
var G__13816 = 0;
seq__13797_13801 = G__13813;
chunk__13798_13802 = G__13814;
count__13799_13803 = G__13815;
i__13800_13804 = G__13816;
continue;
}
} else
{var node_13817 = cljs.core.first.call(null,seq__13797_13811__$1);
goog.dom.forms.setValue(node_13817,value);
{
var G__13818 = cljs.core.next.call(null,seq__13797_13811__$1);
var G__13819 = null;
var G__13820 = 0;
var G__13821 = 0;
seq__13797_13801 = G__13818;
chunk__13798_13802 = G__13819;
count__13799_13803 = G__13820;
i__13800_13804 = G__13821;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){
return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){
return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){
var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));
var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();
var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);
if(cljs.core.truth_((function (){var and__3941__auto__ = allows_inner_html_QMARK_;
if(and__3941__auto__)
{var and__3941__auto____$1 = (function (){var or__3943__auto__ = domina.support.leading_whitespace_QMARK_;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();
if(cljs.core.truth_(and__3941__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{var value_13832 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");
try{var seq__13828_13833 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__13829_13834 = null;
var count__13830_13835 = 0;
var i__13831_13836 = 0;
while(true){
if((i__13831_13836 < count__13830_13835))
{var node_13837 = cljs.core._nth.call(null,chunk__13829_13834,i__13831_13836);
goog.events.removeAll(node_13837);
node_13837.innerHTML = value_13832;
{
var G__13838 = seq__13828_13833;
var G__13839 = chunk__13829_13834;
var G__13840 = count__13830_13835;
var G__13841 = (i__13831_13836 + 1);
seq__13828_13833 = G__13838;
chunk__13829_13834 = G__13839;
count__13830_13835 = G__13840;
i__13831_13836 = G__13841;
continue;
}
} else
{var temp__4092__auto___13842 = cljs.core.seq.call(null,seq__13828_13833);
if(temp__4092__auto___13842)
{var seq__13828_13843__$1 = temp__4092__auto___13842;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13828_13843__$1))
{var c__9640__auto___13844 = cljs.core.chunk_first.call(null,seq__13828_13843__$1);
{
var G__13845 = cljs.core.chunk_rest.call(null,seq__13828_13843__$1);
var G__13846 = c__9640__auto___13844;
var G__13847 = cljs.core.count.call(null,c__9640__auto___13844);
var G__13848 = 0;
seq__13828_13833 = G__13845;
chunk__13829_13834 = G__13846;
count__13830_13835 = G__13847;
i__13831_13836 = G__13848;
continue;
}
} else
{var node_13849 = cljs.core.first.call(null,seq__13828_13843__$1);
goog.events.removeAll(node_13849);
node_13849.innerHTML = value_13832;
{
var G__13850 = cljs.core.next.call(null,seq__13828_13843__$1);
var G__13851 = null;
var G__13852 = 0;
var G__13853 = 0;
seq__13828_13833 = G__13850;
chunk__13829_13834 = G__13851;
count__13830_13835 = G__13852;
i__13831_13836 = G__13853;
continue;
}
}
} else
{}
}
break;
}
}catch (e13827){if((e13827 instanceof Error))
{var e_13854 = e13827;
domina.replace_children_BANG_.call(null,content,value_13832);
} else
{if("\uFDD0:else")
{throw e13827;
} else
{}
}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){
if(cljs.core.string_QMARK_.call(null,inner_content))
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){
return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){
var m = domina.single_node.call(null,node).__domina_data;
var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);
if(cljs.core.truth_((function (){var and__3941__auto__ = bubble;
if(cljs.core.truth_(and__3941__auto__))
{return (value == null);
} else
{return and__3941__auto__;
}
})()))
{var temp__4092__auto__ = domina.single_node.call(null,node).parentNode;
if(cljs.core.truth_(temp__4092__auto__))
{var parent = temp__4092__auto__;
return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){
var m = (function (){var or__3943__auto__ = domina.single_node.call(null,node).__domina_data;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){
var parents = domina.nodes.call(null,parent_content);
var children = domina.nodes.call(null,child_content);
var first_child = (function (){var frag = document.createDocumentFragment();
var seq__13861_13865 = cljs.core.seq.call(null,children);
var chunk__13862_13866 = null;
var count__13863_13867 = 0;
var i__13864_13868 = 0;
while(true){
if((i__13864_13868 < count__13863_13867))
{var child_13869 = cljs.core._nth.call(null,chunk__13862_13866,i__13864_13868);
frag.appendChild(child_13869);
{
var G__13870 = seq__13861_13865;
var G__13871 = chunk__13862_13866;
var G__13872 = count__13863_13867;
var G__13873 = (i__13864_13868 + 1);
seq__13861_13865 = G__13870;
chunk__13862_13866 = G__13871;
count__13863_13867 = G__13872;
i__13864_13868 = G__13873;
continue;
}
} else
{var temp__4092__auto___13874 = cljs.core.seq.call(null,seq__13861_13865);
if(temp__4092__auto___13874)
{var seq__13861_13875__$1 = temp__4092__auto___13874;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13861_13875__$1))
{var c__9640__auto___13876 = cljs.core.chunk_first.call(null,seq__13861_13875__$1);
{
var G__13877 = cljs.core.chunk_rest.call(null,seq__13861_13875__$1);
var G__13878 = c__9640__auto___13876;
var G__13879 = cljs.core.count.call(null,c__9640__auto___13876);
var G__13880 = 0;
seq__13861_13865 = G__13877;
chunk__13862_13866 = G__13878;
count__13863_13867 = G__13879;
i__13864_13868 = G__13880;
continue;
}
} else
{var child_13881 = cljs.core.first.call(null,seq__13861_13875__$1);
frag.appendChild(child_13881);
{
var G__13882 = cljs.core.next.call(null,seq__13861_13875__$1);
var G__13883 = null;
var G__13884 = 0;
var G__13885 = 0;
seq__13861_13865 = G__13882;
chunk__13862_13866 = G__13883;
count__13863_13867 = G__13884;
i__13864_13868 = G__13885;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();
var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - 1),((function (parents,children,first_child){
return (function (){
return first_child.cloneNode(true);
});})(parents,children,first_child))
));
if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__13855_SHARP_,p2__13856_SHARP_){
return f.call(null,p1__13855_SHARP_,p2__13856_SHARP_);
}),cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){
return lazy_nl_via_item.call(null,nl,0);
});
var lazy_nl_via_item__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){
return lazy_nl_via_array_ref.call(null,nl,0);
});
var lazy_nl_via_array_ref__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){
if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){
var and__3941__auto__ = obj;
if(cljs.core.truth_(and__3941__auto__))
{return obj.length;
} else
{return and__3941__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){
if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__13887 = list_thing;
if(G__13887)
{if((function (){var or__3943__auto__ = (G__13887.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__13887.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__13887.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__13887);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__13887);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([list_thing], true));
} else
{return null;
}
}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){
if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__13888 = content;
if(G__13888)
{if((function (){var or__3943__auto__ = (G__13888.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__13888.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__13888.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__13888);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__13888);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([content], true));
} else
{return null;
}
}
}
}
}));
(domina.single_node["_"] = (function (content){
if((content == null))
{return null;
} else
{if((function (){var G__13889 = content;
if(G__13889)
{if((function (){var or__3943__auto__ = (G__13889.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__13889.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__13889.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__13889);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__13889);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item(0);
} else
{if("\uFDD0:default")
{return content;
} else
{return null;
}
}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){
return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){
return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
return domina.lazy_nodelist.call(null,coll);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
return coll.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
if((coll.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
return coll.length;
});
} else
{}
