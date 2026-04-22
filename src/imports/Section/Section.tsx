import imgRegular from "./249481b3c8b675aab735c4c257c585a0fedd6b36.png";
import imgRegularAiAndBots from "./26a9b7dd7cb34fea3726e68357b4936db38955b0.png";

function Cards() {
  return (
    <div className="content-stretch flex gap-[100px] items-start relative shrink-0" data-name="Cards">
      <div className="h-[3502px] relative shrink-0 w-[4096px]" data-name="Regular">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRegular} />
      </div>
      <div className="h-[1722px] relative shrink-0 w-[4096px]" data-name="Regular AI and Bots">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRegularAiAndBots} />
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[200px] items-start pt-[300px] relative size-full" data-name="Section">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[240px] text-black whitespace-nowrap">Full list of 450 Regular Illustrations</p>
      <Cards />
    </div>
  );
}