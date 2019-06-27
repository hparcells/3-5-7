import { numberIsOrBetweeen } from './number-utils';

export default function isUsernameValid(username) {
  return numberIsOrBetweeen(username.length, 3, 16);
}
