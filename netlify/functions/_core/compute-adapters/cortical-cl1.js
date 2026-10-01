export const corticalCl1Adapter = {
  id: 'cortical-cl1-v1',

  async available() {
    return Boolean(process.env.CORTICAL_API_KEY);
  },

  async execute({ workload } = {}) {
    if (!process.env.CORTICAL_API_KEY) {
      return {
        ok: false,
        engine: 'bio',
        error: 'Cortical bio-compute is not configured.'
      };
    }

    return {
      ok: false,
      engine: 'bio',
      workload: workload ?? null,
      error: 'Cortical transport is not enabled in this build.'
    };
  }
};
