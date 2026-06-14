import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   PageHero root — the outer banner container
───────────────────────────────────────────── */
const pageHeroVariants = cva(
  "px-4 sm:px-6 lg:px-8",
  {
    variants: {
      /** Visual style of the banner */
      variant: {
        default: "bg-muted",
        primary: "bg-primary text-primary-foreground border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-secondary/20",
        transparent: "bg-transparent",
      },
      /** Vertical padding preset */
      size: {
        default: "pt-36 pb-20",
        sm: "pt-28 pb-14",
        lg: "pt-44 pb-28",
        compact: "pt-24 pb-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface PageHeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof pageHeroVariants> { }

const PageHero = React.forwardRef<HTMLDivElement, PageHeroProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="page-hero"
      className={cn(pageHeroVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
PageHero.displayName = "PageHero";

/* ─────────────────────────────────────────────
   PageHeroContent — centred inner wrapper
───────────────────────────────────────────── */
const pageHeroContentVariants = cva("mx-auto", {
  variants: {
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
    maxWidth: {
      sm: "max-w-xl",
      md: "max-w-2xl",
      lg: "max-w-3xl",
      xl: "max-w-4xl",
    },
  },
  defaultVariants: {
    align: "center",
    maxWidth: "xl",
  },
});

export interface PageHeroContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof pageHeroContentVariants> { }

const PageHeroContent = React.forwardRef<HTMLDivElement, PageHeroContentProps>(
  ({ className, align, maxWidth, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="page-hero-content"
      className={cn(pageHeroContentVariants({ align, maxWidth }), className)}
      {...props}
    />
  ),
);
PageHeroContent.displayName = "PageHeroContent";

/* ─────────────────────────────────────────────
   PageHeroHeading — the <h1>
───────────────────────────────────────────── */
const pageHeroHeadingVariants = cva(
  "font-bold font-display uppercase tracking-tight mb-6",
  {
    variants: {
      size: {
        default: "text-5xl sm:text-6xl",
        sm: "text-4xl sm:text-5xl",
        lg: "text-6xl sm:text-7xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface PageHeroHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof pageHeroHeadingVariants> { }

const PageHeroHeading = React.forwardRef<
  HTMLHeadingElement,
  PageHeroHeadingProps
>(({ className, size, ...props }, ref) => (
  <h1
    ref={ref}
    data-slot="page-hero-heading"
    className={cn(pageHeroHeadingVariants({ size }), className)}
    {...props}
  />
));
PageHeroHeading.displayName = "PageHeroHeading";

/* ─────────────────────────────────────────────
   PageHeroDescription — the subtitle <p>
───────────────────────────────────────────── */
const PageHeroDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="page-hero-description"
    className={cn(
      "text-sm leading-snug text-muted-foreground max-w-2xl mx-auto sm:text-base",
      className,
    )}
    {...props}
  />
));
PageHeroDescription.displayName = "PageHeroDescription";

/* ─────────────────────────────────────────────
   Convenience compound — renders everything
   from a single set of props.
───────────────────────────────────────────── */
export interface PageHeroSimpleProps
  extends PageHeroProps,
  Pick<PageHeroContentProps, "align" | "maxWidth"> {
  heading: React.ReactNode;
  description?: React.ReactNode;
  headingSize?: PageHeroHeadingProps["size"];
  /** Optional slot rendered below the description (e.g. CTA buttons) */
  actions?: React.ReactNode;
}

const PageHeroClassic = React.forwardRef<HTMLDivElement, PageHeroSimpleProps>(
  (
    {
      heading,
      description,
      headingSize,
      actions,
      align,
      maxWidth,
      variant,
      size,
      className,
      ...props
    },
    ref,
  ) => (
    <PageHero
      ref={ref}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      <PageHeroContent align={align} maxWidth={maxWidth}>
        <PageHeroHeading size={headingSize}>{heading}</PageHeroHeading>
        {description && (
          <PageHeroDescription>{description}</PageHeroDescription>
        )}
        {actions && <div className="mt-8">{actions}</div>}
      </PageHeroContent>
    </PageHero>
  ),
);
PageHeroClassic.displayName = "PageHeroSimple";

export {
  PageHero,
  pageHeroVariants,
  PageHeroContent,
  pageHeroContentVariants,
  PageHeroHeading,
  pageHeroHeadingVariants,
  PageHeroDescription,
  PageHeroClassic as PageHeroSimple,
};
