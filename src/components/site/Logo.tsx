import icon from "@/assets/chandelier.png";
import wordmark from "@/assets/althuraya-wordmark.png";

export function Logo() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-3 shrink-0"
      aria-label="الثريا"
    >
      <img src={icon} alt="" className="h-11 w-11 object-contain" />
      <img
        src={wordmark}
        alt="الثريا"
        className="h-8 w-auto object-contain sm:h-9"
      />
    </a>
  );
}
