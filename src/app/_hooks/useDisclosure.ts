import { useState } from 'react';

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handler = {
    open: () => setIsOpen(true),
    handleClose: () => setIsOpen(true),
    toggle: () => setIsOpen((prev) => !prev),
  };

  return { isOpen, handler };
};
