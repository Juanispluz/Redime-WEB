import React from 'react';
import HeroSection from '../components/HeroSection';
import RescueMethod from '../components/RescueMethod';
import JoinSteps from '../components/JoinSteps';
import '../../../styles/components.css';

const HomeView = () => {
  return (
    <div className="home-page-v2">
      <HeroSection />
      <RescueMethod />
      <JoinSteps />
    </div>
  );
};

export default HomeView;
