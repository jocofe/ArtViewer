import { useEffect, useState } from "react";

type Word = "research" | "explore" | "inspire" | "discover";
const words: Word[] = ["research", "explore", "inspire", "discover"];

const imageGroups = {
  research: [
    "src/assets/mosaic-images/img1.jpg",
    "src/assets/mosaic-images/img2.jpg",
    "src/assets/mosaic-images/img3.jpg",
    "src/assets/mosaic-images/img4.jpg",
    "src/assets/mosaic-images/img5.jpg",
    "src/assets/mosaic-images/img6.jpg",
  ],
  explore: [
    "src/assets/mosaic-images/img7.jpg",
    "src/assets/mosaic-images/img8.jpg",
    "src/assets/mosaic-images/img9.jpg",
    "src/assets/mosaic-images/img10.jpg",
    "src/assets/mosaic-images/img11.jpg",
    "src/assets/mosaic-images/img12.jpg",
  ],
  inspire: [
    "src/assets/mosaic-images/img13.jpg",
    "src/assets/mosaic-images/img14.jpg",
    "src/assets/mosaic-images/img15.jpg",
    "src/assets/mosaic-images/img16.jpg",
    "src/assets/mosaic-images/img17.jpg",
    "src/assets/mosaic-images/img18.jpg",
  ],
  discover: [
    "src/assets/mosaic-images/img19.jpg",
    "src/assets/mosaic-images/img20.jpg",
    "src/assets/mosaic-images/img21.jpg",
    "src/assets/mosaic-images/img22.jpg",
    "src/assets/mosaic-images/img23.jpg",
    "src/assets/mosaic-images/img24.jpg",
  ],
};

export const MosaicImages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="landing-animation">
      <div className="text-container h1">
        <span>Find art to </span>
        {words.map((word, index) => (
          <div key={word} className={`word ${currentIndex === index? 'visible' : 'hidden'}`}>{word}</div>
        ))}
      </div>

      <div className="mosaic-container">
        {imageGroups[words[currentIndex]].slice(0, 6).map((image, index) => (
          <div
            key={index}
            className={`mosaic-image image-${index + 1} ${currentIndex === index? 'visible' : 'hidden'}`}
          >
            <div className="image">
              <img src={image} alt={`Image ${index + 1}`}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}