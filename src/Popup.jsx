/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import nightsky from "./assets/nightsky.jpg";
import laptop from "./assets/laptop.jpg";
import ocean from "./assets/ocean.jpg";
import ReactPlayer from "react-player";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather/chevronLeft";
import { chevronRight } from "react-icons-kit/feather/chevronRight";

const Popup = ({ setPopup }) => {
  // slides array of objects
  const slides = [
    {
      name: "Upload and View Excel Files In React",
      description:
        "Learn how to effortlessly upload and view Excel files in your React applications with this step-by-step tutorial.",
      mediaType: "video",
      duration: 90,
      url: "https://www.youtube.com/watch?v=yXanzI91Ajc",
    },
    {
      name: "Starry Nightsky",
      description:
        "A mesmerizing view of the starry nightsky, capturing the beauty and vastness of the universe.",
      mediaType: "image",
      duration: 10,
      url: nightsky,
    },
    {
      name: "Laptop Workspace",
      description:
        "A modern laptop workspace, ideal for productivity and creativity.",
      mediaType: "image",
      duration: 5,
      url: laptop,
    },
    {
      name: "Ocean View",
      description:
        "A tranquil view of the vast ocean, capturing the serenity and beauty of the sea.",
      mediaType: "image",
      duration: 15,
      url: ocean,
    },
    {
      name: "Implement User Login through an API call using React and Redux Toolkit",
      description: "In this tutorial, learn how to implement user login through an API call using React and Redux Toolkit.",
      mediaType: "video",
      duration: 60,
      url: "https://www.youtube.com/watch?v=SnwCazCXBq4&t=63s",
    },
  ];

  // states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(slides[0].duration);
  const [secondsLeft, setSecondsLeft] = useState(duration);

  // player ref
  const playerRefs = useRef([]);

  // set seconds left every second by decreasing 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  // automatic slide change // update current index // update duration // reset seconds left
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
        setDuration(slides[newIndex].duration);
        setSecondsLeft(slides[newIndex].duration);
        playerRefs.current.forEach((player, index) => {
          if (player && player.getInternalPlayer()) {
            try {
              if (newIndex === index) {
                player.seekTo(0);
                player.getInternalPlayer().playVideo();
              }
              player.getInternalPlayer().pauseVideo();
            } catch (error) {
              console.error("YouTube player error: ", error);
            }
          }
        });
        return newIndex;
      });
    }, duration * 1000 + 1000);

    return () => clearInterval(interval);
  }, [currentIndex, duration, slides]);

  // handle prev
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? slides.length - 1 : prevIndex - 1;
      setDuration(slides[newIndex].duration);
      setSecondsLeft(slides[newIndex].duration);
      playerRefs.current.forEach((player, index) => {
        if (player && player.getInternalPlayer()) {
          try {
            if (newIndex === index) {
              player.seekTo(0);
              player.getInternalPlayer().playVideo();
            }
            player.getInternalPlayer().pauseVideo();
          } catch (error) {
            console.error("YouTube player error: ", error);
          }
        }
      });
      return newIndex;
    });
  };

  // handle next
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
      setDuration(slides[newIndex].duration);
      setSecondsLeft(slides[newIndex].duration);
      playerRefs.current.forEach((player, index) => {
        if (player && player.getInternalPlayer()) {
          try {
            if (newIndex === index) {
              player.seekTo(0);
              player.getInternalPlayer().playVideo();
            }
            player.getInternalPlayer().pauseVideo();
          } catch (error) {
            console.error("YouTube player error: ", error);
          }
        }
      });
      return newIndex;
    });
  };

  // Calculate the width percentage for the progress bar
  const progressBarWidth = `${(secondsLeft / duration) * 100}%`;

  // unmount component
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setPopup(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [setPopup]);

  return (
    <div className="carousel-container">
      <div className="carousel-images">
        <div className="current-img-div">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="current-image"
              style={{
                transform: `translateX(-${
                  (currentIndex !== 0 && currentIndex) * 100
                }%)`,
              }}
            >
              {slide.mediaType === "image" ? (
                <img src={slide.url} alt="currentImg" loading="lazy" />
              ) : (
                <div className="video-container">
                  <ReactPlayer
                    ref={(player) => (playerRefs.current[index] = player)}
                    url={slide.url}
                    playing={currentIndex === index}
                    width="100%"
                    height="100%"
                    playsinline
                    key="youtube"
                    controls
                    muted
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-content">
        {slides.map((slide, index) => (
          <React.Fragment key={index}>
            {index === currentIndex && (
              <AnimatePresence>
                <motion.div
                  className="main-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: "easeInOut",
                  }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="name">{slide.name}</h2>
                  <div className="description">{slide.description}</div>
                  <div className="progress-container">
                    <div
                      key={currentIndex}
                      className="progress-bar"
                      style={{ width: progressBarWidth }}
                    ></div>
                  </div>
                </motion.div>

                <div className="secondary-content">
                  <div className="back-and-next-container">
                    <div className="back rounded-circle" onClick={handlePrev}>
                      <Icon icon={chevronLeft} size={42} />
                    </div>
                    <div className="indicator">{`${currentIndex + 1} of ${
                      slides.length
                    }`}</div>
                    <div className="next rounded-circle" onClick={handleNext}>
                      <Icon icon={chevronRight} size={42} />
                    </div>
                  </div>
                </div>
              </AnimatePresence>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Popup;
