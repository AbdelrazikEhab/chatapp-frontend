module.exports = [
"[externals]/socket.io-client [external] (socket.io-client, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("socket.io-client");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/utils/socket.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "closeSocket",
    ()=>closeSocket,
    "connectSocket",
    ()=>connectSocket
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/socket.io-client [external] (socket.io-client, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
let socket = null;
function connectSocket(token) {
    if (socket) return socket;
    socket = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io$2d$client__$5b$external$5d$__$28$socket$2e$io$2d$client$2c$__esm_import$29$__["io"])(("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000', {
        query: {
            token
        },
        transports: [
            'websocket'
        ]
    });
    return socket;
}
function closeSocket() {
    if (!socket) return;
    socket.disconnect();
    socket = null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/axios [external] (axios, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/chat.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$socket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/socket.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$socket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$socket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function ChatPage() {
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [room, setRoom] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('general');
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [insights, setInsights] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loadingInsights, setLoadingInsights] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$socket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["connectSocket"])(token);
        setSocket(s);
        s.on('connect', ()=>setConnected(true));
        s.on('roomHistory', (history)=>{
            setMessages(history.map((h)=>({
                    ...h
                })));
            setTimeout(()=>messagesRef.current?.scrollTo({
                    top: messagesRef.current.scrollHeight
                }), 50);
        });
        s.on('message', (m)=>{
            setMessages((prev)=>[
                    ...prev,
                    m
                ]);
            setTimeout(()=>messagesRef.current?.scrollTo({
                    top: messagesRef.current.scrollHeight
                }), 50);
        });
        s.on('locationmessage', (m)=>setMessages((prev)=>[
                    ...prev,
                    m
                ]));
        s.on('roomData', (data)=>setUsers(data.users.map((u)=>u.username)));
        return ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$socket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["closeSocket"])();
            setSocket(null);
        };
    }, []);
    const join = ()=>{
        if (!socket) return;
        socket.emit('join', {
            username: username || 'anon',
            room
        }, (error)=>{
            if (error) alert(error);
        });
    };
    const send = (e)=>{
        e?.preventDefault();
        if (!socket || !message.trim()) return;
        socket.emit('SendMessage', message, (err)=>{
            if (err) alert(err);
        });
        setMessage('');
    };
    const shareLocation = ()=>{
        if (!socket || !navigator.geolocation) return alert('Location not supported');
        navigator.geolocation.getCurrentPosition((pos)=>{
            socket.emit('SendLocation', {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }, ()=>console.log('Location shared'));
        });
    };
    /** AI INSIGHTS PANEL **/ const fetchInsights = async ()=>{
        setLoadingInsights(true);
        setInsights('');
        try {
            const res = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].get((("TURBOPACK compile-time value", "http://localhost:3000") || 'http://localhost:3000') + `/api/ai/insights/${room}`);
            setInsights(res.data.insights || 'No insights generated.');
        } catch (err) {
            console.error(err);
            setInsights('Failed to fetch AI insights.');
        } finally{
            setLoadingInsights(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col md:flex-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                className: "w-full md:w-1/4 bg-white p-4 border-r",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-2",
                        children: "Rooms"
                    }, void 0, false, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: room,
                                onChange: (e)=>setRoom(e.target.value),
                                className: "w-full p-2 border rounded"
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: username,
                                onChange: (e)=>setUsername(e.target.value),
                                className: "w-full p-2 border rounded",
                                placeholder: "username"
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: join,
                                className: "w-full bg-blue-600 text-white p-2 rounded mt-2",
                                children: "Join"
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "font-medium",
                                children: "Online"
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                className: "mt-2",
                                children: users.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                        className: "text-sm",
                                        children: u
                                    }, u, false, {
                                        fileName: "[project]/pages/chat.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/chat.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        ref: messagesRef,
                        id: "messages",
                        className: "flex-1 overflow-auto p-4 space-y-3 bg-gray-50",
                        children: messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-white p-3 rounded shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            m.username || m.sender_name,
                                            " •",
                                            ' ',
                                            m.created_at || (m.createdat ? new Date(m.createdat).toLocaleTimeString() : '')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/chat.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    m.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mt-1",
                                        children: m.text
                                    }, void 0, false, {
                                        fileName: "[project]/pages/chat.tsx",
                                        lineNumber: 156,
                                        columnNumber: 26
                                    }, this),
                                    m.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        className: "text-blue-600",
                                        href: m.url,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: "Shared location"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/chat.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: send,
                        className: "p-4 bg-white border-t flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                value: message,
                                onChange: (e)=>setMessage(e.target.value),
                                className: "flex-1 p-2 border rounded",
                                placeholder: "Type a message..."
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: shareLocation,
                                className: "px-4 py-2 border rounded",
                                children: "Location"
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: "px-4 py-2 bg-blue-600 text-white rounded",
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/pages/chat.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/chat.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                className: "w-full md:w-1/4 bg-white p-4 border-l flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-2",
                        children: "AI Insights"
                    }, void 0, false, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    !insights && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600",
                        children: "Click below to analyze this room’s conversation using AI."
                    }, void 0, false, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: fetchInsights,
                        disabled: loadingInsights,
                        className: "mt-4 px-3 py-2 bg-blue-600 text-white rounded",
                        children: loadingInsights ? 'Analyzing...' : 'Generate Insights'
                    }, void 0, false, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    insights && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-4 bg-gray-100 p-3 rounded border text-sm whitespace-pre-wrap",
                        children: insights
                    }, void 0, false, {
                        fileName: "[project]/pages/chat.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/chat.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/chat.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e357dadb._.js.map