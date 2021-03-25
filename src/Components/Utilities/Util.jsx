import dictionaryObject from "../MainPage/dictionary";

export function selectNewWord(selectedDictionary) {
  return selectedDictionary[
    Math.floor(Math.random() * selectedDictionary.length)
  ].toUpperCase();
}

export function getNewRoundTime(selectedWord, difficultyFactor) {
  let roundTime = Number((selectedWord.length / difficultyFactor).toFixed(2));

  if (roundTime < 2) {
    return 2 * 1000;
  }
  return roundTime * 1000;
}

export function getDictionary(difficultyFactor) {
  if (difficultyFactor < 1.5) {
    return dictionaryObject["EASY"];
  }
  if (difficultyFactor < 2) {
    return dictionaryObject["MEDIUM"];
  }
  return dictionaryObject["HARD"];
}

export function getInitialDifficultyFactor(difficultyLevel) {
  if (difficultyLevel === "MEDIUM") {
    return 1.5;
  } else if (difficultyLevel === "HARD") {
    return 2;
  } else {
    return 1;
  }
}

export function getDifficultyLevel(difficultyFactor) {
  if (difficultyFactor < 1.5) {
    return "EASY";
  } else if (difficultyFactor < 2) {
    return "MEDIUM";
  } else {
    return "HARD";
  }
}

export function updateScoreArrayAndHighScore(elapsedTime) {
  const newScoreArray = JSON.parse(window.sessionStorage.getItem("scoreArray"));
  newScoreArray.push(Number(elapsedTime));
  let max = -1;
  let index = 0;
  for (let i = 0; i < newScoreArray.length; i += 1) {
    if (newScoreArray[i] > max) {
      max = newScoreArray[i];
      index = i;
    }
  }
  window.sessionStorage.setItem("scoreArray", JSON.stringify(newScoreArray));
  const highestScoreObject = JSON.parse(
    window.sessionStorage.getItem("highestScore")
  );
  highestScoreObject["index"] = index;
  highestScoreObject["score"] = max;
  window.sessionStorage.setItem(
    "highestScore",
    JSON.stringify(highestScoreObject)
  );
}

export function setDifficultyLevelIfNeeded(difficultyLevel) {
  const sessionDifficultyLevel = window.sessionStorage.getItem(
    "difficultyLevel"
  );
  if (difficultyLevel !== sessionDifficultyLevel) {
    window.sessionStorage.setItem("difficultyLevel", difficultyLevel);
  }
}
