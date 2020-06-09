const choreName = document.querySelector(".chore-name");
const choreTime = document.querySelector(".chore-time-determination");
const submitChore = document.querySelector("button");
const availableChoreList = document.querySelector(".list-of-chores");
const activeChoresSection = document.querySelector(".active-chores");

const listOfIds = [];
const listItems = [];

class ValidateInputs {
  validate() {
    if (choreName.value.trim() === "" || choreTime.value.trim() === "") {
      alert("Please enter valid chore name and time limit.");
      choreName.value = "";
      choreTime.value = "";
      return;
    } else if (choreTime.value < 1) {
      alert("Please enter a chore time >= 1");
      choreTime.value = "";
      return;
    } else if (choreName.value.trim().includes("|")) {
      alert('Please enter a chore name without the "|" symbol.');
      choreName.value = "";
      choreTime.value = "";
    } else {
      this.chore = choreName.value;
      this.time = choreTime.value;
      choreTime.value = "";
      choreName.value = "";
      const createChore = new CreateChore(this.chore, this.time);
    }
  }
}

class CreateChore {
  constructor(choreName, choreTime) {
    this.choreName = choreName;
    this.choreTime = choreTime;
    this.appendToChoreList();
  }
  appendToChoreList() {
    let pluralizedTime;
    if (choreTime === 1) {
      pluralizedTime = "Minute";
    } else {
      pluralizedTime = "Minutes";
    }
    let listItemElement = `${this.choreName} | ${this.choreTime} ${pluralizedTime}`;
    let listItemReference = `${this.choreName}|${this.choreTime}${pluralizedTime}`;
    listItems.push(listItemReference);
    const choreElement = document.createElement("li");
    choreElement.textContent = listItemElement;
    availableChoreList.append(choreElement);
    choreElement.scrollIntoView({ behavior: "smooth" });
    choreElement.setAttribute("draggable", true);
  }
}

class DragAndDrop {
  constructor(chore) {
    this.chore = chore;
    this.handlingDragAndDrop();
  }
  handlingDragAndDrop() {
    const availableChores = document.querySelector(".available-chores");
    availableChores.style.backgroundColor = "pink";
    availableChoreList.addEventListener("dragend", () => {
      availableChores.style.backgroundColor = "#8585fa";
      activeChoresSection.style.backgroundColor = "#8585fa";
    });
    activeChoresSection.addEventListener("dragover", (event) => {
      event.preventDefault();
      activeChoresSection.style.backgroundColor = "pink";
      availableChores.style.backgroundColor = "#8585fa";
    });
    activeChoresSection.addEventListener("drop", () => {
      activeChoresSection.style.backgroundColor = "#8585fa";
      const choresInProgress = document.querySelector(".chores-in-progress");
      // if (choresInProgress.hasChildNodes("li")) { /////////////////////////////
      //   alert("You can only have 1 chore in the activated section. If you want to remove a chore, click on it.");
      // }else {
        choresInProgress.append(this.chore);
        //}
      // const getChoreTime = new GetChoreTime(this.chore);
    });
  }
}

class GetChoreTime {
  constructor(chore) {
    this.chore = chore;
    this.getMinute();
  }
  getMinute() {
    let whiteSpace = [];
    let validLetters = [];
    let splittedItems = this.chore.textContent.split("");
    splittedItems.filter((letter) => {
      if (letter.trim() === "") {
        whiteSpace.push(letter);
      }else {
        validLetters.push(letter);
      }
    });
    if (validLetters.includes("|")) {
      let indexOfLine = validLetters.indexOf("|");
      let indexOfLastM = validLetters.lastIndexOf("M");
      let newArrayWithMinute = validLetters.slice(indexOfLine, indexOfLastM);
      newArrayWithMinute.shift();
      const setTimeout = new HandleTimeout(this.chore);
      setTimeout.renderTimeout(newArrayWithMinute);
    }
  }
} 

class HandleTimeout {
  constructor(chore) {
    this.chore = chore;
  }
  renderTimeout(minutes = []) {
    let concatinated = minutes.concat();
    let joined = concatinated.join("");
    this.minutesSet = joined;
    this.timeLimit = joined * 1000;
    this.setTimeout();
  }
  setTimeout() {
    alert("Press \"Ok\" to get access to the \"Start Timer\" button; upon pressing it, the timer will start counting down.");
    this.setButtonClick();
  }
  
  setButtonClick() {
    const button = document.querySelector(".end-chore");
    button.style.display = "block";
  }
}

activeChoresSection.addEventListener("dragleave", () => {
  activeChoresSection.style.backgroundColor = "#8585fa";
});

availableChoreList.addEventListener("dragstart", (event) => {
  const dragAndDrop = new DragAndDrop(event.target);
});

const validateInputs = new ValidateInputs();
submitChore.addEventListener("click", validateInputs.validate.bind(this));
