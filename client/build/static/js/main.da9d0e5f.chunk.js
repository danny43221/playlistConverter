(this.webpackJsonptypescriptnpx=this.webpackJsonptypescriptnpx||[]).push([[0],{55:function(t,e,c){"use strict";c.r(e);var n=c(2),o=c(0),s=c(25),i=c.n(s),p=c(12),r=c(15),a=Object(o.createContext)({spotifyAuth:!1,appleAuth:!1,setSpotifyAuth:function(){return console.log("No provider")},setAppleAuth:function(){return console.log("No provider")}}),l=function(t){var e=t.children,c=Object(o.useState)(!1),s=Object(r.a)(c,2),i=s[0],p=s[1],l=Object(o.useState)(!1),u=Object(r.a)(l,2),h=u[0],j=u[1];return Object(n.jsx)(a.Provider,{value:{spotifyAuth:i,appleAuth:h,setSpotifyAuth:p,setAppleAuth:j},children:e})},u=c(1),h=c(26),j=c.n(h).a.create({baseURL:"http://localhost:5000/api",withCredentials:!0}),b=function(){return Object(n.jsxs)("div",{children:["convert apple playlists",Object(n.jsx)("button",{onClick:function(){j.get("http://localhost:5000/api/auth/spotify/me")},children:"get me"})]})},d=function(){return Object(n.jsxs)("div",{children:["Hello World",Object(n.jsx)("a",{href:"/api/auth/spotify",children:"spotify login"})]})},f=function(){var t=Object(o.useContext)(a),e=(t.spotifyAuth,t.setSpotifyAuth,Object(n.jsxs)(u.c,{children:[Object(n.jsx)(u.a,{path:"/convert-apple",component:b}),Object(n.jsx)(u.a,{path:"/",component:d})]}));return Object(n.jsx)("div",{className:"App",children:e})},O=Object(n.jsx)(p.a,{children:Object(n.jsx)(l,{children:Object(n.jsx)(f,{})})});i.a.render(O,document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.da9d0e5f.chunk.js.map