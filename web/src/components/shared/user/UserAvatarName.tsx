import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarNameProps {
  photoUrl: string | undefined;
  fullname: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export function UserAvatarName({
  photoUrl,
  fullname,
  className,
  size = "sm",
}: UserAvatarNameProps) {
  const sizeMap = {
    xs: "size-4",
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar className={cn(sizeMap[size])}>
        <AvatarImage src={photoUrl} alt={fullname} />
        <AvatarFallback>{fullname.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="text-xs" >{fullname}</p>
    </div>
  );
}
