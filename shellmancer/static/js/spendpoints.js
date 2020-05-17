const maxTotalPoints = 10;
const maxAttrRank = 7;
const minAttrRank = 1;
let startingAttrValue = 1;
let personalityTab = document.querySelector('#personality-tab');
let honesty;
let toggleDivs = [];
let click;
const devices = document.querySelectorAll('.devices');
const deviceTitles = document.querySelectorAll('.option-title');
let toggleSlots = 2;
let submitBtn = document.querySelector('#character-submit');
let character;


class ToggleDiv{
  constructor(elem, toggableClass, titleElem) {
    this.elem = elem;
    this.toggleClass = toggableClass;
    this.titleElem = titleElem;
    this.switch = false;
  }

  adjustPoints() {
    if (!this.switch && toggleSlots > 0) {
      this.switch = true;

      toggleSlots--;
      this.checkToggleSlots();
      return true;

    } else if (this.switch && toggleSlots <= 2) {
      this.switch = false;
      toggleSlots++;
      this.checkToggleSlots();
      return true;

    } else {
      return false;
    }
  }

  checkToggleSlots() {
    if (toggleSlots === 0) {
      submitBtn.style.display = "block";
      for (let option of toggleDivs) {
        if (option.switch) {
          character.loadout.push(option.titleElem.innerHTML);
        }
      }
    } else {
      submitBtn.style.display = "none";
      character.loadout = [];
    }
  }

  highlight() {
      if (this.adjustPoints()) {
        this.elem.classList.toggle(this.toggleClass);
        this.titleElem.classList.toggle("text-info");
      } else {
        alert("Cant do it");
      }
  }

  bindEventListener() {
      this.elem.addEventListener('click', () => this.highlight())
  }
}

class CharacterStats{
  constructor(attr1, attr2, attr3) {
    this.attr1 = attr1;
    this.attr2 = attr2;
    this.attr3 = attr3;
    this.loadout = [];
    this.honesty = {
      not_lied: 0,
      lied: 0
    };
  }
}

let pointsRemaining = document.querySelector('#remaining-points');
pointsRemaining.innerHTML = maxTotalPoints;

let attr1 = {
  elem: document.querySelector('#attribute-one'),
  other_elem: document.querySelector('#meatNumOnMenu'),
  value: startingAttrValue
}
attr1.elem.innerHTML = attr1.value

let attr2 = {
  elem: document.querySelector('#attribute-two'),
  other_elem: document.querySelector('#leetNumOnMenu'),
  value: startingAttrValue
}
attr2.elem.innerHTML = attr2.value

let attr3 = {
  elem: document.querySelector('#attribute-three'),
  other_elem: document.querySelector('#streetNumOnMenu'),
  value: startingAttrValue
}
attr3.elem.innerHTML = attr3.value

let getWizardBar1 = document.querySelector('#wizardBar1');
let getWizardBar2 = document.querySelector('#wizardBar2');
let getWizardBar3 = document.querySelector('#wizardBar3');

function setHTMLToValue() {
  attr1.elem.innerHTML = attr1.value;
  attr2.elem.innerHTML = attr2.value;
  attr3.elem.innerHTML = attr3.value;
  
  attr1.other_elem.innerHTML = attr1.value;
  attr2.other_elem.innerHTML = attr2.value;
  attr3.other_elem.innerHTML = attr3.value;
}

function checkTotalPoints() {
  return pointsRemaining.innerHTML <= 0;
}

function reducePoints(bar, attr) {
  if (attr.value > minAttrRank) {
    console.log(attr.value);

    let currentWidth = parseInt(bar.style.width.slice(0, -1));
    bar.style.width = currentWidth - 10 + "%"

    pointsRemaining.innerHTML++
    attr.value--

    setHTMLToValue()
    if (!checkTotalPoints()) {
      document.querySelector('#personality-tab').classList.add('disabled');
      document.querySelector('#accordion-attributes').classList.add('hidden')
      // document.querySelector('#one').classList.remove('hidden')
    }
  } else {
    return
  }
}

function increasePoints(bar, attr) {
  if (attr.value < maxAttrRank) {
    if (checkTotalPoints()) {
      return
    }
    console.log(attr.value);

    let currentWidth = parseInt(bar.style.width.slice(0, -1));
    bar.style.width = currentWidth + 10 + "%"

    pointsRemaining.innerHTML--
    attr.value++

    setHTMLToValue()
    if (checkTotalPoints()) {
      document.querySelector('#personality-tab').classList.remove('disabled');
      document.querySelector('#accordion-attributes').classList.remove('hidden')
      // document.querySelector('#one').classList.add('hidden')
      character = new CharacterStats(attr1.value, attr2.value, attr3.value)
      console.log(character);
      return

    }
  } else {
    return
  }
}





// toggle div
for (let idx in devices) {
  let div = new ToggleDiv(devices[idx], 'border-info', deviceTitles[idx]);
  div.bindEventListener();
  toggleDivs.push(div);
}



function showElem(considered_lying) {
  document.querySelector('#loadout-tab').classList.remove('disabled');
  if (considered_lying === false && click < 1) {
      character.honesty++;
  } else if (considered_lying === true && click < 1) {
      honesty--;
  }
}

let personalityModalHandler = function() {
  click = 0;
  console.log("Handler");
  return function() {
    if (click === 0) {
      console.log(click);
      alert('single click');
      click++;
    }
  }
}

personalityTab.addEventListener('click', personalityModalHandler, false);

primary_attr = Math.max(character.attr1.value, character.attr2.value, character.attr3.value)
terniary_attr = Math.min(character.attr1.value, character.attr2.value, character.attr3.value)

flawed = null, false;
advantaged = false;
for (let attr of [character.attr1.value, character.attr2.value, character.attr3.value]) {
  if (attr === 1) {
    console.log(attr)
    flawed = attr, true;
    character.flawed = flawed;
  } else if (attr == 7) {
    console.log(attr)
    advantaged = attr, true;
    character.advantaged = advantaged;
  }

}
