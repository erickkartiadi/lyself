import { useState } from 'react';

export default function useToggle(
  initialValue: boolean
): [boolean, (state?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  function toggleValue(state?: boolean) {
    setValue((currentValue: boolean) =>
      typeof state === 'boolean' ? state : !currentValue
    );
  }

  return [value, toggleValue];
}
