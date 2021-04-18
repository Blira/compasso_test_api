export interface RemoveClient {
  remove(client_id: string): Promise<void>;
}
