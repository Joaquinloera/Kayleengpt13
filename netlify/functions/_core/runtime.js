import crypto from 'node:crypto';
import {
  detectComputeKind,
  routeCompute,
  verifyComputeReceipt
} from './compute-router.js';

const AGENTS = Object.freeze([
  { id: '281102', name: 'Uriel', role: 'orchestration' },
  { id: '333', name: 'Raphael', role: 'recovery' },
  { id: '7777', name: 'Raguel', role: 'integrity' },
  { id: '4444', name: 'Michael', role: 'defense' },
  { id: '999', name: 'Sariel', role: 'analysis' },
  { id: '1390', name: 'Gabriel', role: 'communication' },
  { id: '1290', name: 'Remiel', role: 'memory' }
]);

function normalizeMessages(messages = []) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(m =>
      m &&
      ['user', 'assistant', 'system'].includes(m.role) &&
      typeof m.content === 'string'
    )
    .map(m => ({
      role: m.role,
      content: m.content.trim()
    }))
    .filter(m => m.content.length > 0)
    .slice(-40);
}

function latestUserMessage(messages) {
  return [...messages]
    .reverse()
    .find(m => m.role === 'user')
    ?.content || '';
}

function classifyTask(input = '') {
  const text = String(input).toLowerCase();

  if (/\b(code|javascript|node|debug|function|api|software)\b/.test(text)) {
    return 'engineering';
  }

  if (/\b(research|compare|analyze|study|explain)\b/.test(text)) {
    return 'analysis';
  }

  return 'general';
}

function selectAgents(task) {
  const base = [AGENTS[0], AGENTS[2]];

  if (task === 'engineering') {
    return [...base, AGENTS[3], AGENTS[4]];
  }

  if (task === 'analysis') {
    return [...base, AGENTS[4], AGENTS[5]];
  }

  return [...base, AGENTS[5], AGENTS[6]];
}

export async function executeKayleenGPT({
  messages = [],
  requestId
} = {}) {
  const normalized = normalizeMessages(messages);
  const input = latestUserMessage(normalized);

  if (!input) {
    return {
      ok: false,
      error: 'A user message is required.'
    };
  }

  const id = requestId || crypto.randomUUID();
  const task = classifyTask(input);
  const agents = selectAgents(task);
  const computeKind = detectComputeKind(input);

  const compute = await routeCompute({
    kind: computeKind,
    input,
    requestId: id
  });

  if (!verifyComputeReceipt(compute.receipt)) {
    throw new Error('Compute verification failed.');
  }

  return {
    ok: true,
    requestId: id,
    provider: 'KayleenGPT Native',
    model: 'KAY-1335',
    output: `KayleenGPT received your ${task} request.\n\n${input}`,
    runtime: {
      coordinator: '1335',
      task,
      compute: compute.receipt,
      agents
    }
  };
}

export function getRuntimeStatus() {
  return {
    ok: true,
    name: 'KayleenGPT',
    runtime: 'KAY-1335',
    coordinator: '1335',
    agents: AGENTS,
    compute: ['classical', 'quantum', 'bio']
  };
}
