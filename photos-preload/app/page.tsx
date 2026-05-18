"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [photosFetched, setPhotosFetched] = useState<
    { id: number; thumbnailUrl: string; title: string }[]
  >([]);
  useEffect(() => {
    const ib = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src =
            photosFetched[
              parseInt(img.id.split("-").slice(-1)[0])
            ].thumbnailUrl;
          ib.unobserve(img);
        }
      });
    });
    for (let i = 0; i < photosFetched.length; i++) {
      const img = document.getElementById(`image-to-load-${i}`);
      if (img) {
        ib.observe(img);
      }
    }
  }, [photosFetched]);
  useEffect(() => {
    (async () => {
      const photoJsonData = await fetch(
        "https://fakestoreapiserver.reactbd.org/api/photos",
      );
      const photos = await photoJsonData.json();
      setPhotosFetched([...photos.data]);
    })();
  }, []);
  return (
    <div className="flex flex-col flex-1 items-center  bg-zinc-50 font-sans dark:bg-black ">
      <div className="text-4xl">All Photoes</div>
      {photosFetched.map(
        (photo: { id: number; thumbnailUrl: string; title: string }, i) => (
          <div
            key={i}
            className="flex flex-col items-center  w-50 h-70 justify-center border-2 border-gray-300 rounded-lg m-4 p-4 overflow-hidden"
            // specific width and height is needed as it makes sure that the intersection observer doesn't get triggers for all when the src is not set in the beginning
          >
            <img alt={photo.title} id={`image-to-load-${i}`} />
            <div>{photo.title}</div>
          </div>
        ),
      )}
    </div>
  );
}
