module.exports = [
"[next]/internal/font/google/geist_a71539c9.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_a71539c9-module__T19VSG__className",
  "variable": "geist_a71539c9-module__T19VSG__variable",
});
}),
"[next]/internal/font/google/geist_a71539c9.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a71539c9.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_mono_8d43a2aa-module__8Li5zG__className",
  "variable": "geist_mono_8d43a2aa-module__8Li5zG__variable",
});
}),
"[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/i18n/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLocale",
    ()=>defaultLocale,
    "locales",
    ()=>locales
]);
const locales = [
    'es',
    'en'
];
const defaultLocale = 'es';
}),
"[project]/i18n/request.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLocale",
    ()=>getLocale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/config.ts [app-rsc] (ecmascript)");
;
;
async function getLocale() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const locale = cookieStore.get('NEXT_LOCALE')?.value;
    if (locale && __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["locales"].includes(locale)) {
        return locale;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultLocale"];
}
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_a71539c9.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_8d43a2aa.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$server$2f$NextIntlClientProviderServer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-server/NextIntlClientProviderServer.js [app-rsc] (ecmascript) <export default as NextIntlClientProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/request.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/i18n/config.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function generateMetadata() {
    const locale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLocale"])();
    const baseUrl = "https://croma.aurora33.dev";
    return {
        title: locale === "en" ? "Croma - Image Compression Tool" : "Croma - Compresor de Imágenes",
        description: locale === "en" ? "Optimize your images for any project. Compress, resize, and convert to WebP, JPEG, or PNG" : "Optimiza tus imágenes para cualquier proyecto. Comprime, redimensiona y convierte a WebP, JPEG o PNG",
        openGraph: {
            title: locale === "en" ? "Croma - Image Compression Tool" : "Croma - Compresor de Imágenes",
            description: locale === "en" ? "Optimize your images for any project" : "Optimiza tus imágenes para cualquier proyecto",
            url: baseUrl,
            locale: locale,
            type: "website"
        },
        alternates: {
            canonical: baseUrl,
            languages: Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["locales"].map((l)=>[
                    l,
                    `${baseUrl}?lang=${l}`
                ]))
        }
    };
}
async function RootLayout({ children }) {
    const locale = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$request$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLocale"])();
    const messages = (await __turbopack_context__.f({
        "@/i18n/locales/en/common.json": {
            id: ()=>"[project]/i18n/locales/en/common.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/common.json (json, async loader)")
        },
        "@/i18n/locales/en/common": {
            id: ()=>"[project]/i18n/locales/en/common.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/common.json (json, async loader)")
        },
        "@/i18n/locales/en/download.json": {
            id: ()=>"[project]/i18n/locales/en/download.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/download.json (json, async loader)")
        },
        "@/i18n/locales/en/download": {
            id: ()=>"[project]/i18n/locales/en/download.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/download.json (json, async loader)")
        },
        "@/i18n/locales/en/errors.json": {
            id: ()=>"[project]/i18n/locales/en/errors.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/errors.json (json, async loader)")
        },
        "@/i18n/locales/en/errors": {
            id: ()=>"[project]/i18n/locales/en/errors.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/errors.json (json, async loader)")
        },
        "@/i18n/locales/en/faq.json": {
            id: ()=>"[project]/i18n/locales/en/faq.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/faq.json (json, async loader)")
        },
        "@/i18n/locales/en/faq": {
            id: ()=>"[project]/i18n/locales/en/faq.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/faq.json (json, async loader)")
        },
        "@/i18n/locales/en/formats.json": {
            id: ()=>"[project]/i18n/locales/en/formats.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/formats.json (json, async loader)")
        },
        "@/i18n/locales/en/formats": {
            id: ()=>"[project]/i18n/locales/en/formats.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/formats.json (json, async loader)")
        },
        "@/i18n/locales/en/hero.json": {
            id: ()=>"[project]/i18n/locales/en/hero.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/hero.json (json, async loader)")
        },
        "@/i18n/locales/en/hero": {
            id: ()=>"[project]/i18n/locales/en/hero.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/hero.json (json, async loader)")
        },
        "@/i18n/locales/en/index.ts": {
            id: ()=>"[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/en/index": {
            id: ()=>"[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/en/processing.json": {
            id: ()=>"[project]/i18n/locales/en/processing.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/processing.json (json, async loader)")
        },
        "@/i18n/locales/en/processing": {
            id: ()=>"[project]/i18n/locales/en/processing.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/processing.json (json, async loader)")
        },
        "@/i18n/locales/en/settings.json": {
            id: ()=>"[project]/i18n/locales/en/settings.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/settings.json (json, async loader)")
        },
        "@/i18n/locales/en/settings": {
            id: ()=>"[project]/i18n/locales/en/settings.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/settings.json (json, async loader)")
        },
        "@/i18n/locales/en/uploader.json": {
            id: ()=>"[project]/i18n/locales/en/uploader.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/uploader.json (json, async loader)")
        },
        "@/i18n/locales/en/uploader": {
            id: ()=>"[project]/i18n/locales/en/uploader.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/uploader.json (json, async loader)")
        },
        "@/i18n/locales/es/common.json": {
            id: ()=>"[project]/i18n/locales/es/common.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/common.json (json, async loader)")
        },
        "@/i18n/locales/es/common": {
            id: ()=>"[project]/i18n/locales/es/common.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/common.json (json, async loader)")
        },
        "@/i18n/locales/es/download.json": {
            id: ()=>"[project]/i18n/locales/es/download.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/download.json (json, async loader)")
        },
        "@/i18n/locales/es/download": {
            id: ()=>"[project]/i18n/locales/es/download.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/download.json (json, async loader)")
        },
        "@/i18n/locales/es/errors.json": {
            id: ()=>"[project]/i18n/locales/es/errors.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/errors.json (json, async loader)")
        },
        "@/i18n/locales/es/errors": {
            id: ()=>"[project]/i18n/locales/es/errors.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/errors.json (json, async loader)")
        },
        "@/i18n/locales/es/faq.json": {
            id: ()=>"[project]/i18n/locales/es/faq.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/faq.json (json, async loader)")
        },
        "@/i18n/locales/es/faq": {
            id: ()=>"[project]/i18n/locales/es/faq.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/faq.json (json, async loader)")
        },
        "@/i18n/locales/es/formats.json": {
            id: ()=>"[project]/i18n/locales/es/formats.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/formats.json (json, async loader)")
        },
        "@/i18n/locales/es/formats": {
            id: ()=>"[project]/i18n/locales/es/formats.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/formats.json (json, async loader)")
        },
        "@/i18n/locales/es/hero.json": {
            id: ()=>"[project]/i18n/locales/es/hero.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/hero.json (json, async loader)")
        },
        "@/i18n/locales/es/hero": {
            id: ()=>"[project]/i18n/locales/es/hero.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/hero.json (json, async loader)")
        },
        "@/i18n/locales/es/index.ts": {
            id: ()=>"[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/es/index": {
            id: ()=>"[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/es/processing.json": {
            id: ()=>"[project]/i18n/locales/es/processing.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/processing.json (json, async loader)")
        },
        "@/i18n/locales/es/processing": {
            id: ()=>"[project]/i18n/locales/es/processing.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/processing.json (json, async loader)")
        },
        "@/i18n/locales/es/settings.json": {
            id: ()=>"[project]/i18n/locales/es/settings.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/settings.json (json, async loader)")
        },
        "@/i18n/locales/es/settings": {
            id: ()=>"[project]/i18n/locales/es/settings.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/settings.json (json, async loader)")
        },
        "@/i18n/locales/es/uploader.json": {
            id: ()=>"[project]/i18n/locales/es/uploader.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/uploader.json (json, async loader)")
        },
        "@/i18n/locales/es/uploader": {
            id: ()=>"[project]/i18n/locales/es/uploader.json (json, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/uploader.json (json, async loader)")
        },
        "@/i18n/locales/en": {
            id: ()=>"[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/en/": {
            id: ()=>"[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/en/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/es": {
            id: ()=>"[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)")
        },
        "@/i18n/locales/es/": {
            id: ()=>"[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/i18n/locales/es/index.ts [app-rsc] (ecmascript, async loader)")
        }
    }).import(`@/i18n/locales/${locale}`)).default;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: locale,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["locales"].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "alternate",
                        hrefLang: l,
                        href: `https://croma.aurora33.dev?lang=${l}`
                    }, l, false, {
                        fileName: "[project]/app/layout.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_a71539c9$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_8d43a2aa$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].variable} antialiased`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$server$2f$NextIntlClientProviderServer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__["NextIntlClientProvider"], {
                    locale: locale,
                    messages: messages,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/layout.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/layout.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c341f037._.js.map