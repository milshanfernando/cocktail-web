import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <>
      <h1 className=" flex-center text-3xl">Hello World!</h1>
    </>
  );
}

export default App;
