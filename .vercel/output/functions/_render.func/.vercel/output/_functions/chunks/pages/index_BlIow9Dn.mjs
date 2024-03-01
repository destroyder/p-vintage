/* empty css                             */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_CnvCEa5M.mjs';
import 'kleur/colors';
import { g as getBlogs, b as getInfo, c as $$Image, $ as $$Layout } from './_blogId__7fxdHz1I.mjs';
/* empty css                          */

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const response = await getBlogs({ fields: ["id", "title", "eyecatch", "publishedAt", "category"] });
  const responseInfo = await getInfo({ fields: ["info"] });
  const formatDate = (date) => {
    const utcDateTime = new Date(date);
    const japanTime = new Date(utcDateTime.getTime() + 9 * 60 * 60 * 1e3);
    const year = japanTime.getFullYear();
    const month = japanTime.getMonth() + 1;
    const day = japanTime.getDate();
    return `${year}/${month}/${day}`;
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "P vintage Web\u30B5\u30A4\u30C8", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main data-astro-cid-j7pv25f6><section id="mainVisual" data-astro-cid-j7pv25f6><div class="main-visual" data-astro-cid-j7pv25f6><h1 class="main-visual__title" data-astro-cid-j7pv25f6>P Vintage</h1><!-- <Image src={logoImg} class="main-visual__image" width="1000" height="400" alt="P vintage Webサイト" /> --></div></section><!-- info -->${responseInfo.info && renderTemplate`<section id="info" class="info" data-astro-cid-j7pv25f6><h2 class="info__title" data-astro-cid-j7pv25f6>Info</h2><p class="info__text" data-astro-cid-j7pv25f6>${responseInfo.info}</p></section>`}<!-- read文 --><section id="readText" data-astro-cid-j7pv25f6><p class="read-text" data-astro-cid-j7pv25f6>
P Vintageは、90年代にあったレギュラー古着と自分たちが素敵だと感じた古着の販売をしています。<br data-astro-cid-j7pv25f6>
取り扱う古着は、デニム、ワーク、ミリタリー、スポーツ、アウトドアを中心に取り扱っています。<br data-astro-cid-j7pv25f6>
また、古着のリメイク商品も取り扱っています。<br data-astro-cid-j7pv25f6>
ぜひ、ご覧いただけますと幸いです。
</p></section><!-- blog --><section id="blog" data-astro-cid-j7pv25f6><h2 class="blog__title" data-astro-cid-j7pv25f6>Blog</h2><ul class="blog__list" data-astro-cid-j7pv25f6>${response.contents.map((content) => renderTemplate`<li class="blog__list__item" data-astro-cid-j7pv25f6><a${addAttribute(content.id, "href")} data-astro-cid-j7pv25f6><div data-astro-cid-j7pv25f6>${renderComponent($$result2, "Image", $$Image, { "src": content.eyecatch.url, "width": "300", "height": "200", "alt": content.title, "data-astro-cid-j7pv25f6": true })}</div><p class="blog__list__item__title" data-astro-cid-j7pv25f6>${content.title}</p><p data-astro-cid-j7pv25f6><span class="blog__list__item__category" data-astro-cid-j7pv25f6>${content.category.name}</span><span class="blog__list__item__date" data-astro-cid-j7pv25f6>[${formatDate(content.publishedAt)}]</span></p></a></li>`)}</ul></section><!-- <section id="instagram">
      <h2 class="blog__title">instagram</h2>
    </section> --><!-- Contact --><section id="contact" data-astro-cid-j7pv25f6><h2 class="contact__title" data-astro-cid-j7pv25f6>Contact</h2><p class="contact__text" data-astro-cid-j7pv25f6>
お問合せはお手数ですが、<a href="https://www.instagram.com/p_vintage.sleep/" class="contact__link" target="_blank" data-astro-cid-j7pv25f6>Instagram</a>のDMからお願いいたします。
</p></section></main>` })}`;
}, "/Users/r.h/Desktop/dev/astro/src/pages/index.astro", void 0);

const $$file = "/Users/r.h/Desktop/dev/astro/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
