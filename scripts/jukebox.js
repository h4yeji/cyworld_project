const songs = document.querySelectorAll(".albumTable-song");
let currentAudio = null;

songs.forEach((song) => {
  const playBtn = song.querySelector(".fa-caret-right");
  const pauseBtn = song.querySelector(".fa-pause");

  playBtn.addEventListener("click", (e) => {
    const audio = e.target.closest("td").querySelector("audio");

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pquse();
    }
    audio.play();
    currentAudio = audio;
  });

  pauseBtn.addEventListener("click", (e) => {
    const audio = e.target.closest("td").querySelector("audio");
    audio.pause();

    if (currentAudio === audio) {
      currentAudio = null;
    }
  });
});

// music player all btn select
const totalBtn = document.querySelector("#total");
const checkItems = document.querySelectorAll("input[name='checkItem']");
totalBtn.addEventListener("click", () => {
  checkItems.forEach((checkItem) => {
    checkItem.checked = totalBtn.checked;
  });
});

// listen btn event
const listenBtn = document.querySelector("#listen");
listenBtn.addEventListener("click", () => {
  const checkedItems = Array.from(checkItems).filter((item) => item.checked);
  if (checkedItems.length === 0) {
    alert("재생할 노래를 선택해주세요.");
    return;
  }
  if (checkedItems.length > 1) {
    alert("노래 복수선택 시, 가장 위에 선택한 노래만 재생됩니다.");
  }
  // 가장 첫 번째로 체크된 노래만 재생
  const firstCheckedItem = checkedItems[0];
  const audio = firstCheckedItem.closest("tr").querySelector("audio");
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  audio.play();
  currentAudio = audio;
  // 체크박스 모두 해제
  checkItems.forEach((item) => {
    if (item !== firstCheckedItem) item.checked = false;
  });
});
