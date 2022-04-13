!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,n){return t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(e,n)}function n(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),n&&t(e,n)}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function o(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,l,o=[],_n=!0,a=!1;try{for(n=n.call(e);!(_n=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);_n=!0);}catch(e){a=!0,l=e}finally{try{_n||null==n.return||n.return()}finally{if(a)throw l}}return o}}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=window.wp.element,c=window.lodash;function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=wp.components,f=d.TreeSelect,h=d.Disabled,m=d.Spinner,g=d.Flex,y=wp.element,v=y.useState,b=y.useEffect,w=y.useCallback,E=wp.compose.usePrevious,C=wp.htmlEntities.decodeEntities,P=wp.url.addQueryArgs,__=wp.i18n.__;function k(e){var t=e.map((function(e){return p({children:[],parent:null},e)})),n=(0,c.groupBy)(t,"parent");if(n.null&&n.null.length)return t;var r=function e(t){return t.map((function(t){var r=n[t.id];return p(p({},t),{},{children:r&&r.length?e(r):[]})}))};return n[0]?r(n[0]):Object.values(n).length?r(Object.values(n)[0]):[]}function x(e){var t;return null!=e&&null!==(t=e.title)&&void 0!==t&&t.rendered?C(e.title.rendered):"#".concat(e.id," (").concat(__("no title"),")")}function O(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=wp.data.select("core/editor").getCurrentPostType(),l=null!=e&&e.parentPostId?e.parentPostId:wp.data.select("core/editor").getCurrentPostId(),o=null,a=[];return new Promise((function(e,i){wp.apiFetch({path:P("/wp/v2/types/".concat(r),{context:"view"})}).then((function(r){if(o=r,!r.hierarchical)return setOptions([]),void e(a);var i={type:o.slug,per_page:-1,orderby:"menu_order",order:"asc",context:"view"};t&&(i.search=t);var u=n?"/cumulus-family-links/v1/children-of/".concat(l):"/".concat(o.rest_namespace,"/").concat(o.rest_base);wp.apiFetch({path:P(u,i)}).then((function(t){if(t&&t.length){var n=t.map((function(e){return{id:e.id,parent:e.parent,name:x(e)}}));return n=k(n),void e(n)}}))}))}))}function S(e){var t=a(v([]),2),n=t[0],r=t[1],l=a(v([]),2),i=l[0],s=l[1];b((function(){new O(e,!1,e.parentPostId||0).then((function(e){r(e);var t=function e(t){var n=t.map((function(t){return[t.id].concat(o(e(t.children||[])))}));return(0,c.flatten)(n)}(e),n=i,l=t.filter((function(e){return n.includes(e)}));p(l)}))}),[e.parentPostId]);var p=function(t){s(t),e.onChange&&e.onChange(t)};return(0,u.createElement)(f,{multiple:!0,label:e.label,help:e.help,tree:n,selectedId:i,disabled:!n.length,onChange:p,style:{height:"auto",maxHeight:"6em",padding:"8px",lineHeight:1.2}})}function A(e){var t=a(v(!1),2),n=t[0],r=t[1],l=a(v(e.parentPostId),2),i=l[0],s=l[1],p=a(v(null),2),d=p[0],y=p[1],C=E(e),P=a(v([]),2),k=P[0],x=P[1],S=a(v("Loading..."),2),A=S[0],I=S[1],L=e.label||"Select a Page",j=e.help||null,T=e.noOptionLabel||"No page selected",F=w((function(){d||y(i),(0,c.isEqual)(C,e)||(I(!0),new O({parentPostId:i},n).then((function(t){I(!1),x([{id:0,name:"All pages"}].concat(o(t))),e.parentPostId&&s(e.parentPostId)})))}));b(F,[e.parentPostId]),b((function(){e.onLoading&&e.onLoading(A)}),[A]);var D=(0,u.createElement)(f,{className:"editor-page-attributes__parent",label:L,help:j,noOptionLabel:A?"Loading...":T,selectedId:i,tree:k,onChange:function(t){s(t),r(!1),e.onChange&&e.onChange(t)},style:{lineHeight:1.2}});return A?(0,u.createElement)(h,null,(0,u.createElement)(g,{align:"top"},D,(0,u.createElement)(m,null))):D}function I(){return I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},I.apply(this,arguments)}function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=wp.compose,F=T.useDebounce,D=T.usePrevious,H=wp.element,_=H.RawHTML,B=H.useEffect,M=H.useRef,z=H.useState,W=H.useCallback,N=wp.i18n,V=N.__,U=N.sprintf,R=wp.apiFetch,G=wp.url.addQueryArgs,Q=wp.components,$=Q.Placeholder,q=Q.Spinner,J=wp.blocks.getBlockType;function K(e){var t=e.className;return(0,u.createElement)($,{className:t},V("Block rendered as empty."))}function X(e){var t=e.response,n=e.className,r=U(// translators: %s: error message describing the problem
V("Error loading block: %s"),t.errorMsg);return(0,u.createElement)($,{className:n},r)}function Y(e){var t=e.attributes,n=e.block,r=e.className,l=e.httpMethod,o=void 0===l?"GET":l,i=e.urlQueryArgs,s=e.onChange,p=e.onError,d=e.EmptyResponsePlaceholder,f=void 0===d?K:d,h=e.ErrorResponsePlaceholder,m=void 0===h?X:h,g=M(!0),y=M(),v=a(z(null),2),b=v[0],w=v[1],E=a(z(null),2),C=E[0],P=E[1],k=a(z(!1),2),x=k[0],O=k[1],S=D(e),A=W((function(){if(g.current){null!==b&&(P(b),w(null));var e=t&&function(e,t){var n=J(e);if(void 0===n)throw new Error("Block type '".concat(e,"' is not registered."));return(0,c.reduce)(n.attributes,(function(e,n,r){var l=t[r];return void 0!==l?e[r]=l:n.hasOwnProperty("default")&&(e[r]=n.default),-1!==["node","children"].indexOf(n.source)&&("string"==typeof e[r]?e[r]=[e[r]]:Array.isArray(e[r])||(e[r]=[])),e}),{})}(n,t),r="POST"===o,l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return G("/wp/v2/block-renderer/".concat(e),j(j({context:"edit"},null!==t?{attributes:t}:{}),n))}(n,r?null:null!=e?e:null,i),a=r?{attributes:null!=e?e:null}:null,u=function(e){return g.current&&e===y.current};return O(!0),y.current=R({path:l,data:a,method:r?"POST":"GET"}).then((function(e){u&&e&&w(e.rendered)})).then((function(){s&&s()})).finally((function(){O(!1)})).catch((function(e){u&&(w({error:!0,errorMsg:e.message}),p&&p(e))}))}})),L=F(A,100,{leading:!0,trailing:!0});B((function(){return function(){g.current=!1}}),[]),B((function(){void 0===S?A():(0,c.isEqual)(S.attributes,e.attributes)||L()}),[e.attributes]);var T=e.LoadingResponsePlaceholder?e.LoadingResponsePlaceholder:(0,u.createElement)(q,null);return""===b?(0,u.createElement)(f,e):!b||x?C?(0,u.createElement)("div",{style:{position:"relative"}},(0,u.createElement)("div",{style:{position:"absolute",top:0,right:0}},(0,u.createElement)(q,null)),(0,u.createElement)(_,{className:r},C)):(0,u.createElement)(T,null):b.error?(0,u.createElement)(m,I({response:b},e)):(0,u.createElement)(_,{className:r},b)}var Z=wp.components.CustomSelectControl,ee=wp.element.useMemo,te=wp.i18n,ne=te.__,_x=te._x,re=te.sprintf,le=[{name:_x("Regular","font style"),value:"normal"},{name:_x("Italic","font style"),value:"italic"}],oe=[{name:_x("Thin","font weight"),value:"100"},{name:_x("Extra Light","font weight"),value:"200"},{name:_x("Light","font weight"),value:"300"},{name:_x("Regular","font weight"),value:"400"},{name:_x("Medium","font weight"),value:"500"},{name:_x("Semi Bold","font weight"),value:"600"},{name:_x("Bold","font weight"),value:"700"},{name:_x("Extra Bold","font weight"),value:"800"},{name:_x("Black","font weight"),value:"900"}];function ae(e){var t=e.onChange,n=e.hasFontStyles,r=void 0===n||n,l=e.hasFontWeights,o=void 0===l||l,a=e.value,i=a.fontStyle,c=a.fontWeight,s=r||o,p=function(e,t){return ne(e?t?"Appearance":"Font style":"Font weight")}(r,o),d={key:"default",name:ne("Default"),style:{fontStyle:void 0,fontWeight:void 0}},f=ee((function(){return r&&o?(e=[d],le.forEach((function(t){var n=t.name,r=t.value;oe.forEach((function(t){var l=t.name,o=t.value,a="normal"===r?l:re(
/* translators: 1: Font weight name. 2: Font style name. */
ne("%1$s %2$s"),l,n);e.push({key:"".concat(r,"-").concat(o),name:a,style:{fontStyle:r,fontWeight:o}})}))})),e):r?function(){var e=[d];return le.forEach((function(t){var n=t.name,r=t.value;e.push({key:r,name:n,style:{fontStyle:r,fontWeight:void 0}})})),e}():function(){var e=[d];return oe.forEach((function(t){var n=t.name,r=t.value;e.push({key:r,name:n,style:{fontStyle:void 0,fontWeight:r}})})),e}();var e}),[e.options]),h=f.find((function(e){return e.style.fontStyle===i&&e.style.fontWeight===c}))||f[0];return s&&(0,u.createElement)(Z,{className:"components-font-appearance-control",label:p,describedBy:h?re(// translators: %s: Currently selected font appearance.
ne(r?o?"Currently selected font appearance: %s":"Currently selected font style: %s":"Currently selected font weight: %s"),h.name):ne("No selected font appearance"),options:f,value:h,onChange:function(e){var n=e.selectedItem;return t(n.style)}})}var ie=JSON.parse('{"name":"cumulus-gutenberg/family-links","apiVersion":2,"title":"Family Links","description":"Insert links to a page\'s children or siblings","keywords":["family","parent","child","children","sibling"],"icon":{"src":"admin-links","foreground":"#00588d"},"category":"cmls","attributes":{"align":{"type":"string"},"parentPostId":{"type":"integer"},"showCurrentChildren":{"type":"boolean","default":true},"maxDepth":{"type":"integer","default":0},"excludeNoindex":{"type":"boolean","default":true},"excludeAdditionalIDs":{"type":"array","default":[]},"displayType":{"type":"string","enum":["plain","bullets","square","numbered","custom"],"default":"plain"},"customBullet":{"type":"string","default":""},"itemMargin":{"type":"object","default":{"top":null,"right":null,"bottom":null,"left":null}},"childrenMargin":{"type":"object","default":{"top":null,"right":null,"bottom":null,"left":"1em"}},"bulletColor":{"type":"string","default":null},"underlineLinks":{"type":"boolean","default":true},"underlineOnHover":{"type":"boolean","default":true},"linkColor":{"type":"string","default":null},"linkColorHover":{"type":"string","default":null},"textAlign":{"type":"string","default":null},"fontWeight":{"type":"string","default":null},"fontStyle":{"type":"string","default":null},"highlightCurrent":{"type":"boolean","default":true},"currentFontSize":{"type":"string","default":null},"currentFontWeight":{"type":"string","default":"700"},"currentFontStyle":{"type":"string","default":"normal"},"currentUnderlineLinks":{"type":"boolean","default":true},"currentUnderlineOnHover":{"type":"boolean","default":true},"currentLinkColor":{"type":"string","default":null},"currentLinkColorHover":{"type":"string","default":null}},"supports":{"align":false,"anchor":false,"className":true,"spacing":{"padding":true,"margin":true,"blockGap":true},"typography":{"align":true,"fontSize":true,"lineHeight":false,"fontWeight":true,"fontStyle":true,"textTransform":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true},"border":{"color":true,"radius":true,"style":true,"width":true,"defaultControls":{"color":true,"radius":true,"style":true,"width":true}},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}}}}'),ue=window.wp.primitives,ce=(0,u.createElement)(ue.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(ue.Path,{d:"M6.1 6.8L2.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H6.1zm-.8 6.8L7 8.9l1.7 4.7H5.3zm15.1-.7c-.4-.5-.9-.8-1.6-1 .4-.2.7-.5.8-.9.2-.4.3-.9.3-1.4 0-.9-.3-1.6-.8-2-.6-.5-1.3-.7-2.4-.7h-3.5V18h4.2c1.1 0 2-.3 2.6-.8.6-.6 1-1.4 1-2.4-.1-.8-.3-1.4-.6-1.9zm-5.7-4.7h1.8c.6 0 1.1.1 1.4.4.3.2.5.7.5 1.3 0 .6-.2 1.1-.5 1.3-.3.2-.8.4-1.4.4h-1.8V8.2zm4 8c-.4.3-.9.5-1.5.5h-2.6v-3.8h2.6c1.4 0 2 .6 2 1.9.1.6-.1 1-.5 1.4z"})),se=(0,u.createElement)(ue.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(ue.Path,{d:"M11 16.8c-.1-.1-.2-.3-.3-.5v-2.6c0-.9-.1-1.7-.3-2.2-.2-.5-.5-.9-.9-1.2-.4-.2-.9-.3-1.6-.3-.5 0-1 .1-1.5.2s-.9.3-1.2.6l.2 1.2c.4-.3.7-.4 1.1-.5.3-.1.7-.2 1-.2.6 0 1 .1 1.3.4.3.2.4.7.4 1.4-1.2 0-2.3.2-3.3.7s-1.4 1.1-1.4 2.1c0 .7.2 1.2.7 1.6.4.4 1 .6 1.8.6.9 0 1.7-.4 2.4-1.2.1.3.2.5.4.7.1.2.3.3.6.4.3.1.6.1 1.1.1h.1l.2-1.2h-.1c-.4.1-.6 0-.7-.1zM9.2 16c-.2.3-.5.6-.9.8-.3.1-.7.2-1.1.2-.4 0-.7-.1-.9-.3-.2-.2-.3-.5-.3-.9 0-.6.2-1 .7-1.3.5-.3 1.3-.4 2.5-.5v2zm10.6-3.9c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2s-.2 1.4-.6 2z"})),pe=(0,u.createElement)(ue.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(ue.Path,{d:"M7.1 6.8L3.1 18h1.6l1.1-3h4.3l1.1 3h1.6l-4-11.2H7.1zm-.8 6.8L8 8.9l1.7 4.7H6.3zm14.5-1.5c-.3-.6-.7-1.1-1.2-1.5-.6-.4-1.2-.6-1.9-.6-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8V6h-1.4v12h1.3l.2-1c.2.4.6.6 1 .8.4.2.9.3 1.4.3.7 0 1.2-.2 1.8-.5.5-.4 1-.9 1.3-1.5.3-.6.5-1.3.5-2.1-.1-.6-.2-1.3-.5-1.9zm-1.7 4c-.4.5-.9.8-1.6.8s-1.2-.2-1.7-.7c-.4-.5-.7-1.2-.7-2.1 0-.9.2-1.6.7-2.1.4-.5 1-.7 1.7-.7s1.2.3 1.6.8c.4.5.6 1.2.6 2 .1.8-.2 1.4-.6 2z"})),de=(0,u.createElement)(ue.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(ue.Path,{d:"M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"})),fe=(0,u.createElement)(ue.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,u.createElement)(ue.Path,{d:"M12.5 5L10 19h1.9l2.5-14z"}));function he(){he=function(e,t){return new o(e,void 0,t)};var r=RegExp.prototype,l=new WeakMap;function o(e,n,r){var a=new RegExp(e,n);return l.set(a,r||l.get(e)),t(a,o.prototype)}function a(e,t){var n=l.get(t);return Object.keys(n).reduce((function(t,r){return t[r]=e[n[r]],t}),Object.create(null))}return n(o,RegExp),o.prototype.exec=function(e){var t=r.exec.call(this,e);return t&&(t.groups=a(t,this)),t},o.prototype[Symbol.replace]=function(t,n){if("string"==typeof n){var o=l.get(this);return r[Symbol.replace].call(this,t,n.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+o[t]})))}if("function"==typeof n){var i=this;return r[Symbol.replace].call(this,t,(function(){var t=arguments;return"object"!=e(t[t.length-1])&&(t=[].slice.call(t)).push(a(t,i)),n.apply(this,t)}))}return r[Symbol.replace].call(this,t,n)},he.apply(this,arguments)}function me(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ge(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?me(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):me(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ye=wp.blocks.registerBlockType,ve=wp.components,be=ve.PanelRow,we=ve.BaseControl,Ee=ve.ToggleControl,Ce=ve.SelectControl,Pe=ve.RangeControl,ke=(ve.__experimentalUnitControl,ve.__experimentalBoxControl),xe=ve.__experimentalToolsPanel,Oe=ve.__experimentalToolsPanelItem,Se=ve.ToolbarGroup,Ae=ve.ToolbarButton,Ie=ve.ToolbarDropdownMenu,Le=ve.Flex,je=ve.TextControl,Te=ve.Spinner,Fe=(ve.__experimentalDivider,wp.blockEditor),De=Fe.useBlockProps,He=Fe.BlockControls,_e=Fe.AlignmentToolbar,Be=Fe.ColorPaletteControl,Me=Fe.InspectorControls,ze=Fe.FontSizePicker,We=wp.element,Ne=We.useEffect,Ve=We.useState;ye(ie.name,ge(ge({},ie),{},{edit:function(e){var t,n,r,l,i,s,p,d,f,h,m,g,y,v,b,w,E,C,P,k,x,O,I,L,j,T,F,D,H,_,B,M,z,W=e.attributes,N=e.setAttributes,V=(e.clientId,De()),U=wp.data.select("core/editor").getCurrentPost(),R=wp.data.select("core/editor").getEditedPostAttribute("parent"),G=a(Ve(!1),2),Q=(G[0],G[1]);function $(e){if(ie.attributes.hasOwnProperty(e)&&ie.attributes[e].hasOwnProperty("default"))return ie.attributes[e].default}function q(e){return!(e=Array.isArray(e)?e:[e]).some((function(e){return!(0,c.isEqual)(W[e],$(e))}))}function J(e){e=Array.isArray(e)?e:[e];var t={};e.forEach((function(e){t[e]=$(e)})),N(t)}Ne((function(){W.parentPostId||(U=wp.data.select("core/editor").getCurrentPost(),R=wp.data.select("core/editor").getEditedPostAttribute("parent"),W.showSiblings&&W.parentPostId!==R?N({parentPostId:parseInt(R)}):U.id&&N({parentPostId:parseInt(U.id)}))})),Ne((function(){"bold"===W.currentFontWeight&&N({currentFontWeight:"700"})}));var K=function(e,t){var n,r={};r[e]=t;var l=ge(ge({},W),{},{style:ge(ge({},W.style),{},{typography:ge(ge({},null===(n=W.style)||void 0===n?void 0:n.typography),r)})});t||delete l.style.typography[e],console.log(l),N(l)},X=function(){return(0,u.createElement)(u.Fragment,null,(0,u.createElement)(Te,null),(0,u.createElement)("small",null,"Loading Family…"))};return(0,u.createElement)("div",V,(0,u.createElement)(Me,null,(0,u.createElement)(xe,{label:"Query Control",resetAll:function(e){return e.foreach((function(e){return e()}))}},(0,u.createElement)(Oe,{hasValue:function(){return!0},label:"Parent Context",isShownByDefault:!0},(0,u.createElement)(A,{label:"Parent Context",help:"Select the page to draw children from.",parentPostId:W.parentPostId,onChange:function(e){e||0===e||(e=void 0),N({parentPostId:e})},onLoading:function(e){Q(e)}}),W.parentPostId!==U.id&&(0,u.createElement)(we,null,(0,u.createElement)("p",null,"If the ",(0,u.createElement)("strong",null,"current page")," is in the parent context's hierarchy:"),(0,u.createElement)(Ee,{label:"Include This Page's Children",checked:W.showCurrentChildren,onChange:function(e){return N({showCurrentChildren:e})}}))),(0,u.createElement)(Oe,{label:"Max Depth",hasValue:function(){return!q("maxDepth")},resetAllFilter:function(){J(["maxDepth"])}},null!=W.parentPostId&&(0,u.createElement)(Pe,{label:"Maximum depth of children to display",allowReset:!0,resetFallbackValue:0,step:1,type:"stepper",withInputField:!1,marks:[{value:0,label:"All"}].concat(o([1,2,3,4,5,6].map((function(e){return{value:e,label:e}})))),value:W.maxDepth,onChange:function(e){return N({maxDepth:e})},min:0,max:6})),null!=W.parentPostId&&(0,u.createElement)(Oe,{label:"Exclusions",hasValue:function(){return!q("excludeAdditionalIDs")},resetAllFilter:function(){J(["excludeAdditionalIDs","excludeNoindex"])}},(0,u.createElement)(S,{label:"Exclude Specific Child Pages",help:"Select multiple or deselect an item by holding\n\t\t\t\t\t\t\t\t\t\t\t\t".concat(0==((null===(t=navigator)||void 0===t||null===(n=t.userAgentData)||void 0===n?void 0:n.platform)||(null===(r=navigator)||void 0===r?void 0:r.platform)||"unknown").toUpperCase().indexOf("MAC")?"Command (⌘)":"Control","\n\t\t\t\t\t\t\t\t\t\t\t\twhile clicking."),parentPostId:W.parentPostId,value:W.excludeAdditionalIDs,onChange:function(e){return N({excludeAdditionalIDs:e})}}),W.excludeAdditionalIDs.length>0&&(0,u.createElement)(je,{label:"Raw excluded page IDs",value:W.excludeAdditionalIDs.join(","),onChange:function(e){var t,n,r,l=e.match(he(/(\d+)/,{id:1}));null!=l&&null!==(t=l.groups)&&void 0!==t&&t.id&&null!=l&&null!==(n=l.groups)&&void 0!==n&&null!==(r=n.id)&&void 0!==r&&r.length?N({excludeAdditionalIDs:e}):N({excludeAdditionalIDs:[]})}}),(0,u.createElement)(Ee,{label:"Automatically exclude pages marked 'noindex' in popular SEO plugins.",checked:W.excludeNoindex,onChange:function(e){return N({excludeNoindex:e})}}))),(0,u.createElement)(xe,{label:"List Style",resetAll:function(e){e.forEach((function(e){return e()}))}},(0,u.createElement)(Oe,{label:"Display Type",isShownByDefault:!0,hasValue:function(){return!q("displayType")},resetAllFilter:function(){J(["displayType"])}},(0,u.createElement)(Ce,{label:"Display Type",labelPosition:"side",value:W.displayType,onChange:function(e){return N({displayType:e})},options:ie.attributes.displayType.enum.map((function(e){return{value:e,label:e.charAt(0).toUpperCase()+e.slice(1)}}))})),"plain"!==W.displayType&&(0,u.createElement)(Oe,{isShownByDefault:!0,label:"Bullet Style",hasValue:function(){return!q(["customBullet","bulletColor"])},resetAllFilter:function(){return J(["customBullet","bulletColor"])}},"custom"==W.displayType&&(0,u.createElement)(be,null,(0,u.createElement)(je,{label:"Custom Bullet",value:W.customBullet,style:{width:"10ch"},onChange:function(e){return N({customBullet:e.substring(0,1)})}})),(0,u.createElement)(be,null,(0,u.createElement)(Be,{label:"Bullet Color",value:W.bulletColor,onChange:function(e){return N({bulletColor:e})}}))),(0,u.createElement)(Oe,{label:"Item Margins",hasValue:function(){return!q(["itemMargin","childrenMargin"])},resetAllFilter:function(){J(["itemMargin","childrenMargin"])}},(0,u.createElement)(be,null,(0,u.createElement)(ke,{label:"Item Margin",values:{top:null===(l=W.itemMargin)||void 0===l?void 0:l.top,right:null===(i=W.itemMargin)||void 0===i?void 0:i.right,bottom:null===(s=W.itemMargin)||void 0===s?void 0:s.bottom,left:null===(p=W.itemMargin)||void 0===p?void 0:p.left},onChange:function(e){return N({itemMargin:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(ke,{label:"Children Container Margin",values:{top:null===(d=W.childrenMargin)||void 0===d?void 0:d.top,right:null===(f=W.childrenMargin)||void 0===f?void 0:f.right,bottom:null===(h=W.childrenMargin)||void 0===h?void 0:h.bottom,left:null===(m=W.childrenMargin)||void 0===m?void 0:m.left},onChange:function(e){return N({childrenMargin:e})}})))),(0,u.createElement)(xe,{label:"Link Styles",resetAll:function(e){e.forEach((function(e){return e()}))}},(0,u.createElement)(Oe,{label:"All Links",hasValue:function(){return!q(["linkColor","linkColorHover","underlineLinks","underlineOnHover"])},resetAllFilter:function(){J(["linkColor","linkColorHover","underlineLinks","underlineOnHover"])}},(0,u.createElement)(be,null,(0,u.createElement)(Be,{label:"Link Color",value:W.linkColor,onChange:function(e){return N({linkColor:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(Ee,{label:"Underline Links",checked:W.underlineLinks,onChange:function(e){return N({underlineLinks:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(Be,{label:"Hover Link Color",value:W.linkColorHover,onChange:function(e){return N({linkColorHover:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(Ee,{label:"Underline Links on Hover",checked:W.underlineOnHover,onChange:function(e){return N({underlineOnHover:e})}}))),(0,u.createElement)(Oe,{label:"Current Page",hasValue:function(){return!q(["highlightCurrent","currentFontSize","currentFontWeight","currentFontStyle","currentLinkColor","currentUnderlineLinks","currentLinkColorHover","currentUnderlineOnHover"])},resetAllFilter:function(){J(["highlightCurrent","currentFontSize","currentFontWeight","currentFontStyle","currentLinkColor","currentUnderlineLinks","currentLinkColorHover","currentUnderlineOnHover"])}},(0,u.createElement)("h3",null,"Current Page Highlight"),(0,u.createElement)(Ee,{label:"Highlight Current Page",checked:W.highlightCurrent,onChange:function(e){N({highlightCurrent:e})}}),W.highlightCurrent&&(0,u.createElement)(u.Fragment,null,(0,u.createElement)(be,null,(0,u.createElement)(Le,{gap:2},(0,u.createElement)(ze,{label:"Current Page Font Size",value:W.currentFontSize,onChange:function(e){return N({currentFontSize:e})}}),(0,u.createElement)(ae,{value:{fontStyle:W.currentFontStyle,fontWeight:W.currentFontWeight},onChange:function(e){return N({currentFontStyle:e.fontStyle,currentFontWeight:e.fontWeight})}}))),(0,u.createElement)(be,null,(0,u.createElement)(Be,{label:"Current Page Link Color",value:W.currentLinkColor,onChange:function(e){return N({currentLinkColor:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(Ee,{label:"Underline Current Page Link",checked:W.currentUnderlineLinks,onChange:function(e){return N({currentUnderlineLinks:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(Be,{label:"Current Page Link Hover Color",value:W.currentLinkColorHover,onChange:function(e){return N({currentLinkColorHover:e})}})),(0,u.createElement)(be,null,(0,u.createElement)(Ee,{label:"Underline Current Page Link on Hover",checked:W.currentUnderlineOnHover,onChange:function(e){return N({currentUnderlineOnHover:e})}})))))),(0,u.createElement)(He,null,(0,u.createElement)(_e,{value:W.textAlign,onChange:function(e){return N({textAlign:e})}}),(0,u.createElement)(Se,null,(0,u.createElement)(Ie,{icon:null!==(g=W.style)&&void 0!==g&&null!==(y=g.typography)&&void 0!==y&&y.textTransform?"uppercase"===(null===(v=W.style)||void 0===v||null===(b=v.typography)||void 0===b?void 0:b.textTransform)?ce:"lowercase"===(null===(w=W.style)||void 0===w||null===(E=w.typography)||void 0===E?void 0:E.textTransform)?se:pe:pe,label:"Letter Case",controls:[{title:"Normal",icon:pe,isActive:!(null!==(C=W.style)&&void 0!==C&&null!==(P=C.typography)&&void 0!==P&&P.textTransform),onClick:function(){return K("textTransform",null)}},{title:"UPPERCASE",isActive:"uppercase"===(null===(k=W.style)||void 0===k||null===(x=k.typography)||void 0===x?void 0:x.textTransform),icon:ce,onClick:function(){return K("textTransform","uppercase")}},{title:"Capitalize",isActive:"capitalize"===(null===(O=W.style)||void 0===O||null===(I=O.typography)||void 0===I?void 0:I.textTransform),icon:pe,onClick:function(){return K("textTransform","capitalize")}},{title:"lowercase",isActive:"lowercase"===(null===(L=W.style)||void 0===L||null===(j=L.typography)||void 0===j?void 0:j.textTransform),icon:se,onClick:function(){return K("textTransform","lowercase")}}]})),(0,u.createElement)(Se,null,(0,u.createElement)(Ae,{icon:de,label:"Bold",isPressed:(null===(T=W.style)||void 0===T||null===(F=T.typography)||void 0===F?void 0:F.fontWeight)&&700===(null===(D=W.style)||void 0===D||null===(H=D.typography)||void 0===H?void 0:H.fontWeight),onClick:function(){var e,t;return K("fontWeight",700===(null===(e=W.style)||void 0===e||null===(t=e.typography)||void 0===t?void 0:t.fontWeight)?null:700)}}),(0,u.createElement)(Ae,{icon:fe,label:"Italic",isPressed:(null===(_=W.style)||void 0===_||null===(B=_.typography)||void 0===B?void 0:B.fontStyle)&&"normal"!==(null===(M=W.style)||void 0===M||null===(z=M.typography)||void 0===z?void 0:z.fontStyle),onClick:function(){var e,t;return K("fontStyle","italic"===(null===(e=W.style)||void 0===e||null===(t=e.typography)||void 0===t?void 0:t.fontStyle)?null:"italic")}}))),null===W.parentPostId&&(0,u.createElement)(X,null),W.parentPostId&&(0,u.createElement)(Y,{block:ie.name,attributes:W,urlQueryArgs:{post_id:U.id},LoadingResponsePlaceholder:X}))}}));var Ue={};Ue.cumulus=(0,u.createElement)("svg",{className:"custom-icon custom-icon-cumulus",enableBackground:"new 0 0 645.28 645.45",viewBox:"0 0 645.28 645.45",xmlns:"http://www.w3.org/2000/svg"},(0,u.createElement)("path",{d:"m543.62 329.45c-3.21 19.07-19.75 33.62-39.74 33.62-22.28 0-40.34-18.06-40.34-40.34s18.06-40.34 40.34-40.34c19.98 0 36.53 14.54 39.74 33.62h101.66c-3.59-175.13-146.57-316.01-322.56-316.01-178.23 0-322.72 144.49-322.72 322.72 0 178.24 144.49 322.72 322.72 322.72 175.98 0 318.96-140.88 322.55-316h-101.65zm-220.9 235.32c-133.68 0-242.04-108.37-242.04-242.04s108.37-242.05 242.04-242.05c77.12 0 145.76 36.11 190.09 92.3l-86.74 86.74c-21.26-34.79-59.58-58.02-103.34-58.02-66.84 0-121.02 54.18-121.02 121.02s54.18 121.02 121.02 121.02c43.76 0 82.09-23.23 103.34-58.02l86.74 86.74c-44.32 56.2-112.97 92.31-190.09 92.31z",fill:"#00598e"})),Ue.bigFeature=(0,u.createElement)("svg",{className:"custom-icon custom-icon-bigfeature",enableBackground:"new 0 0 20 20",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},(0,u.createElement)("path",{d:"m18.58 0h-17.16c-.78 0-1.42.64-1.42 1.42v17.15c0 .79.64 1.43 1.42 1.43h17.15c.79 0 1.42-.64 1.42-1.42v-17.16c.01-.78-.63-1.42-1.41-1.42zm-9.38 17.77c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm9.35 0c0 .43-.35.78-.78.78h-6.19c-.43 0-.78-.35-.78-.78v-6.19c0-.43.35-.78.78-.78h6.19c.43 0 .78.35.78.78zm0-9.47c0 .43-.35.78-.78.78h-15.54c-.43 0-.78-.35-.78-.78v-6.07c0-.43.35-.78.78-.78h15.54c.43 0 .78.35.78.78z",fill:"#00588d"}));var Re=Ue;wp.blocks.updateCategory("cmls",{icon:Re.cumulus})}();