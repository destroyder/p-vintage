import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_CnvCEa5M.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_blogId_.BD4j47u_.css"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_blogId_.BD4j47u_.css"},{"type":"inline","content":"@charset \"UTF-8\";main{margin:auto;padding:5rem 1rem 2rem;max-width:1000px}.post h2{font-size:1.5rem;margin-bottom:.25rem}.post a{text-decoration:underline}.post p,.post figure{margin-bottom:1.5rem}.post figure{max-width:600px}.post strong{font-weight:700}\n"}],"routeData":{"route":"/[blogid]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"blogId","dynamic":true,"spread":false}]],"params":["blogId"],"component":"src/pages/[blogId].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_blogId_.BD4j47u_.css"},{"type":"inline","content":".main-visual[data-astro-cid-j7pv25f6]{text-align:center;width:100%;height:300px;background-color:#f0f0f0;position:relative;margin-bottom:80px}.main-visual__title[data-astro-cid-j7pv25f6]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:2.5rem;color:#fff}.main-visual__image[data-astro-cid-j7pv25f6]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.read-text[data-astro-cid-j7pv25f6]{text-align:center;max-width:1200px;margin:0 auto 80px;padding:0 40px;font-size:.8rem}.info[data-astro-cid-j7pv25f6]{max-width:1200px;margin:0 auto 80px;padding:0 40px}.info__title[data-astro-cid-j7pv25f6]{text-align:center;font-size:2rem;margin-bottom:40px}.info__text[data-astro-cid-j7pv25f6]{text-align:center;font-size:.8rem}.blog__title[data-astro-cid-j7pv25f6]{text-align:center;font-size:2rem;margin-bottom:40px}.blog__list[data-astro-cid-j7pv25f6]{display:flex;justify-content:space-between;flex-wrap:wrap;max-width:1200px;margin:0 auto 80px;gap:40px;padding:0 40px}.blog__list[data-astro-cid-j7pv25f6]:after{content:\"\";width:calc(100% / 3 - 40px)}.blog__list__item[data-astro-cid-j7pv25f6] img[data-astro-cid-j7pv25f6]{width:100%;aspect-ratio:3/2;-o-object-fit:cover;object-fit:cover}.blog__list__item__title[data-astro-cid-j7pv25f6]{margin:8px 0}.blog__list__item__category[data-astro-cid-j7pv25f6]{padding:4px 8px;background-color:#f0f0f0;border-radius:4px;font-size:.8rem}.blog__list__item__date[data-astro-cid-j7pv25f6]{margin-left:8px;font-size:.8rem;color:#999}.blog__list__item[data-astro-cid-j7pv25f6]{width:calc(100% / 3 - 40px)}.contact__title[data-astro-cid-j7pv25f6]{text-align:center;font-size:2rem;margin-bottom:40px}.contact__text[data-astro-cid-j7pv25f6]{text-align:center;max-width:1200px;margin:0 auto 80px;padding:0 40px;font-size:.8rem}.contact__link[data-astro-cid-j7pv25f6]{text-decoration:underline}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/r.h/Desktop/dev/astro/src/pages/[blogId].astro",{"propagation":"none","containsHead":true}],["/Users/r.h/Desktop/dev/astro/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/r.h/Desktop/dev/astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/blog.astro":"chunks/pages/blog_TM7llCkZ.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CKeUeWdV.mjs","/src/pages/index.astro":"chunks/pages/index_D8zW1Hvc.mjs","\u0000@astrojs-manifest":"manifest_BM0UNkeG.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_B1UjArMK.mjs","\u0000@astro-page:src/pages/blog@_@astro":"chunks/blog_5EWsDkNb.mjs","\u0000@astro-page:src/pages/[blogId]@_@astro":"chunks/_blogId__D1zx16MT.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_C7ToF2tU.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/logo.R4NPHqg4.png","/_astro/_blogId_.BD4j47u_.css","/favicon.svg"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
