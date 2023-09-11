/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_table').del()
  await knex('user_table').insert([
    {first_name: 'Emmett', last_name:'Fitz-Hume', username: 'EmmFitz85', password: 'doctorDoctorDoctor'},
    {first_name: 'Austin', last_name:'Milbarge', username: 'AustBarge70', password: 'drogansDecoderWheel'},
    {first_name: 'Peter', last_name:'Lemongello', username: 'Lemony', password: 'fletch'},
    {first_name: 'Dusty', last_name:'Bottoms', username: 'BottomDust86', password: 'amigos'}
  ]);
};
