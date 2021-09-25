// setImmediate(() => {
//   emitNet('helloserver');
// });

// onNet('helloclient', message => {
//   console.log(`The server replied: ${message}`);
// });
setImmediate(() => {
  global.RegisterCommand("/myid", (source) => {
    console.log("my player id", source + 1)
  }, false)
})

setTick(() => {
  // console.log("knu kore FTW")
  if (IsControlJustReleased(1, 38)) {
    emit("knu_kore:interact")
  }
})
