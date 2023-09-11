/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {item_name: "Drogan's Decoder Wheel", user_id: 2, description: "Are you hungry? Are you also hungry for doing your part in fighting communism? Well, enjoy your favorite bowl of corn flakes while cracking Chinese nuclear launch codes!", quantity: 30},
    {item_name: "Scalpel", user_id: 1, description: "We will skip shaving the patient, and will go straight to the operation...and now I will incise", quantity: 1},
    {item_name: "Sombrero", user_id: 4, description: "The proper head-wear to meet the more than famous, El Guapo", quantity: 3},
    {item_name: "Colt Revolver", user_id: 4, description: "Yep, it even comes with real bullets", quantity: 4},
    {item_name: "Singing Bush", user_id: 4, description: "Going to recite the magic chant to this guy to find the way...don't shoot the invisible swordsman though", quantity: 1},
    {item_name: "Control Room", user_id: 3, description: "Your house is on fire", quantity: 2}
  ]);
};
