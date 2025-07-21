"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import rightCaret from "../../public/chevron-right.svg";

interface GalleryProps {
  items: {
    image: string;
    sneakpeak: string;
    title: string;
    description: string;
  }[];
}

const Gallery = ({ items }: GalleryProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const setupQueue = items.map((item, index) => {
    return `${index}`;
  });
  const [classQueue, setClassQueue] = useState(setupQueue);
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setIsTransitioning(true);
    const tempArray = classQueue;
    const currentItem = tempArray[0];
    tempArray.shift();
    tempArray.push(currentItem);
    setTimeout(() => {
      if (activeIndex === classQueue.length - 1) {
        setActiveIndex(0);
      } else setActiveIndex(activeIndex + 1);
      setClassQueue(tempArray);
      setIsTransitioning(false);
    }); // Match the transition duration
  };

  // const previous = () => {
  //   setIsTransitioning(true);
  //   const currentItem = classQueue[classQueue.length - 1];
  //   const classQueueShortened = classQueue.slice(0, classQueue.length - 1);
  //   const tempArray = [currentItem, ...classQueueShortened];
  //   setTimeout(() => {
  //     setClassQueue(tempArray);
  //     setIsTransitioning(false);
  //   }); // Match the transition duration
  // };

  const getLinkHref = (title: string) => {
    return title === "Welcome to Mountain Eye Institute"
      ? "/about"
      : "/treatments";
  };

  return (
    <div className='galleryContainer'>
      {items.map((item, index) => {
        return (
          <div
            className={`activeText ${index === activeIndex && "active"}`}
            key={index}
          >
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Link href={getLinkHref(item.title)} passHref legacyBehavior>
              <button className='learnMoreButton'>Learn More</button>
            </Link>
          </div>
        );
      })}
      <div className='thumbnails'>
        {items.map((item, index) => {
          return (
            <div key={index} className={`thumbnail index${classQueue[index]}`}>
              <Image
                src={item.image}
                alt='test image'
                height={1149}
                width={1920}
              />
              <div className='thumbnailTitle'>
                <p>{item.sneakpeak}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className='navigation'>
        {/* <div className='arrow' onClick={() => previous()}>
          <Image src={rightCaret} alt='right arrow' width={50} height={50} />
        </div> */}
        <div className='dots'>
          {items.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
            ></div>
          ))}
        </div>
        <div className='arrow' onClick={() => next()}>
          <Image src={rightCaret} alt='right arrow' width={25} height={25} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
