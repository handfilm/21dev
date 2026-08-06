import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose class names, then let the last conflicting Tailwind utility win.
 *
 * `clsx` flattens conditionals/arrays/objects; `twMerge` resolves collisions so
 * a caller's `className` can override a component default:
 *
 *   cn("px-4 py-2 bg-primary", isGhost && "bg-transparent", className)
 *   // "px-4 py-2 bg-transparent" + whatever the caller passed
 *
 * Without twMerge both `bg-` classes ship and CSS source order decides —
 * which is not the caller.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
