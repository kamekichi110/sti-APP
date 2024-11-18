$(document).ready(function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const videoPlayer = document.getElementById("videoPlayer");
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaElementSource(audioPlayer);

  let currentTrackIndex = 0;
  let tracks = [];
  let playMode = "normal"; // "normal", "random", "loop", "one-loop", "one-end"
  let visualizerConfig = { color: "#00ff00", type: "bars" };

  // データベースからトラックをロード
  async function loadTracks() {
    tracks = await getTracksFromDB();
    if (tracks.length > 0) playTrack(0);
  }

  // トラック再生
  function playTrack(index) {
    currentTrackIndex = index;
    const track = tracks[index];
    if (track.type === "audio") {
      videoPlayer.style.display = "none";
      audioPlayer.style.display = "block";
      audioPlayer.src = track.file;
      audioPlayer.play();
    } else if (track.type === "video") {
      audioPlayer.style.display = "none";
      videoPlayer.style.display = "block";
      videoPlayer.src = track.file;
      videoPlayer.play();
    }
  }

  // 再生終了時の処理
  function onTrackEnd() {
    if (playMode === "normal" && currentTrackIndex < tracks.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else if (playMode === "random") {
      playTrack(Math.floor(Math.random() * tracks.length));
    } else if (playMode === "loop") {
      playTrack((currentTrackIndex + 1) % tracks.length);
    } else if (playMode === "one-loop") {
      playTrack(currentTrackIndex);
    }
  }

  // サウンドビジュアライザ
  function setupVisualizer() {
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillStyle = visualizerConfig.color;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    draw();
  }

  source.connect(analyser);
  analyser.connect(audioContext.destination);
  setupVisualizer();

  // イベントリスナー
  audioPlayer.addEventListener("ended", onTrackEnd);
  videoPlayer.addEventListener("ended", onTrackEnd);

  // モード切り替え
  $("#changeMode").click(() => {
    const modes = ["normal", "random", "loop", "one-loop", "one-end"];
    playMode = modes[(modes.indexOf(playMode) + 1) % modes.length];
    ons.notification.toast(`再生モード: ${playMode}`, { timeout: 2000 });
  });

  $("#prevTrack").click(() => {
    if (currentTrackIndex > 0) playTrack(currentTrackIndex - 1);
  });

  $("#playPause").click(() => {
    if (audioPlayer.paused) audioPlayer.play();
    else audioPlayer.pause();
  });

  $("#nextTrack").click(() => {
    if (currentTrackIndex < tracks.length - 1) playTrack(currentTrackIndex + 1);
  });

  loadTracks();
});
