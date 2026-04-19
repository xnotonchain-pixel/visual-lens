import { Link, useRouterState } from "@tanstack/react-router";
import {
  Camera,
  Compass,
  FolderOpen,
  History,
  ScanSearch,
  Settings,
  SplitSquareHorizontal,
  Video,
} from "lucide-react";
import { useLensStore } from "../store";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/", label: "Scan", icon: ScanSearch, ocid: "nav.scan_link" },
  { to: "/history", label: "History", icon: History, ocid: "nav.history_link" },
  {
    to: "/collections",
    label: "Collections",
    icon: FolderOpen,
    ocid: "nav.collections_link",
  },
  {
    to: "/compare",
    label: "Compare",
    icon: SplitSquareHorizontal,
    ocid: "nav.compare_link",
  },
  {
    to: "/discovery",
    label: "Discover",
    icon: Compass,
    ocid: "nav.discovery_link",
  },
  {
    to: "/video-analysis",
    label: "Video",
    icon: Video,
    ocid: "nav.video_link",
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
    ocid: "nav.settings_link",
  },
] as const;

function QuickScanFAB({ isCapturePage }: { isCapturePage: boolean }) {
  const reset = useLensStore((s) => s.reset);
  if (isCapturePage) return null;
  return (
    <Link
      to="/"
      onClick={reset}
      aria-label="Quick Scan"
      title="Quick Scan"
      data-ocid="fab.quick_scan_button"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
    >
      <Camera
        className="w-6 h-6 transition-smooth group-hover:scale-110"
        strokeWidth={1.75}
      />
      {/* Tooltip */}
      <span className="absolute right-16 whitespace-nowrap px-2 py-1 rounded text-xs bg-card border border-border text-foreground opacity-0 group-hover:opacity-100 pointer-events-none transition-smooth">
        Quick Scan
      </span>
    </Link>
  );
}

export function Layout({ children }: LayoutProps) {
  const reset = useLensStore((s) => s.reset);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCapturePage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/60 shadow-subtle sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            onClick={reset}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            data-ocid="header.brand_link"
          >
            <div className="relative flex items-center justify-center w-8 h-8">
              <span className="absolute inset-0 rounded-full border border-primary/40 scan-pulse" />
              <ScanSearch
                className="w-5 h-5 text-primary relative z-10 transition-smooth group-hover:scale-110"
                strokeWidth={1.75}
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              Visual<span className="text-primary">Lens</span>
            </span>
          </Link>

          {/* Desktop Nav + Quick Scan button */}
          <div className="hidden sm:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon, ocid }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={to === "/" ? reset : undefined}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  activeProps={{ className: "text-foreground bg-muted/50" }}
                  data-ocid={ocid}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Header Quick Scan shortcut — hidden on capture page */}
            {!isCapturePage && (
              <Link
                to="/"
                onClick={reset}
                data-ocid="header.quick_scan_button"
                className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-smooth rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Camera className="w-4 h-4" strokeWidth={1.75} />
                <span className="font-medium">Quick Scan</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col bg-background pb-16 sm:pb-0">
        {children}
      </main>

      {/* Floating Action Button — visible on all pages except capture */}
      <QuickScanFAB isCapturePage={isCapturePage} />

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border/60 flex">
        {navItems.map(({ to, label, icon: Icon, ocid }) => (
          <Link
            key={to}
            to={to}
            onClick={to === "/" ? reset : undefined}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent"
            activeProps={{ className: "text-primary" }}
            data-ocid={ocid}
          >
            <Icon className="w-5 h-5" strokeWidth={1.75} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <footer className="hidden sm:block bg-card/40 border-t border-border/40 py-4">
        <div className="container max-w-5xl mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Powered by <span className="text-primary font-mono">Venice AI</span>
          </span>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
