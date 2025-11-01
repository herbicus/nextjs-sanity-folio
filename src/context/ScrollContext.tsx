"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";

import type { ReactNode } from "react";

interface ScrollContextProps {
  isInitialScroll: boolean;
  isAboveFold: boolean;
  isScrollEnd: boolean;
  isScrollStart: boolean;
  isScrollUp: boolean;
  inView: boolean;
  setInView: React.Dispatch<React.SetStateAction<boolean>>;
  scrollY: number;
  scrollUpDistance: number;
}

const initialValues: {
  initialScroll: number;
  foldScroll: number;
  maxScroll: number;
  scrollY: number;
} = {
  initialScroll: 0,
  foldScroll: 0,
  maxScroll: Infinity,
  scrollY: 0,
};

export const ScrollContext = React.createContext<ScrollContextProps | null>(
  null
);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [inView, setInView] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(initialValues.scrollY);
  const initialScroll = useRef<number>(initialValues.initialScroll);
  const foldScroll = useRef<number>(initialValues.foldScroll);
  const maxScroll = useRef<number>(initialValues.maxScroll);
  const previousY = useRef<number>(initialValues.scrollY);

  const [scrollUpDistance, setScrollUpDistance] = useState(0);
  const lastScrollY = useRef(scrollY);

  const onResize = useCallback(() => {
    initialScroll.current = window.innerHeight * 0.0125;
    foldScroll.current = window.innerHeight * 0.5625 + 10;
    maxScroll.current = document.body.scrollHeight - window.innerHeight - 10;
  }, []);

  const onScroll = useCallback(() => {
    previousY.current = scrollY;
    setScrollY(window.scrollY);
  }, [scrollY]);

  const isInitialScroll = useMemo(() => {
    return scrollY <= initialScroll.current;
  }, [scrollY]);

  const isAboveFold = useMemo(() => {
    return scrollY <= foldScroll.current;
  }, [scrollY]);

  const isScrollEnd = useMemo(() => {
    return scrollY >= maxScroll.current;
  }, [scrollY]);

  const isScrollStart = useMemo(() => {
    return scrollY === 0;
  }, [scrollY]);

  const isScrollUp = useMemo(() => {
    return scrollY - previousY.current < 0;
  }, [scrollY]);

  useEffect(() => {
    const handleResize = () => {
      onResize();
    };

    const handleScroll = () => {
      onScroll();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onResize, onScroll]);

  useEffect(() => {
    if (isScrollUp) {
      const distanceScrolledUp = lastScrollY.current - scrollY;
      setScrollUpDistance((oldDistance) => oldDistance + distanceScrolledUp);
    } else {
      setScrollUpDistance(0);
    }
    lastScrollY.current = scrollY;
  }, [scrollY, isScrollUp]);

  useEffect(() => {
    onResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollContextValue: ScrollContextProps = useMemo(
    () => ({
      isInitialScroll,
      isAboveFold,
      isScrollEnd,
      isScrollStart,
      isScrollUp,
      inView,
      setInView,
      scrollY,
      scrollUpDistance,
    }),
    [
      isInitialScroll,
      isAboveFold,
      isScrollEnd,
      isScrollStart,
      isScrollUp,
      inView,
      setInView,
      scrollY,
      scrollUpDistance,
    ]
  );

  return (
    <ScrollContext.Provider value={scrollContextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }

  return context;
};
