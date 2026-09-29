import logoColor from "@/assets/logo.png";
import logoLight from "@/assets/logo-light.png";
import markColor from "@/assets/logo-mark.png";
import markLight from "@/assets/logo-mark-light.png";
import { cn } from "@/utils/cn";

type LogoProps = {
  theme?: "dark" | "light" | "auto";
  className?: string;
  alt?: string;
};

export function Logo({ theme = "dark", className, alt = "Creative Structures NJ LLC" }: LogoProps) {
  const src = theme === "light" ? logoColor : logoLight;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-8 w-auto object-contain select-none", className)}
      draggable={false}
    />
  );
}

export function LogoMark({ theme = "dark", className, alt = "Creative Structures Mark" }: LogoProps) {
  const src = theme === "light" ? markColor : markLight;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-7 w-auto object-contain select-none", className)}
      draggable={false}
    />
  );
}
