<script setup>
import { ref, computed } from "vue";

const selectedMode = ref(null);
const maxNumber = ref(null);
const randomNumber = ref(null);
const popup = ref(false)
const backgroundClass = ref("");

const maxround = 5;
let round = ref(1);

const numberDisplay = ref("");
const phoneNumber = ref("");
const numberButton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const displayShow = ref([]);

const characterShow = ref(true);

// page
const pageDefault = ref(true);
const pageTutorial = ref(false);
const pageSelectMode = ref(false);
const pagePlay = ref(false);
const pageGameOver = ref(false);
const pageWin = ref(false);
const hidePage = ref(true);

const isUphidden = ref(true);
const isDownhidden = ref(true);

const setMaxNumber = (max) => {
  selectedMode.value = max;
  updateBackgroundClass();
};

const openpopup = () => {
  popup.value = true;
}
const closePopup = () => {
  popup.value = false;
};


const updateBackgroundClass = () => {
  if (selectedMode.value === 19) {
    backgroundClass.value = "bgeasy";
  } else if (selectedMode.value === 49) {
    backgroundClass.value = "bgnormal";
  } else if (selectedMode.value === 99) {
    backgroundClass.value = "bghard";
  }
};

const generateRandomNumber = () => {
    maxNumber.value = selectedMode.value;
    randomNumber.value = Math.floor(Math.random() * maxNumber.value);
};

const checkLengthNumber = (num) => {
  if (numberDisplay.value.length < 2) {
    numberDisplay.value += num;
  }
};

const clearDisplayNumber = () => {
  displayShow.value.length = 0;
  round.value = 1;
  numberDisplay.value = [];
};

const clearNumber = () => {
  numberDisplay.value = [];
};

const clearUpDown = () => {
  isUphidden.value = true;
  isDownhidden.value = true;
  hidePage.value = true;
};

const checknumber = () => {
  if (numberDisplay.value <= selectedMode.value) {
    if (numberDisplay.value == randomNumber.value) {
      displayShow.value.push(numberDisplay.value);
      numberDisplay.value = '';
      pageWin.value = true;
      isUphidden.value = true;
      isDownhidden.value = true;
      hidePage.value = false;
      characterShow.value = false;
    } else {
      if (round.value < maxround) {
        if (numberDisplay.value < randomNumber.value) {
          isUphidden.value = false;
          isDownhidden.value = true;
        } else if (numberDisplay.value > randomNumber.value) {
          isUphidden.value = true;
          isDownhidden.value = false;
        }
        round.value++;
        displayShow.value.push(numberDisplay.value);
        numberDisplay.value = '';
      } else if (round.value === maxround) {
        isUphidden.value = true;
        isDownhidden.value = true;
        displayShow.value.push(numberDisplay.value);
        pageGameOver.value = true;
        characterShow.value = false;
        hidePage.value = false;
      }
    }
  } else {
    openpopup()
    numberDisplay.value = '';
  }
}

let imgCoungt = computed(() => {
  if (selectedMode.value === 19) {
    if (round.value === 1) return "/images/rb1.png";
    if (round.value === 2) return "/images/rb2.png";
    if (round.value === 3) return "/images/rb3.png";
    if (round.value === 4) return "/images/rb4.png";
    if (round.value === 5) return "/images/rb5.png";
  }
  else if (selectedMode.value === 49) {
    if (round.value === 1) return "/images/cat1.png";
    if (round.value === 2) return "/images/cat2.png";
    if (round.value === 3) return "/images/cat3.png";
    if (round.value === 4) return "/images/cat4.png";
    if (round.value === 5) return "/images/cat5.png";
  }
  else if (selectedMode.value === 99) {
    if (round.value === 1) return "/images/duck1.png";
    if (round.value === 2) return "/images/duck2.png";
    if (round.value === 3) return "/images/duck3.png";
    if (round.value === 4) return "/images/duck4.png";
    if (round.value === 5) return "/images/duck5.png";
  }
});

</script>

<template>
  <div v-if="pageDefault" class="pageDefault">
    <img src="/images/bggame.png" class=" h-screen w-full" />

    <div class="absolute inset-0 w-screen h-screen bg-transparent z-10 flex flex-col justify-center items-center">
      <img src="/images/logocartoon.png" class="h-1/2 " />

      <button @click="(pageDefault = !pageDefault), (pageSelectMode = !pageSelectMode)"
        class="btdf font-lilitaOne border   ">
        Let's Play
      </button>
      <br />
      <button @click="(pageDefault = !pageDefault), (pageTutorial = !pageTutorial)" class="btdf font-lilitaOne">
        Tutorial
      </button>
    </div>
  </div>

  <div v-if="pageTutorial" class="pageTutorial">
    <img src="/images/bgtutorial.png" class="w-screen fixed" />
    <div class="absolute inset-0 w-screen bg-transparent z-1 flex flex-col justify-center items-center">
      <img src="/images/logo.png" class="h-1/4" />
      <div
        class="bg-yellow-600 border border-yellow-800 px-3 py-5 w-1/2 flex flex-col justify-center items-center rounded-lg shadow-md font-itim">
        <p class="text-white text-xl text-center">
          กติกาในการเล่นเกม secret number <br />
          ให้เราค้นหาตัวเลขที่ถูกต้องโดยการสุ่มหาเลขซึ่งจะมีระดับความยากอยู่ 3 mode
        </p>

        <h2 class="text-2xl font-semibold mt-4 text-green-800 font-ramPart">Easy Mode</h2>
        <p class="text-white text-xl">จะต้องสุ่มหาเลขที่ถูกต้องภายใน 0-19</p>

        <h2 class="text-2xl font-semibold mt-4 text-blue-800 font-ramPart">Normal Mode</h2>
        <p class="text-white text-xl">จะต้องสุ่มหาเลขที่ถูกต้องภายใน 0-49</p>

        <h2 class="text-2xl font-semibold mt-4 text-red-800 font-ramPart">Hard Mode</h2>
        <p class="text-white text-xl">จะต้องสุ่มหาเลขที่ถูกต้องภายใน 0-99</p>

        <div class="mt-4 items-center text-center  text-white text-xl">
          <p>ซึ่งในทุกๆ mode เราจะสามารถทายได้สูงสุด 5 ครั้ง<br />
            โดยจะมีตัวช่วยเป็นการบอกว่าเลขที่เราทายควรมีค่าน้อยลงหรือมากขึ้น<br />
            และยังมีอิโมจิในการบอกจำนวนครั้งที่เราทาย secret number<br />
            ซึ่งมีอยู่ 5 รอบ</p>
          <div class="flex w-full items-center justify-center">
            <p>รอบที่ 1</p>
            <img src="/images/cat1.png" class="w-20 h-20" />
            <p>รอบที่ 2</p>
            <img src="/images/cat2.png" class="w-20 h-20" />
            <p>รอบที่ 3</p>
            <img src="/images/cat3.png" class="w-20 h-20" />
            <p>รอบที่ 4</p>
            <img src="/images/cat4.png" class="w-20 h-20" />
            <p>และรอบสุดท้าย</p>
            <img src="/images/cat5.png" class="w-20 h-20" />
          </div>
          <p class="text-2xl text-red-700">คือคุณแพ้แล้ว!!!</p>
        </div>
      </div>
      <button @click="(pageDefault = !pageDefault), (pageTutorial = !pageTutorial)" class="btdf font-lilitaOne ">
        Back
      </button>
    </div>
  </div>

  <div>
    <div v-if="pageSelectMode" class="pageSelectMode ">

      <img src="/images/bg.png" class="h-screen" />

      <div class="absolute inset-0 bg-transparent z-10 items-center overflow-hidden">
        <div class="flex flex-col">
          <div class="flex justify-end mt-2">
            <button @click="(pageDefault = !pageDefault), (pageSelectMode = !pageSelectMode), clearDisplayNumber()"
              class="bg-yellow-400 hover:bg-orange-400 text-white font-bold font-lilitaOne py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center mr-2 transform scale-100 hover:scale-110">
              <img src="/images/homeIcon.png" alt="Home" class="w-10 h-10 mr-1">
              Home
            </button>
          </div>
          <div class="flex justify-center">
            <img src="/images/selectmode.png" class="h-56 ">
          </div>

        </div>
        <div class="flex justify-center items-center  pt-72">

          <button
            @click="setMaxNumber(19), generateRandomNumber(), (pageSelectMode = !pageSelectMode), (pagePlay = !pagePlay)"
            :class="selectedMode === 19">
            <div class="card ">
              <div class="wrapper">
                <img src="/images/pfr1.png" class="cover-image " />
              </div>
              <img src="/images/easy.png" class="title w-32 h-56" />
              <img src="/images/pfr.png" class="character " />
            </div>
          </button>
          <button
            @click="setMaxNumber(49), generateRandomNumber(), (pageSelectMode = !pageSelectMode), (pagePlay = !pagePlay)"
            :class="selectedMode === 49">
            <div class="card">
              <div class="wrapper">
                <img src="/images/pfc1.png" class="cover-image" />
              </div>
              <img src="/images/normal.png" class="title w-32 h-56" />
              <img src="/images/pfc.png" class="character" />
            </div>
          </button>
          <button
            @click="setMaxNumber(99), generateRandomNumber(), (pageSelectMode = !pageSelectMode), (pagePlay = !pagePlay)"
            :class="selectedMode === 99">
            <div class="card">
              <div class="wrapper">
                <img src="/images/pfd1.png" class="cover-image " />
              </div>
              <img src="/images/hard.png" class="title w-32 h-56" />
              <img src="/images/pfd.png" class="character" />
            </div>
          </button>

        </div>
      </div>
    </div>
  </div>

  <div v-if="pagePlay" class="pagePlay overflow-hidden " :class="backgroundClass">
    <div v-if="hidePage === true">

      <div class="flex justify-between mt-2">

        <button @click="(pageSelectMode = !pageSelectMode), (pagePlay = !pagePlay), clearDisplayNumber(), clearUpDown()"
          class="text-white font-bold font-lilitaOne py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center ml-2 text-2xl transform scale-100 hover:scale-110">
          <img src="/images/arrow.png" alt="Home" class="w-8 h-8 mr-2">
          Back
        </button>

        <button @click="(pageDefault = !pageDefault), (pagePlay = !pagePlay), clearDisplayNumber(), clearUpDown()"
          class="bg-yellow-400 hover:bg-orange-400 text-white font-bold font-lilitaOne py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center mr-2 transform scale-100 hover:scale-110">
          <img src="/images/homeIcon.png" alt="Home" class="w-10 h-10 mr-1">
          Home
        </button>

      </div>

      <div class="flex px-4 w-40 justify-end">
        <h1 class=" font-bold font-lilitaOne text-center bg-gray-100 rounded-full p-5">Round : {{ round }} / 5</h1>
      </div>

      <div class="flex h-32 justify-center items-center">
        <div v-for="number in displayShow" class="bg-black bg-opacity-70">
          <h1 class="p-10 text-center font-mono text-xl font-bold inline-block">
            <span class="rounded-full border w-16 h-16 m-1 bg-gray-100 flex items-center justify-center text-2xl">
              {{ number }}</span>
          </h1>
        </div>
      </div>

      <div class="bg-black bg-opacity-70 rounded-3xl">
        <div class="up_status">
          <img src="/images/tryup.png" alt="show_status" class="h-2/4 fixed left-10 top-80 "
            :class="{ 'hidden': isUphidden }">

        </div>
        <div class="down_status ">
          <img src="/images/trydown.png" alt="show_status" class="h-2/4 fixed left-10 top-80 "
            :class="{ 'hidden': isDownhidden }">
        </div>
      </div>

      <div v-show="characterShow" class="fixed right-32 top-96">
        <div class="">
          <img :src="imgCoungt" alt="count" class="h-96">
        </div>
      </div>

      <div class="marginDisplayphone">
        <div class="flex justify-center pb-5">
          <input v-model="numberDisplay" minlength="1" maxlength="2" :disabled="true" class="bg-gray-400 font-mono " />
        </div>

        <div class="flex justify-center  ">
          <div class="rounded-lg bg-black w-80 p-4 flex justify-center bg-opacity-70">
            <div class="grid grid-cols-3 gap-2 font-mono text-xl font-bold ">
              <button class="pbutton rounded-3xl w-20 h-20 m-1 bg-yellow-400 text-3xl" v-for="num in numberButton"
                :key="num" @click="checkLengthNumber(num)">{{ num }}</button>
              <button class="pbutton rounded-3xl w-20 h-20 m-1 bg-orange-500 text-xl" @click="clearNumber()"
                :disabled="numberDisplay == ''">Clear</button>
              <button class="pbutton rounded-3xl w-20 h-20 m-1 bg-yellow-400 text-3xl" @click="checkLengthNumber(0)">0</button>
              <button class="pbutton rounded-3xl w-20 h-20 m-1 bg-orange-500 text-xl" @click="checknumber()"
                :disabled="numberDisplay == ''">Submit</button>
              {{ phoneNumber }}

            </div>
          </div>

        </div>

      </div>
      <div v-if="popup" class="fixed inset-0 flex items-center justify-center z-10">
        <div class="bg-white shadow-lg p-6 rounded-lg max-w-md">
          <h2 class="text-xl font-semibold mb-4 font-itim">โปรดใส่เลขตามจำนวนโหมดที่คุณเลือก!</h2>
          <div class="flex">
            <p class="text-green-600 font-lilitaOne">Easy (0-19)</p>
            <p class="text-black font-lilitaOne">,</p>
            <p class="text-blue-600 font-lilitaOne">Normal (0-49)</p>
            <p class="text-black font-lilitaOne">,</p>
            <p class="text-red-600 font-lilitaOne">Hard (0-99)</p>
          </div>
          <button @click="closePopup"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="pageGameOver" class="pageGameOver items-center justify-center absolute inset-0">
    <div class="flex flex-col items-center justify-center h-full">
      <img src="/images/lose.png" class="higth h-5/6" />
      <button class="btdf font-lilitaOne"
        @click="(pageDefault = !pageDefault), (pageGameOver = !pageGameOver), (pagePlay = !pagePlay), (characterShow = !characterShow), clearDisplayNumber(), clearUpDown()">Go
        To Home</button>
    </div>
  </div>

  <div v-if="pageWin" class="pageGameWin items-center justify-center absolute inset-0">
    <div class="flex flex-col items-center justify-center h-full">
      <img src="/images/win.png" class="higth h-5/6" />
      <button class="btdf font-lilitaOne"
        @click="(pageDefault = !pageDefault), (pageWin = !pageWin), (pagePlay = !pagePlay), (characterShow = !characterShow), clearDisplayNumber(), clearUpDown()">
        Go To Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.marginDisplayphone {
  margin-top: 5%;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
}

.result-text {
  font-size: 18px;
  margin-top: 10px;
}

.number {
  border: 5px;
  border-radius: 5px;
  font-size: 18px;
  margin-top: 10px;
}

:root {
  --card-height: 300px;
  --card-width: calc(var(--card-height) / 1.5);
}

* {
  box-sizing: border-box;
}

.card {
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 36px;
  perspective: 2500px;
  margin: 0 50px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-image2 {
  width: 50%;
  height: 50%;
  object-fit: cover;
}

.wrapper {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.card:hover .wrapper {
  transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
  box-shadow: 2px 35px 32px -8px rgba(255, 255, 255, 0.75);
  -webkit-box-shadow: 2px 35px 32px -8px rgba(255, 255, 255, 0.75);
  -moz-box-shadow: 2px 35px 32px -8px rgba(255, 255, 255, 0.75);
}

.wrapper::before,
.wrapper::after {
  content: "";
  opacity: 0;
  width: 100%;
  height: 0px;
  transition: all 0.5s;
  position: absolute;
  left: 0;
}

.wrapper::before {
  top: 0;
  height: 100%;
  background-image: linear-gradient(to top,
      transparent 46%,
      rgba(255, 255, 255, 0.5) 68%,
      rgb(255, 255, 255) 97%);
}

.wrapper::after {
  bottom: 0;
  opacity: 1;
  background-image: linear-gradient(to bottom,
      transparent 46%,
      rgba(255, 255, 255, 0.5) 68%,
      rgb(255, 255, 255) 97%);
}


.card:hover .wrapper::before,
.wrapper::after {
  opacity: 0;
}

.card:hover .wrapper::after {
  height: 120px;
}

.title {
  width: 100%;
  transition: transform 0.5s;
}

.card:hover .title {
  transform: translate3d(0%, -50px, 100px);
}

.character {
  width: 100%;
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: -1;
}

.card:hover .character {
  opacity: 1;
  transform: translate3d(0%, -30%, 100px);
}

.bgeasy {
  background-image: url("/images/playbgeasy.png");
  background-size: cover;
  height: 100vh;
  opacity: 0.9
}

.bgnormal {
  background-image: url("/images/playbgnormal.png");
  background-size: cover;
  height: 100vh;
  opacity: 0.9
}

.bghard {
  background-image: url("/images/playbghard.png");
  background-size: cover;
  height: 100vh;
  opacity: 0.9
}

.btdf {
  padding: 17px 40px;
  border-radius: 10px;
  border: 0;
  background-color: rgb(255, 174, 0);
  letter-spacing: 1.5px;
  font-size: 30px;
  transition: all .3s ease;
  box-shadow: rgb(151, 103, 0) 0px 10px 0px 0px;

  margin-top: 20px;
}

.btdf:hover {
  box-shadow: rgb(151, 103, 0) 0px 7px 0px 0px;
}

.btdf:active {
  background-color: rgb(255, 174, 0);
  box-shadow: rgb(233, 141, 3) 0px 10px 0px 0px;
  transform: translateY(5px);
  transition: 200ms;
}

.btback {
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #212121;
  z-index: 1;
  background: #e8e8e8;
  position: relative;
  font-weight: 1000;
  font-size: 17px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
  overflow: hidden;
}

.btback::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  background-color: #212121;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms
}

A .btback:hover {
  color: #e8e8e8;
}

.btback:hover::before {
  width: 100%;
}

button:hover {
  transition: 0.5s;
}

.pbutton:hover {
  background-color: #424242;
  color: #ffffff;
}

.blur-background {
  backdrop-filter: blur(8px);
}
</style>
