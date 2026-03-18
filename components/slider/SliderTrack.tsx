import React from "react";

interface SliderTrackProps {
    height: number;
    children: React.ReactNode;
}

const SliderTrack = ({height, children}: SliderTrackProps) => (
    <div className="relative" style={{height}}>
        {children}
    </div>
);

export default SliderTrack;
