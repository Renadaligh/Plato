// Plato AR — يستقبل التسجيل من الموقع ويحفظه في هذا الجدول (تبويب لكل بطولة).
// الإعداد: أنشئ Google Sheet جديد للتسجيلات ← Extensions ← Apps Script ← الصق هذا ← Deploy ← New deployment ← Web app
// (Execute as: Me ، Who has access: Anyone) ← انسخ رابط الـ Web app وحطه في src/config/sheets.ts (register).

var HEAD = ['الوقت (Time)', 'البطولة (Tournament)', 'النوع (Mode)', 'اسم الفريق (Team)', 'معرّف بلاتو / القائد (Plato ID / Captain)', 'باقي اللاعبين (Members)', 'اللغة (Lang)'];

function clean_(v, max) {
  var s = String(v == null ? '' : v).replace(/\s+$/g, '').slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s; // يمنع تنفيذ الصيغ داخل الخلايا
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.hp) return out_({ ok: true }); // بوت: نتجاهله بهدوء

    var tid = clean_(d.tournamentId, 60), name = clean_(d.tournamentName, 120);
    var mode = d.mode === 'team' ? 'team' : 'solo';
    var id = clean_(d.platoId, 80), team = clean_(d.teamName, 80), members = clean_(d.members, 600);
    if (!tid || !id || (mode === 'team' && (!team || !members))) return out_({ ok: false, error: 'invalid' });

    lock.waitLock(15000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var tab = tid.replace(/[\\\/\?\*\[\]:']/g, '-').slice(0, 90);
    var sh = ss.getSheetByName(tab);
    if (!sh) {
      sh = ss.insertSheet(tab);
      sh.appendRow(HEAD);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEAD.length).setFontWeight('bold');
    }

    // منع تسجيل نفس المعرّف مرتين في نفس البطولة
    var last = sh.getLastRow();
    if (last > 1) {
      var ids = sh.getRange(2, 5, last - 1, 1).getValues();
      var want = id.replace(/^'/, '').toLowerCase();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]).replace(/^'/, '').toLowerCase() === want) return out_({ ok: false, error: 'duplicate' });
      }
    }

    sh.appendRow([new Date(), name, mode, team, id, members, d.lang === 'ar' ? 'ar' : 'en']);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: 'server' });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}
