const Person = require('../models/person.model');
const Draw = require('../models/draw.model');

const emailProvider = require('../services/emails/emailProvider');

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

  let personArray = mixFriends(persons);

  let drawns = [];

  let toDraw = persons;

  personArray.map((p, index) => {
    while (drawns.length == index) {
      let person = toDraw[Math.floor(Math.random() * (1 + toDraw.length - 1 - 0)) + 0];

      if (person._id !== p._id && drawns.indexOf(person._id) < 0) {
        p.friend = person;
        drawns.push(person._id);
      }
    }
  });

  let promises = [];
  let drawSecretFriend = [];
  personArray.map(async (secretPerson) => {
    const mailOptions = {
      name: secretPerson.name,
      email: secretPerson.email,
      secretFriend: {
        name: secretPerson.friend.name,
        id: secretPerson.friend.id,
      },
    };

    drawSecretFriend.push(mailOptions);
    promises.push(
      new Promise((resolve) => {
        emailProvider.sendSecretFriendEmail(mailOptions, function (err, info) {
          if (err) {
            resolve(err);
            console.log(err);
          } else {
            resolve(info);
            console.log(info);
          }
        });
      })
    );
  });

  const draw = new Draw({ data: drawSecretFriend });
  await draw.save();

  Promise.all(promises);
  return drawSecretFriend;
};
