import "./App.css";

import { useState } from "react";

function App() {
  const [starRating, setStarRating] = useState(0);
  const [starPercent, setStarPercent] = useState(0);
  const [allowMouseHover, setAllowMouseHover] = useState(true);
  const [ratingSelectionDone, setRatingSelectionDone] = useState(false);

  const onMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    if (!allowMouseHover) return;
    const starRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - starRect.left;
    const percent = (mouseX / starRect.width) * 100;
    setStarPercent(percent);
    setStarRating(i);
  };
  const onResetEvent = () => {
    setAllowMouseHover(true);
    setRatingSelectionDone(false);
    setStarPercent(0);
    setStarRating(0);
  };

  return (
    <div className="App">
      <div
        className="root-container"
        onMouseLeave={() => !ratingSelectionDone && setAllowMouseHover(false)}
        onMouseEnter={() => !ratingSelectionDone && setAllowMouseHover(true)}
      >
        <div className="star-container">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="star-wrapper"
              onMouseMove={(e) =>
                !ratingSelectionDone && onMouseMoveEvent(e, i + 1)
              }
              onClick={() => setRatingSelectionDone(true)}
            >
              <div key={`proxy-${i}`} className={`star-proxy`}>
                {"\u2605"}
              </div>
              <div
                key={`star-${i}`}
                style={{
                  width:
                    i < starRating - 1
                      ? "100%"
                      : i === starRating - 1
                        ? `${starPercent}%`
                        : "0%",
                }}
                className={`star ${i < starRating ? "filled" : ""}`}
              >
                {"\u2605"}
              </div>
            </div>
          ))}
        </div>
        <div>
          Rating is{" "}
          {starPercent != 0
            ? (starRating - 1 + starPercent / 100).toFixed(1)
            : 0}
          /5
        </div>
        <button className="reset-button" onClick={onResetEvent}>
          Reset
        </button>
      </div>
    </div>

    // This does the selection fully and not partially
    // <div className="App">
    //   <div className="root-container">
    //     <div className="star-container">
    //       {Array.from({ length: 5 }).map((_, i) => (
    //         <div
    //           key={i}
    //           className={`star ${i < starRating ? "filled" : ""}`}
    //           onClick={() => setStarRating(i + 1)}
    //         >
    //           {"\u2605"}
    //         </div>
    //       ))}
    //     </div>
    //     <div>Rating is {starRating}/5</div>
    //   </div>
    // </div>
  );
}

export default App;
