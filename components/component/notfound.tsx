"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface ErrorBox {
  id: number;
  top: string;
  left: string;
  out?: boolean;
}

export default function NotFound() {
  const [errorBoxes, setErrorBoxes] = useState<ErrorBox[]>([]);
  const draggingBoxRef = useRef<ErrorBox | null>(null);
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorBoxes((prevBoxes: ErrorBox[]) => {
        const newBoxes = [...prevBoxes];
        if (newBoxes.length > 20) {
          newBoxes[0].out = true;
          setTimeout(() => {
            setErrorBoxes((boxes) =>
              boxes.filter((box) => box.id !== newBoxes[0].id),
            );
          }, 100);
        }
        newBoxes.push({
          id: Date.now(),
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        });
        return newBoxes;
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement>,
    box: ErrorBox,
  ) => {
    if (event.currentTarget.dataset.draggable === "true") {
      draggingBoxRef.current = box;
      const offsetX =
        event.clientX - event.currentTarget.getBoundingClientRect().left;
      const offsetY =
        event.clientY - event.currentTarget.getBoundingClientRect().top;
      offsetRef.current = { x: offsetX, y: offsetY };
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (draggingBoxRef.current) {
      setErrorBoxes((prevBoxes) =>
        prevBoxes.map((box) =>
          box.id === draggingBoxRef.current?.id
            ? {
                ...box,
                top: `${
                  ((event.clientY - offsetRef.current.y) / window.innerHeight) *
                  100
                }%`,
                left: `${
                  ((event.clientX - offsetRef.current.x) / window.innerWidth) *
                  100
                }%`,
              }
            : box,
        ),
      );
    }
  };

  const handleMouseUp = () => {
    draggingBoxRef.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleClose = (id: number) => {
    setErrorBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  return (
    <div className="relative h-screen overflow-hidden text-black">
      {errorBoxes.map((box: ErrorBox) => (
        <div
          key={box.id}
          style={{ top: box.top, left: box.left }}
          className={`absolute min-w-[350px] border border-[#2d89ef] bg-white text-sm shadow-lg ${
            box.out ? "animate-bounce-out" : "animate-bounce-in"
          }`}
        >
          <header
            className="flex cursor-move items-center border-b border-[#e0e0e0] bg-[#f0f0f0] p-2"
            data-draggable="true"
            onMouseDown={(e) => handleMouseDown(e, box)}
          >
            <h1 className="w-full text-black">../404.html</h1>
            <a
              className="text-2xl no-underline"
              href="#"
              onClick={() => handleClose(box.id)}
            >
              <IoIosClose />
            </a>
          </header>
          <div className="flex items-center p-5">
            <IoIosClose className="rounded-full bg-red-700 text-4xl text-white" />

            <p className="px-2.5">The page was not found</p>
          </div>
          <footer className="flex justify-end border-t border-[#e0e0e0] bg-[#f0f0f0] p-2">
            <button className="border border-[#c0c0c0] bg-[#d9d9d9] px-3 py-1.5 focus:border-[#2d89ef] active:border-[#2b5797] dark:!text-black">
              WHOOPS
            </button>
          </footer>
        </div>
      ))}
    </div>
  );
}
