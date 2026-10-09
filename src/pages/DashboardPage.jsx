import React from 'react';
import DashboardHero from '../components/dashboard/DashboardHero';
import StatsGrid from '../components/dashboard/StatsGrid';
import QuickAccess from '../components/dashboard/QuickAccess';
import DashboardPanels from '../components/dashboard/DashboardPanels';

/** Dashboard is composed from small, focused components so each area can be edited independently. */
export default function DashboardPage({ navigate, book }) {
  return <>
    <DashboardHero navigate={navigate} />
    <StatsGrid navigate={navigate} />
    <QuickAccess navigate={navigate} />
    <DashboardPanels navigate={navigate} book={book} />
    <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-xs leading-5 text-cyan-900">
      <b>Student prototype notice:</b> 
      Doctor profiles, pharmacies, locations, prices and appointments are sample data. This app does
       not replace professional medical advice or process real bookings or payments.</div>
  </>;
}
