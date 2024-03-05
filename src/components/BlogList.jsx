import formatDate from "./business/formatDate.ts";

export default function BlogList({ response }) {
  const bloglists = response.contents.map((content) => (
    <li className="blog__list__item">
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
  return <ul className="blog__list">{bloglists ? bloglists : null}</ul>;
}
