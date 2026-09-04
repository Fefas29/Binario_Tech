exports.seed = async function(knex) {
  // Insere os novos veículos mantendo os anteriores (sem usar .del())
  await knex('veiculos').insert([
    {
      placa: 'MBZ-2020',
      montadora: 'Mercedes-Benz',
      modelo: 'Actros 2651'
    },
    {
      placa: 'FRD-2021',
      montadora: 'Ford',
      modelo: 'Red bull'
    }
  ]);
};
