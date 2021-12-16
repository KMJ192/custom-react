const debounceFrame = (callback: FrameRequestCallback) => {
  let nextFrameCallack = 0;

  const nextExcution = () => {
    cancelAnimationFrame(nextFrameCallack);
    nextFrameCallack = requestAnimationFrame(callback);
  };

  return nextExcution;
};

export default debounceFrame;
