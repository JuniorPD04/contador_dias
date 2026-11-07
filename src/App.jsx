import { useEffect, useState } from "react";
import { useCountdown } from "./hooks/useCountdown";
import { REUNION_DATE } from "./config";

import Starfield from "./components/Starfield";
import Header from "./components/Header";
import CountdownTicket from "./components/CountdownTicket";
import FlightProgress from "./components/FlightProgress";
import DailyPostcard from "./components/DailyPostcard";
import AnniversaryBanner from "./components/AnniversaryBanner";
import SurpriseBanner from "./components/SurpriseBanner";
import NotificationButton from "./components/NotificationButton";
import InstallButton from "./components/InstallButton";
import PullToRefresh from "./components/PullToRefresh";
import CelebrationScreen from "./components/CelebrationScreen";
import AlbumLink from "./components/AlbumLink";
import PhotoAlbum from "./components/PhotoAlbum";

export default function App() {
  const { isFinished } = useCountdown(REUNION_DATE);
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);
  const [showAlbum, setShowAlbum] = useState(() => window.location.hash === "#album");

  useEffect(() => {
    const onHashChange = () => {
      const isAlbum = window.location.hash === "#album";
      setShowAlbum(isAlbum);
      requestAnimationFrame(() => {
        const target = document.getElementById(isAlbum ? "album-title" : "album-link");
        target?.focus({ preventScroll: true });
        if (isAlbum) window.scrollTo(0, 0);
        else target?.scrollIntoView({ block: "center" });
      });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-ink-950 font-body">
      <Starfield />
      <InstallButton />
      <NotificationButton />

      {isFinished && !celebrationDismissed && (
        <CelebrationScreen onDismiss={() => setCelebrationDismissed(true)} />
      )}

      {showAlbum ? <PhotoAlbum /> : <PullToRefresh>
        <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center gap-4 px-5 py-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Header />
          <CountdownTicket />
          <FlightProgress />
          <SurpriseBanner />
          <AnniversaryBanner />
          <DailyPostcard />
          <AlbumLink />
        </main>
      </PullToRefresh>}
    </div>
  );
}
