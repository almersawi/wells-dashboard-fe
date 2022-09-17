import { useState } from "react";

interface ModalType<T> {
  visible: boolean;
  selected: T | undefined;
}

export function useModalForm<T>() {
  const [modalForm, set] = useState<ModalType<T>>({
    visible: false,
    selected: undefined,
  });

  const [isCsvFormVisible, setIsCsvFormVisible] = useState<boolean>(false);

  function add() {
    set({ visible: true, selected: undefined });
  }

  function edit(row: T) {
    set({ visible: true, selected: row });
  }

  function reset() {
    set({ visible: false, selected: undefined });
    setIsCsvFormVisible(false);
  }

  function readCsv() {
    setIsCsvFormVisible(true);
  }

  return { modalForm, add, edit, reset, isCsvFormVisible, readCsv };
}
