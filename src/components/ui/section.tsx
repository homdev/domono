import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export const Section = ({
  children,
  className,
  containerClassName,
  id,
  ...props
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        className
      )}
      {...props}
      style={{
        contain: 'layout paint',
        ...props.style
      }}
    >
      <div
        className={cn(
          "container px-4 mx-auto relative z-10",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}; 