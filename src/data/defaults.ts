// The questions a new game starts with. The host can replace all of them in ✏️ Edit.

export type QA = { q: string; a: string };
export type Category = { cat: string; hint: string; qs: QA[] };
export type GameData = {
  players: string[];
  /** Round 1: fill-in-the-blank facts. "___" marks the blank. */
  weird: QA[];
  /** Round 2: the quiz board. Each category's first question is worth 10, the next 20, and so on. */
  board: Category[];
  /** Round 3: a group-chat message and who sent it. */
  chat: QA[];
  /** Final: names for Who Am I? */
  whoami: string[];
};

export const DEFAULTS: GameData = {
  players: ["Player 1", "Player 2", "Player 3", "Player 4"],
  weird: [
    { q: "Scotland's national animal is the ___", a: "Unicorn" },
    { q: "A group of flamingos is called a ___", a: "Flamboyance" },
    { q: "Wombat poop comes out shaped like ___", a: "Cubes" },
    { q: "In Shani Shingnapur, Maharashtra, houses traditionally have no ___", a: "Doors" },
    { q: "Kodinhi, a village in Kerala, is famous for an unusually high number of ___", a: "Twins" },
    { q: "Navapur railway station is split between Maharashtra and ___", a: "Gujarat" },
    { q: "An octopus has ___ hearts", a: "Three" },
    { q: "Mawsynram in Meghalaya is often called the ___ place on Earth", a: "Wettest" },
    { q: "Botanically speaking, bananas are classified as ___", a: "Berries" },
    { q: "The Eiffel Tower can grow about 15 cm taller in ___", a: "Summer (the metal expands)" },
  ],
  board: [
    {
      cat: "Java",
      hint: "Not coding. Geography.",
      qs: [
        { q: "The world's most populous island", a: "Java" },
        { q: "Borobudur, the world's largest Buddhist temple, stands on Java. Which country is it in?", a: "Indonesia" },
        { q: "'Java Man' fossils belong to which extinct human species?", a: "Homo erectus" },
      ],
    },
    {
      cat: "Mercury",
      hint: "Not the planet. The frontman.",
      qs: [
        { q: "Freddie Mercury fronted which band?", a: "Queen" },
        { q: "Freddie Mercury was born on which island?", a: "Zanzibar" },
        { q: "What was Freddie Mercury's birth name?", a: "Farrokh Bulsara" },
      ],
    },
    {
      cat: "Big Bang",
      hint: "Not physics. The sitcom.",
      qs: [
        { q: "Sheldon Cooper's catchphrase", a: "Bazinga!" },
        { q: "Which Big Bang Theory character, early on, couldn't talk to women unless he'd had a drink?", a: "Raj Koothrappali" },
        { q: "Where did Penny work as a waitress?", a: "The Cheesecake Factory" },
      ],
    },
    {
      cat: "Apple",
      hint: "Not the iPhone. The fruit.",
      qs: [
        { q: "Which scientist is said to have been inspired by a falling apple?", a: "Isaac Newton" },
        { q: "Which Swiss folk hero shot an apple off his son's head?", a: "William Tell" },
        { q: "In the fairy tale, who gives Snow White the poisoned apple?", a: "The Evil Queen (her stepmother)" },
      ],
    },
    {
      cat: "Bowling",
      hint: "Not cricket. Ten-pin.",
      qs: [
        { q: "How many pins are there in ten-pin bowling?", a: "10" },
        { q: "Three strikes in a row is called a what?", a: "A turkey" },
        { q: "What's the score of a perfect game?", a: "300" },
      ],
    },
  ],
  chat: [
    { q: "bhai 5 min mein pahunch raha hu", a: "(Edit me: whoever always says this)" },
    { q: "guys I'm not drinking tonight, seriously", a: "(Edit me: add your friend)" },
    { q: "who's paying for the Uber, I'll send later", a: "(Edit me: add your friend)" },
    { q: "seen 11:47 pm", a: "(Edit me: the friend who leaves everyone on read)" },
  ],
  whoami: [
    "Shah Rukh Khan", "MS Dhoni", "Virat Kohli", "Taylor Swift", "Elon Musk", "Sundar Pichai", "Diljit Dosanjh", "Ranveer Singh",
    "Cristiano Ronaldo", "APJ Abdul Kalam", "Mr. Bean", "Sachin Tendulkar", "Deepika Padukone", "Lionel Messi", "Mukesh Ambani", "Gursimran Khamba",
  ],
};

export const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
