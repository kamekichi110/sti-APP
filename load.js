// サウンドトラックファイルの読み込み
function loadTrackFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataURL = e.target.result;
    console.log("トラックファイルが読み込まれました:", dataURL);
  };
  reader.readAsDataURL(file);
}

// ビデオトラックファイルの読み込み
function loadVideoTrackFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataURL = e.target.result;
    console.log("ビデオトラックファイルが読み込まれました:", dataURL);
  };
  reader.readAsDataURL(file);
}
