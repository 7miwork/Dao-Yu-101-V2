// Dao-Yu-101 App.tsx
// Design: Pixel Archipelago — Minecraft Education Learning Platform
// Routes: Home, World Map, Island, Lesson, Dashboard, Shop, Achievements

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PlatformProvider } from "./contexts/PlatformContext";
import Navbar from "./components/Navbar";
import GainNotification from "./components/GainNotification";
import Home from "./pages/Home";
import WorldMap from "./pages/WorldMap";
import IslandPage from "./pages/IslandPage";
import LessonPage from "./pages/LessonPage";
import Dashboard from "./pages/Dashboard";
import ShopPage from "./pages/ShopPage";
import AchievementsPage from "./pages/AchievementsPage";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/world" component={WorldMap} />
          <Route path="/island/:id" component={IslandPage} />
          <Route path="/lesson/:islandId/:lessonId" component={LessonPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/achievements" component={AchievementsPage} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <GainNotification />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PlatformProvider>
          <TooltipProvider>
            <Toaster position="bottom-right" />
            <Router />
          </TooltipProvider>
        </PlatformProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
