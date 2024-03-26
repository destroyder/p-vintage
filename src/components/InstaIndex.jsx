import "../styles/components/instagram.scss";
import instagramImg from "../images/instagram.jpg";
import Button from "./atoms/Button.tsx";

export default function InstaIndex() {
  return (
    <section id="instagram" class="pt-6">
      <h2 class="instagram__title">instagram</h2>
      <div class="instagram__wrap">
        <div class="instagram__text">
          <p class="pb-4 pt-4">
            P-Vintageのinstagramです。
            <br />
            最新の商品情報やイベント情報を更新しています。
          </p>
          <Button href="https://www.instagram.com/p_vintage.sleep/" text="instagram" />
        </div>
        <img src={instagramImg.src} class="instagram__image" width="1000" height="400" alt="P vintage instagram" />
      </div>
    </section>
  );
}
