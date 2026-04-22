import imgRegular from "../../imports/Section/249481b3c8b675aab735c4c257c585a0fedd6b36.png";

interface IllustrationProps {
  row: number; // 0-indexed row number
  col: number; // 0-indexed column number
  size?: number; // Size in pixels, default 80
  className?: string;
}

/**
 * Displays a single illustration from the sprite sheet
 * The sprite sheet has illustrations arranged in a grid
 * Each illustration is approximately 200x200px in the source
 * Grid is roughly 20 columns wide
 */
export function Illustration({ row, col, size = 80, className = "" }: IllustrationProps) {
  const illustrationSize = 205; // Approximate size of each illustration in the sprite sheet
  const offsetX = col * illustrationSize;
  const offsetY = row * illustrationSize;
  const scale = size / illustrationSize;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={imgRegular}
        alt=""
        className="absolute pointer-events-none"
        style={{
          left: -offsetX * scale,
          top: -offsetY * scale,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          imageRendering: "crisp-edges",
        }}
      />
    </div>
  );
}

// Predefined illustration positions for common use cases
export const IllustrationTypes = {
  CALENDAR: { row: 0, col: 0 }, // Top-left illustration (adjust as needed)
  TASKS: { row: 0, col: 2 },
  MESSAGES: { row: 1, col: 1 },
  TEAM: { row: 2, col: 0 },
  SCHEDULE: { row: 0, col: 0 },
  NOTIFICATIONS: { row: 1, col: 3 },
  SETTINGS: { row: 2, col: 2 },
  DOCUMENTS: { row: 3, col: 1 },
  SECURITY: { row: 4, col: 0 },
  CELEBRATION: { row: 5, col: 5 },
};
