const debounceFrame = (callback: FrameRequestCallback) => {
  let nextFrameCallack = 0;

  const nextEexcution = () => {
    cancelAnimationFrame(nextFrameCallack);
    nextFrameCallack = requestAnimationFrame(callback);
  };

  return nextEexcution;
};

export default debounceFrame;
