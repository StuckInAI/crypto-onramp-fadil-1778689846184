type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 32, className }: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M10 25C10 25 15 15 25 15C35 15 30 25 30 25C30 25 25 35 15 35C5 35 10 25 10 25Z" 
        stroke="url(#logo-gradient-1)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 5V15" 
        stroke="url(#logo-gradient-2)" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      <defs>
        <linearGradient id="logo-gradient-1" x1="10" y1="15" x2="30" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-green)" />
          <stop offset="1" stopColor="var(--color-blue)" />
        </linearGradient>
        <linearGradient id="logo-gradient-2" x1="20" y1="5" x2="20" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-purple)" />
          <stop offset="1" stopColor="var(--color-blue)" />
        </linearGradient>
      </defs>
    </svg>
  );
}