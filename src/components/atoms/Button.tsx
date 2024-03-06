interface buttonObj {
  href: string;
  text: string;
}

export default function Button(buttonObj: buttonObj) {
  const button = buttonObj ? (
    <div className="button__common">
      <a className="button__common__link" href={buttonObj.href}>
        {buttonObj.text}
      </a>
    </div>
  ) : null;
  return button;
}
