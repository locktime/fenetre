/**
 * Fenêtre : cocher une tâche depuis la télécommande (facultatif).
 *
 * Sans ce script, la TV coche la tâche à l'écran mais la feuille Google Sheets ne change pas.
 * Avec ce script, OK sur la télécommande coche aussi la case dans la feuille.
 *
 * Mise en place (5 minutes, une seule fois) :
 *  1. Dans ta feuille Google Sheets : Extensions → Apps Script.
 *  2. Remplace le contenu par ce fichier, enregistre.
 *  3. Déployer → Nouveau déploiement → type « Application web ».
 *     Exécuter en tant que : moi. Qui a accès : tout le monde. Déployer, autoriser.
 *  4. Copie l'URL qui finit par /exec et ajoute-la au lien de la TV :
 *     …/index.html?sheet=2PACX-…&write=https://script.google.com/macros/s/…/exec
 *
 * Sécurité : l'URL n'est connue que de la TV. Le script ne sait faire qu'une chose,
 * cocher ou décocher la colonne « Fait » d'une ligne. Rien d'autre n'est modifiable.
 */
function doGet(e) {
  var row = parseInt(e.parameter.row, 10);
  var done = e.parameter.done === '1';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var out = { ok: false };
  if (row >= 2 && row <= sheet.getLastRow()) {
    var type = String(sheet.getRange(row, 1).getValue()).toLowerCase();
    if (type.indexOf('che') >= 0 || type.indexOf('todo') >= 0) {  // « tâche » ou « todo »
      sheet.getRange(row, 3).setValue(done);
      out = { ok: true, row: row, done: done };
    }
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
