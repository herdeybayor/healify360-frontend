'use client';

export default function SideBar() {
  return (
    <div>
      <ul>
        {[
          {
            label: 'Dashboard',
            url: '/dashboard',
          },
          {
            label: 'Patients',
            url: '/patients',
          },
          {
            label: 'Appointments',
            url: '/appointments',
          },
          {
            label: 'Settings',
            url: '/settings',
          },
        ].map((item, index) => {
          return <li key={index}>{item.label}</li>;
        })}
      </ul>
    </div>
  );
}
