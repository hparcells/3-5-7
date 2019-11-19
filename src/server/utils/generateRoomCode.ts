export default function generateRoomCode(): string {
  return Math.random().toString(36).slice(2).toUpperCase().substring(0, 4);
}
