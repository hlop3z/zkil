export default function UID(size, prefix) {
  const StringText = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
  };
  function randomBase(size, choices) {
    let text = "";
    const possible = choices;
    for (let i = 0; i < size; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  const _uid = randomBase(size, StringText.lowercase + StringText.digits);
  let uid = "";
  if (prefix) {
    uid = `X__${prefix.toUpperCase()}__X${_uid}`;
  } else {
    uid = _uid;
  }
  return uid;
}
