import { useState } from "react";
import { useCountdown } from "./hooks/useCountdown";
import { REUNION_DATE } from "./config";

import Starfield from "./components/Starfield";
import Header from "./components/Header";
import CountdownTicket from "./components/CountdownTicket";
import FlightProgress from "./components/FlightProgress";
import DailyPostcard from "./components/DailyPostcard";
import AnniversaryBanner from "./components/AnniversaryBanner";
import SurpriseBanner from "./components/SurpriseBanner";
import NotificationPrompt from "./components/NotificationPrompt";
import InstallHint from "./components/InstallHint";
import InstallButton from "./components/InstallButton";
import CelebrationScreen from "./components/CelebrationScreen";

export default function App() {
  const { isFinished } = useCountdown(REUNION_DATE);
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);

  return (
    <div className="relative min-h-[100dvh] bg-ink-950 font-body">
      <Starfield />
      <InstallButton />

      {isFinished && !celebrationDismissed && (
        <CelebrationScreen onDismiss={() => setCelebrationDismissed(true)} />
      )}

      <main className="relative z-10 mx-auto flex max-w-md flex-col gap-6 px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <Header />
        <CountdownTicket />
        <FlightProgress />
        <SurpriseBanner />
        <AnniversaryBanner />
        <DailyPostcard />
        <NotificationPrompt />
        <InstallHint />
      </main>
    </div>
  );
}
