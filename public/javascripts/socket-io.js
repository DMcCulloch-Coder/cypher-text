// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(
//     __dirname,
//     "..",
//     "data",
//     "cypher_text_default_dictionary.txt"
// );

// let array = fs
//     .readFileSync(filePath, "utf8")
//     .toString()
//     .split("\r\n");

// const shuffleArray = array.sort(() => 0.5 - Math.random());
// const randomWords = shuffleArray.slice(0, 25);
// let wordArray = [];
// let groupType;

// for (i in randomWords) {
//     console.log(randomWords[i]);
//     switch (i) {
//         case "0": // first one is black card
//             groupType = 4;
//             break;
//         case "1": // everything after one is blue card
//             groupType = 1;
//             break;
//         case "10": // first 9 is red card
//             groupType = 2;
//             break;
//         case "19": // everything after 17 is neutral card
//             groupType = 3;
//             break;
//         default:
//         //do nothing
//     }
//     wordArray.push({
//         word: randomWords[i],
//         room_id: id,
//         visible: 0,
//         group_type: groupType
//     });
// }

// console.log(wordArray);
