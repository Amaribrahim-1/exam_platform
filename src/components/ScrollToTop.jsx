import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // بنستهدف العنصر اللي فيه السكرول فعلياً
    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      // mainContent.scrollTo(0, 0);
      mainContent?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]); // هيشتغل كل ما الـ URL يتغير

  return null;
};

export default ScrollToTop;
