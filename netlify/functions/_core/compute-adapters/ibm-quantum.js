export const ibmQuantumAdapter = {
  id: 'ibm-quantum-runtime-v1',

  async available() {
    return Boolean(process.env.IBM_QUANTUM_API_KEY);
  },

  async execute({ workload } = {}) {
    if (!process.env.IBM_QUANTUM_API_KEY) {
      return {
        ok: false,
        engine: 'quantum',
        error: 'IBM Quantum is not configured.'
      };
    }

    return {
      ok: false,
      engine: 'quantum',
      workload: workload ?? null,
      error: 'IBM Quantum transport is not enabled in this build.'
    };
  }
};
