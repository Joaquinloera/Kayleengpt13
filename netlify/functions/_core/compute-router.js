import crypto from 'node:crypto';
import { classicalAdapter } from './compute-adapters/classical.js';
import { ibmQuantumAdapter } from './compute-adapters/ibm-quantum.js';
import { corticalCl1Adapter } from './compute-adapters/cortical-cl1.js';

const ADAPTERS = {
  classical: classicalAdapter,
  quantum: ibmQuantumAdapter,
  bio: corticalCl1Adapter
};

export function detectComputeKind(text = '') {
  const s = String(text).toLowerCase();

  if (/\b(quantum|qpu|qiskit|ibm quantum)\b/.test(s)) {
    return 'quantum';
  }

  if (/\b(biocomput|bio comput|cl1|cortical)\b/.test(s)) {
    return 'bio';
  }

  return 'classical';
}

export async function routeCompute({ kind, input, requestId } = {}) {
  const requestedKind = kind || detectComputeKind(input);
  const requested = ADAPTERS[requestedKind] || classicalAdapter;

  const available = await requested.available();

  const selectedKind = available
    ? requestedKind
    : 'classical';

  const selected = ADAPTERS[selectedKind];

  const result = await selected.execute({
    workload: input
  });

  const receipt = {
    protocol: 'KAY-COMPUTE-1',
    coordinator: '1335',
    requestId: requestId || crypto.randomUUID(),
    requestedKind,
    selectedKind,
    adapter: selected.id,
    fallback: selectedKind !== requestedKind,
    verified: result?.ok === true
  };

  receipt.digest = crypto
    .createHash('sha256')
    .update(JSON.stringify(receipt))
    .digest('hex');

  return {
    result,
    receipt
  };
}

export function verifyComputeReceipt(receipt) {
  if (
    !receipt ||
    receipt.protocol !== 'KAY-COMPUTE-1' ||
    receipt.coordinator !== '1335' ||
    !receipt.verified
  ) {
    return false;
  }

  const { digest, ...body } = receipt;

  return digest === crypto
    .createHash('sha256')
    .update(JSON.stringify(body))
    .digest('hex');
    }
