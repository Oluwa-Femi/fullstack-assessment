/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useState } from "react";

export const trunc = (string, charLen) => {
  if (string.length > charLen) {
    const fullname = string;
    const name = string.slice(0, fullname.indexOf(" "));
    return `${name.substr(0, charLen)}`;
  }
  return string;
};

export const textShortener = (string, charLen) => {
  if (string.length > charLen) {
    return `${string.substr(0, charLen)}...`;
  }
  return string;
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}