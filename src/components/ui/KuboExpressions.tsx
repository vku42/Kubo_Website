"use client";

import { motion } from "framer-motion";

export type ExpressionType = 
  | "NEUTRAL" | "SMILE" | "FROWN" | "O" | "LAUGH" | "HEART" | "SURPRISED" 
  | "SLEEPY" | "WINK" | "SMIRK" | "TONGUE" | "GRIN" | "GASP" | "WHISTLE" 
  | "CONFUSED" | "ZIPPER" | "FANGS" | "KISS" | "ROBOT" | "SKEPTICAL" | "ANGRY" 
  | "COOL" | "SHOUT" | "TEETH" | "DROLL" | "MUSTACHE" | "UHU" | "OOOH" 
  | "GRIMACE" | "LIP_BITE";

export const expressionPaths: Record<ExpressionType, string> = {
  NEUTRAL: "M 34 53 L 44 55 L 56 55 L 66 53",
  SMILE: "M 32 53 L 40 57 L 50 59 L 60 57 L 68 53",
  FROWN: "M 32 55 L 40 51 L 50 49 L 60 51 L 68 55",
  O: "M 50 53 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0",
  LAUGH: "M 32 53 Q 50 67 68 53 L 64 53 Q 50 57 36 53 Z",
  HEART: "M 50 53 C 45 48 38 52 50 60 C 62 52 55 48 50 53",
  SURPRISED: "M 50 51 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0",
  SLEEPY: "M 42 55 L 58 55",
  WINK: "M 36 53 L 44 55 Q 50 56 56 54 L 64 50",
  SMIRK: "M 40 53 L 60 51 L 64 49",
  TONGUE: "M 38 53 L 62 53 M 46 54 Q 50 62 54 54",
  GRIN: "M 36 50 L 64 50 L 64 58 L 36 58 Z M 45 50 L 45 58 M 55 50 L 55 58",
  GASP: "M 50 55 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
  WHISTLE: "M 50 55 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0",
  CONFUSED: "M 38 53 L 44 56 L 50 53 L 56 56 L 62 53",
  ZIPPER: "M 36 53 L 64 53 M 40 51 L 40 55 M 44 51 L 44 55 M 48 51 L 48 55 M 52 51 L 52 55 M 56 51 L 56 55 M 60 51 L 60 55",
  FANGS: "M 40 53 L 60 53 L 58 56 L 56 53 L 52 53 L 48 53 L 44 53 L 42 56 Z",
  KISS: "M 48 53 Q 50 56 52 53 M 44 53 L 46 55 M 56 53 L 54 55",
  ROBOT: "M 38 51 L 62 51 L 62 57 L 38 57 Z M 46 51 L 46 57 M 54 51 L 54 57",
  SKEPTICAL: "M 38 55 L 62 51 L 66 50",
  ANGRY: "M 36 55 L 43 51 L 50 55 L 57 51 L 64 55",
  COOL: "M 38 53 L 62 51 Q 60 54 50 55",
  SHOUT: "M 40 49 L 60 49 L 56 57 L 44 57 Z",
  TEETH: "M 36 50 L 64 50 L 64 56 L 36 56 Z M 40 50 L 40 56 M 44 50 L 44 56 M 48 50 L 48 56 M 52 50 L 52 56 M 56 50 L 56 56 M 60 50 L 60 56",
  DROLL: "M 38 53 L 62 54 M 62 56 L 62 58 M 62 60 L 62 62",
  MUSTACHE: "M 50 53 L 42 55 L 38 58 M 50 53 L 58 55 L 62 58",
  UHU: "M 44 53 L 47 56 L 50 54 L 53 56 L 56 53",
  OOOH: "M 47 49 L 53 49 L 53 59 L 47 59 Z",
  GRIMACE: "M 36 53 L 64 53 M 40 51 L 40 55 M 45 51 L 45 55 M 50 51 L 50 55 M 55 51 L 55 55 M 60 51 L 60 55",
  LIP_BITE: "M 42 53 L 58 53 M 44 55 L 56 55 M 48 53 L 48 53.5 M 52 53 L 52 53.5",
};

export default function KuboMouth({ expression, color = "#F59E0B" }: { expression: ExpressionType, color?: string }) {
  return (
    <motion.path
      d={expressionPaths[expression]}
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={false}
      animate={{ d: expressionPaths[expression] }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}
