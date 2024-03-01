/* empty css                             */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_CnvCEa5M.mjs';
import 'kleur/colors';
import { g as getBlogs, $ as $$Layout } from './_blogId__YvrcW7Zh.mjs';

const $$Astro = createAstro();
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const response = await getBlogs({ fields: ["id", "title", "eyecatch"] });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "P vintage blog\u30DA\u30FC\u30B8" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <ul> ${response.contents.map((content) => renderTemplate`<li> <a${addAttribute(content.id, "href")}> ${content.title} </a> </li>`)} </ul> </main> ` })} `;
}, "/Users/r.h/Desktop/dev/astro/src/pages/blog.astro", void 0);

const $$file = "/Users/r.h/Desktop/dev/astro/src/pages/blog.astro";
const $$url = "/blog";

export { $$Blog as default, $$file as file, $$url as url };
