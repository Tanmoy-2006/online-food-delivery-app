import React from "react";

import video1 from "../assets/foodRushAnimation.mp4";

export default function DeliveryAnimation() {
  return (
    <div className="delivery-scene">
      <video
        className="delivery-video"
        src={video1}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}