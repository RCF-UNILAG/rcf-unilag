import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">

      <h1 className="text-[10rem] font-extrabold tracking-tighter text-muted/50 select-none leading-none">
        404
      </h1>

      <div className="-mt-16 relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Page Not Found
        </h2>
        <p className="mt-4 max-w-md text-base text-muted-foreground">
          We couldn't find the page you're looking for. It might have been moved,
          deleted, or the link might be broken.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto" variant="outline">
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
}