CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  question VARCHAR(255) NOT NULL,
  answer VARCHAR(255) NOT NULL,
  details VARCHAR(255)
);

CREATE TABLE choices (
  questionId INT NOT NULL,
  choice1 VARCHAR(255) NOT NULL,
  choice2 VARCHAR(255) NOT NULL,
  choice3 VARCHAR(255),
  choice4 VARCHAR(255),
  FOREIGN KEY (questionId) REFERENCES questions(id)
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE cheeses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  region VARCHAR(100),
  name VARCHAR(100),
  wikiUrl VARCHAR(255),
  milk VARCHAR(50)
);