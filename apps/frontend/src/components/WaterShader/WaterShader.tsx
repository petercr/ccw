import { Water } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";
import { shaderContainer, shaderVisible } from "./WaterShader.css.ts";

export default function WaterShader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`${shaderContainer}${visible ? ` ${shaderVisible}` : ""}`}
      aria-hidden="true"
    >
      <Water
        speed={0.54}
        colorBack="#00000000"
        colorHighlight="#ffffff"
        size={0.74}
        highlights={0.07}
        layering={0.5}
        edges={0.8}
        waves={0.5}
        caustic={0.1}
        scale={1.43}
        fit="contain"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
