import { Key, useState } from "react";

export function useDeleteTableItems(deleteFn: (entityId: string) => void) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  async function handleDelete() {
    selectedRowKeys.forEach((entityId) => deleteFn(entityId as string));
    setSelectedRowKeys([]);
  }

  return { handleDelete, selectedRowKeys, setSelectedRowKeys };
}
