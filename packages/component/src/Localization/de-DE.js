function xMinutesAgo(date) {
  const now = Date.now();
  const deltaInMs = now - new Date(date).getTime();
  const deltaInMinutes = Math.floor(deltaInMs / 60000);
  const deltaInHours = Math.floor(deltaInMs / 3600000);

  if (deltaInMinutes < 1) {
    return 'Jetzt gerade';
  } else if (deltaInMinutes === 1) {
    return 'Vor einer Minute';
  } else if (deltaInHours < 1) {
    return `Vor ${ deltaInMinutes } Minuten`;
  } else if (deltaInHours === 1) {
    return `Vor einer Stunde`;
  } else if (deltaInHours < 5) {
    return `Vor ${ deltaInHours } Stunden`;
  } else if (deltaInHours <= 24) {
    return `Heute`;
  } else if (deltaInHours <= 48) {
    return `Gestern`;
  } else {
    return new Intl.DateTimeFormat('de-DE').format(date);
  }
}

export default {
  'Chat': 'Chat',
  'Listening…': 'Hören…',
  'retry': 'wiederholen',
  'Send failed, {retry}': 'konnte nicht senden, {retry}',
  'Send': 'Senden',
  'Sending': 'sendet',
  'Speak': 'Sprechen',
  'Starting…': 'startet...',
  'Tax': 'MwSt',
  'Total': 'Gesamtbetrag',
  'Type your message': 'Verfasse eine Nachricht',
  'Upload file': 'Datei hochladen',
  'VAT': 'VAT',
  'X minutes ago': xMinutesAgo
}