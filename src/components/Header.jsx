export default function Header({ logoImg }) {
  return (
    <header className="p-header fixed">
      <div className="p-header-logo">
        <a href="/">
          <img src={logoImg.src} width="50" height="50" alt="p-vintage" />
        </a>
      </div>
      <nav className="p-header-link">
        <ul className="p-header-link-list">
          <li className="p-header-link-list--link">
            <a href="/blog">blog</a>
          </li>
          <li className="p-header-link-list--link">
            <a href="https://p-vintage.stores.jp/" target="_blank">
              online shop
            </a>
          </li>
          <li className="p-header-link-list--link">
            <a href="https://www.instagram.com/p_vintage.sleep/" target="_blank">
              instagram
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
