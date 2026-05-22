import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import RememberCompanions from '../components/RememberCompanions';
import RescueMethod from '../components/RescueMethod';
import JoinSteps from '../components/JoinSteps';
import '../../../styles/components.css';

const HomeView = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="home-page-v2">
      {!splashDone && <SplashScreen onExplore={() => setSplashDone(true)} />}
      <div id="intro-section">
        <RememberCompanions />
      </div>
      <RescueMethod />
      <JoinSteps />
    </div>
  );
};

export default HomeView;


