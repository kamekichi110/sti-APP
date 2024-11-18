$(document).ready(function () {
    let currentTrackIndex = 0;
    const tracks = [];
    const audioPlayer = document.getElementById("audioPlayer");
    const videoPlayer = document.getElementById("videoPlayer");
  
    // トラック再生
    function playTrack(index) {
      const track = tracks[index];
      if (track.type === 'audio') {
        videoPlayer.style.display = 'none';
        audioPlayer.style.display = 'block';
        audioPlayer.src = track.file;
        audioPlayer.play();
      } else if (track.type === 'video') {
        audioPlayer.style.display = 'none';
        videoPlayer.style.display = 'block';
        videoPlayer.src = track.file;
        videoPlayer.play();
      }
    }
  
    // トラック追加
    $("#addTrackFab").click(() => {
      ons.notification.prompt('トラック名を入力してください:').then((name) => {
        if (name) {
          tracks.push({ name, file: '', type: 'audio' }); // デフォルトではaudio
          updateTrackList();
        }
      });
    });
  
    // トラックリスト更新
    function updateTrackList() {
      const trackList = $("#trackList");
      trackList.empty();
      tracks.forEach((track, index) => {
        trackList.append(`<ons-list-item>${track.name}</ons-list-item>`);
      });
    }
  
    // ボタン操作
    $("#prevTrack").click(() => {
      if (currentTrackIndex > 0) currentTrackIndex--;
      playTrack(currentTrackIndex);
    });
  
    $("#playPause").click(() => {
      if (audioPlayer.paused) audioPlayer.play();
      else audioPlayer.pause();
    });
  
    $("#nextTrack").click(() => {
      if (currentTrackIndex < tracks.length - 1) currentTrackIndex++;
      playTrack(currentTrackIndex);
    });
  });
  