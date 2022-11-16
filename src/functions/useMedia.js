import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function useMedia(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  // cDM, cDU
  useEffect(() => {
    let media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    let listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener();
  }, [query]);

  return matches;
}

export default useMedia;