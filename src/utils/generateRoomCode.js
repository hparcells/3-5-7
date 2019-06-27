export default function generateRoomCode() {
  return Math.random().toString(36).slice(2).toUpperCase().substring(0, 4);
}
