// Модули для управления приложением и создания окна
const path = require ('path');

const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev');

// const url = require ('url');
// require('./ipcmain');

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function createWindow () {
  // Создаем окно браузера.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3001'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  // и загрузить index.html приложения.
  //mainWindow.loadFile('index.html')

//   const startUrl = process.env.ELECTRON_START_URL || url.format({
    // pathname: path.join(__dirname, '../index.html'),
    // protocol: 'file:',
    // slashes: true
//   });

//   mainWindow.loadURL(startUrl);
  // mainWindow.loadURL('http://localhost:3000');

  // Отображаем средства разработчика.
  // mainWindow.webContents.openDevTools()
}

// Этот метод вызывается когда приложение инициализируется
// и будет готово для создания окон.
// Некоторые API могут использоваться только после возникновения этого события.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // На MacOS обычно пересоздают окно в приложении,
    // после того, как на иконку в доке нажали и других открытых окон нету.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Выйти когда все окна закрыты
app.on('window-all-closed', function () {
  // Для приложений и строки меню в macOS является обычным делом оставаться
  // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// В этом файле вы можете включить остальную часть основного процесса вашего приложения
//  Вы также можете поместить их в отдельные файлы и подключить через require.