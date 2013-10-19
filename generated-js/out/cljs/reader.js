goog.provide('cljs.reader');
goog.require('cljs.core');
goog.require('goog.string');
cljs.reader.PushbackReader = {};
cljs.reader.read_char = (function read_char(reader){
if((function (){var and__3941__auto__ = reader;
if(and__3941__auto__)
{return reader.cljs$reader$PushbackReader$read_char$arity$1;
} else
{return and__3941__auto__;
}
})())
{return reader.cljs$reader$PushbackReader$read_char$arity$1(reader);
} else
{var x__9515__auto__ = (((reader == null))?null:reader);
return (function (){var or__3943__auto__ = (cljs.reader.read_char[goog.typeOf(x__9515__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (cljs.reader.read_char["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("PushbackReader.read-char",reader);
}
}
})().call(null,reader);
}
});
cljs.reader.unread = (function unread(reader,ch){
if((function (){var and__3941__auto__ = reader;
if(and__3941__auto__)
{return reader.cljs$reader$PushbackReader$unread$arity$2;
} else
{return and__3941__auto__;
}
})())
{return reader.cljs$reader$PushbackReader$unread$arity$2(reader,ch);
} else
{var x__9515__auto__ = (((reader == null))?null:reader);
return (function (){var or__3943__auto__ = (cljs.reader.unread[goog.typeOf(x__9515__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (cljs.reader.unread["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol("PushbackReader.unread",reader);
}
}
})().call(null,reader,ch);
}
});
goog.provide('cljs.reader.StringPushbackReader');

/**
* @constructor
*/
cljs.reader.StringPushbackReader = (function (s,index_atom,buffer_atom){
this.s = s;
this.index_atom = index_atom;
this.buffer_atom = buffer_atom;
})
cljs.reader.StringPushbackReader.cljs$lang$type = true;
cljs.reader.StringPushbackReader.cljs$lang$ctorStr = "cljs.reader/StringPushbackReader";
cljs.reader.StringPushbackReader.cljs$lang$ctorPrWriter = (function (this__9456__auto__,writer__9457__auto__,opt__9458__auto__){
return cljs.core._write(writer__9457__auto__,"cljs.reader/StringPushbackReader");
});
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$ = true;
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$read_char$arity$1 = (function (reader){
var self__ = this;
if(cljs.core.empty_QMARK_(cljs.core.deref(self__.buffer_atom)))
{var idx = cljs.core.deref(self__.index_atom);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.index_atom,cljs.core.inc);
return (self__.s[idx]);
} else
{var buf = cljs.core.deref(self__.buffer_atom);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.buffer_atom,cljs.core.rest);
return cljs.core.first(buf);
}
});
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(self__.buffer_atom,(function (p1__12609_SHARP_){
return cljs.core.cons(ch,p1__12609_SHARP_);
}));
});
cljs.reader.__GT_StringPushbackReader = (function __GT_StringPushbackReader(s,index_atom,buffer_atom){
return (new cljs.reader.StringPushbackReader(s,index_atom,buffer_atom));
});
cljs.reader.push_back_reader = (function push_back_reader(s){
return (new cljs.reader.StringPushbackReader(s,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(0),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null)));
});
/**
* Checks whether a given character is whitespace
*/
cljs.reader.whitespace_QMARK_ = (function whitespace_QMARK_(ch){
var or__3943__auto__ = goog.string.isBreakingWhitespace(ch);
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return ("," === ch);
}
});
/**
* Checks whether a given character is numeric
*/
cljs.reader.numeric_QMARK_ = (function numeric_QMARK_(ch){
return goog.string.isNumeric(ch);
});
/**
* Checks whether the character begins a comment.
*/
cljs.reader.comment_prefix_QMARK_ = (function comment_prefix_QMARK_(ch){
return (";" === ch);
});
/**
* Checks whether the reader is at the start of a number literal
*/
cljs.reader.number_literal_QMARK_ = (function number_literal_QMARK_(reader,initch){
var or__3943__auto__ = cljs.reader.numeric_QMARK_(initch);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var and__3941__auto__ = (function (){var or__3943__auto____$1 = ("+" === initch);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return ("-" === initch);
}
})();
if(cljs.core.truth_(and__3941__auto__))
{return cljs.reader.numeric_QMARK_((function (){var next_ch = cljs.reader.read_char(reader);
cljs.reader.unread(reader,next_ch);
return next_ch;
})());
} else
{return and__3941__auto__;
}
}
});
/**
* @param {...*} var_args
*/
cljs.reader.reader_error = (function() { 
var reader_error__delegate = function (rdr,msg){
throw (new Error(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,msg)));
};
var reader_error = function (rdr,var_args){
var msg = null;
if (arguments.length > 1) {
  msg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return reader_error__delegate.call(this, rdr, msg);
};
reader_error.cljs$lang$maxFixedArity = 1;
reader_error.cljs$lang$applyTo = (function (arglist__12610){
var rdr = cljs.core.first(arglist__12610);
var msg = cljs.core.rest(arglist__12610);
return reader_error__delegate(rdr, msg);
});
reader_error.cljs$core$IFn$_invoke$arity$variadic = reader_error__delegate;
return reader_error;
})()
;
cljs.reader.macro_terminating_QMARK_ = (function macro_terminating_QMARK_(ch){
var and__3941__auto__ = !((ch === "#"));
if(and__3941__auto__)
{var and__3941__auto____$1 = !((ch === "'"));
if(and__3941__auto____$1)
{var and__3941__auto____$2 = !((ch === ":"));
if(and__3941__auto____$2)
{return (cljs.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.reader.macros.call(null,ch));
} else
{return and__3941__auto____$2;
}
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
});
cljs.reader.read_token = (function read_token(rdr,initch){
var sb = (new goog.string.StringBuffer(initch));
var ch = cljs.reader.read_char(rdr);
while(true){
if((function (){var or__3943__auto__ = (ch == null);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = cljs.reader.whitespace_QMARK_(ch);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return cljs.reader.macro_terminating_QMARK_(ch);
}
}
})())
{cljs.reader.unread(rdr,ch);
return sb.toString();
} else
{{
var G__12611 = (function (){sb.append(ch);
return sb;
})();
var G__12612 = cljs.reader.read_char(rdr);
sb = G__12611;
ch = G__12612;
continue;
}
}
break;
}
});
/**
* Advances the reader to the end of a line. Returns the reader
*/
cljs.reader.skip_line = (function skip_line(reader,_){
while(true){
var ch = cljs.reader.read_char(reader);
if((function (){var or__3943__auto__ = (ch === "n");
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (ch === "r");
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return (ch == null);
}
}
})())
{return reader;
} else
{{
continue;
}
}
break;
}
});
cljs.reader.int_pattern = cljs.core.re_pattern("([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?");
cljs.reader.ratio_pattern = cljs.core.re_pattern("([-+]?[0-9]+)/([0-9]+)");
cljs.reader.float_pattern = cljs.core.re_pattern("([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?");
cljs.reader.symbol_pattern = cljs.core.re_pattern("[:]?([^0-9/].*/)?([^0-9/][^/]*)");
cljs.reader.re_find_STAR_ = (function re_find_STAR_(re,s){
var matches = re.exec(s);
if((matches == null))
{return null;
} else
{if((matches.length === 1))
{return (matches[0]);
} else
{return matches;
}
}
});
cljs.reader.match_int = (function match_int(s){
var groups = cljs.reader.re_find_STAR_(cljs.reader.int_pattern,s);
var group3 = (groups[2]);
if(!((function (){var or__3943__auto__ = (group3 == null);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return (group3.length < 1);
}
})()))
{return 0;
} else
{var negate = ((("-" === (groups[1])))?-1:1);
var a = (cljs.core.truth_((groups[3]))?[(groups[3]),10]:(cljs.core.truth_((groups[4]))?[(groups[4]),16]:(cljs.core.truth_((groups[5]))?[(groups[5]),8]:(cljs.core.truth_((groups[7]))?[(groups[7]),parseInt((groups[7]))]:(("\uFDD0:default")?[null,null]:null)))));
var n = (a[0]);
var radix = (a[1]);
if((n == null))
{return null;
} else
{return (negate * parseInt(n,radix));
}
}
});
cljs.reader.match_ratio = (function match_ratio(s){
var groups = cljs.reader.re_find_STAR_(cljs.reader.ratio_pattern,s);
var numinator = (groups[1]);
var denominator = (groups[2]);
return (parseInt(numinator) / parseInt(denominator));
});
cljs.reader.match_float = (function match_float(s){
return parseFloat(s);
});
cljs.reader.re_matches_STAR_ = (function re_matches_STAR_(re,s){
var matches = re.exec(s);
if((function (){var and__3941__auto__ = !((matches == null));
if(and__3941__auto__)
{return ((matches[0]) === s);
} else
{return and__3941__auto__;
}
})())
{if((matches.length === 1))
{return (matches[0]);
} else
{return matches;
}
} else
{return null;
}
});
cljs.reader.match_number = (function match_number(s){
if(cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.int_pattern,s)))
{return cljs.reader.match_int(s);
} else
{if(cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.ratio_pattern,s)))
{return cljs.reader.match_ratio(s);
} else
{if(cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.float_pattern,s)))
{return cljs.reader.match_float(s);
} else
{return null;
}
}
}
});
cljs.reader.escape_char_map = (function escape_char_map(c){
if((c === "t"))
{return "\t";
} else
{if((c === "r"))
{return "\r";
} else
{if((c === "n"))
{return "\n";
} else
{if((c === "\\"))
{return "\\";
} else
{if((c === "\""))
{return "\"";
} else
{if((c === "b"))
{return "\b";
} else
{if((c === "f"))
{return "\f";
} else
{if("\uFDD0:else")
{return null;
} else
{return null;
}
}
}
}
}
}
}
}
});
cljs.reader.read_2_chars = (function read_2_chars(reader){
return (new goog.string.StringBuffer(cljs.reader.read_char(reader),cljs.reader.read_char(reader))).toString();
});
cljs.reader.read_4_chars = (function read_4_chars(reader){
return (new goog.string.StringBuffer(cljs.reader.read_char(reader),cljs.reader.read_char(reader),cljs.reader.read_char(reader),cljs.reader.read_char(reader))).toString();
});
cljs.reader.unicode_2_pattern = cljs.core.re_pattern("[0-9A-Fa-f]{2}");
cljs.reader.unicode_4_pattern = cljs.core.re_pattern("[0-9A-Fa-f]{4}");
cljs.reader.validate_unicode_escape = (function validate_unicode_escape(unicode_pattern,reader,escape_char,unicode_str){
if(cljs.core.truth_(cljs.core.re_matches(unicode_pattern,unicode_str)))
{return unicode_str;
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Unexpected unicode escape \\",escape_char,unicode_str], 0));
}
});
cljs.reader.make_unicode_char = (function make_unicode_char(code_str){
var code = parseInt(code_str,16);
return String.fromCharCode(code);
});
cljs.reader.escape_char = (function escape_char(buffer,reader){
var ch = cljs.reader.read_char(reader);
var mapresult = cljs.reader.escape_char_map(ch);
if(cljs.core.truth_(mapresult))
{return mapresult;
} else
{if((ch === "x"))
{return cljs.reader.make_unicode_char(cljs.reader.validate_unicode_escape(cljs.reader.unicode_2_pattern,reader,ch,cljs.reader.read_2_chars(reader)));
} else
{if((ch === "u"))
{return cljs.reader.make_unicode_char(cljs.reader.validate_unicode_escape(cljs.reader.unicode_4_pattern,reader,ch,cljs.reader.read_4_chars(reader)));
} else
{if(cljs.reader.numeric_QMARK_(ch))
{return String.fromCharCode(ch);
} else
{if("\uFDD0:else")
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Unexpected unicode escape \\",ch], 0));
} else
{return null;
}
}
}
}
}
});
/**
* Read until first character that doesn't match pred, returning
* char.
*/
cljs.reader.read_past = (function read_past(pred,rdr){
var ch = cljs.reader.read_char(rdr);
while(true){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(ch) : pred.call(null,ch))))
{{
var G__12613 = cljs.reader.read_char(rdr);
ch = G__12613;
continue;
}
} else
{return ch;
}
break;
}
});
cljs.reader.read_delimited_list = (function read_delimited_list(delim,rdr,recursive_QMARK_){
var a = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
var ch = cljs.reader.read_past(cljs.reader.whitespace_QMARK_,rdr);
if(cljs.core.truth_(ch))
{} else
{cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading"], 0));
}
if((delim === ch))
{return cljs.core.persistent_BANG_(a);
} else
{var temp__4090__auto__ = (cljs.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.reader.macros.call(null,ch));
if(cljs.core.truth_(temp__4090__auto__))
{var macrofn = temp__4090__auto__;
var mret = (macrofn.cljs$core$IFn$_invoke$arity$2 ? macrofn.cljs$core$IFn$_invoke$arity$2(rdr,ch) : macrofn.call(null,rdr,ch));
{
var G__12614 = (((mret === rdr))?a:cljs.core.conj_BANG_(a,mret));
a = G__12614;
continue;
}
} else
{cljs.reader.unread(rdr,ch);
var o = (cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(rdr,true,null,recursive_QMARK_) : cljs.reader.read.call(null,rdr,true,null,recursive_QMARK_));
{
var G__12615 = (((o === rdr))?a:cljs.core.conj_BANG_(a,o));
a = G__12615;
continue;
}
}
}
break;
}
});
cljs.reader.not_implemented = (function not_implemented(rdr,ch){
return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Reader for ",ch," not implemented yet"], 0));
});
cljs.reader.read_dispatch = (function read_dispatch(rdr,_){
var ch = cljs.reader.read_char(rdr);
var dm = (cljs.reader.dispatch_macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.dispatch_macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.reader.dispatch_macros.call(null,ch));
if(cljs.core.truth_(dm))
{return (dm.cljs$core$IFn$_invoke$arity$2 ? dm.cljs$core$IFn$_invoke$arity$2(rdr,_) : dm.call(null,rdr,_));
} else
{var temp__4090__auto__ = (cljs.reader.maybe_read_tagged_type.cljs$core$IFn$_invoke$arity$2 ? cljs.reader.maybe_read_tagged_type.cljs$core$IFn$_invoke$arity$2(rdr,ch) : cljs.reader.maybe_read_tagged_type.call(null,rdr,ch));
if(cljs.core.truth_(temp__4090__auto__))
{var obj = temp__4090__auto__;
return obj;
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["No dispatch macro for ",ch], 0));
}
}
});
cljs.reader.read_unmatched_delimiter = (function read_unmatched_delimiter(rdr,ch){
return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Unmached delimiter ",ch], 0));
});
cljs.reader.read_list = (function read_list(rdr,_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list,cljs.reader.read_delimited_list(")",rdr,true));
});
cljs.reader.read_comment = cljs.reader.skip_line;
cljs.reader.read_vector = (function read_vector(rdr,_){
return cljs.reader.read_delimited_list("]",rdr,true);
});
cljs.reader.read_map = (function read_map(rdr,_){
var l = cljs.reader.read_delimited_list("}",rdr,true);
if(cljs.core.odd_QMARK_(cljs.core.count(l)))
{cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Map literal must contain an even number of forms"], 0));
} else
{}
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,l);
});
cljs.reader.read_number = (function read_number(reader,initch){
var buffer = (new goog.string.StringBuffer(initch));
var ch = cljs.reader.read_char(reader);
while(true){
if(cljs.core.truth_((function (){var or__3943__auto__ = (ch == null);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = cljs.reader.whitespace_QMARK_(ch);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return (cljs.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.reader.macros.call(null,ch));
}
}
})()))
{cljs.reader.unread(reader,ch);
var s = buffer.toString();
var or__3943__auto__ = cljs.reader.match_number(s);
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Invalid number format [",s,"]"], 0));
}
} else
{{
var G__12616 = (function (){buffer.append(ch);
return buffer;
})();
var G__12617 = cljs.reader.read_char(reader);
buffer = G__12616;
ch = G__12617;
continue;
}
}
break;
}
});
cljs.reader.read_string_STAR_ = (function read_string_STAR_(reader,_){
var buffer = (new goog.string.StringBuffer());
var ch = cljs.reader.read_char(reader);
while(true){
if((ch == null))
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["EOF while reading"], 0));
} else
{if(("\\" === ch))
{{
var G__12618 = (function (){buffer.append(cljs.reader.escape_char(buffer,reader));
return buffer;
})();
var G__12619 = cljs.reader.read_char(reader);
buffer = G__12618;
ch = G__12619;
continue;
}
} else
{if(("\"" === ch))
{return buffer.toString();
} else
{if("\uFDD0:default")
{{
var G__12620 = (function (){buffer.append(ch);
return buffer;
})();
var G__12621 = cljs.reader.read_char(reader);
buffer = G__12620;
ch = G__12621;
continue;
}
} else
{return null;
}
}
}
}
break;
}
});
cljs.reader.special_symbols = (function special_symbols(t,not_found){
if((t === "nil"))
{return null;
} else
{if((t === "true"))
{return true;
} else
{if((t === "false"))
{return false;
} else
{if("\uFDD0:else")
{return not_found;
} else
{return null;
}
}
}
}
});
cljs.reader.read_symbol = (function read_symbol(reader,initch){
var token = cljs.reader.read_token(reader,initch);
if(cljs.core.truth_(goog.string.contains(token,"/")))
{return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(token,0,token.indexOf("/")),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(token,(token.indexOf("/") + 1),token.length));
} else
{return cljs.reader.special_symbols(token,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(token));
}
});
cljs.reader.read_keyword = (function read_keyword(reader,initch){
var token = cljs.reader.read_token(reader,cljs.reader.read_char(reader));
var a = cljs.reader.re_matches_STAR_(cljs.reader.symbol_pattern,token);
var token__$1 = (a[0]);
var ns = (a[1]);
var name = (a[2]);
if(cljs.core.truth_((function (){var or__3943__auto__ = (function (){var and__3941__auto__ = !((void 0 === ns));
if(and__3941__auto__)
{return (ns.substring((ns.length - 2),ns.length) === ":/");
} else
{return and__3941__auto__;
}
})();
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = ((name[(name.length - 1)]) === ":");
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return !((token__$1.indexOf("::",1) === -1));
}
}
})()))
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Invalid token: ",token__$1], 0));
} else
{if((function (){var and__3941__auto__ = !((ns == null));
if(and__3941__auto__)
{return (ns.length > 0);
} else
{return and__3941__auto__;
}
})())
{return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns.substring(0,ns.indexOf("/")),name);
} else
{return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(token__$1);
}
}
});
cljs.reader.desugar_meta = (function desugar_meta(f){
if((f instanceof cljs.core.Symbol))
{return cljs.core.PersistentArrayMap.fromArray(["\uFDD0:tag",f], true);
} else
{if(cljs.core.string_QMARK_(f))
{return cljs.core.PersistentArrayMap.fromArray(["\uFDD0:tag",f], true);
} else
{if(cljs.core.keyword_QMARK_(f))
{return cljs.core.PersistentArrayMap.fromArray([f,true], true);
} else
{if("\uFDD0:else")
{return f;
} else
{return null;
}
}
}
}
});
cljs.reader.wrapping_reader = (function wrapping_reader(sym){
return (function (rdr,_){
return cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([sym,(cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(rdr,true,null,true) : cljs.reader.read.call(null,rdr,true,null,true))], 0));
});
});
cljs.reader.throwing_reader = (function throwing_reader(msg){
return (function (rdr,_){
return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq([msg], 0));
});
});
cljs.reader.read_meta = (function read_meta(rdr,_){
var m = cljs.reader.desugar_meta((cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(rdr,true,null,true) : cljs.reader.read.call(null,rdr,true,null,true)));
if(cljs.core.map_QMARK_(m))
{} else
{cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Metadata must be Symbol,Keyword,String or Map"], 0));
}
var o = (cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(rdr,true,null,true) : cljs.reader.read.call(null,rdr,true,null,true));
if((function (){var G__12623 = o;
if(G__12623)
{if((function (){var or__3943__auto__ = (G__12623.cljs$lang$protocol_mask$partition0$ & 262144);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__12623.cljs$core$IWithMeta$;
}
})())
{return true;
} else
{if((!G__12623.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_(cljs.core.IWithMeta,G__12623);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_(cljs.core.IWithMeta,G__12623);
}
})())
{return cljs.core.with_meta(o,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.meta(o),m], 0)));
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Metadata can only be applied to IWithMetas"], 0));
}
});
cljs.reader.read_set = (function read_set(rdr,_){
return cljs.core.set(cljs.reader.read_delimited_list("}",rdr,true));
});
cljs.reader.read_regex = (function read_regex(rdr,ch){
return cljs.core.re_pattern(cljs.reader.read_string_STAR_(rdr,ch));
});
cljs.reader.read_discard = (function read_discard(rdr,_){
(cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(rdr,true,null,true) : cljs.reader.read.call(null,rdr,true,null,true));
return rdr;
});
cljs.reader.macros = (function macros(c){
if((c === "\""))
{return cljs.reader.read_string_STAR_;
} else
{if((c === ":"))
{return cljs.reader.read_keyword;
} else
{if((c === ";"))
{return cljs.reader.not_implemented;
} else
{if((c === "'"))
{return cljs.reader.wrapping_reader(new cljs.core.Symbol(null,"quote","quote",-1532577739,null));
} else
{if((c === "@"))
{return cljs.reader.wrapping_reader(new cljs.core.Symbol(null,"deref","deref",-1545057749,null));
} else
{if((c === "^"))
{return cljs.reader.read_meta;
} else
{if((c === "`"))
{return cljs.reader.not_implemented;
} else
{if((c === "~"))
{return cljs.reader.not_implemented;
} else
{if((c === "("))
{return cljs.reader.read_list;
} else
{if((c === ")"))
{return cljs.reader.read_unmatched_delimiter;
} else
{if((c === "["))
{return cljs.reader.read_vector;
} else
{if((c === "]"))
{return cljs.reader.read_unmatched_delimiter;
} else
{if((c === "{"))
{return cljs.reader.read_map;
} else
{if((c === "}"))
{return cljs.reader.read_unmatched_delimiter;
} else
{if((c === "\\"))
{return cljs.reader.read_char;
} else
{if((c === "%"))
{return cljs.reader.not_implemented;
} else
{if((c === "#"))
{return cljs.reader.read_dispatch;
} else
{if("\uFDD0:else")
{return null;
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
cljs.reader.dispatch_macros = (function dispatch_macros(s){
if((s === "{"))
{return cljs.reader.read_set;
} else
{if((s === "<"))
{return cljs.reader.throwing_reader("Unreadable form");
} else
{if((s === "\""))
{return cljs.reader.read_regex;
} else
{if((s === "!"))
{return cljs.reader.read_comment;
} else
{if((s === "_"))
{return cljs.reader.read_discard;
} else
{if("\uFDD0:else")
{return null;
} else
{return null;
}
}
}
}
}
}
});
/**
* Reads the first object from a PushbackReader. Returns the object read.
* If EOF, throws if eof-is-error is true. Otherwise returns sentinel.
*/
cljs.reader.read = (function read(reader,eof_is_error,sentinel,is_recursive){
while(true){
var ch = cljs.reader.read_char(reader);
if((ch == null))
{if(cljs.core.truth_(eof_is_error))
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["EOF while reading"], 0));
} else
{return sentinel;
}
} else
{if(cljs.reader.whitespace_QMARK_(ch))
{{
var G__12624 = reader;
var G__12625 = eof_is_error;
var G__12626 = sentinel;
var G__12627 = is_recursive;
reader = G__12624;
eof_is_error = G__12625;
sentinel = G__12626;
is_recursive = G__12627;
continue;
}
} else
{if(cljs.reader.comment_prefix_QMARK_(ch))
{{
var G__12628 = (cljs.reader.read_comment.cljs$core$IFn$_invoke$arity$2 ? cljs.reader.read_comment.cljs$core$IFn$_invoke$arity$2(reader,ch) : cljs.reader.read_comment.call(null,reader,ch));
var G__12629 = eof_is_error;
var G__12630 = sentinel;
var G__12631 = is_recursive;
reader = G__12628;
eof_is_error = G__12629;
sentinel = G__12630;
is_recursive = G__12631;
continue;
}
} else
{if("\uFDD0:else")
{var f = cljs.reader.macros(ch);
var res = (cljs.core.truth_(f)?(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(reader,ch) : f.call(null,reader,ch)):((cljs.reader.number_literal_QMARK_(reader,ch))?cljs.reader.read_number(reader,ch):(("\uFDD0:else")?cljs.reader.read_symbol(reader,ch):null)));
if((res === reader))
{{
var G__12632 = reader;
var G__12633 = eof_is_error;
var G__12634 = sentinel;
var G__12635 = is_recursive;
reader = G__12632;
eof_is_error = G__12633;
sentinel = G__12634;
is_recursive = G__12635;
continue;
}
} else
{return res;
}
} else
{return null;
}
}
}
}
break;
}
});
/**
* Reads one object from the string s
*/
cljs.reader.read_string = (function read_string(s){
var r = cljs.reader.push_back_reader(s);
return cljs.reader.read(r,true,null,false);
});
cljs.reader.zero_fill_right = (function zero_fill_right(s,width){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(width,cljs.core.count(s)))
{return s;
} else
{if((width < cljs.core.count(s)))
{return s.substring(0,width);
} else
{if("\uFDD0:else")
{var b = (new goog.string.StringBuffer(s));
while(true){
if((b.getLength() < width))
{{
var G__12636 = b.append("0");
b = G__12636;
continue;
}
} else
{return b.toString();
}
break;
}
} else
{return null;
}
}
}
});
cljs.reader.divisible_QMARK_ = (function divisible_QMARK_(num,div){
return (cljs.core.mod(num,div) === 0);
});
cljs.reader.indivisible_QMARK_ = (function indivisible_QMARK_(num,div){
return cljs.core.not(cljs.reader.divisible_QMARK_(num,div));
});
cljs.reader.leap_year_QMARK_ = (function leap_year_QMARK_(year){
var and__3941__auto__ = cljs.reader.divisible_QMARK_(year,4);
if(cljs.core.truth_(and__3941__auto__))
{var or__3943__auto__ = cljs.reader.indivisible_QMARK_(year,100);
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.reader.divisible_QMARK_(year,400);
}
} else
{return and__3941__auto__;
}
});
cljs.reader.days_in_month = (function (){var dim_norm = cljs.core.PersistentVector.fromArray([null,31,28,31,30,31,30,31,31,30,31,30,31], true);
var dim_leap = cljs.core.PersistentVector.fromArray([null,31,29,31,30,31,30,31,31,30,31,30,31], true);
return (function (month,leap_year_QMARK_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.truth_(leap_year_QMARK_)?dim_leap:dim_norm),month);
});
})();
cljs.reader.parse_and_validate_timestamp = (function (){var timestamp = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?/;
var check = ((function (timestamp){
return (function (low,n,high,msg){
if((function (){var and__3941__auto__ = (low <= n);
if(and__3941__auto__)
{return (n <= high);
} else
{return and__3941__auto__;
}
})())
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str(msg),cljs.core.str(" Failed:  "),cljs.core.str(low),cljs.core.str("<="),cljs.core.str(n),cljs.core.str("<="),cljs.core.str(high)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null,"<=","<=",-1640529606,null),new cljs.core.Symbol(null,"low","low",-1640424179,null),new cljs.core.Symbol(null,"n","n",-1640531417,null),new cljs.core.Symbol(null,"high","high",-1637329061,null))], 0)))].join('')));
}
return n;
});})(timestamp))
;
return (function (ts){
var temp__4092__auto__ = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,cljs.core.split_at(8,cljs.core.re_matches(timestamp,ts)));
if(cljs.core.truth_(temp__4092__auto__))
{var vec__12641 = temp__4092__auto__;
var vec__12642 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12641,0,null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,0,null);
var years = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,1,null);
var months = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,2,null);
var days = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,3,null);
var hours = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,4,null);
var minutes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,5,null);
var seconds = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,6,null);
var milliseconds = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12642,7,null);
var vec__12643 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12641,1,null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12643,0,null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12643,1,null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12643,2,null);
var V = vec__12641;
var vec__12644 = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (v){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__12640_SHARP_){
return parseInt(p1__12640_SHARP_,10);
}),v);
}),cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (p1__12638_SHARP_,p2__12637_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(p2__12637_SHARP_,cljs.core.PersistentVector.fromArray([0], true),p1__12638_SHARP_);
}),cljs.core.PersistentVector.fromArray([cljs.core.constantly(null),(function (p1__12639_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__12639_SHARP_,"-"))
{return "-1";
} else
{return "1";
}
})], true),V));
var vec__12645 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12644,0,null);
var ___$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,0,null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,1,null);
var mo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,2,null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,3,null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,4,null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,5,null);
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,6,null);
var ms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12645,7,null);
var vec__12646 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12644,1,null);
var offset_sign = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12646,0,null);
var offset_hours = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12646,1,null);
var offset_minutes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12646,2,null);
var offset = (offset_sign * ((offset_hours * 60) + offset_minutes));
return cljs.core.PersistentVector.fromArray([((cljs.core.not(years))?1970:y),((cljs.core.not(months))?1:check(1,mo,12,"timestamp month field must be in range 1..12")),((cljs.core.not(days))?1:check(1,d,(cljs.reader.days_in_month.cljs$core$IFn$_invoke$arity$2 ? cljs.reader.days_in_month.cljs$core$IFn$_invoke$arity$2(mo,cljs.reader.leap_year_QMARK_(y)) : cljs.reader.days_in_month.call(null,mo,cljs.reader.leap_year_QMARK_(y))),"timestamp day field must be in range 1..last day in month")),((cljs.core.not(hours))?0:check(0,h,23,"timestamp hour field must be in range 0..23")),((cljs.core.not(minutes))?0:check(0,m,59,"timestamp minute field must be in range 0..59")),((cljs.core.not(seconds))?0:check(0,s,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(m,59))?60:59),"timestamp second field must be in range 0..60")),((cljs.core.not(milliseconds))?0:check(0,ms,999,"timestamp millisecond field must be in range 0..999")),offset], true);
} else
{return null;
}
});
})();
cljs.reader.parse_timestamp = (function parse_timestamp(ts){
var temp__4090__auto__ = (cljs.reader.parse_and_validate_timestamp.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.parse_and_validate_timestamp.cljs$core$IFn$_invoke$arity$1(ts) : cljs.reader.parse_and_validate_timestamp.call(null,ts));
if(cljs.core.truth_(temp__4090__auto__))
{var vec__12648 = temp__4090__auto__;
var years = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,0,null);
var months = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,1,null);
var days = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,2,null);
var hours = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,3,null);
var minutes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,4,null);
var seconds = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,5,null);
var ms = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,6,null);
var offset = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12648,7,null);
return (new Date((Date.UTC(years,(months - 1),days,hours,minutes,seconds,ms) - ((offset * 60) * 1000))));
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq([[cljs.core.str("Unrecognized date/time syntax: "),cljs.core.str(ts)].join('')], 0));
}
});
cljs.reader.read_date = (function read_date(s){
if(cljs.core.string_QMARK_(s))
{return cljs.reader.parse_timestamp(s);
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq(["Instance literal expects a string for its timestamp."], 0));
}
});
cljs.reader.read_queue = (function read_queue(elems){
if(cljs.core.vector_QMARK_(elems))
{return cljs.core.into(cljs.core.PersistentQueue.EMPTY,elems);
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq(["Queue literal expects a vector for its elements."], 0));
}
});
cljs.reader.read_uuid = (function read_uuid(uuid){
if(cljs.core.string_QMARK_(uuid))
{return (new cljs.core.UUID(uuid));
} else
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq(["UUID literal expects a string as its representation."], 0));
}
});
cljs.reader._STAR_tag_table_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.fromArray(["inst",cljs.reader.read_date,"uuid",cljs.reader.read_uuid,"queue",cljs.reader.read_queue], true));
cljs.reader._STAR_default_data_reader_fn_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.reader.maybe_read_tagged_type = (function maybe_read_tagged_type(rdr,initch){
var tag = cljs.reader.read_symbol(rdr,initch);
var pfn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_),[cljs.core.str(tag)].join(''));
var dfn = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
if(cljs.core.truth_(pfn))
{return (pfn.cljs$core$IFn$_invoke$arity$1 ? pfn.cljs$core$IFn$_invoke$arity$1(cljs.reader.read(rdr,true,null,false)) : pfn.call(null,cljs.reader.read(rdr,true,null,false)));
} else
{if(cljs.core.truth_(dfn))
{return (dfn.cljs$core$IFn$_invoke$arity$2 ? dfn.cljs$core$IFn$_invoke$arity$2(tag,cljs.reader.read(rdr,true,null,false)) : dfn.call(null,tag,cljs.reader.read(rdr,true,null,false)));
} else
{if("\uFDD0:else")
{return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Could not find tag parser for ",[cljs.core.str(tag)].join('')," in ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.keys(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_))], 0))], 0));
} else
{return null;
}
}
}
});
cljs.reader.register_tag_parser_BANG_ = (function register_tag_parser_BANG_(tag,f){
var tag__$1 = [cljs.core.str(tag)].join('');
var old_parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_),tag__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.reader._STAR_tag_table_STAR_,cljs.core.assoc,tag__$1,f);
return old_parser;
});
cljs.reader.deregister_tag_parser_BANG_ = (function deregister_tag_parser_BANG_(tag){
var tag__$1 = [cljs.core.str(tag)].join('');
var old_parser = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_),tag__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs.reader._STAR_tag_table_STAR_,cljs.core.dissoc,tag__$1);
return old_parser;
});
cljs.reader.register_default_tag_parser_BANG_ = (function register_default_tag_parser_BANG_(f){
var old_parser = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.reader._STAR_default_data_reader_fn_STAR_,(function (_){
return f;
}));
return old_parser;
});
cljs.reader.deregister_default_tag_parser_BANG_ = (function deregister_default_tag_parser_BANG_(){
var old_parser = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.reader._STAR_default_data_reader_fn_STAR_,(function (_){
return null;
}));
return old_parser;
});
