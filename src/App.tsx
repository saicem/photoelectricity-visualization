import ScrollToTop from "@/components/common/ScrollToTop";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/common/Layout";
import HomePage from "@/pages/HomePage";
import { ROUTES } from "@/constants/routes";

import LearnPhysicsBasics from "@/pages/learn/LearnPhysicsBasics";
import LearnLightBasics from "@/pages/learn/LearnLightBasics";
import LearnLaser from "@/pages/learn/LearnLaser";
import LearnInterference from "@/pages/learn/LearnInterference";
import LearnMZModulator from "@/pages/learn/LearnMZModulator";
import LearnIQModulator from "@/pages/learn/LearnIQModulator";
import LearnPolarization from "@/pages/learn/LearnPolarization";
import LearnDualPolarization from "@/pages/learn/LearnDualPolarization";
import LearnReceiver from "@/pages/learn/LearnReceiver";
import LearnGlossary from "@/pages/learn/LearnGlossary";

import InterferencePage from "@/pages/playground/InterferencePage";
import MZModulatorPage from "@/pages/playground/MZModulatorPage";
import IQModulatorPage from "@/pages/playground/IQModulatorPage";
import PolarizationPage from "@/pages/playground/PolarizationPage";
import ReceiverPage from "@/pages/playground/ReceiverPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />

          <Route path={ROUTES.LEARN.PHYSICS_BASICS} element={<LearnPhysicsBasics />} />
          <Route path={ROUTES.LEARN.LIGHT_BASICS} element={<LearnLightBasics />} />
          <Route path={ROUTES.LEARN.LASER} element={<LearnLaser />} />
          <Route path={ROUTES.LEARN.INTERFERENCE} element={<LearnInterference />} />
          <Route path={ROUTES.LEARN.MZ_MODULATOR} element={<LearnMZModulator />} />
          <Route path={ROUTES.LEARN.IQ_MODULATOR} element={<LearnIQModulator />} />
          <Route path={ROUTES.LEARN.POLARIZATION} element={<LearnPolarization />} />
          <Route path={ROUTES.LEARN.DUAL_POLARIZATION} element={<LearnDualPolarization />} />
          <Route path={ROUTES.LEARN.RECEIVER} element={<LearnReceiver />} />
          <Route path={ROUTES.LEARN.GLOSSARY} element={<LearnGlossary />} />

          <Route path={ROUTES.PLAYGROUND.INTERFERENCE} element={<InterferencePage />} />
          <Route path={ROUTES.PLAYGROUND.MZ_MODULATOR} element={<MZModulatorPage />} />
          <Route path={ROUTES.PLAYGROUND.IQ_MODULATOR} element={<IQModulatorPage />} />
          <Route path={ROUTES.PLAYGROUND.POLARIZATION} element={<PolarizationPage />} />
          <Route path={ROUTES.PLAYGROUND.RECEIVER} element={<ReceiverPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}
