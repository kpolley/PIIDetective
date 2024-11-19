"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { CheckCircle, Loader } from "react-feather";

interface LoadingButtonProps {
  onClick: () => Promise<void>;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

export default function LoadingButton({
  onClick,
  className,
  children,
  ...props
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setIsComplete(false);

    await onClick();

    setIsLoading(false);
    setIsComplete(true);
  };

  return (
    <Button onClick={handleClick} className={className} {...props}>
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : isComplete ? (
        <CheckCircle />
      ) : (
        children
      )}
    </Button>
  );
}
