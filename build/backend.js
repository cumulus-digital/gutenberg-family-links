!function(){"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var t=window.wp.element;function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,l=new Array(t);n<t;n++)l[n]=e[n];return l}function l(e,t){if(e){if("string"==typeof e)return n(e,t);var l=Object.prototype.toString.call(e).slice(8,-1);return"Object"===l&&e.constructor&&(l=e.constructor.name),"Map"===l||"Set"===l?Array.from(e):"Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?n(e,t):void 0}}function r(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var l,r,o=[],_n=!0,a=!1;try{for(n=n.call(e);!(_n=(l=n.next()).done)&&(o.push(l.value),!t||o.length!==t);_n=!0);}catch(e){a=!0,r=e}finally{try{_n||null==n.return||n.return()}finally{if(a)throw r}}return o}}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var a=window.lodash;function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function u(t){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{};n%2?i(Object(l),!0).forEach((function(n){e(t,n,l[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):i(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}var c=wp.components.ComboboxControl,s=wp.element,d=s.useState,p=s.useMemo,m=wp.data,h=m.useSelect,g=(m.useDispatch,wp.htmlEntities.decodeEntities),v=wp.coreData.store;function f(e){var t;return null!=e&&null!==(t=e.title)&&void 0!==t&&t.rendered?g(e.title.rendered):"#".concat(e.id," (").concat(__("no title"),")")}var y=function(e,t){var n=(0,a.deburr)(e).toLowerCase(),l=(0,a.deburr)(t).toLowerCase();return n===l?0:n.startsWith(l)?n.length:1/0},b=function(e){var n=o(d(!1),2),l=n[0],i=n[1],s=h((function(t){var n=t(v),r=n.getPostType,o=n.getEntityRecords,i=n.getEntityRecord,u=wp.data.select("core/editor").getCurrentPostType(),c=e.parentPostId,s=r(u),d=(0,a.get)(s,["hierarchical"],!1),p={per_page:100,orderby:"menu_order",order:"asc",_fields:"id,title,parent"};return l&&(p.search=l),{parentPostId:c,parentPost:c?i("postType",u,c):null,items:d?o("postType",u,p):[],postType:s}}),[l]),m=s.parentPost,g=(s.parentPostId,s.items),b=s.postType,w=(0,a.get)(b,["hierarchical"],!1),C=e.label||"Select a Page or Post",E=e.help||null,P=g||[],x=p((function(){var t,n,i=P.map((function(e){return{id:e.id,parent:e.parent,name:f(e)}}));l||(t=i.map((function(e){return u({children:[],parent:null},e)})),i=(n=(0,a.groupBy)(t,"parent")).null&&n.null.length?t:function e(t){return t.map((function(t){var l=n[t.id];return u(u({},t),{},{children:l&&l.length?e(l):[]})}))}(n[0]||[]));var c=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=t.map((function(t){return[{value:t.id,label:(0,a.repeat)("— ",n)+(0,a.unescape)(t.name),rawName:t.name}].concat(r(e(t.children||[],n+1)))})),u=i.sort((function(e,t){var n=o(e,1)[0],r=o(t,1)[0];return y(n.rawName,l)>=y(r.rawName,l)?1:-1}));return(0,a.flatten)(u)}(i),s=(0,a.find)(c,(function(t){return t.value===e.parentPostId}));return m&&!s&&c.unshift({value:e.parentPostId,label:f(m)}),c}),[P,l]);return w&&C?(0,t.createElement)(c,{className:"editor-page-attributes__parent",label:C,help:E,value:e.parentPostId,options:x,onFilterValueChange:(0,a.debounce)((function(e){i(e)}),300),onChange:function(t){e.onChange&&e.onChange(t)}}):null},w=JSON.parse('{"name":"cumulus-gutenberg/family-links","apiVersion":2,"title":"Family Links","description":"Insert links to a page\'s children or siblings","keywords":["family","parent","child","children","sibling"],"icon":{"src":"admin-links","foreground":"#00588d"},"category":"cmls","attributes":{"align":{"type":"string"},"parentPostId":{"type":"integer","default":0},"showCurrentChildren":{"type":"boolean","default":true},"maxDepth":{"type":"integer","default":0},"excludeNoindex":{"type":"boolean","default":true},"excludeAdditionalIDs":{"type":"string","default":""},"displayType":{"type":"string","enum":["plain","bullets","square","numbered","custom"],"default":"plain"},"customBullet":{"type":"string","default":null},"itemMargin":{"type":"object","default":{"top":null,"right":null,"bottom":null,"left":null}},"childrenMargin":{"type":"object","default":{"top":null,"right":null,"bottom":null,"left":"1em"}},"bulletColor":{"type":"string","default":null},"underlineLinks":{"type":"boolean","default":true},"underlineOnHover":{"type":"boolean","default":true},"linkColor":{"type":"string","default":null},"linkColorHover":{"type":"string","default":null},"textAlign":{"type":"string","default":null},"fontWeight":{"type":"string","default":null},"fontStyle":{"type":"string","default":null},"highlightCurrent":{"type":"boolean","default":true},"currentFontSize":{"type":"string","default":null},"currentFontWeight":{"type":"string","default":"bold"},"currentUnderlineLinks":{"type":"boolean","default":true},"currentUnderlineOnHover":{"type":"boolean","default":true},"currentLinkColor":{"type":"string","default":null},"currentLinkColorHover":{"type":"string","default":null}},"supports":{"align":false,"anchor":false,"className":true,"spacing":{"padding":true,"margin":true,"blockGap":true},"typography":{"align":true,"fontSize":true,"lineHeight":false,"fontWeight":true,"textTransform":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true}}}'),C=window.wp.primitives,E=(0,t.createElement)(C.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(C.Path,{d:"M6.1 6.8L2.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H6.1zm-.8 6.8L7 8.9l1.7 4.7H5.3zm15.1-.7c-.4-.5-.9-.8-1.6-1 .4-.2.7-.5.8-.9.2-.4.3-.9.3-1.4 0-.9-.3-1.6-.8-2-.6-.5-1.3-.7-2.4-.7h-3.5V18h4.2c1.1 0 2-.3 2.6-.8.6-.6 1-1.4 1-2.4-.1-.8-.3-1.4-.6-1.9zm-5.7-4.7h1.8c.6 0 1.1.1 1.4.4.3.2.5.7.5 1.3 0 .6-.2 1.1-.5 1.3-.3.2-.8.4-1.4.4h-1.8V8.2zm4 8c-.4.3-.9.5-1.5.5h-2.6v-3.8h2.6c1.4 0 2 .6 2 1.9.1.6-.1 1-.5 1.4z"})),P=(0,t.createElement)(C.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(C.Path,{d:"M11 16.8c-.1-.1-.2-.3-.3-.5v-2.6c0-.9-.1-1.7-.3-2.2-.2-.5-.5-.9-.9-1.2-.4-.2-.9-.3-1.6-.3-.5 0-1 .1-1.5.2s-.9.3-1.2.6l.2 1.2c.4-.3.7-.4 1.1-.5.3-.1.7-.2 1-.2.6 0 1 .1 1.3.4.3.2.4.7.4 1.4-1.2 0-2.3.2-3.3.7s-1.4 1.1-1.4 2.1c0 .7.2 1.2.7 1.6.4.4 1 .6 1.8.6.9 0 1.7-.4 2.4-1.2.1.3.2.5.4.7.1.2.3.3.6.4.3.1.6.1 1.1.1h.1l.2-1.2h-.1c-.4.1-.6 0-.7-.1zM9.2 16c-.2.3-.5.6-.9.8-.3.1-.7.2-1.1.2-.4 0-.7-.1-.9-.3-.2-.2-.3-.5-.3-.9 0-.6.2-1 .7-1.3.5-.3 1.3-.4 2.5-.5v2zm10.6-3.9c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2s-.2 1.4-.6 2z"})),x=(0,t.createElement)(C.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(C.Path,{d:"M7.1 6.8L3.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H7.1zm-.8 6.8L8 8.9l1.7 4.7H6.3zm14.5-1.5c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2 .1.8-.2 1.4-.6 2z"})),k=(0,t.createElement)(C.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(C.Path,{d:"M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"})),O=(0,t.createElement)(C.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,t.createElement)(C.Path,{d:"M12.5 5L10 19h1.9l2.5-14z"}));function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function I(t){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{};n%2?S(Object(l),!0).forEach((function(n){e(t,n,l[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):S(Object(l)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(l,e))}))}return t}var T=wp.blocks.registerBlockType,z=wp.serverSideRender,L=wp.components,j=L.Disabled,A=L.Panel,H=L.PanelBody,D=L.PanelRow,M=L.ToggleControl,B=L.SelectControl,F=L.RangeControl,_=L.__experimentalUnitControl,U=(L.FontSizePicker,L.Toolbar,L.ToolbarGroup),N=L.ToolbarButton,V=(L.ToolbarItem,L.ToolbarDropdownMenu),W=(L.DropdownMenu,L.Flex,L.FlexItem,L.Button,L.TextControl),R=(L.Dropdown,L.Icon,L.Spinner),G=L.__experimentalBoxControl,Q=wp.blockEditor,q=Q.useBlockProps,J=Q.BlockControls,$=Q.AlignmentToolbar,K=Q.ColorPaletteControl,X=Q.InspectorControls,Y=wp.element.useEffect;wp.data.useSelect,T(w.name,I(I({},w),{},{edit:function(e){var n,l,r,o,a,i,u,c,s,d,p,m,h,g,v,f,y,C,S,T,L,Q,Z,ee,te,ne,le,re,oe,ae,ie=e.attributes,ue=e.setAttributes,ce=(e.clientId,q()),se=wp.data.select("core/editor").getCurrentPost(),de=wp.data.select("core/editor").getEditedPostAttribute("parent");Y((function(){ie.parentPostId||(se=wp.data.select("core/editor").getCurrentPost(),de=wp.data.select("core/editor").getEditedPostAttribute("parent"),ie.showSiblings&&ie.parentPostId!==de?ue({parentPostId:parseInt(de)}):se.id?ue({parentPostId:parseInt(se.id)}):ue({parentPostId:0}))}));var pe=function(e,t){var n,l={};l[e]=t;var r=I(I({},ie),{},{style:I(I({},ie.style),{},{typography:I(I({},null===(n=ie.style)||void 0===n?void 0:n.typography),l)})});t||delete r.style.typography[e],console.log(r),ue(r)};return(0,t.createElement)("div",ce,(0,t.createElement)(X,null,(0,t.createElement)(A,null,(0,t.createElement)(H,{title:"Query Control"},(0,t.createElement)(b,{label:"Parent Context",help:(0,t.createElement)(t.Fragment,null,"Select the page to draw children from.",(0,t.createElement)("br",null),(0,t.createElement)("small",null,"(Leave empty to use the current page)")),parentPostId:ie.parentPostId,onChange:function(e){ue({parentPostId:e})}}),ie.parentPostId&&ie.parentPostId!==se.id&&(0,t.createElement)("div",null,(0,t.createElement)("p",null,"If the ",(0,t.createElement)("strong",null,"current page")," is in the parent context's hierarchy:"),(0,t.createElement)(M,{label:"Include This Page's Children",checked:ie.showCurrentChildren,onChange:function(e){return ue({showCurrentChildren:e})}})),(0,t.createElement)(D,null,(0,t.createElement)(F,{label:"Maximum Depth of Children",allowReset:!0,resetFallbackValue:0,step:1,withInputField:!1,marks:[{value:0,label:"All"},{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:5,label:"5"},{value:6,label:"6"}],value:ie.maxDepth,onChange:function(e){return ue({maxDepth:e})},min:0,max:6})),(0,t.createElement)(D,null,(0,t.createElement)(M,{label:"Exclude pages marked 'noindex' in popular SEO plugins.",checked:ie.excludeNoindex,onChange:function(e){return ue({excludeNoindex:e})}})),(0,t.createElement)(D,null,(0,t.createElement)(W,{label:"Exclude additional page IDs",help:"Enter IDs, separated by a space or comma",value:ie.excludeAdditionalIDs,onChange:function(e){return ue({excludeAdditionalIDs:e})}}))),(0,t.createElement)(H,{title:"Display Style"},(0,t.createElement)(D,null,(0,t.createElement)(B,{label:"Display Type",labelPosition:"side",value:ie.displayType,onChange:function(e){return ue({displayType:e})},options:w.attributes.displayType.enum.map((function(e){return{value:e,label:e.charAt(0).toUpperCase()+e.slice(1)}}))})),"custom"===ie.displayType&&(0,t.createElement)(D,null,(0,t.createElement)(W,{label:"Custom Bullet",value:ie.customBullet,onChange:function(e){return ue({customBullet:e.substring(0,1)})}})),"plain"!==ie.displayType&&(0,t.createElement)(K,{label:"Bullet Color",value:ie.bulletColor,onChange:function(e){return ue({bulletColor:e})}}),(0,t.createElement)(G,{label:"Item Margin",values:{top:null===(n=ie.itemMargin)||void 0===n?void 0:n.top,right:null===(l=ie.itemMargin)||void 0===l?void 0:l.right,bottom:null===(r=ie.itemMargin)||void 0===r?void 0:r.bottom,left:null===(o=ie.itemMargin)||void 0===o?void 0:o.left},onChange:function(e){return ue({itemMargin:e})}}),(0,t.createElement)(G,{label:"Children Container Margin",values:{top:null===(a=ie.childrenMargin)||void 0===a?void 0:a.top,right:null===(i=ie.childrenMargin)||void 0===i?void 0:i.right,bottom:null===(u=ie.childrenMargin)||void 0===u?void 0:u.bottom,left:null===(c=ie.childrenMargin)||void 0===c?void 0:c.left},onChange:function(e){return ue({childrenMargin:e})}}),(0,t.createElement)(K,{label:"Link Color",value:ie.linkColor,onChange:function(e){return ue({linkColor:e})}}),(0,t.createElement)(D,null,(0,t.createElement)(M,{label:"Underline Links",checked:ie.underlineLinks,onChange:function(e){return ue({underlineLinks:e})}})),(0,t.createElement)(K,{label:"Hover Link Color",value:ie.linkColorHover,onChange:function(e){return ue({linkColorHover:e})}}),(0,t.createElement)(D,null,(0,t.createElement)(M,{label:"Underline Links on Hover",checked:ie.underlineOnHover,onChange:function(e){return ue({underlineOnHover:e})}})),(0,t.createElement)(D,null,(0,t.createElement)(M,{label:"Highlight Current Page",checked:ie.highlightCurrent,onChange:function(e){ue({highlightCurrent:e})}}))),ie.highlightCurrent&&(0,t.createElement)(H,{title:"Current Page Highlight"},(0,t.createElement)(D,null,(0,t.createElement)(_,{labelPosition:"side",size:"small",label:"Font Size",onChange:function(e){return ue({currentFontSize:e})},isUnitSelectTabbable:!0,unit:"em",value:ie.currentFontSize})),(0,t.createElement)(D,null,(0,t.createElement)(B,{label:"Font Weight",labelPosition:"side",value:ie.currentFontWeight,onChange:function(e){return ue({currentFontWeight:e})},options:[{value:null,label:"Inherit"},{value:"normal",label:"Normal"},{value:"bold",label:"Bold"}]})),(0,t.createElement)(K,{label:"Link Color",value:ie.currentLinkColor,onChange:function(e){return ue({currentLinkColor:e})}}),(0,t.createElement)(D,null,(0,t.createElement)(M,{label:"Underline Link",checked:ie.currentUnderlineLinks,onChange:function(e){return ue({currentUnderlineLinks:e})}})),(0,t.createElement)(K,{label:"Hover Color",value:ie.currentLinkColorHover,onChange:function(e){return ue({currentLinkColorHover:e})}}),(0,t.createElement)(D,null,(0,t.createElement)(M,{label:"Underline Link on Hover",checked:ie.currentUnderlineOnHover,onChange:function(e){return ue({currentUnderlineOnHover:e})}}))))),(0,t.createElement)(J,null,(0,t.createElement)($,{value:ie.textAlign,onChange:function(e){return ue({textAlign:e})}}),(0,t.createElement)(U,null,(0,t.createElement)(V,{icon:null!==(s=ie.style)&&void 0!==s&&null!==(d=s.typography)&&void 0!==d&&d.textTransform?"uppercase"===(null===(p=ie.style)||void 0===p||null===(m=p.typography)||void 0===m?void 0:m.textTransform)?E:"lowercase"===(null===(h=ie.style)||void 0===h||null===(g=h.typography)||void 0===g?void 0:g.textTransform)?P:x:x,label:"Letter Case",controls:[{title:"Normal",icon:x,isActive:!(null!==(v=ie.style)&&void 0!==v&&null!==(f=v.typography)&&void 0!==f&&f.textTransform),onClick:function(){return pe("textTransform",null)}},{title:"UPPERCASE",isActive:"uppercase"===(null===(y=ie.style)||void 0===y||null===(C=y.typography)||void 0===C?void 0:C.textTransform),icon:E,onClick:function(){return pe("textTransform","uppercase")}},{title:"Capitalize",isActive:"capitalize"===(null===(S=ie.style)||void 0===S||null===(T=S.typography)||void 0===T?void 0:T.textTransform),icon:x,onClick:function(){return pe("textTransform","capitalize")}},{title:"lowercase",isActive:"lowercase"===(null===(L=ie.style)||void 0===L||null===(Q=L.typography)||void 0===Q?void 0:Q.textTransform),icon:P,onClick:function(){return pe("textTransform","lowercase")}}]})),(0,t.createElement)(U,null,(0,t.createElement)(N,{icon:k,label:"Bold",isPressed:(null===(Z=ie.style)||void 0===Z||null===(ee=Z.typography)||void 0===ee?void 0:ee.fontWeight)&&700===(null===(te=ie.style)||void 0===te||null===(ne=te.typography)||void 0===ne?void 0:ne.fontWeight),onClick:function(){var e,t;return pe("fontWeight",700===(null===(e=ie.style)||void 0===e||null===(t=e.typography)||void 0===t?void 0:t.fontWeight)?null:700)}}),(0,t.createElement)(N,{icon:O,label:"Italic",isPressed:(null===(le=ie.style)||void 0===le||null===(re=le.typography)||void 0===re?void 0:re.fontStyle)&&"normal"!==(null===(oe=ie.style)||void 0===oe||null===(ae=oe.typography)||void 0===ae?void 0:ae.fontStyle),onClick:function(){var e,t;return pe("fontStyle","italic"===(null===(e=ie.style)||void 0===e||null===(t=e.typography)||void 0===t?void 0:t.fontStyle)?null:"italic")}}))),(0,t.createElement)(j,null,(0,t.createElement)(z,{block:w.name,attributes:ie,urlQueryArgs:{post_id:se.id},LoadingResponsePlaceholder:function(){return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(R,null),(0,t.createElement)("small",null,"Loading Family…"))}})))}}));var Z={};Z.cumulus=(0,t.createElement)("svg",{className:"custom-icon custom-icon-cumulus",enableBackground:"new 0 0 645.28 645.45",viewBox:"0 0 645.28 645.45",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:"m543.62 329.45c-3.21 19.07-19.75 33.62-39.74 33.62-22.28 0-40.34-18.06-40.34-40.34s18.06-40.34 40.34-40.34c19.98 0 36.53 14.54 39.74 33.62h101.66c-3.59-175.13-146.57-316.01-322.56-316.01-178.23 0-322.72 144.49-322.72 322.72 0 178.24 144.49 322.72 322.72 322.72 175.98 0 318.96-140.88 322.55-316h-101.65zm-220.9 235.32c-133.68 0-242.04-108.37-242.04-242.04s108.37-242.05 242.04-242.05c77.12 0 145.76 36.11 190.09 92.3l-86.74 86.74c-21.26-34.79-59.58-58.02-103.34-58.02-66.84 0-121.02 54.18-121.02 121.02s54.18 121.02 121.02 121.02c43.76 0 82.09-23.23 103.34-58.02l86.74 86.74c-44.32 56.2-112.97 92.31-190.09 92.31z",fill:"#00598e"})),Z.bigFeature=(0,t.createElement)("svg",{className:"custom-icon custom-icon-bigfeature",enableBackground:"new 0 0 20 20",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},(0,t.createElement)("path",{d:"m18.58 0h-17.16c-.78 0-1.42.64-1.42 1.42v17.15c0 .79.64 1.43 1.42 1.43h17.15c.79 0 1.42-.64 1.42-1.42v-17.16c.01-.78-.63-1.42-1.41-1.42zm-9.38 17.77c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm9.35 0c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm0-9.47c0 .43-.35.78-.78.78h-15.54c-.43 0-.78-.35-.78-.78v-6.07c0-.43.35-.78.78-.78h15.54c.43 0 .78.35.78.78z",fill:"#00588d"}));var ee=Z;wp.blocks.updateCategory("cmls",{icon:ee.cumulus})}();