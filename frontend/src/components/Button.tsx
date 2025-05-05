interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  fullWidth = true,
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "font-medium py-2 px-4 mt-2 md:mt-0 rounded-lg transition duration-200 hover:cursor-pointer";
  const widthClass = fullWidth ? "w-full" : "";
  const variants: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${widthClass}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
