import "../styles/mainVisual.scss";

export default function MainVisual() {
  return (
    <section id="mainVisual">
      <div className="main-visual">
        <h1 className="main-visual__title">P-Vintage</h1>
        <img
          src="/src/images/mv.jpg"
          className="main-visual__image"
          width="1000"
          height="400"
          alt="P vintage Webサイト"
        />
      </div>
    </section>
  );
}
