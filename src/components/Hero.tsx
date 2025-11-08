import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { heroData } from "../../constants";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useGSAP(() => {
    const titleSplit = new SplitText(".title", { type: "chars words" });
    titleSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    gsap.from(titleSplit.chars, {
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
          currentTime: videoRef.current!.duration,
        });
      };
    }
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title uppercase">{heroData.title}</h1>

        <img
          className="left-leaf"
          src="/images/hero-left-leaf.png"
          alt="left leaf"
        />

        <img
          className="right-leaf"
          src="/images/hero-right-leaf.png"
          alt="left leaf"
        />

        <div className="body">
          <div className="content">
            <div className=" space-y-5 md:block hidden">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br />
                of Summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu mixes premium ingredients with good
                vibes and bold flavors — crafted to make every moment
                unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
