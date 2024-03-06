export default function BlogSearch(props) {
  const inputValue = (event) => {
    const value = event.target.value;
    props.inputValue(value);
  };

  return (
    <form className="blog-search">
      <label className="blog-search__label">検索：</label>
      <input
        type="text"
        name="text"
        onChange={inputValue}
        className="blog-search__input"
        placeholder="見出しに含まれる文字を入力してください"
      />
    </form>
  );
}
