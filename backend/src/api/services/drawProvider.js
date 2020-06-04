const Person = require('../models/person.model');

/**
 * Returns a mixed array of friends.
 *
 * @private
 */
function mixFriends(friends) {
  let currentIndex = friends.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = friends[currentIndex];
    friends[currentIndex] = friends[randomIndex];
    friends[randomIndex] = temporaryValue;
  }
  return friends;
}

/**
 * Creates a draw for secret friend.
 *
 * @public
 */
exports.draw = async () => {
  const persons = await Person.list({ page: 1, perPage: 100 });

  if (persons.length < 4) {
    return false;
  }

  console.log(persons);

  let personArray = mixFriends(persons);

  let drawns = [];

  let toDraw = persons;

  personArray.map((p, index) => {
    while (drawns.length == index) {
      let person = toDraw[Math.floor(Math.random() * (1 + toDraw.length - 1 - 0)) + 0];

      if (person.id !== p.id && drawns.indexOf(person.id) < 0) {
        p.friend = person;
        drawns.push(person.id);
      }
    }
  });

  let promises = [];
  personArray.map((secretPerson) => {
    const mailOptions = {
      friend: secretPerson.email,
      secretFriend: {
        name: secretPerson.friend.name,
        id: secretPerson.friend.id,
      },
    };
    promises.push(mailOptions);
  });

  Promise.all(promises);
  return promises;
};
