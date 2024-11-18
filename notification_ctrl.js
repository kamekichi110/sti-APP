// 通知機能を使用して保存完了メッセージを表示
function showNotification(message) {
  ons.notification.alert({ message: message, title: '通知', buttonLabel: 'OK' });
}

// 音声ファイルや動画ファイルの保存が完了したことを通知
function notifySaveSuccess() {
  showNotification("ファイルが正常に保存されました。");
}

// 音声ファイルや動画ファイルの読み込みが完了したことを通知
function notifyLoadSuccess() {
  showNotification("ファイルが正常に読み込まれました。");
}
