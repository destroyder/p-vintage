import { useState } from "react";

import formatDate from "./business/formatDate.ts";
// blog検索inputコンポーネント
import BlogSearch from "../components/BlogSearch.jsx";

export default function BlogList({ response }) {
  // ブログ記事一覧をstateで管理。初期値はpropsで受け取った値。
  const [bloglist, setBloglist] = useState(response);

  // inputValueはBlogSearchの中のinputの値をstateにセット。
  const inputValue = (val) => {
    const searchResult = response.contents.filter((content) => {
      // 大文字も小文字も検索対象にする。
      const inputVal = content.title.includes(val);
      const inputValUpper = content.title.toUpperCase().includes(val.toUpperCase());

      if (inputVal || inputValUpper) {
        return inputVal || inputValUpper;
      }
    });

    setBloglist({ contents: searchResult });
  };

  const bloglists = bloglist.contents.map((content) => (
    <li className="blog__list__item" key={content.id}>
      <a href={content.id}>
        <div>
          <img src={content.eyecatch.url} width="300" height="200" alt={content.title} />
        </div>
        <p className="blog__list__item__title">{content.title}</p>
        <p className="blog__list__item__info">
          <span className="blog__list__item__category">{content.category.name}</span>
          <span className="blog__list__item__date">[{formatDate(content.publishedAt)}]</span>
        </p>
      </a>
    </li>
  ));

  return (
    <>
      <BlogSearch client:load inputValue={inputValue} />
      <ul className="blog__list">
        {bloglists.length ? bloglists : <li className="blog__list--nosearch">該当記事がありません</li>}
      </ul>
    </>
  );
}
