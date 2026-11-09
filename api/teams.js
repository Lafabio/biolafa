const fs = require('fs');
const path = require('path');
const os = require('os');

const STORE_FILE = path.join(os.tmpdir(), 'biolafa_teams_store.json');

// Carregamento inicial do cache persistido
let teamsStore = {};
try {
  if (fs.existsSync(STORE_FILE)) {
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    teamsStore = JSON.parse(raw);
  }
} catch (e) {
  teamsStore = {};
}

function saveStore() {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(teamsStore, null, 2), 'utf8');
  } catch (e) {
    console.error('Erro ao persistir store:', e);
  }
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
}

module.exports = async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  // Recarregar do arquivo em cada invocação serverless para sincronizar entre lambdas
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf8');
      teamsStore = JSON.parse(raw);
    }
  } catch (e) {}

  const url = req.url || '';
  const isDelete = req.method === 'DELETE' || url.includes('/delete');

  if (req.method === 'GET') {
    const teamList = Object.values(teamsStore);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({
      success: true,
      timestamp: Date.now(),
      total: teamList.length,
      teams: teamList
    }));
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');

        if (isDelete || payload.action === 'delete') {
          const teamId = payload.teamId || (payload.team && payload.team.id);
          if (teamId && teamsStore[teamId]) {
            delete teamsStore[teamId];
            saveStore();
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify({ success: true, deleted: teamId }));
        }

        if (payload.action === 'reset_all') {
          teamsStore = {};
          saveStore();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify({ success: true, reset: true }));
        }

        const team = payload.team;
        if (!team || !team.id) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify({ error: 'Equipe inválida ou ausente de ID.' }));
        }

        const now = Date.now();
        const existing = teamsStore[team.id] || {};

        teamsStore[team.id] = {
          id: team.id,
          name: team.name || existing.name || 'Equipe Sem Nome',
          turma: team.turma || existing.turma || 'Turma A',
          avatar: team.avatar || existing.avatar || '🔬',
          members: Array.isArray(team.members) ? team.members : (existing.members || []),
          pin: (typeof team.pin !== 'undefined') ? team.pin : (existing.pin || ''),
          challengeId: payload.challengeId || existing.challengeId || 'desafio-1',
          currentPhase: (typeof payload.currentPhase === 'number') ? payload.currentPhase : (existing.currentPhase || 0),
          currentPhaseName: payload.currentPhaseName || existing.currentPhaseName || '',
          progress: (typeof payload.progress === 'number') ? payload.progress : (existing.progress || 0),
          answeredCount: (typeof payload.answeredCount === 'number') ? payload.answeredCount : (existing.answeredCount || 0),
          totalQuestions: (typeof payload.totalQuestions === 'number') ? payload.totalQuestions : (existing.totalQuestions || 0),
          snapshotsCount: (Array.isArray(payload.snapshots) ? payload.snapshots.length : (typeof payload.snapshotsCount === 'number' ? payload.snapshotsCount : (existing.snapshotsCount || 0))),
          snapshots: Array.isArray(payload.snapshots) ? payload.snapshots.slice(-10) : (existing.snapshots || []),
          answers: payload.answers || existing.answers || {},
          evidenceMatrix: payload.evidenceMatrix || existing.evidenceMatrix || {},
          selfAssessment: payload.selfAssessment || existing.selfAssessment || {},
          lastActive: now,
          serverUpdatedAt: now
        };

        saveStore();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.end(JSON.stringify({
          success: true,
          teamId: team.id,
          totalTeams: Object.keys(teamsStore).length,
          timestamp: now
        }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.statusCode = 405;
  res.end('Method Not Allowed');
};
