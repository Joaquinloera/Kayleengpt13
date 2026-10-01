export const classicalAdapter = {
  id: 'kayleen-classical-v1',

  async available() {
    return true;
  },

  async execute({ workload } = {}) {
    return {
      ok: true,
      engine: 'classical',
      workload: workload ?? null,
      executedAt: new Date().toISOString()
    };
  }
};
