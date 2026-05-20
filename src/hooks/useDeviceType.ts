import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

function getDeviceType(): DeviceType {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>(getDeviceType);

  useEffect(() => {
    const handleResize = () => setDevice(getDeviceType());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}
